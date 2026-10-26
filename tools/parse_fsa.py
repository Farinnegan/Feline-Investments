# Parses the FSA master reference: module names, formulas, exam traps, question bank + answer key.
import re, json, sys
md = open(sys.argv[1], encoding="utf-8").read()
out = {"modules": [], "formulas": [], "traps": [], "questions": []}
mods = re.split(r"\n## Module (\d+): ", md)
for i in range(1, len(mods), 2):
    mid = int(mods[i]); body = mods[i + 1]
    name = body.split("\n", 1)[0].strip()
    out["modules"].append({"id": mid, "name": name})
    sec = lambda h: (re.search(r"### " + h + r"\n(.*?)(\n### |\n---|\Z)", body, re.S) or [None, ""])[1]
    for line in sec("Formulas").split("\n"):
        line = line.strip()
        if line.startswith("- "): out["formulas"].append({"m": mid, "raw": line[2:]})
    for line in sec("Exam traps").split("\n"):
        line = line.strip()
        if line.startswith("- "): out["traps"].append({"m": mid, "text": line[2:]})
# question bank
bank = md.split("## Mock Question Bank", 1)[1].split("## Answer Key", 1)[0]
key = {}
for row in md.split("## Answer Key", 1)[1].split("\n"):
    m = re.match(r"\| (\d+) \| ([^|]+) \| ([ABC]) \| (.+) \|$", row.strip())
    if m: key[int(m.group(1))] = (m.group(3), m.group(4).strip(), m.group(2).strip())
cur_mod = None
for block in re.split(r"\n(?=### Module |\*\*\d+\. )", bank):
    mm = re.match(r"### Module (\d+)", block)
    if mm: cur_mod = int(mm.group(1)); continue
    qm = re.match(r"\*\*(\d+)\. \(([^)]+)\)\*\* (.*)", block, re.S)
    if not qm: continue
    n, src, rest = int(qm.group(1)), qm.group(2), qm.group(3).strip()
    lines = rest.split("\n")
    opts, text, table = [], [], []
    for l in lines:
        s = l.strip()
        om = re.match(r"^([ABC])\. (.*)$", s)
        if om: opts.append(om.group(2)); continue
        if s.startswith("|"):
            cells = [c.strip() for c in s.strip("|").split("|")]
            if all(re.fullmatch(r":?-{3,}:?", c) or c == "" for c in cells) and any(c for c in cells): continue
            table.append(cells); continue
        text.append(s)
    q = "\n".join(t for t in text).strip()
    q = re.sub(r"\n{2,}", "\n\n", q)
    a, why, _ = key[n]
    out["questions"].append({"n": n, "m": cur_mod, "src": src, "q": q, "table": table, "o": opts, "a": "ABC".index(a), "why": why})
json.dump(out, open(sys.argv[2], "w"), ensure_ascii=False, indent=1)
print(len(out["modules"]), "modules,", len(out["formulas"]), "formula lines,", len(out["traps"]), "traps,", len(out["questions"]), "questions")
bad = [q["n"] for q in out["questions"] if len(q["o"]) != 3]
print("questions without 3 options:", bad)
