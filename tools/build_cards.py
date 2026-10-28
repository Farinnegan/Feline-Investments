# Builds a topic's game content from a card file written to claude/content-card-spec.md.
#
#   python3 tools/build_cards.py content/fsa-cards.md js/content-fsa.js fsa fsa2
#
# Arguments: card file, the topic's content JS (read for module short names and the exam
# question bank, then overwritten), topic key, ID prefix.
# IDs come from a hash of the card's name (terms, formulas) or question (rules), so they stay
# the same when cards are reordered or other cards change. Rewording a card gives it a new ID.
# The ID prefix lets a topic start fresh: old saved progress under another prefix is ignored.
import hashlib, json, re, sys

CARDS, JS, TOPIC, PREFIX = sys.argv[1:5]
md = open(CARDS, encoding="utf-8").read()
src = open(JS, encoding="utf-8").read()
old = json.loads(src[src.index("= {") + 2:].rstrip().rstrip(";"))
short = {m["id"]: m.get("short") for m in old["modules"]}

def hid(kind, text):
    return f"{PREFIX}-{kind}{hashlib.sha1(text.strip().lower().encode()).hexdigest()[:6]}"

def words(s):
    return re.findall(r"[A-Za-z][A-Za-z'-]*", s)

out = {"topic": TOPIC, "modules": [], "terms": [], "rules": [], "formulas": [],
       "decoyTerms": [], "decoyFormulas": [], "traps": [], "questions": old["questions"]}
warn = []
VERB = re.compile(r"^(subtract|add|adding|ignore|ignoring|use|using|forget|forgetting)\b", re.I)
def prose(t):  # a trap must read as a formula: no instruction verbs, no comma outside brackets
    flat = re.sub(r"\([^()]*\)", "", re.sub(r"\([^()]*\)", "", t))
    return bool(VERB.search(t)) or "," in flat
STOP = {"from", "with", "that", "this", "into", "than", "then", "when"}

for mm in re.finditer(r"^## Module (\d+): (.+?)\n(.*?)(?=^## Module |\Z)", md, re.S | re.M):
    m, name, body = int(mm.group(1)), mm.group(2).strip(), mm.group(3)
    out["modules"].append({"id": m, "name": name, "short": short.get(m) or " ".join(name.split()[:2])})
    sec = lambda h: (re.search(r"^### " + h + r"\n(.*?)(?=^### |^---|\Z)", body, re.S | re.M) or [None, ""])[1]
    lines = lambda h: [l.strip()[2:].strip() for l in sec(h).split("\n") if l.strip().startswith("- ")]

    for l in lines("Terms"):
        g, rest = re.match(r"\[([^\]]+)\]\s*(.*)", l).groups()
        if rest.startswith("(decoy)"):
            out["decoyTerms"].append({"m": m, "g": g, "term": rest[7:].strip()})
            continue
        term, d = [x.strip() for x in rest.split("::", 1)]
        out["terms"].append({"id": hid("t", term), "m": m, "g": g, "term": term, "def": d})
        n = len(d.split())
        if n > 18: warn.append(f"M{m} term '{term}': definition is {n} words (max 18)")
        leak = {w.lower() for w in words(term) if len(w) >= 4 and w.lower() not in STOP} & {w.lower() for w in words(d)}
        if leak: warn.append(f"M{m} term '{term}': definition uses {sorted(leak)}")

    for l in lines("Rules"):
        g, q, a, x = re.match(r"\[([^\]]+)\]\s*Q:\s*(.*?)\s*::\s*A:\s*(.*?)\s*::\s*X:\s*(.*)", l).groups()
        wrong = [w.strip() for w in x.split("|") if w.strip()]
        out["rules"].append({"id": hid("r", q), "m": m, "g": g, "q": q, "a": a, "x": wrong})
        if len(wrong) != 3: warn.append(f"M{m} rule '{q[:50]}': {len(wrong)} wrong answers (needs 3)")
        if len(q.split()) > 20: warn.append(f"M{m} rule '{q[:50]}': question is {len(q.split())} words (max 20)")

    for l in lines("Formulas"):
        parts = [p.strip() for p in l.split("::")]
        nm, fx = parts[0], parts[1]
        fid = hid("f", nm)
        out["formulas"].append({"id": fid, "m": m, "g": "f", "name": nm, "formula": fx})
        traps = [t.strip() for t in parts[2][len("trap:"):].split("|")] if len(parts) > 2 and parts[2].startswith("trap:") else []
        for t in traps:
            if not prose(t): out["decoyFormulas"].append({"for": fid, "formula": t})
            else: warn.append(f"M{m} formula '{nm}': trap is prose, not a formula, so it was left out: '{t}'")
        if len([t for t in traps if not prose(t)]) < 2: warn.append(f"M{m} formula '{nm}': fewer than 2 usable trap formulas")

    out["traps"] += [{"m": m, "text": t} for t in lines("Exam traps")]

# every term group needs 4 look-alikes (real terms plus decoys)
groups = {}
for t in out["terms"] + out["decoyTerms"]: groups.setdefault((t["m"], t["g"]), []).append(t["term"])
for (m, g), ts in groups.items():
    if len(ts) < 4 and any(t["m"] == m and t["g"] == g for t in out["terms"]):
        warn.append(f"M{m} group [{g}]: only {len(ts)} look-alikes (needs 4)")
ids = [x["id"] for k in ("terms", "rules", "formulas") for x in out[k]]
assert len(ids) == len(set(ids)), "duplicate card IDs: two cards share a name or question"

head = src[:src.index("= {")].rsplit("\n", 1)[0]
var = src[:src.index("= {")].rsplit("\n", 1)[1].strip()
head = "\n".join([f"// {TOPIC} content. Built by tools/build_cards.py from {CARDS}. Edit the card file, not this.",
                  "// IDs are hashes of each card's name or question: progress is saved against them."]
                 + [l for l in head.split("\n") if not l.startswith("//")])
open(JS, "w", encoding="utf-8").write(head + "\n" + var + " = " + json.dumps(out, ensure_ascii=False, indent=1) + ";\n")
print(f"{TOPIC}: {len(out['modules'])} modules, {len(out['terms'])} terms, {len(out['rules'])} rules, "
      f"{len(out['formulas'])} formulas, {len(out['decoyTerms'])} decoy terms, {len(out['decoyFormulas'])} trap formulas, "
      f"{len(out['traps'])} exam traps, {len(out['questions'])} questions")
print(f"{len(warn)} spec warnings")
for w in warn: print("  - " + w)
