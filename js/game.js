// Feline Investments — game logic, spaced repetition, economy and windows.
(function () {
  const C = window.CONTENT;

  // ---------- calendar ----------
  const dayNum = d => Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
  function today() { return dayNum(new Date()); }
  const EXAM_DAY = dayNum(new Date(2026, 10, 15)); // 15 November 2026

  // ---------- tuning ----------
  const INTERVALS = [1, 2, 4, 7, 12];   // days for boxes 1..5, short enough to cycle several times before the exam
  const MASTER_BOX = 4;                  // box 4+ = mastered (recalled on 4 separate days)
  const RELEARN_GAP = 5;                 // a missed concept waits at least this many calls before coming back
  const MAX_SHAKY = 8;                   // no daily cap: new concepts keep coming while fewer than this many misses wait for a retest
  const OFFICES = [
    { cap: 3,  mastered: 0,  tombs: 0,  cost: 0 },
    { cap: 6,  mastered: 20, tombs: 5,  cost: 20000 },
    { cap: 10, mastered: 50, tombs: 15, cost: 60000 },
    { cap: 16, mastered: 90, tombs: 30, cost: 150000 }
  ];
  const SEAT_UNLOCK = [0, 0.3, 0.6];     // share of a topic's concepts introduced before seat 2 / 3 opens
  const BASE_FEE = { term: 500, rterm: 600, formula: 800, rformula: 700 };
  const AUM_PER_FEE = 40;

  // ---------- topics and staff ----------
  // One employee type per CFA topic. Bigger topics get up to 3 analysts, the rest 2.
  const TOPICS = [
    { id: "ethics", name: "Ethics",                       species: "owl",    max: 3 },
    { id: "quant",  name: "Quantitative Methods",         species: "rabbit", max: 2 },
    { id: "econ",   name: "Economics",                    species: "dove",   max: 2 },
    { id: "fsa",    name: "Financial Statement Analysis", species: "wolf",   max: 3 },
    { id: "corp",   name: "Corporate Issuers",            species: "lion",   max: 2 },
    { id: "equity", name: "Equity",                       species: "bull",   max: 3, live: true },
    { id: "fi",     name: "Fixed Income",                 species: "turtle", max: 3 },
    { id: "deriv",  name: "Derivatives",                  species: "fox",    max: 2 },
    { id: "alts",   name: "Alternative Investments",      species: "horse",  max: 2 },
    { id: "pm",     name: "Portfolio Management",         species: "bear",   max: 2 }
  ];
  const topic = id => TOPICS.find(t => t.id === id);
  const NAMES = {
    bull: ["Bella", "Barry", "Bianca", "Boris", "Bailey"], owl: ["Olivia", "Oscar", "Opal", "Otto", "Oakley"],
    rabbit: ["Ruby", "Ralph", "Rosa", "Rex", "Riley"], dove: ["Daisy", "Dex", "Dina", "Dario", "Dakota"],
    wolf: ["Wanda", "Walter", "Willa", "Wes", "Winter"], lion: ["Leila", "Leo", "Luna", "Logan", "Lane"],
    turtle: ["Tara", "Theo", "Tess", "Toby", "Taylor"], fox: ["Fiona", "Felix", "Freya", "Finn", "Frankie"],
    horse: ["Hazel", "Hank", "Hana", "Hugo", "Harper"], bear: ["Bea", "Bruno", "Belle", "Bjorn", "Blair"]
  };
  // Operational stats only (money and AUM), never studying. 1 to 5.
  // four full-body variants per species (the fifth, head-only variant is not used)
  const VARIANTS = [0, 1, 2, 3];
  const ARCH = [
    { s: 4, n: 2, d: 3, quip: "Could sell ice in Riyadh in August." },
    { s: 2, n: 5, d: 2, quip: "Knows every pension fund by first name." },
    { s: 5, n: 1, d: 4, quip: "Closes fast. Networking? Not so much." },
    { s: 1, n: 4, d: 5, quip: "Quiet, but unstoppable once warmed up." }
  ];
  function candidate(tp, v) {
    const t = topic(tp);
    const seed = TOPICS.indexOf(t);
    const a = ARCH[(v + seed) % ARCH.length];
    const nm = NAMES[t.species][v] + " " + t.species.charAt(0).toUpperCase() + t.species.slice(1);
    return { topic: tp, species: t.species, v, name: nm, s: a.s, n: a.n, d: a.d, quip: a.quip };
  }
  function hireCost(c, seat) { return Math.round(800 * (c.s + c.n + c.d) * (seat === 2 ? 1.5 : 1) / 100) * 100; }
  // walk-in clients (full-body sprites) and Pitch Day institutions (seated, upper-body sprites)
  const CLIENTS = [
    { sprite: "penguin", name: "Penny Penguin", who: "Retail investor" },
    { sprite: "pig", name: "Percy Pig", who: "Small business owner" },
    { sprite: "tiger", name: "Tia Tiger", who: "Startup founder" },
    { sprite: "alligator", name: "Al Gator", who: "Family office" },
    { sprite: "snake", name: "Sasha Snake", who: "Day trader" }
  ];
  const INSTITUTIONS = [
    { sprite: "panda", name: "Bamboo Pension Fund" },
    { sprite: "giraffe", name: "Tall Oaks Endowment" },
    { sprite: "raccoon", name: "Night Market Capital" },
    { sprite: "sheep", name: "Flock Sovereign Fund" }
  ];
  // Pitch Day gear: earned with deal tombstones, each one makes the firm more money
  const GEAR = [
    { tombs: 5,  sprite: "financial-calculator", name: "Financial calculator", effect: "+10% fees on formula calls" },
    { tombs: 10, sprite: "analyst-briefcase", name: "Analyst briefcase", effect: "+10% AUM on every deal" },
    { tombs: 15, sprite: "multi-monitor-terminal", name: "Trading terminals", effect: "+15% fees on every call" },
    { tombs: 25, sprite: "open-vault", name: "The vault", effect: "Earns 2% interest on your cash each morning (up to $5K)" },
    { tombs: 46, sprite: "crystal-championship-trophy", name: "Crystal trophy", effect: "Every Equity question proven. Legend status." }
  ];
  const PITCH_LEN = 5;
  const CHEERS = ["Deal closed!", "Well done.", "Nailed it!", "Client signed!", "Smooth.", "Easy money."];
  const OOPS = ["Lost that one...", "Hmm, not quite.", "Client walked."];

  // ---------- items: terms and formulas only (the question bank is its own side game) ----------
  const ITEMS = {};
  C.terms.forEach(t => ITEMS[t.id] = { id: t.id, m: t.m, topic: "equity", kind: "term", src: t });
  C.formulas.forEach(f => ITEMS[f.id] = { id: f.id, m: f.m, topic: "equity", kind: "formula", src: f });
  const TOPIC_ITEMS = {};
  Object.values(ITEMS).forEach(i => (TOPIC_ITEMS[i.topic] = TOPIC_ITEMS[i.topic] || []).push(i.id));
  const TOTAL_ITEMS = Object.keys(ITEMS).length;

  // new concepts per topic, module by module: term, term, formula ... (easy first)
  const NEW_ORDER = { equity: [] };
  C.modules.slice().sort((a, b) => a.id - b.id).forEach(mod => {
    const terms = C.terms.filter(t => t.m === mod.id).map(t => t.id);
    const forms = C.formulas.filter(f => f.m === mod.id).map(f => f.id);
    let i = 0;
    while (terms.length || forms.length) {
      const src = (i++ % 3 === 2 && forms.length) || !terms.length ? forms : terms;
      NEW_ORDER.equity.push(src.shift());
    }
  });

  // ---------- state ----------
  function freshState() {
    return {
      v: 2, firm: "", started: false, ceoLook: 0,
      cash: 0, aum: 100000, office: 0, deals: 0,
      staff: [], items: {}, streak: {}, recent: [], rr: {},
      newDay: today(), newCount: {}, newCap: 12,
      lastDay: null, muted: false,
      pitch: { day: null, runs: 0, q: {}, tombs: [] }
    };
  }
  // Saves are upgraded in place, never wiped: new fields get defaults, old progress stays.
  const SAVE_VERSION = 3;
  function migrate(old) {
    if (!old || typeof old !== "object") return freshState();
    const S = Object.assign(freshState(), old);
    S.pitch = Object.assign({ day: null, runs: 0, q: {}, tombs: [] }, old.pitch || {});
    ["items", "streak", "rr", "newCount"].forEach(k => { if (!S[k] || typeof S[k] !== "object") S[k] = {}; });
    if (!Array.isArray(S.staff)) S.staff = [];
    if (!Array.isArray(S.recent)) S.recent = [];
    if (!VARIANTS.includes(S.ceoLook)) S.ceoLook = 0;                       // head-only look retired
    S.staff.forEach(st => { if (!VARIANTS.includes(st.v)) {
      const free = VARIANTS.find(v => !S.staff.some(o => o !== st && o.topic === st.topic && o.v === v));
      st.v = free == null ? 0 : free;
    } });
    S.v = SAVE_VERSION;
    return S;
  }
  let S = migrate(Store.readLocal());
  function save() { Store.save(S); if (window.Reminders) Reminders.writeSummary(reminderSummary()); }
  function reminderSummary() {
    const live = staffedTopics(), dueByDay = {};
    Object.entries(S.items).forEach(([id, st]) => { if (ITEMS[id] && live.includes(ITEMS[id].topic)) dueByDay[st.due] = (dueByDay[st.due] || 0) + 1; });
    return { examDay: EXAM_DAY, dueByDay, pitchDay: S.pitch.runs > 0 ? S.pitch.day : null, at: Date.now() };
  }

  // ---------- helpers ----------
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function money(n) {
    const a = Math.abs(n);
    if (a >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B";
    if (a >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
    if (a >= 1e3) return "$" + (n / 1e3).toFixed(1) + "K";
    return "$" + Math.round(n);
  }
  const mod = id => C.modules.find(m => m.id === id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const $ = id => document.getElementById(id);
  const team = tp => S.staff.filter(s => s.topic === tp);
  const staffedTopics = () => [...new Set(S.staff.map(s => s.topic))];
  function rollDay() { const d = today(); if (S.newDay !== d) { S.newDay = d; S.newCount = {}; } }
  function daysLeft() { return EXAM_DAY - today(); }
  const tombCount = () => S.pitch.tombs.length;
  const hasGear = sprite => GEAR.some(g => g.sprite === sprite && tombCount() >= g.tombs);

  // ---------- spaced repetition ----------
  function statsOf(ids) {
    const d = today(); let intro = 0, due = 0, overdue = 0, mastered = 0, tomorrow = 0;
    ids.forEach(id => {
      const s = S.items[id]; if (!s) return;
      intro++;
      if (s.due <= d) due++; else if (s.due === d + 1) tomorrow++;
      if (s.due < d) overdue++;
      if (s.b >= MASTER_BOX) mastered++;
    });
    return { total: ids.length, intro, due, overdue, mastered, tomorrow };
  }
  const topicStats = tp => statsOf(TOPIC_ITEMS[tp] || []);
  const moduleStats = m => statsOf(Object.values(ITEMS).filter(i => i.m === m).map(i => i.id));
  function totals() {
    const live = staffedTopics();
    const all = statsOf(Object.keys(ITEMS));
    const act = statsOf(Object.keys(ITEMS).filter(id => live.includes(ITEMS[id].topic)));
    return { mastered: all.mastered, intro: all.intro, due: act.due, tomorrow: act.tomorrow };
  }
  // shaky = missed concepts still waiting for their retest today
  function shaky(tp) { const d = today(); return (TOPIC_ITEMS[tp] || []).filter(id => { const st = S.items[id]; return st && st.flipTo && st.due <= d; }).length; }
  function canIntroduce(tp) { return shaky(tp) < MAX_SHAKY; }
  function remainingNew(tp) { return (NEW_ORDER[tp] || []).filter(id => !S.items[id]).length; }
  function nextNew(tp) {
    const f = S.focus && S.focus[tp];
    if (f) { const id = (NEW_ORDER[tp] || []).find(x => !S.items[x] && ITEMS[x].m === f); if (id) return id; }
    return (NEW_ORDER[tp] || []).find(id => !S.items[id]);
  }

  function pickDeal(onlyTopic) {
    rollDay();
    const d = today();
    const live = onlyTopic ? [onlyTopic] : staffedTopics();
    const ok = id => ITEMS[id] && live.includes(ITEMS[id].topic);
    const unlocked = id => !(S.items[id].lock > S.deals);
    const fresh = id => !S.recent.includes(id);
    const due = Object.keys(S.items).filter(id => ok(id) && S.items[id].due <= d && unlocked(id));
    if (due.length) {
      let pool = due.filter(fresh); if (!pool.length) pool = due;
      const minDue = Math.min(...pool.map(id => S.items[id].due));
      const top = pool.filter(id => S.items[id].due === minDue);
      return { id: top[Math.floor(Math.random() * top.length)], mode: "due" };
    }
    const withNew = live.filter(tp => canIntroduce(tp) && nextNew(tp))
      .sort((a, b) => topicStats(a).intro / topicStats(a).total - topicStats(b).intro / topicStats(b).total);
    if (withNew.length) return { id: nextNew(withNew[0]), mode: "new" };
    // nothing due or new: extra practice on the weakest concepts (still respecting the relearn gap)
    let pool = Object.keys(S.items).filter(id => ok(id) && unlocked(id) && fresh(id));
    if (!pool.length) pool = Object.keys(S.items).filter(id => ok(id) && unlocked(id));
    if (!pool.length) pool = Object.keys(S.items).filter(ok);
    if (!pool.length) return null;
    const minB = Math.min(...pool.map(id => S.items[id].b));
    const low = pool.filter(id => S.items[id].b <= minB + 1);
    return { id: low[Math.floor(Math.random() * low.length)], mode: "practice" };
  }

  function grade(deal, correct) {
    const id = deal.id, d = today();
    let s = S.items[id];
    const was = s ? s.b : 0;
    if (!s) { s = S.items[id] = { b: 0, due: d, n: 0, ok: 0, bad: 0 }; S.newCount[ITEMS[id].topic] = (S.newCount[ITEMS[id].topic] || 0) + 1; }
    s.n++;
    if (correct) {
      s.ok++; delete s.flipTo; delete s.lock;
      if (deal.mode !== "practice") {
        s.b = Math.min(5, s.b + 1);
        let due = d + INTERVALS[s.b - 1];
        if (d < EXAM_DAY) due = Math.max(d + 1, Math.min(due, EXAM_DAY)); // never schedule past exam day
        s.due = due;
      }
    } else {
      s.bad++; s.b = 1; s.due = d;
      s.lock = S.deals + 1 + RELEARN_GAP;                 // comes back only after a few other calls
      s.flipTo = deal.reverse ? "normal" : "reverse";     // ...and asked the other way round
    }
    S.recent.push(id); if (S.recent.length > 4) S.recent.shift();
    return { was, now: s.b, newlyMastered: correct && was < MASTER_BOX && s.b >= MASTER_BOX };
  }

  // ---------- team effects ----------
  function teamBonus(tp) {
    const t = team(tp);
    return { s: t.reduce((a, x) => a + x.s, 0), n: t.reduce((a, x) => a + x.n, 0), d: t.reduce((a, x) => a + x.d, 0) };
  }
  function skillsUnlocked(tp) {
    if (tp !== "equity") return 0;
    return C.modules.filter(m => { const st = moduleStats(m.id); return st.total && st.mastered / st.total >= 0.8; }).length;
  }
  function moodFor(tp) {
    if (topicStats(tp).overdue > 0) return "sleepy";
    if ((S.streak[tp] || 0) >= 3) return "fire";
    return "ok";
  }
  function refreshScene(full) {
    if (full) { Scene.setOffice(S.office, S.staff); Scene.setCeo(S.ceoLook); }
    Scene.setTrophies(tombCount(), GEAR.filter(g => tombCount() >= g.tombs).map(g => g.sprite));
    Scene.setMoods(S.staff.map(s => moodFor(s.topic)));
  }

  // ---------- building a deal ----------
  function pickDistractors(list, correct, count, keyFn) {
    const same = list.filter(x => x !== correct && x.g === correct.g && x.m === correct.m);
    const near = list.filter(x => x !== correct && x.g !== correct.g && x.m === correct.m);
    const other = list.filter(x => x !== correct && x.m !== correct.m);
    const out = [], seen = new Set([keyFn(correct)]);
    [shuffle(same), shuffle(near), shuffle(other)].forEach(pool => pool.forEach(x => {
      if (out.length < count && !seen.has(keyFn(x))) { seen.add(keyFn(x)); out.push(x); }
    }));
    return out;
  }

  function buildDeal(pick) {
    const it = ITEMS[pick.id];
    const s = S.items[pick.id];
    const box = s ? s.b : 0;
    const forced = s && s.flipTo;
    const base = { id: it.id, m: it.m, topic: it.topic, mode: pick.mode, retest: !!forced };
    if (it.kind === "term") {
      const t = it.src;
      const reverse = forced ? forced === "reverse" : box >= 2 && Math.random() < 0.5;
      const ds = pickDistractors(C.terms, t, reverse ? 2 : 3, x => reverse ? x.def : x.term);
      const why = "<b>" + esc(t.term) + "</b>: " + esc(t.def);
      if (reverse) return { ...base, reverse, type: "rterm", label: "Define it", ask: "Which definition fits this term?", prompt: "<b>" + esc(t.term) + "</b>", why,
        opts: shuffle([{ text: t.def, right: true }, ...ds.map(x => ({ text: x.def, right: false }))]) };
      return { ...base, reverse, type: "term", label: "Name the term", ask: "Which term is the client describing?", prompt: esc(t.def), why,
        opts: shuffle([{ text: t.term, right: true }, ...ds.map(x => ({ text: x.term, right: false }))]) };
    }
    const f = it.src;
    const reverse = forced ? forced === "reverse" : box >= 2 && Math.random() < 0.4;
    const ds = pickDistractors(C.formulas, f, 3, x => reverse ? x.name : x.formula);
    const why = "<b>" + esc(f.name) + "</b> = " + esc(f.formula);
    if (reverse) return { ...base, reverse, type: "rformula", label: "Read the formula", ask: "What does this formula calculate?", prompt: "<span class='formula'>" + esc(f.formula) + "</span>", why,
      opts: shuffle([{ text: f.name, right: true }, ...ds.map(x => ({ text: x.name, right: false }))]) };
    return { ...base, reverse, type: "formula", label: "Pick the formula", ask: "Which formula gives this?", prompt: "<b>" + esc(f.name) + "</b>", why,
      opts: shuffle([{ text: f.formula, right: true }, ...ds.map(x => ({ text: x.formula, right: false }))]) };
  }

  function feeFor(deal, boxBefore) {
    const tb = teamBonus(deal.topic);
    let fee = BASE_FEE[deal.type] * (1 + 0.25 * S.office) * (1 + 0.1 * boxBefore) * (1 + 0.05 * tb.s) * (1 + 0.05 * skillsUnlocked(deal.topic));
    const mood = moodFor(deal.topic);
    if (mood === "fire") fee *= 1.4 + 0.03 * tb.d;
    if (mood === "sleepy") fee *= 0.5;
    if (deal.mode === "due") fee *= 1.2;
    if (deal.mode === "practice") fee *= 0.4;
    if (hasGear("financial-calculator") && (deal.type === "formula" || deal.type === "rformula")) fee *= 1.1;
    if (hasGear("multi-monitor-terminal")) fee *= 1.15;
    return Math.round(fee / 10) * 10;
  }
  const aumFor = (deal, fee) => Math.round(fee * AUM_PER_FEE * (1 + 0.06 * teamBonus(deal.topic).n) * (hasGear("analyst-briefcase") ? 1.1 : 1));

  // ---------- windows ----------
  const modal = $("modal");
  function openWin(html, onMount) { modal.innerHTML = html; modal.classList.remove("hidden"); onMount && onMount(modal); }
  function closeWin() { modal.classList.add("hidden"); modal.innerHTML = ""; }
  modal.addEventListener("pointerdown", e => { if (e.target === modal && !modal.dataset.lock) { Sfx.tap(); closeWin(); } });
  function toast(text, cls = "") {
    const el = document.createElement("div");
    el.className = "toast " + cls; el.innerHTML = text;
    $("toasts").appendChild(el);
    setTimeout(() => el.classList.add("out"), 2600); setTimeout(() => el.remove(), 3000);
  }
  const statBar = (label, v) => `<div class="stat-row"><span>${label}</span><span class="pips">${"■".repeat(v)}<i>${"■".repeat(5 - v)}</i></span></div>`;

  // ---------- HUD ----------
  function hud() {
    rollDay();
    const dl = daysLeft();
    $("countdown").innerHTML = dl > 0 ? `<b>D-${dl}</b><small>to exam</small>` : dl === 0 ? "<b>Exam day</b><small>good luck!</small>" : "<b>Done</b><small>exam passed</small>";
    $("cash").textContent = money(S.cash);
    $("firmname").textContent = S.firm || "Feline Investments";
    const tt = totals();
    $("s-aum").textContent = money(S.aum);
    $("s-mastered").textContent = tt.mastered + "/" + TOTAL_ITEMS;
    $("s-due").textContent = tt.due;
    const next = OFFICES[S.office + 1];
    if (next) {
      const pct = Math.min(1, tt.mastered / next.mastered) * 0.5 + Math.min(1, tombCount() / next.tombs) * 0.3 + Math.min(1, S.cash / next.cost) * 0.2;
      $("s-bar").style.width = (pct * 100) + "%";
      $("s-next").textContent = `Lv ${S.office + 1} ${Scene.LAYOUTS[S.office].name}  →  ${Scene.LAYOUTS[S.office + 1].name}  ${Math.floor(pct * 100)}%`;
    } else { $("s-bar").style.width = "100%"; $("s-next").textContent = `Lv ${S.office + 1} ${Scene.LAYOUTS[S.office].name} · Top floor`; }
    const pl = pitchesLeft();
    $("btn-pitch").classList.toggle("ready", pl > 0);
    $("btn-pitch").classList.toggle("dot", pl > 0);
    $("btn-hire").classList.toggle("dot", hireOptions().some(o => o.can));
    $("btn-office").classList.toggle("dot", !!(next && officeReady(next)));
    const nl = staffedTopics().reduce((a, tp) => a + remainingNew(tp), 0);
    let hint;
    if (tt.due > 0) hint = `${tt.due} review${tt.due > 1 ? "s" : ""} due today. Clients pay more for these.`;
    else if (nl > 0) hint = `${nl} new concept${nl > 1 ? "s" : ""} waiting. Keep the clients coming!`;
    else hint = "All caught up! " + (tt.tomorrow ? tt.tomorrow + " due tomorrow. " : "") + "Extra calls pay less.";
    $("hint").textContent = hint;
    $("sound").classList.toggle("off", S.muted);
  }

  // ---------- the client loop ----------
  let busy = false;
  const wait = ms => new Promise(r => setTimeout(r, ms));
  async function nextClient(onlyTopic) {
    if (busy) return;
    Sfx.unlock();
    if (!S.staff.length) { hireWin(); return; }
    const pick = pickDeal(onlyTopic);
    if (!pick) { toast("No clients right now."); return; }
    busy = true; $("btn-client").disabled = true;
    const deal = buildDeal(pick);
    const t = team(deal.topic);
    S.rr[deal.topic] = ((S.rr[deal.topic] || 0) + 1) % t.length;
    const si = S.staff.indexOf(t[S.rr[deal.topic]]);
    Sfx.door();
    const client = CLIENTS[Math.floor(Math.random() * CLIENTS.length)];
    deal.client = client;
    await Scene.clientVisit(si, client.sprite);
    Sfx.keys(5);
    await wait(250);
    showDeal(deal, si);
  }

  function showDeal(deal, si) {
    const st = S.staff[si], m = mod(deal.m);
    const tag = deal.retest ? "<span class='tag due'>Retest</span>" : deal.mode === "new" ? "<span class='tag new'>New concept</span>" : deal.mode === "due" ? "<span class='tag due'>Review due</span>" : "<span class='tag prac'>Extra call</span>";
    const keys = ["A", "B", "C", "D"];
    modal.dataset.lock = "1";
    CTX.question = { kind: "client call", itemId: deal.id, module: deal.m, mode: deal.mode, format: deal.type, prompt: strip(deal.prompt), options: deal.opts.map(o => o.text), answer: deal.opts.find(o => o.right).text };
    openWin(`
      <div class="win">
        <div class="head"><span>${esc(deal.label)}</span><small>${esc(st.name)}</small></div>
        <div class="body">
          <div class="clientrow"><img src="${Sprites.url(deal.client.sprite, 2)}" alt=""><div><b>${esc(deal.client.name)}</b><span>${esc(deal.client.who)}</span></div><div class="tags">${tag}<span class="tag">M${m.id} ${esc(m.short)}</span></div></div>
          <div class="prompt">${deal.prompt}</div>
          <div class="ask">${esc(deal.ask)}</div>
          <div class="opts">${deal.opts.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${keys[i]}</span><span>${esc(o.text)}</span></button>`).join("")}</div>
          <div id="res"></div>
        </div>
        <div class="foot" id="prefoot"><button id="d-decline">Decline client</button></div>
        <div class="foot" id="dealfoot" style="display:none">
          <button id="d-office">Office</button>
          <button id="d-next" class="primary">Next client</button>
        </div>
      </div>`, root => {
      root.querySelectorAll(".opt").forEach(btn => btn.addEventListener("click", () => answer(deal, si, +btn.dataset.i, root)));
      root.querySelector("#d-decline").onclick = () => {
        Sfx.tap(); S.recent.push(deal.id); if (S.recent.length > 4) S.recent.shift();
        Scene.staffSay(si, "Maybe next time.", 1200); finishDeal(false);
      };
    });
  }

  function answer(deal, si, i, root) {
    const btns = [...root.querySelectorAll(".opt")];
    btns.forEach(b => b.disabled = true);
    const picked = deal.opts[i], rightIdx = deal.opts.findIndex(o => o.right);
    btns[rightIdx].classList.add("right");
    if (!picked.right) btns[i].classList.add("wrong");
    btns.forEach((b, k) => { if (k !== rightIdx && k !== i) b.classList.add("dim"); });

    const before = S.items[deal.id] ? S.items[deal.id].b : 0;
    const fee = picked.right ? feeFor(deal, before) : 0;
    const g = grade(deal, picked.right);
    S.deals++;
    let html;
    if (picked.right) {
      S.streak[deal.topic] = (S.streak[deal.topic] || 0) + 1;
      const aum = aumFor(deal, fee);
      S.cash += fee; S.aum += aum;
      Sfx.register();
      Scene.reward(si, "+" + money(fee));
      Scene.staffSay(si, CHEERS[Math.floor(Math.random() * CHEERS.length)], 1400);
      const fire = S.streak[deal.topic] === 3 ? `<div class='money'>🔥 The ${esc(topic(deal.topic).name)} desk is on fire! Bigger fees.</div>` : "";
      const s = S.items[deal.id];
      const days = s.due - today();
      const nextDue = deal.mode === "practice" ? "Extra call: schedule unchanged." : `Next review in ${days} day${days > 1 ? "s" : ""}.`;
      html = `<div class="result good"><div class="title">Deal closed</div><div class="why">${deal.why}</div>
        <div class="money">+${money(fee)} fees · +${money(aum)} AUM · ${nextDue}</div>${fire}</div>`;
      if (g.newlyMastered) setTimeout(() => { Sfx.sting(); toast("★ Mastered: " + esc(nameOf(deal.id)), "gold"); }, 500);
      if (S.streak[deal.topic] === 3) setTimeout(() => Sfx.sting(), 300);
    } else {
      S.streak[deal.topic] = 0;
      Sfx.thud();
      Scene.staffSay(si, OOPS[Math.floor(Math.random() * OOPS.length)], 1400);
      html = `<div class="result bad"><div class="title">Client lost</div><div class="why">${deal.why}</div>
        <div class="money">No fee. It comes back after a few other calls, asked a different way.</div></div>`;
    }
    root.querySelector("#res").innerHTML = html;
    root.querySelector("#prefoot").style.display = "none";
    root.querySelector("#dealfoot").style.display = "flex";
    root.querySelector("#d-next").onclick = () => { Sfx.tap(); finishDeal(true); };
    root.querySelector("#d-office").onclick = () => { Sfx.tap(); finishDeal(false); };
    root.querySelector("#res").scrollIntoView({ behavior: "smooth", block: "nearest" });
    checkMilestones();
    save(); hud(); refreshScene(false);
  }
  const CTX = { question: null };
  const strip = h => String(h).replace(/<[^>]+>/g, "");
  const nameOf = id => ITEMS[id].kind === "term" ? ITEMS[id].src.term : ITEMS[id].src.name;

  function finishDeal(again) {
    CTX.question = null;
    delete modal.dataset.lock;
    closeWin(); Scene.clientLeave();
    busy = false; $("btn-client").disabled = false;
    if (again) setTimeout(() => nextClient(), 350);
  }

  let toldOffice = S.office, toldSeats = {};
  function checkMilestones() {
    const next = OFFICES[S.office + 1], tt = totals();
    if (next && officeReady(next) && toldOffice <= S.office) {
      toldOffice = S.office + 1;
      setTimeout(() => { Sfx.fanfare(); toast("🏢 You can move to the " + Scene.LAYOUTS[S.office + 1].name + "! Open Office.", "gold"); }, 700);
    }
    staffedTopics().forEach(tp => {
      const seats = openSeats(tp);
      if (seats > (toldSeats[tp] || team(tp).length) && seats > team(tp).length) {
        toldSeats[tp] = seats;
        setTimeout(() => { Sfx.fanfare(); toast(`💼 A new ${topic(tp).name} seat opened. Check Hire.`, "gold"); }, 900);
      }
    });
  }

  function officeReady(next) { return totals().mastered >= next.mastered && tombCount() >= next.tombs && S.cash >= next.cost; }

  // ---------- hiring ----------
  function openSeats(tp) {
    const t = topic(tp); if (!t.live) return 0;
    const st = topicStats(tp); const share = st.total ? st.intro / st.total : 0;
    return SEAT_UNLOCK.filter((need, i) => i < t.max && share >= need).length;
  }
  function hireOptions() {
    const cap = OFFICES[S.office].cap;
    return TOPICS.filter(t => t.live).flatMap(t => {
      const seat = team(t.id).length;
      return VARIANTS.map(v => {
        const c = candidate(t.id, v);
        const hired = S.staff.some(s => s.topic === t.id && s.v === v);
        const cost = seat === 0 && !S.staff.length ? 0 : hireCost(c, seat);
        const can = !hired && seat < openSeats(t.id) && S.staff.length < cap && S.cash >= cost;
        return { c, hired, cost, can, seat };
      });
    });
  }

  function hireWin(first) {
    const cap = OFFICES[S.office].cap;
    const ordered = TOPICS.filter(t => t.live).concat(TOPICS.filter(t => !t.live));
    const sections = ordered.map(t => {
      if (!t.live) return (t === ordered.find(x => !x.live) ? `<div class="sect">Coming with your other topic files</div>` : "") + `<div class="tsec locked"><img class="mini" src="${Sprites.cowUrl(t.species, 0, 1)}" alt=""><div><b>${esc(t.name)}</b><div class="meta">Arrives when you add the ${esc(t.name)} file · up to ${t.max} analysts</div></div></div>`;
      const seat = team(t.id).length, open = openSeats(t.id), st = topicStats(t.id);
      const nextNeed = SEAT_UNLOCK[seat];
      const seatNote = seat >= t.max ? `Desk full: ${t.max} of ${t.max} analysts.`
        : seat < open ? `Seat ${seat + 1} of ${t.max} is open.`
        : `Seat ${seat + 1} opens at ${Math.round(nextNeed * 100)}% of ${t.name} introduced (now ${Math.round(st.intro / st.total * 100)}%).`;
      const cards = hireOptions().filter(o => o.c.topic === t.id).map(o => `
        <div class="card ${o.can ? "" : "locked"}">
          <img class="pt" src="${Sprites.cowUrl(o.c.species, o.c.v, 2)}" alt="">
          <div><div class="nm">${esc(o.c.name)}</div><div class="quip">"${esc(o.c.quip)}"</div>
            ${statBar("Sales", o.c.s)}${statBar("Network", o.c.n)}${statBar("Drive", o.c.d)}</div>
          <div class="act">${o.hired ? "<span class='tag'>On your team</span>" : `<span>Cost <b>${o.cost ? money(o.cost) : "Free"}</b></span><button data-v="${o.c.v}" data-t="${t.id}" ${o.can ? "" : "disabled"}>Hire</button>`}</div>
        </div>`).join("");
      return `<div class="sect">${esc(t.name)} desk <small>${seat}/${t.max}</small></div><div class="note" style="margin:0 0 8px">${seatNote}</div>${cards}`;
    }).join("");
    const intro = first ? `<div class="note" style="margin:0 0 10px;color:var(--ink)">Pick your first Equity analyst. This hire is on the house. Stats only change how much money they bring in, never what you study.</div>`
      : `<div class="note" style="margin:0 0 10px">Sales raises fees, Network raises AUM, Drive makes hot streaks pay more. Office desks: ${S.staff.length}/${cap}.</div>`;
    if (first) modal.dataset.lock = "1";
    openWin(`<div class="win"><div class="head"><span>${first ? "Your first hire" : "Hiring market"}</span><small>${S.staff.length}/${cap} desks</small></div>
      <div class="body">${intro}${sections}</div>
      ${first ? "" : `<div class="foot"><button id="x">Close</button></div>`}</div>`, root => {
      const x = root.querySelector("#x"); if (x) x.onclick = () => { Sfx.tap(); closeWin(); };
      root.querySelectorAll("button[data-v]").forEach(b => b.onclick = () => hire(b.dataset.t, +b.dataset.v, first));
    });
  }

  function hire(tp, v, first) {
    const o = hireOptions().find(o => o.c.topic === tp && o.c.v === v);
    if (!o || !o.can) return;
    S.cash -= o.cost;
    S.staff.push({ topic: tp, species: o.c.species, v, name: o.c.name, s: o.c.s, n: o.c.n, d: o.c.d });
    save(); delete modal.dataset.lock; closeWin(); refreshScene(true); hud();
    Sfx.fanfare();
    const i = S.staff.length - 1;
    setTimeout(() => Scene.staffSay(i, "Morning!", 1800), 200);
    toast("👋 " + esc(o.c.name) + " joined the " + esc(topic(tp).name) + " desk.", "gold");
    if (first) setTimeout(() => helpWin(true), 600);
  }

  // ---------- Pitch Day: the question bank as a daily side game ----------
  // Free to play, never punishes. Right answers win big mandates (AUM). A question
  // answered right on two separate days becomes a deal tombstone; tombstones unlock
  // gear and are needed for office moves. Missed questions return on a later day.
  function rollPitchDay() { const d = today(); if (S.pitch.day !== d) { S.pitch.day = d; S.pitch.runs = 0; } }
  function vaultOpen() { const tt = totals(); return S.staff.length > 0 && tt.intro > 0 && tt.due === 0; }
  function pitchesLeft() { rollPitchDay(); return Math.max(0, 1 + (vaultOpen() ? 1 : 0) - S.pitch.runs); }
  const qState = id => S.pitch.q[id] || (S.pitch.q[id] = { okDays: [], seen: 0, wrongDay: null, lastDay: null });

  function pickPitch() {
    const d = today();
    const allDone = C.questions.every(q => S.pitch.tombs.includes(q.id));
    const open = C.questions.filter(q => { const st = S.pitch.q[q.id]; return !(st && st.lastDay === d) && (allDone || !S.pitch.tombs.includes(q.id)); });
    const st = q => S.pitch.q[q.id] || { okDays: [], seen: 0, wrongDay: null };
    const groups = [
      open.filter(q => st(q).okDays.length === 1),                          // one more right day makes a tombstone
      open.filter(q => !st(q).seen),                                         // never pitched
      open.filter(q => st(q).seen && st(q).wrongDay !== null && st(q).okDays.length === 0), // missed before
      open.filter(q => st(q).seen && st(q).okDays.length !== 1 && !(st(q).wrongDay !== null && st(q).okDays.length === 0))
    ];
    const out = [];
    groups.forEach(g => shuffle(g.slice()).forEach(q => { if (out.length < PITCH_LEN && !out.includes(q)) out.push(q); }));
    return out.map(q => q.id);
  }

  function pitchWin() {
    const left = pitchesLeft();
    const nextGear = GEAR.find(g => tombCount() < g.tombs);
    const inst = INSTITUTIONS[(today() + S.pitch.runs) % INSTITUTIONS.length];
    const qs = left ? pickPitch() : [];
    const why = left ? "" : vaultOpen() || S.pitch.runs >= 2 ? "You've pitched for today. Come back tomorrow." : "Today's pitch is done. Clear all your reviews to open the vault and unlock a bonus pitch.";
    openWin(`<div class="win"><div class="head"><span>Pitch Day</span><small>${tombCount()}/${C.questions.length} tombstones</small></div>
      <div class="body">
        <div class="pitchhero"><img src="${Sprites.url(inst.sprite, 3)}" alt=""><div><b>${esc(inst.name)}</b><span>wants to hear your Equity pitch.</span></div></div>
        ${left && qs.length ? `<p>${qs.length} exam-style questions from all of Equity. Every right answer wins a mandate worth about <b>${money(pitchAum())}</b> in AUM. Get a question right on two different days and it becomes a deal tombstone for your wall.</p>` : `<p>${esc(why || "Every question has been pitched today. Come back tomorrow.")}</p>`}
        <div class="sect">Gear</div>
        <div class="gear">${GEAR.map(g => `<div class="g ${tombCount() >= g.tombs ? "on" : ""}"><img src="${Sprites.url(g.sprite, 2)}" alt=""><div><b>${esc(g.name)}</b><span>${tombCount() >= g.tombs ? esc(g.effect) : g.tombs + " tombstones · " + esc(g.effect)}</span></div></div>`).join("")}</div>
        ${nextGear ? `<div class="note">Next: ${esc(nextGear.name)} at ${nextGear.tombs} tombstones.</div>` : ""}
      </div>
      <div class="foot"><button id="x">Close</button>${left && qs.length ? `<button id="go" class="primary">Start pitch</button>` : ""}</div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
      const go = root.querySelector("#go");
      if (go) go.onclick = () => {
        Sfx.fanfare();
        S.pitch.runs++; save(); hud();
        Scene.staffSay(-1, "Pitch time!", 1600);
        runPitch({ inst, qs, i: 0, correct: 0, aum: 0, cash: 0, tombsNew: [] });
      };
    });
  }
  const pitchAum = () => Math.round(250000 * (1 + 0.25 * S.office) * (hasGear("analyst-briefcase") ? 1.1 : 1));

  function runPitch(run) {
    const q = C.questions.find(x => x.id === run.qs[run.i]);
    const opts = shuffle(q.o.map((text, k) => ({ text, right: k === q.a })));
    const keys = ["A", "B", "C", "D"];
    CTX.question = { kind: "pitch day", itemId: q.id, module: q.m, prompt: q.q, options: opts.map(o => o.text), answer: q.o[q.a] };
    modal.dataset.lock = "1";
    const pips = run.qs.map((_, k) => `<i class="${k < run.i ? "done" : k === run.i ? "now" : ""}"></i>`).join("");
    const st = S.pitch.q[q.id];
    const tag = st && st.okDays.length === 1 ? "<span class='tag new'>Tombstone chance</span>" : st && st.seen ? "<span class='tag'>Seen before</span>" : "<span class='tag'>New question</span>";
    openWin(`<div class="win"><div class="head"><span>${esc(run.inst.name)}</span><small>Question ${run.i + 1} of ${run.qs.length}</small></div>
      <div class="body"><div class="pips2">${pips}</div><div>${tag}<span class="tag">M${q.m}</span></div>
        <div class="prompt">${esc(q.q)}</div>
        <div class="opts">${opts.map((o, k) => `<button class="opt" data-i="${k}"><span class="k">${keys[k]}</span><span>${esc(o.text)}</span></button>`).join("")}</div>
        <div id="res"></div></div>
      <div class="foot" id="prefoot"><button id="leave">End pitch</button></div>
      <div class="foot" id="dealfoot" style="display:none"><button id="nx" class="primary">${run.i + 1 < run.qs.length ? "Next question" : "See results"}</button></div></div>`, root => {
      root.querySelector("#leave").onclick = () => { Sfx.tap(); pitchSummary(run); };
      root.querySelectorAll(".opt").forEach(btn => btn.onclick = () => {
        const btns = [...root.querySelectorAll(".opt")]; btns.forEach(b => b.disabled = true);
        const k = +btn.dataset.i, right = opts[k].right, ri = opts.findIndex(o => o.right);
        btns[ri].classList.add("right"); if (!right) btns[k].classList.add("wrong");
        btns.forEach((b, j) => { if (j !== ri && j !== k) b.classList.add("dim"); });
        const d = today(), qs = qState(q.id);
        qs.seen++; qs.lastDay = d;
        let html;
        if (right) {
          const aum = pitchAum();
          run.correct++; run.aum += aum; run.cash += 1500; S.aum += aum; S.cash += 1500;
          if (!qs.okDays.includes(d)) qs.okDays.push(d);
          let tombMsg = qs.okDays.length === 1 ? "Get it right on another day to earn its tombstone." : "";
          if (qs.okDays.length >= 2 && !S.pitch.tombs.includes(q.id)) {
            const before = tombCount();
            S.pitch.tombs.push(q.id); run.tombsNew.push(q.id);
            tombMsg = "🏛 Deal tombstone earned!";
            setTimeout(() => { Sfx.sting(); toast("🏛 Deal tombstone earned! " + tombCount() + "/" + C.questions.length, "gold"); }, 400);
            const g = GEAR.find(g => before < g.tombs && tombCount() >= g.tombs);
            if (g) setTimeout(() => { Sfx.fanfare(); toast("🎁 New gear: " + esc(g.name) + ". " + esc(g.effect), "gold"); }, 1400);
          }
          Sfx.register(); Scene.ceoCheer();
          html = `<div class="result good"><div class="title">Mandate won</div><div class="why">${esc(q.why)}</div><div class="money">+${money(aum)} AUM · +$1.5K fees${tombMsg ? " · " + tombMsg : ""}</div></div>`;
        } else {
          qs.wrongDay = d;
          Sfx.thud();
          html = `<div class="result bad"><div class="title">They passed this time</div><div class="why">${esc(q.why)}</div><div class="money">No cost. This question comes back on a later day.</div></div>`;
        }
        root.querySelector("#res").innerHTML = html;
        root.querySelector("#prefoot").style.display = "none";
        root.querySelector("#dealfoot").style.display = "flex";
        root.querySelector("#res").scrollIntoView({ behavior: "smooth", block: "nearest" });
        save(); hud(); refreshScene(false);
        root.querySelector("#nx").onclick = () => { Sfx.tap(); run.i++; if (run.i < run.qs.length) runPitch(run); else pitchSummary(run); };
      });
    });
  }

  function pitchSummary(run) {
    CTX.question = null;
    delete modal.dataset.lock;
    const answered = Math.min(run.i + (document.querySelector("#res .result") ? 1 : 0), run.qs.length);
    openWin(`<div class="win"><div class="head"><span>Pitch results</span><small>${esc(run.inst.name)}</small></div>
      <div class="body"><div class="pitchhero"><img src="${Sprites.url(run.inst.sprite, 3)}" alt=""><div><b>${run.correct} of ${answered} mandates won</b><span>${run.correct ? "They're impressed." : "They'll be back."}</span></div></div>
        <div class="kv"><span>AUM won</span><span>${money(run.aum)}</span><span>Fees</span><span>${money(run.cash)}</span><span>New tombstones</span><span>${run.tombsNew.length}</span><span>Total tombstones</span><span>${tombCount()}/${C.questions.length}</span></div>
        ${pitchesLeft() ? `<div class="note">You have ${pitchesLeft()} more pitch${pitchesLeft() > 1 ? "es" : ""} today.</div>` : vaultOpen() ? `<div class="note">That's it for today. Next pitch tomorrow.</div>` : `<div class="note">Clear all of today's reviews to open the vault and unlock a bonus pitch.</div>`}
      </div>
      <div class="foot"><button id="x" class="primary">Back to the office</button></div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
    });
    save(); hud(); refreshScene(false);
  }

  // ---------- office ----------
  function officeWin() {
    const cur = Scene.LAYOUTS[S.office], next = OFFICES[S.office + 1], tt = totals();
    let body = `<div class="kv"><span>Current office</span><span>${cur.name}</span><span>Desks</span><span>${S.staff.length}/${OFFICES[S.office].cap}</span><span>Fee boost</span><span>x${(1 + 0.25 * S.office).toFixed(2)}</span><span>Cash</span><span>${money(S.cash)}</span></div>`;
    let btn = "";
    if (next) {
      const okM = tt.mastered >= next.mastered, okT = tombCount() >= next.tombs, okC = S.cash >= next.cost;
      body += `<div class="sect">Next: ${Scene.LAYOUTS[S.office + 1].name}</div>
        <div class="kv"><span>Concepts mastered</span><span style="color:${okM ? "var(--green)" : "var(--red)"}">${tt.mastered}/${next.mastered}</span>
        <span>Deal tombstones</span><span style="color:${okT ? "var(--green)" : "var(--red)"}">${tombCount()}/${next.tombs}</span>
        <span>Moving cost</span><span style="color:${okC ? "var(--green)" : "var(--red)"}">${money(next.cost)}</span>
        <span>Desks</span><span>${next.cap}</span><span>Fee boost</span><span>x${(1 + 0.25 * (S.office + 1)).toFixed(2)}</span></div>
        <div class="note">The progress bar on the office screen blends these three: mastered concepts count most, then tombstones, then cash.</div>
        <div class="note">Mastered means recalled correctly on 4 separate days. Tombstones come from Pitch Day. Bigger offices hold more analysts once you add more topics.</div>`;
      btn = `<button id="mv" class="primary" ${okM && okT && okC ? "" : "disabled"}>Move in</button>`;
    } else body += `<div class="note">You run the whole tower.</div>`;
    openWin(`<div class="win"><div class="head"><span>Office</span></div><div class="body">${body}</div>
      <div class="foot"><button id="x">Close</button>${btn}</div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
      const mv = root.querySelector("#mv");
      if (mv) mv.onclick = () => {
        S.cash -= next.cost; S.office++; toldOffice = S.office;
        save(); closeWin(); refreshScene(true); hud();
        Sfx.fanfare(); Scene.ceoCheer(); Scene.staffSay(-1, "New office!", 1800);
        toast("🏢 Welcome to the " + Scene.LAYOUTS[S.office].name + "!", "gold");
      };
    });
  }

  // ---------- library (Equity skill tree) ----------
  function cardIcon(id) {
    const s = S.items[id];
    if (!s) return "<span class='unseen'>new</span>";
    const icon = s.b >= MASTER_BOX ? "mastered-card" : s.b >= 2 ? "learned-mastery-card" : "weak-mastery-card";
    return `<img class="mi" src="${Sprites.url(icon, 1)}" alt="">`;
  }
  function badge(m) {
    const st = moduleStats(m); const r = st.total ? st.mastered / st.total : 0;
    const name = r >= 1 ? "platinum-peak-badge" : r >= 0.75 ? "gold-peak-badge" : r >= 0.5 ? "silver-peak-badge" : r >= 0.25 ? "bronze-peak-badge" : "locked-vault";
    return `<img class="bi" src="${Sprites.url(name, 1)}" alt="">`;
  }
  function moduleRows() {
    return C.modules.slice().sort((a, b) => a.id - b.id).map(m => {
      const st = moduleStats(m.id);
      const lit = st.total && st.mastered / st.total >= 0.8;
      return `<button class="modbtn" data-m="${m.id}"><span class="ml">${badge(m.id)}<span>M${m.id} ${esc(m.short)}${lit ? " <span class='tag new'>Skill +5%</span>" : ""}${isFocus(m.id) ? " <span class='tag due'>Focus</span>" : ""}</span></span><span>${st.mastered}/${st.total}</span></button>`;
    }).join("");
  }
  function libraryWin() {
    Sfx.printer();
    openWin(`<div class="win"><div class="head"><span>Library</span><small>Equity</small></div>
      <div class="body">${moduleRows()}<div class="note">Open a module and tap Focus here to pull its new concepts in first. Each module is a skill for your Equity desk. Master 80% of a module to light it up for +5% Equity fees. Cards crack, glow, then shine as you recall a concept over more days.</div></div>
      <div class="foot"><button id="x">Close</button></div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
      root.querySelectorAll(".modbtn").forEach(b => b.onclick = () => { Sfx.tap(); moduleWin(+b.dataset.m); });
    });
  }
  const remainingIn = m => NEW_ORDER.equity.some(id => !S.items[id] && ITEMS[id].m === m);
  const isFocus = m => !!(S.focus && S.focus.equity === m);
  function moduleWin(m) {
    const M = mod(m), st = moduleStats(m);
    const terms = C.terms.filter(t => t.m === m).map(t => `<div class="li">${cardIcon(t.id)}<b>${esc(t.term)}</b><br>${esc(t.def)}</div>`).join("");
    const forms = C.formulas.filter(f => f.m === m).map(f => `<div class="li">${cardIcon(f.id)}<b>${esc(f.name)}</b><br><span class="f">${esc(f.formula)}</span></div>`).join("");
    const traps = C.traps.filter(t => t.m === m).map(t => `<div class="li">⚠ ${esc(t.text)}</div>`).join("");
    openWin(`<div class="win"><div class="head"><span>M${m} ${esc(M.short)}</span><small>${st.mastered}/${st.total} mastered</small></div>
      <div class="body"><div class="subtitle">${esc(M.name)}</div>
        <div class="sect">Key terms</div><div class="list">${terms || "<div class='li'>None</div>"}</div>
        ${forms ? `<div class="sect">Formulas</div><div class="list">${forms}</div>` : ""}
        ${traps ? `<div class="sect">Exam traps</div><div class="list">${traps}</div>` : ""}
      </div>
      <div class="foot"><button id="back">Back</button>${remainingIn(m) ? `<button id="focus" class="${isFocus(m) ? "" : "primary"}">${isFocus(m) ? "Stop focusing" : "Focus here"}</button>` : ""}<button id="x">Close</button></div></div>`, root => {
      root.querySelector("#back").onclick = () => { Sfx.tap(); libraryWin(); };
      const fb = root.querySelector("#focus");
      if (fb) fb.onclick = () => { Sfx.tap(); S.focus = S.focus || {}; S.focus.equity = isFocus(m) ? null : m; save(); toast(S.focus.equity ? `New concepts will come from M${m} first.` : "Back to the normal order."); moduleWin(m); };
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
    });
  }

  // ---------- staff window ----------
  function staffWin(i) {
    const s = S.staff[i]; if (!s) return;
    const t = topic(s.topic), st = topicStats(s.topic), mood = moodFor(s.topic);
    const moodTxt = mood === "sleepy" ? `😴 Sleepy: ${st.overdue} overdue concept${st.overdue > 1 ? "s" : ""} in ${t.name}. Half fees until reviewed.` : mood === "fire" ? "🔥 On fire! Bigger fees." : "🙂 Focused";
    const c = candidate(s.topic, s.v);
    Sfx.tap();
    openWin(`<div class="win"><div class="head"><span>${esc(s.name)}</span><small>${esc(t.name)} desk</small></div>
      <div class="body"><div class="card" style="margin-bottom:8px"><img class="pt" src="${Sprites.cowUrl(s.species, s.v, 2)}" alt="">
        <div><div class="quip">"${esc(c.quip)}"</div>${statBar("Sales", s.s)}${statBar("Network", s.n)}${statBar("Drive", s.d)}<div class="meta">${moodTxt}</div></div></div>
        <div class="kv"><span>Concepts introduced</span><span>${st.intro}/${st.total}</span><span>Mastered</span><span>${st.mastered}</span><span>Due today</span><span>${st.due}</span></div>
        <div class="sect">${esc(t.name)} skills</div>${moduleRows()}</div>
      <div class="foot"><button id="x">Close</button><button id="tr" class="primary">Take a call</button></div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
      root.querySelector("#tr").onclick = () => { closeWin(); nextClient(s.topic); };
      root.querySelectorAll(".modbtn").forEach(b => b.onclick = () => { Sfx.tap(); moduleWin(+b.dataset.m); });
    });
  }

  function ceoWin() {
    const tt = totals();
    Sfx.tap();
    openWin(`<div class="win"><div class="head"><span>CEO's office</span><small>${esc(S.firm)}</small></div>
      <div class="body"><div class="trophies">${["bronze-laurel-trophy", "silver-laurel-trophy", "gold-laurel-trophy", "crystal-championship-trophy"].map((n, i) => `<img src="${Sprites.url(n, 2)}" class="${i <= S.office ? "" : "dimmed"}" alt="">`).join("")}</div>
        <div class="kv"><span>Office</span><span>${Scene.LAYOUTS[S.office].name}</span>
        <span>AUM</span><span>${money(S.aum)}</span><span>Cash</span><span>${money(S.cash)}</span>
        <span>Deals closed</span><span>${S.deals}</span><span>Staff</span><span>${S.staff.length}</span>
        <span>Concepts seen</span><span>${tt.intro}/${TOTAL_ITEMS}</span><span>Mastered</span><span>${tt.mastered}</span>
        <span>Due today</span><span>${tt.due}</span><span>Due tomorrow</span><span>${tt.tomorrow}</span>
        <span>Deal tombstones</span><span>${tombCount()}/${C.questions.length}</span>
        <span>Days to exam</span><span>${Math.max(0, daysLeft())}</span></div>
        <div class="sect">Gear</div><div class="gear">${GEAR.map(g => `<div class="g ${tombCount() >= g.tombs ? "on" : ""}"><img src="${Sprites.url(g.sprite, 2)}" alt=""><div><b>${esc(g.name)}</b><span>${tombCount() >= g.tombs ? esc(g.effect) : "Locked · " + g.tombs + " tombstones"}</span></div></div>`).join("")}</div></div>
      <div class="foot"><button id="x" class="primary">Back to work</button></div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
    });
  }

  // ---------- menu ----------
  function menuWin() {
    const caps = [8, 12, 20, 30];
    openWin(`<div class="win"><div class="head"><span>Menu</span></div>
      <div class="body">
        <div class="label">Sound</div>
        <div class="seg"><button data-s="on" class="${S.muted ? "" : "on"}">On</button><button data-s="off" class="${S.muted ? "on" : ""}">Off</button></div>
        <button id="ceo" class="wide">Firm stats</button>
        <button id="help" class="wide">How to play</button>
        <button id="rename" class="wide">Rename firm</button>
        <button id="backup" class="wide">Backup or restore progress</button>
        <button id="remind" class="wide">Phone reminders</button>
        ${Store.cloud ? "" : `<button id="sendnotes" class="wide">Send notes to Claude (${Store.notes().filter(n => !n.shared).length} new)</button>`}
        <button id="reset" class="wide" style="color:var(--red)">Reset all progress</button>
        <div class="note">${Store.cloud ? "Progress saves on this device and to your Claude account." : "Progress saves on this device. Use a backup code to move it."} Content: CFA Level I Equity.</div>
      </div>
      <div class="foot"><button id="x" class="primary">Close</button></div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
      root.querySelectorAll("[data-s]").forEach(b => b.onclick = () => { S.muted = b.dataset.s === "off"; Sfx.setMuted(S.muted); save(); hud(); Sfx.tap(); menuWin(); });
      root.querySelector("#ceo").onclick = ceoWin;
      root.querySelector("#help").onclick = () => helpWin(false);
      root.querySelector("#rename").onclick = () => introWin(true);
      root.querySelector("#backup").onclick = backupWin;
      root.querySelector("#remind").onclick = remindersWin;
      const sn = root.querySelector("#sendnotes"); if (sn) sn.onclick = notesWin;
      root.querySelector("#reset").onclick = () => confirmWin("Reset everything?", "Your firm, staff and all review history will be deleted. This can't be undone.", "Delete everything", () => {
        Store.reset();
        S = freshState(); toldOffice = 0; toldSeats = {}; closeWin(); refreshScene(true); hud(); introWin(false);
      }, menuWin);
    });
  }

  // ---------- phone reminders ----------
  async function remindersWin() {
    const st = await Reminders.status();
    let body = "", foot = `<button id="x" class="primary">Close</button>`;
    if (st.state === "unsupported") body = `<p>This view can't send notifications. Open the game at <b>farinnegan.github.io/Feline-Investments</b> in Safari on your iPhone (iOS 16.4 or newer) or Chrome on Android.</p>`;
    else if (st.state === "install") body = `<p>On iPhone, reminders only work from the home-screen app.</p><ol class="steps"><li>Tap the <b>Share</b> button in Safari.</li><li>Choose <b>Add to Home Screen</b>, then <b>Add</b>.</li><li>Open Feline Investments from your home screen and come back to Menu, Phone reminders.</li></ol><div class="note">Your progress in Safari and in the home-screen app are kept separately. Use a backup code to bring it across.</div>`;
    else if (st.state === "denied") body = `<p>Notifications are blocked for this app. On iPhone go to <b>Settings, Notifications, Feline Investments</b> and allow them, then come back here.</p>`;
    else if (st.state === "off") { body = `<p>Get a nudge each morning (about 8 AM) and evening (about 7 PM) with how many reviews are due and whether Pitch Day is ready.</p>`; foot = `<button id="x">Close</button><button id="on" class="primary">Turn on reminders</button>`; }
    else body = `<p>Reminders are on for this phone.</p><p><b>One-time step:</b> send your reminder code to GitHub so the daily reminder service knows where to send. Tap the button, then tap <b>Submit new issue</b> on GitHub.</p>
        <a class="btnlink" href="${Reminders.reminderIssueUrl(st.sub)}" target="_blank" rel="noopener">Send reminder code to GitHub</a>
        <button id="copy" class="wide">Copy code instead</button><button id="test" class="wide">Send a test notification</button>
        <div class="note">If you copy the code, paste it to Claude and it will be added for you.</div>`;
    openWin(`<div class="win"><div class="head"><span>Phone reminders</span></div><div class="body">${body}</div><div class="foot">${foot}</div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
      const on = root.querySelector("#on");
      if (on) on.onclick = async () => { Sfx.tap(); const sub = await Reminders.enable(); if (sub) { await Reminders.test(); } remindersWin(); };
      const cp = root.querySelector("#copy");
      if (cp) cp.onclick = () => { try { navigator.clipboard.writeText(JSON.stringify(st.sub)); toast("Reminder code copied."); } catch (e) { toast("Couldn't copy here."); } };
      const tb = root.querySelector("#test"); if (tb) tb.onclick = () => { Sfx.tap(); Reminders.test(); };
    });
  }

  function notesWin() {
    const all = Store.notes(), fresh = all.filter(n => !n.shared);
    openWin(`<div class="win"><div class="head"><span>Notes for Claude</span><small>${all.length} total</small></div>
      <div class="body">${fresh.length ? `<p>${fresh.length} new note${fresh.length > 1 ? "s" : ""}. Tap the button, then <b>Submit new issue</b> on GitHub, and Claude will read them at your next review.</p>
        <a id="sendlink" class="btnlink" href="${Reminders.notesIssueUrl(fresh)}" target="_blank" rel="noopener">Send ${fresh.length} note${fresh.length > 1 ? "s" : ""} to GitHub</a>` : `<p>No new notes. Tap 📝 at the top any time to add one.</p>`}
        <div class="list">${all.slice().reverse().slice(0, 12).map(n => `<div class="li"><b>${esc(n.kind)}</b> · ${esc(n.text)}${n.shared ? " <span class='tag'>sent</span>" : ""}</div>`).join("")}</div></div>
      <div class="foot"><button id="x" class="primary">Close</button></div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
      const a = root.querySelector("#sendlink"); if (a) a.addEventListener("click", () => { Store.markShared(fresh.map(n => n.id)); setTimeout(notesWin, 500); });
    });
  }

  // in-page confirmation (artifact viewers block the browser's confirm dialog)
  function confirmWin(title, text, yes, onYes, onNo) {
    openWin(`<div class="win"><div class="head"><span>${esc(title)}</span></div><div class="body"><p>${esc(text)}</p></div>
      <div class="foot"><button id="no">Cancel</button><button id="yes" class="primary danger">${esc(yes)}</button></div></div>`, root => {
      root.querySelector("#no").onclick = () => { Sfx.tap(); onNo ? onNo() : closeWin(); };
      root.querySelector("#yes").onclick = () => { Sfx.tap(); onYes(); };
    });
  }

  function backupWin() {
    const code = Store.exportCode(S);
    openWin(`<div class="win"><div class="head"><span>Backup and restore</span></div>
      <div class="body"><div class="label">Your backup code</div>
        <textarea id="bk" class="input code" rows="4" readonly>${esc(code)}</textarea>
        <button id="copy" class="wide">Copy code</button>
        <div class="label">Restore from a code</div>
        <textarea id="rs" class="input code" rows="3" placeholder="Paste a backup code"></textarea>
        <button id="restore" class="wide">Restore</button>
        <div class="note">Restoring replaces the progress on this device.</div></div>
      <div class="foot"><button id="x" class="primary">Close</button></div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
      root.querySelector("#copy").onclick = () => { try { navigator.clipboard.writeText(code); toast("Copied."); } catch (e) { root.querySelector("#bk").select(); } };
      root.querySelector("#restore").onclick = () => {
        let data;
        try { data = Store.importCode(root.querySelector("#rs").value); } catch (e) { toast("That code didn't work. Check you pasted all of it."); return; }
        confirmWin("Restore this backup?", "It replaces the progress on this device.", "Restore", () => {
          S = migrate(data); save(); closeWin(); refreshScene(true); hud(); toast("Progress restored.", "gold");
        }, backupWin);
      };
    });
  }

  function helpWin(first) {
    openWin(`<div class="win"><div class="head"><span>How to play</span></div>
      <div class="body">
        <p><b>Clients bring deals.</b> Each deal is a term or formula from your Equity notes. Answer right to close it and earn fees.</p>
        <p><b>Your memory runs the firm.</b> Concepts you get right come back after 1, 2, 4, 7 and 12 days, never later than exam day. Miss one and it comes back after a few other calls, asked the other way round.</p>
        <p><b>Don't let the desk get sleepy.</b> Any overdue concept halves that desk's fees until you review it. Three right in a row sets it on fire 🔥.</p>
        <p><b>Grow the team.</b> New seats open as you introduce more of a topic. Each analyst's stats change how much money they bring in.</p>
        <p><b>Pitch Day.</b> Once a day, pitch 5 exam-style questions to a big client. Right answers win mandates. A question you get right on two different days becomes a deal tombstone, and tombstones unlock gear. Clear all your reviews to unlock a bonus pitch.</p>
        <p><b>Move up.</b> Mastered concepts, tombstones and cash unlock bigger offices.</p>
        <p><b>Spot something off?</b> Tap 📝 to leave Claude a note.</p>
        <p><b>Reminders.</b> Add the game to your home screen, then turn on Menu, Phone reminders.</p>
      </div>
      <div class="foot"><button id="x" class="primary">${first ? "Open for business" : "Got it"}</button></div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); if (first) morning(true); };
    });
  }

  function introWin(rename) {
    if (rename) delete modal.dataset.lock; else modal.dataset.lock = "1";
    let look = S.ceoLook || 0;
    openWin(`<div class="win"><div class="head"><span>${rename ? "Rename firm" : "Welcome, Boss"}</span></div>
      <div class="body">
        ${rename ? "" : "<p>You're the cat. You just opened a tiny investment firm in your home office. Grow it into a skyscraper by closing client deals, all built from your CFA notes.</p><div class='label'>Choose your look</div><div class='looks'>" + VARIANTS.map(v => `<button class="look ${v === look ? "on" : ""}" data-v="${v}"><img src="${Sprites.cowUrl("black-cat", v, 2)}" alt=""></button>`).join("") + "</div>"}
        <div class="label">Name your firm</div>
        <input id="fn" class="input" maxlength="22" placeholder="Feline Investments" value="${esc(S.firm)}">
      </div>
      <div class="foot">${rename ? '<button id="x">Cancel</button>' : ""}<button id="go" class="primary">${rename ? "Save" : "Next"}</button></div></div>`, root => {
      root.querySelectorAll(".look").forEach(b => b.onclick = () => {
        Sfx.tap(); look = +b.dataset.v;
        root.querySelectorAll(".look").forEach(x => x.classList.toggle("on", x === b));
      });
      const go = () => {
        Sfx.unlock(); Sfx.tap();
        S.firm = (root.querySelector("#fn").value || "").trim() || "Feline Investments";
        if (!rename) S.ceoLook = look;
        const first = !S.started; S.started = true;
        save(); hud(); refreshScene(true); delete modal.dataset.lock; closeWin();
        if (first) hireWin(true);
      };
      root.querySelector("#go").onclick = go;
      root.querySelector("#fn").addEventListener("keydown", e => { if (e.key === "Enter") go(); });
      const x = root.querySelector("#x"); if (x) x.onclick = () => { Sfx.tap(); closeWin(); };
    });
  }

  function morning(force) {
    rollDay();
    const d = today();
    if (!force && S.lastDay === d) return;
    const firstEver = S.lastDay === null;
    S.lastDay = d; save();
    const tt = totals();
    const sleepy = staffedTopics().filter(tp => moodFor(tp) === "sleepy").map(tp => topic(tp).name);
    const nl = staffedTopics().reduce((a, tp) => a + remainingNew(tp), 0);
    setTimeout(() => { Scene.staffSay(-1, "Morning!", 1800); S.staff.forEach((s, i) => setTimeout(() => Scene.staffSay(i, "Morning!", 1400), 300 + i * 250)); }, 300);
    if (firstEver) return;
    const dl = daysLeft();
    let interest = 0;
    if (hasGear("open-vault")) { interest = Math.min(5000, Math.round(S.cash * 0.02)); S.cash += interest; save(); hud(); }
    openWin(`<div class="win"><div class="head"><span>Morning report</span><small>${dl > 0 ? "D-" + dl : ""}</small></div>
      <div class="body"><div class="vault"><img src="${Sprites.url(tt.due ? "locked-vault" : "open-vault", 2)}" alt=""><div>${tt.due ? `Clear today's ${tt.due} review${tt.due > 1 ? "s" : ""} to open the vault.` : "Vault open. No reviews due!"}</div></div>
        <div class="kv"><span>Reviews due</span><span style="color:var(--red)">${tt.due}</span><span>New concepts waiting</span><span>${nl}</span><span>Pitch Day</span><span>${pitchesLeft() ? "Ready" : "Done"}</span><span>AUM</span><span>${money(S.aum)}</span>${interest ? `<span>Vault interest</span><span>+${money(interest)}</span>` : ""}</div>
        ${sleepy.length ? `<div class="note" style="color:var(--red)">😴 The ${esc(sleepy.join(", "))} desk is sleepy. Clear its reviews to wake it up.</div>` : `<div class="note">Everyone is sharp today.</div>`}
      </div>
      <div class="foot"><button id="x" class="primary">Let's go</button></div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.unlock(); Sfx.tap(); closeWin(); };
    });
  }

  // ---------- wire up ----------
  Promise.all([Sprites.load(), Store.init(), Reminders.init()]).then(async () => {
    // on claude.ai, use whichever save is newer: this device's or the cloud's
    const cloud = await Store.loadCloud();
    if (cloud && (!S.updatedAt || (cloud.updatedAt || 0) > S.updatedAt)) S = migrate(cloud);
    else if (Store.cloud && S.started) save();
    boot();
  });
  function boot() {
    const setBar = () => document.documentElement.style.setProperty("--topbar-h", $("topbar").getBoundingClientRect().bottom + "px");
    setBar(); window.addEventListener("resize", setBar);
    Feedback.init({ context: () => ({ question: CTX.question, office: Scene.LAYOUTS[S.office].name, deals: S.deals, cash: S.cash, staff: S.staff.length, tombstones: tombCount(), daysLeft: daysLeft(), build: "2026-10-25a" }) });
    Scene.init({ wrap: $("scene"), canvas: $("canvas"), overlay: $("overlay"), onStaffTap: staffWin, onCeoTap: ceoWin, bottomInset: () => $("stats").offsetHeight + 12 });
    Sfx.setMuted(S.muted);
    refreshScene(true);
    hud();
    $("btn-client").onclick = () => { Sfx.tap(); nextClient(); };
    $("btn-hire").onclick = () => { Sfx.tap(); hireWin(); };
    $("btn-office").onclick = () => { Sfx.tap(); officeWin(); };
    $("btn-library").onclick = () => libraryWin();
    $("btn-menu").onclick = () => { Sfx.tap(); menuWin(); };
    $("btn-pitch").onclick = () => { Sfx.tap(); pitchWin(); };
    $("sound").onclick = () => { S.muted = !S.muted; Sfx.setMuted(S.muted); save(); hud(); Sfx.unlock(); Sfx.tap(); };
    if (!S.started) introWin(false);
    else if (!S.staff.length) hireWin(true);
    else morning(false);
    setInterval(() => { hud(); refreshScene(false); }, 60000);
    document.addEventListener("visibilitychange", () => { if (!document.hidden) { hud(); refreshScene(false); morning(false); } });
  }

  window.__game = { get S() { return S; }, pickPitch, pitchesLeft, ITEMS, pickDeal, buildDeal, grade, totals, topicStats, openSeats, EXAM_DAY };
})();
