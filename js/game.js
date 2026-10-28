// Feline Investments — game logic, spaced repetition, economy and windows.
(function () {
  // every topic file registers itself; Equity came first as window.CONTENT
  const TC = Object.assign({ equity: window.CONTENT }, window.TOPIC_CONTENT || {});

  // ---------- calendar ----------
  // a game day runs from 4 AM to 4 AM, so late-night study doesn't roll straight into "tomorrow"
  const DAY_START_H = 4;
  const dayNum = d => Math.floor((d.getTime() - d.getTimezoneOffset() * 60000 - DAY_START_H * 3600000) / 86400000);
  function today() { return dayNum(new Date()); }
  const EXAM_DAY = dayNum(new Date(2026, 10, 15, 12)); // 15 November 2026

  // ---------- tuning ----------
  const INTERVALS = [1, 2, 4, 7, 12];   // days for boxes 1..5, short enough to cycle several times before the exam
  const MASTER_BOX = 2;                  // learned = right once; mastered = right again at a later day's review
  const RELEARN_GAP = 5;
  const MIN_GAP_MS = 12 * 3600000;       // a concept answered right never comes back as a review sooner than this                 // a missed concept waits at least this many calls before coming back
  const MAX_SHAKY = 8;                   // no daily cap: new concepts keep coming while fewer than this many misses wait for a retest
  const OFFICES = [
    { cap: 3,  level: 1,  cost: 0 },
    { cap: 6,  level: 4,  cost: 20000 },
    { cap: 10, level: 9,  cost: 60000 },
    { cap: 16, level: 15, cost: 150000 }
  ];
  // ---------- firm XP and levels (1 to 20) ----------
  const MAX_LEVEL = 20;
  const XP = { call: 10, review: 15, practice: 4, mastery: 40, pitch: 30, tombstone: 100 };
  const LEVEL_FEE = 0.03;                                   // +3% fees per level above 1
  // XP needed to reach each level (cumulative): grows about 22% per level
  const LEVEL_XP = [0, 0];
  for (let L = 2; L <= MAX_LEVEL; L++) LEVEL_XP[L] = LEVEL_XP[L - 1] + Math.round(150 * Math.pow(1.22, L - 2) / 10) * 10;
  const SEAT_UNLOCK = [0, 0.3, 0.6];     // share of a topic's concepts introduced before seat 2 / 3 opens
  const BASE_FEE = { term: 500, rterm: 600, formula: 800, rformula: 700, rule: 700 };
  const AUM_PER_FEE = 40;

  // ---------- topics and staff ----------
  // One employee type per CFA topic. Bigger topics get up to 3 analysts, the rest 2.
  const TOPICS = [
    { id: "ethics", name: "Ethics",                       species: "owl",    max: 3 },
    { id: "quant",  name: "Quantitative Methods",         species: "rabbit", max: 2 },
    { id: "econ",   name: "Economics",                    species: "dove",   max: 2 },
    { id: "fsa",    name: "Financial Statement Analysis", species: "wolf",   max: 3, short: "FSA" },
    { id: "corp",   name: "Corporate Issuers",            species: "lion",   max: 2 },
    { id: "equity", name: "Equity",                       species: "bull",   max: 3, short: "Equity" },
    { id: "fi",     name: "Fixed Income",                 species: "turtle", max: 3 },
    { id: "deriv",  name: "Derivatives",                  species: "fox",    max: 2 },
    { id: "alts",   name: "Alternative Investments",      species: "horse",  max: 2 },
    { id: "pm",     name: "Portfolio Management",         species: "bear",   max: 2 }
  ];
  TOPICS.forEach(t => { t.live = !!TC[t.id]; t.short = t.short || t.name; });
  const topic = id => TOPICS.find(t => t.id === id);
  const LIVE = TOPICS.filter(t => t.live).map(t => t.id);
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
    { tombs: 0, sprite: "crystal-championship-trophy", name: "Crystal trophy", effect: "Every question proven. Legend status." }
  ];
  const PITCH_LEN = 5;
  const CHEERS = ["Deal closed!", "Well done.", "Nailed it!", "Client signed!", "Smooth.", "Easy money."];
  const OOPS = ["Lost that one...", "Hmm, not quite.", "Client walked."];

  // ---------- items: terms and formulas only (the question bank is its own side game) ----------
  // Module keys are "topic:number" so module 2 of Equity and module 2 of FSA never mix.
  const ITEMS = {}, MODS = {}, QUESTIONS = [], TOPIC_ITEMS = {}, NEW_ORDER = {};
  const mkey = (tp, m) => tp + ":" + m;
  LIVE.forEach(tp => {
    const C = TC[tp];
    C.modules.forEach(m => MODS[mkey(tp, m.id)] = Object.assign({}, m, { tp, key: mkey(tp, m.id) }));
    C.terms.forEach(t => ITEMS[t.id] = { id: t.id, m: t.m, mk: mkey(tp, t.m), topic: tp, kind: "term", src: t });
    C.formulas.forEach(f => ITEMS[f.id] = { id: f.id, m: f.m, mk: mkey(tp, f.m), topic: tp, kind: "formula", src: f });
    (C.rules || []).forEach(r => ITEMS[r.id] = { id: r.id, m: r.m, mk: mkey(tp, r.m), topic: tp, kind: "rule", src: r });
    C.questions.forEach(q => QUESTIONS.push(Object.assign({ tp, mk: mkey(tp, q.m) }, q)));
    // new concepts per topic, module by module: term, term, rule, formula ... (easy first)
    NEW_ORDER[tp] = [];
    const PAT = ["t", "t", "r", "f"];
    C.modules.slice().sort((a, b) => a.id - b.id).forEach(mod => {
      const pools = {
        t: C.terms.filter(t => t.m === mod.id).map(t => t.id),
        r: (C.rules || []).filter(r => r.m === mod.id).map(r => r.id),
        f: C.formulas.filter(f => f.m === mod.id).map(f => f.id)
      };
      let i = 0;
      while (pools.t.length || pools.r.length || pools.f.length) {
        let k = PAT[i++ % PAT.length];
        if (!pools[k].length) k = ["t", "r", "f"].find(x => pools[x].length);
        NEW_ORDER[tp].push(pools[k].shift());
      }
    });
  });
  Object.values(ITEMS).forEach(i => (TOPIC_ITEMS[i.topic] = TOPIC_ITEMS[i.topic] || []).push(i.id));
  const TOTAL_ITEMS = Object.keys(ITEMS).length;
  GEAR[GEAR.length - 1].tombs = QUESTIONS.length;
  const qById = id => QUESTIONS.find(q => q.id === id);
  const topicMods = tp => Object.values(MODS).filter(M => M.tp === tp).sort((a, b) => a.id - b.id);

  // ---------- memory model (FSRS) ----------
  // Every concept you've seen has a stability S (days until recall drops to 90%) and a difficulty D.
  // Recall fades along the FSRS forgetting curve; reviewing as it nears 90% strengthens it the most.
  // Formulas and default weights from FSRS (open-spaced-repetition), as used by Anki.
  const FS = { F: 19 / 81, C: -0.5, W: [0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046, 1.54575, 0.1192, 1.01925, 1.9395, 0.11, 0.29605, 2.2698, 0.2315, 2.9898, 0.51655, 0.6621] };
  const DAY_MS = 86400000;
  const EXAM_AT = new Date(2026, 10, 15, 9).getTime();     // exam morning
  const recall = (days, S) => Math.pow(1 + FS.F * Math.max(0, days) / S, FS.C);
  const clampD = x => Math.min(10, Math.max(1, x));
  const initD = g => clampD(FS.W[4] - Math.exp(FS.W[5] * (g - 1)) + 1);   // g: 1 = missed, 3 = right
  function memUpdate(s, correct, now) {
    const W = FS.W, g = correct ? 3 : 1;
    if (!s.S) { s.S = W[g - 1]; s.D = initD(g); s.last = now; return; }
    const days = (now - (s.last || now)) / DAY_MS, R = recall(days, s.S);
    const dD = -W[6] * (g - 3);
    s.D = clampD(W[7] * initD(4) + (1 - W[7]) * (s.D + dD * (10 - s.D) / 9));
    if (days < 0.5) s.S = s.S * Math.exp(W[17] * (g - 3 + W[18]));                          // same sitting
    else if (correct) s.S = s.S * (1 + Math.exp(W[8]) * (11 - s.D) * Math.pow(s.S, -W[9]) * (Math.exp(W[10] * (1 - R)) - 1));
    else s.S = Math.min(s.S, W[11] * Math.pow(s.D, -W[12]) * (Math.pow(s.S + 1, W[13]) - 1) * Math.exp(W[14] * (1 - R)));
    s.S = Math.max(0.1, s.S); s.last = now;
  }
  // recall chance now (0..1), or null for concepts not seen yet
  function memNow(id, now = Date.now()) { const s = S.items[id]; return s && s.S ? recall((now - s.last) / DAY_MS, s.S) : null; }
  const memExam = id => memNow(id, Math.max(Date.now(), EXAM_AT));
  const memBand = r => r == null ? "unseen" : r >= 0.9 ? "fresh" : r >= 0.7 ? "fading" : "faded";
  // older saves have no stability yet: rebuild it from the box level, as if reviewed at the old gaps
  function seedMemory(st) {
    if (st.S || !st.n) return;
    let S0 = st.ok ? FS.W[2] : FS.W[0], D = clampD(initD(st.ok ? 3 : 1) + 0.8 * Math.min(st.bad || 0, 3));
    for (let k = 2; k <= (st.b || 0); k++) S0 = S0 * (1 + Math.exp(FS.W[8]) * (11 - D) * Math.pow(S0, -FS.W[9]) * (Math.exp(FS.W[10] * (1 - recall(INTERVALS[k - 2], S0))) - 1));
    if (st.flipTo) S0 = Math.min(S0, FS.W[0]);
    st.S = S0; st.D = D;
    st.last = st.at || (st.upDay != null ? (st.upDay * DAY_MS + (DAY_START_H + 8) * 3600000 + new Date().getTimezoneOffset() * 60000) : Date.now());
  }

  // ---------- state ----------
  function freshState() {
    return {
      v: 2, firm: "", started: false, ceoLook: 0,
      cash: 0, aum: 100000, office: 0, deals: 0,
      staff: [], items: {}, streak: {}, recent: [], rr: {},
      newDay: today(), newCount: {}, newCap: 12,
      lastDay: null, muted: false,
      pitch: { day: null, runs: 0, q: {}, tombs: [] },
      study: {},                                                      // Need to study ledger: id -> entry
      xp: 0, level: 1,
      bestCombo: 0, ambient: true
    };
  }
  // Saves are upgraded in place, never wiped: new fields get defaults, old progress stays.
  const SAVE_VERSION = 4;
  function migrate(old) {
    if (!old || typeof old !== "object") return freshState();
    const S = Object.assign(freshState(), old);
    S.pitch = Object.assign({ day: null, runs: 0, q: {}, tombs: [] }, old.pitch || {});
    if (!S.study || typeof S.study !== "object") S.study = {};
    if (typeof old.xp !== "number") {                     // one-time XP for progress made before levels existed
      let xp = 0;
      Object.values(S.items).forEach(it => { xp += (it.ok || 0) * XP.call; if ((it.b || 0) >= 2) xp += XP.mastery; });
      Object.values(S.pitch.q || {}).forEach(q => { xp += (q.okDays || []).length * XP.pitch; });
      xp += (S.pitch.tombs || []).length * XP.tombstone;
      S.xp = xp;
    }
    S.level = levelFor(S.xp);
    ["items", "streak", "rr", "newCount"].forEach(k => { if (!S[k] || typeof S[k] !== "object") S[k] = {}; });
    if (!Array.isArray(S.staff)) S.staff = [];
    if (!Array.isArray(S.recent)) S.recent = [];
    if (!VARIANTS.includes(S.ceoLook)) S.ceoLook = 0;                       // head-only look retired
    S.staff.forEach(st => { if (!VARIANTS.includes(st.v)) {
      const free = VARIANTS.find(v => !S.staff.some(o => o !== st && o.topic === st.topic && o.v === v));
      st.v = free == null ? 0 : free;
    } });
    Object.values(S.items).forEach(seedMemory);
    // single-module focus became a set of modules you can pick
    if (!Array.isArray(S.focusSet)) S.focusSet = Object.entries(S.focus || {}).filter(([, m]) => m).map(([tp, m]) => tp + ":" + m);
    delete S.focus;
    S.v = SAVE_VERSION;
    return S;
  }
  let S = migrate(Store.readLocal());
  function save() { Store.save(S); if (window.Reminders) Reminders.writeSummary(reminderSummary()); }
  function reminderSummary() {
    const live = staffedTopics(), dueByDay = {};
    const cov = covering();
    Object.entries(S.items).forEach(([id, st]) => {
      const it = ITEMS[id];
      if (!it || !live.includes(it.topic) || S.study[id]) return;
      if (!st.flipTo && (cov[it.mk] !== undefined ? cov[it.mk] : cov[it.topic])) return;   // held until the topic is covered
      dueByDay[st.due] = (dueByDay[st.due] || 0) + 1;
    });
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
  const mod = key => MODS[key] || MODS[mkey("equity", key)];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const $ = id => document.getElementById(id);
  const team = tp => S.staff.filter(s => s.topic === tp);
  const staffedTopics = () => [...new Set(S.staff.map(s => s.topic))];
  function rollDay() { const d = today(); if (S.newDay !== d) { S.newDay = d; S.newCount = {}; } }
  function daysLeft() { return EXAM_DAY - today(); }
  const tombCount = () => S.pitch.tombs.length;
  function levelFor(xp) { let L = 1; while (L < MAX_LEVEL && xp >= LEVEL_XP[L + 1]) L++; return L; }
  function levelProgress() {
    if (S.level >= MAX_LEVEL) return 1;
    return (S.xp - LEVEL_XP[S.level]) / (LEVEL_XP[S.level + 1] - LEVEL_XP[S.level]);
  }
  // add XP, float it over the office, and celebrate any level-ups
  function gainXP(n, where) {
    if (!n) return;
    S.xp += n;
    if (where != null) Scene.xpFloat(where, "+" + n + " XP");
    const before = S.level, now = levelFor(S.xp);
    if (now > before) {
      S.level = now;
      const office = OFFICES.findIndex(o => o.level === now);
      setTimeout(() => {
        Sfx.levelUp(); Scene.cheer(); Scene.staffSay(-1, "Level " + now + "!", 1800);
        toast(`⭐ Firm level ${now}! Fees +${Math.round(LEVEL_FEE * 100)}%.` + (office > 0 ? ` The ${Scene.LAYOUTS[office].name} is unlocked. Open Office.` : ""), "gold");
      }, 600);
    }
  }
  const hasGear = sprite => GEAR.some(g => g.sprite === sprite && tombCount() >= g.tombs);

  // ---------- spaced repetition ----------
  // where a concept stands: unseen, study (you said you don't know it), shaky (missed, waiting for a
  // retest), learned (right once), mastered (right again at a later day's review)
  function status(id) {
    if (S.study[id]) return "study";
    const s = S.items[id];
    if (!s) return "unseen";
    if (s.flipTo || !s.ok) return "shaky";
    return s.b >= MASTER_BOX ? "mastered" : "learned";
  }
  // Coverage first: a topic's scheduled reviews wait until every concept in it has been seen.
  // Missed concepts (and ones you marked Studied it) still come back for their retest.
  // Focused modules skip this rule: focusing is your call.
  function covering() {
    const out = {};
    LIVE.forEach(tp => { out[tp] = remainingNew(tp) > 0; });
    return out;
  }
  // modules you chose to focus on (any topics), limited to desks you have staffed
  const focusKeys = () => (S.focusSet || []).filter(k => MODS[k] && staffedTopics().includes(MODS[k].tp));
  const isFocusKey = k => (S.focusSet || []).includes(k);
  // is this concept a review that is due right now?
  function isDue(id, cov, d) {
    const s = S.items[id];
    if (!s || S.study[id] || s.due > d) return false;
    if (s.flipTo) return true;                                         // a retest after a miss
    if (cov[ITEMS[id].topic]) return false;                           // still covering this topic
    return !(s.at && Date.now() - s.at < MIN_GAP_MS);
  }
  function statsOf(ids) {
    const d = today(), cov = covering(), now = Date.now();
    const r = { total: ids.length, intro: 0, due: 0, overdue: 0, tomorrow: 0, held: 0, unseen: 0, study: 0, shaky: 0, learned: 0, mastered: 0,
      mem: null, exam: null, fresh: 0, fading: 0, faded: 0 };
    let mSum = 0, eSum = 0, mN = 0;
    ids.forEach(id => {
      const st = status(id);
      r[st]++;
      const s = S.items[id];
      if (s) r.intro++;
      const m = memNow(id, now);
      if (m != null) { mSum += m; eSum += memExam(id); mN++; r[memBand(m)]++; }
      if (!s || st === "study") return;                  // studying items are paused: never due or overdue
      if (isDue(id, cov, d)) { r.due++; if (s.due < d) r.overdue++; }
      else if (s.due <= d) r.held++;                     // scheduled, but waiting for coverage (or the 12-hour gap)
      else if (s.due === d + 1) r.tomorrow++;
    });
    if (mN) { r.mem = mSum / mN; r.exam = eSum / mN; }
    return r;
  }
  const topicStats = tp => statsOf(TOPIC_ITEMS[tp] || []);
  const moduleStats = key => statsOf(Object.values(ITEMS).filter(i => i.mk === key).map(i => i.id));
  function totals() {
    const live = staffedTopics();
    const all = statsOf(Object.keys(ITEMS));
    const act = statsOf(Object.keys(ITEMS).filter(id => live.includes(ITEMS[id].topic)));
    return { mastered: all.mastered, intro: all.intro, due: act.due, tomorrow: act.tomorrow };
  }
  // shaky = missed concepts still waiting for their retest today
  function shaky(tp) { const d = today(); return (TOPIC_ITEMS[tp] || []).filter(id => { const st = S.items[id]; return st && st.flipTo && !st.studied && st.due <= d; }).length; }
  function canIntroduce(tp) { return shaky(tp) < MAX_SHAKY; }
  const isNew = id => !S.items[id] && !S.study[id];
  function remainingNew(tp) { return (NEW_ORDER[tp] || []).filter(isNew).length; }
  const nextNew = (tp, keys) => (NEW_ORDER[tp] || []).find(x => isNew(x) && (!keys || keys.includes(ITEMS[x].mk)));
  const pickOne = a => a[Math.floor(Math.random() * a.length)];
  // the weakest memory first; a concept is only a real review once recall is below 90%
  function weakest(pool) {
    const now = Date.now();
    const scored = pool.map(id => [id, memNow(id, now) ?? 0]).sort((a, b) => a[1] - b[1]);
    const low = scored.slice(0, Math.max(1, Math.min(3, scored.length)));         // a little variety among the weakest
    const [id, r] = pickOne(low);
    return { id, mode: r < 0.9 ? "due" : "practice" };
  }

  function pickDeal(onlyTopic) {
    rollDay();
    const d = today(), cov = covering();
    const live = onlyTopic ? [onlyTopic] : staffedTopics();
    const unlocked = id => !(S.items[id].lock > S.deals);
    const fresh = id => !S.recent.includes(id);
    const seen = id => S.items[id] && !S.study[id];
    // ---- Focus: only the chosen modules. Retests, then anything unseen, then the most faded.
    const fk = focusKeys().filter(k => live.includes(MODS[k].tp));
    if (fk.length) {
      const inF = id => ITEMS[id] && fk.includes(ITEMS[id].mk);
      const ids = Object.keys(ITEMS).filter(inF);
      const retest = ids.filter(id => seen(id) && S.items[id].flipTo && S.items[id].due <= d && unlocked(id));
      if (retest.length) return { id: pickOne(retest.filter(fresh).length ? retest.filter(fresh) : retest), mode: "due" };
      const tps = [...new Set(fk.map(k => MODS[k].tp))].filter(tp => canIntroduce(tp) && nextNew(tp, fk));
      if (tps.length) { const tp = pickOne(tps); return { id: nextNew(tp, fk), mode: "new" }; }
      let pool = ids.filter(id => seen(id) && unlocked(id) && fresh(id));
      if (!pool.length) pool = ids.filter(id => seen(id) && unlocked(id));
      if (!pool.length) pool = ids.filter(seen);
      if (pool.length) return weakest(pool);
    }
    // ---- Normal mix
    const ok = id => ITEMS[id] && live.includes(ITEMS[id].topic) && !S.study[id];
    const due = Object.keys(S.items).filter(id => ok(id) && isDue(id, cov, d) && unlocked(id));
    if (due.length) {
      let pool = due.filter(fresh); if (!pool.length) pool = due;
      const retest = pool.filter(id => S.items[id].flipTo);
      if (retest.length) return { id: pickOne(retest), mode: "due" };
      return Object.assign(weakest(pool), { mode: "due" });
    }
    const withNew = live.filter(tp => canIntroduce(tp) && nextNew(tp))
      .sort((a, b) => topicStats(a).intro / topicStats(a).total - topicStats(b).intro / topicStats(b).total);
    if (withNew.length) return { id: nextNew(withNew[0]), mode: "new" };
    // nothing due or new: extra practice on the most faded concepts (still respecting the relearn gap)
    let pool = Object.keys(S.items).filter(id => ok(id) && unlocked(id) && fresh(id));
    if (!pool.length) pool = Object.keys(S.items).filter(id => ok(id) && unlocked(id));
    if (!pool.length) pool = Object.keys(S.items).filter(ok);
    if (!pool.length) return null;
    return Object.assign(weakest(pool), { mode: "practice" });
  }

  function grade(deal, correct) {
    const id = deal.id, d = today();
    let s = S.items[id];
    const was = s ? s.b : 0;
    if (!s) { s = S.items[id] = { b: 0, due: d, n: 0, ok: 0, bad: 0 }; S.newCount[ITEMS[id].topic] = (S.newCount[ITEMS[id].topic] || 0) + 1; }
    seedMemory(s);                                        // older concepts get a stability first (new ones have n = 0)
    s.n++;
    memUpdate(s, correct, Date.now());
    if (correct) {
      s.ok++; delete s.flipTo; delete s.lock; delete s.studied;
      s.at = Date.now();
      if (deal.mode !== "practice") {
        if (s.upDay === d || s.missDay === d) s.b = Math.max(s.b, 1);   // same-day retests only count as learned
        else s.b = Math.min(5, s.b + 1);
        s.upDay = d;
      }
      // next review when recall is due to fall to 90% (that's S days), never past exam day
      let due = d + Math.max(1, Math.round(s.S));
      if (d < EXAM_DAY) due = Math.max(d + 1, Math.min(due, EXAM_DAY));
      s.due = due;
    } else {
      s.bad++; s.b = 0; s.due = d; s.missDay = d; delete s.at;     // a miss starts it over: next right answer = learned
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
    return topicMods(tp).filter(M => { const st = moduleStats(M.key); return st.total && st.mastered / st.total >= 0.8; }).length;
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

  // wrong options: same look-alike group first (including file-named decoys), then same module, then anything
  function termOptions(tp, t, count) {
    const C = TC[tp];
    const decoys = (C.decoyTerms || []).filter(d => d.g === t.g && d.m === t.m).map(d => ({ term: d.term, g: d.g, m: d.m, decoy: true }));
    const real = pickDistractors(C.terms, t, count, x => x.term);
    const sameReal = real.filter(x => x.g === t.g);
    const pool = shuffle(sameReal.concat(decoys));
    const out = pool.slice(0, count);
    real.forEach(x => { if (out.length < count && !out.includes(x)) out.push(x); });
    return out;
  }
  function formulaOptions(tp, f, count) {
    const C = TC[tp];
    const traps = (C.decoyFormulas || []).filter(d => d.for === f.id).map(d => ({ formula: d.formula, decoy: true }));
    const real = pickDistractors(C.formulas, f, count, x => x.formula).filter(x => x.formula !== f.formula);
    const out = shuffle(traps).slice(0, Math.min(2, count));
    real.forEach(x => { if (out.length < count && !out.some(o => o.formula === x.formula)) out.push(x); });
    return out;
  }

  function buildDeal(pick) {
    const it = ITEMS[pick.id];
    const s = S.items[pick.id];
    const box = s ? s.b : 0;
    const forced = s && s.flipTo;
    const C = TC[it.topic];
    const base = { id: it.id, m: it.m, mk: it.mk, topic: it.topic, mode: pick.mode, retest: !!forced };
    // a rule card is a hand-written question: its wrong answers come with it, and it is never flipped
    if (it.kind === "rule") {
      const r = it.src;
      return { ...base, reverse: false, type: "rule", label: "Client question", ask: "Pick the right answer.", prompt: esc(r.q),
        why: esc(r.q) + " <b>" + esc(r.a) + "</b>",
        opts: shuffle([{ text: r.a, right: true }, ...r.x.map(t => ({ text: t, right: false }))]) };
    }
    if (it.kind === "term") {
      const t = it.src;
      const reverse = forced ? forced === "reverse" : box >= 2 && Math.random() < 0.5;
      const ds = reverse ? pickDistractors(C.terms, t, 2, x => x.def) : termOptions(it.topic, t, 3);
      const why = "<b>" + esc(t.term) + "</b>: " + esc(t.def);
      if (reverse) return { ...base, reverse, type: "rterm", label: "Define it", ask: "Which definition fits this term?", prompt: "<b>" + esc(t.term) + "</b>", why,
        opts: shuffle([{ text: t.def, right: true }, ...ds.map(x => ({ text: x.def, right: false }))]) };
      return { ...base, reverse, type: "term", label: "Name the term", ask: "Which term is the client describing?", prompt: esc(t.def), why,
        opts: shuffle([{ text: t.term, right: true }, ...ds.map(x => ({ text: x.term, right: false }))]) };
    }
    const f = it.src;
    const reverse = forced ? forced === "reverse" : box >= 2 && Math.random() < 0.4;
    const ds = reverse ? pickDistractors(C.formulas, f, 3, x => x.name) : formulaOptions(it.topic, f, 3);
    const why = "<b>" + esc(f.name) + "</b> = " + esc(f.formula);
    if (reverse) return { ...base, reverse, type: "rformula", label: "Read the formula", ask: "What does this formula calculate?", prompt: "<span class='formula'>" + esc(f.formula) + "</span>", why,
      opts: shuffle([{ text: f.name, right: true }, ...ds.map(x => ({ text: x.name, right: false }))]) };
    return { ...base, reverse, type: "formula", label: "Pick the formula", ask: "Which formula gives this?", prompt: "<b>" + esc(f.name) + "</b>", why,
      opts: shuffle([{ text: f.formula, right: true }, ...ds.map(x => ({ text: x.formula, right: false }))]) };
  }

  function feeFor(deal, boxBefore) {
    const tb = teamBonus(deal.topic);
    let fee = BASE_FEE[deal.type] * (1 + 0.25 * S.office) * (1 + LEVEL_FEE * (S.level - 1)) * (1 + 0.1 * boxBefore) * (1 + 0.05 * tb.s) * (1 + 0.05 * skillsUnlocked(deal.topic));
    const mood = moodFor(deal.topic);
    if (mood === "fire") fee *= 1.4 + 0.03 * tb.d;
    if (mood === "sleepy") fee *= 0.5;
    if (deal.mode === "due") fee *= 1.2;
    if (deal.mode === "practice") fee *= 0.4;
    if (hasGear("financial-calculator") && (deal.type === "formula" || deal.type === "rformula")) fee *= 1.1;
    if (hasGear("multi-monitor-terminal")) fee *= 1.15;
    fee *= comboMult();
    return Math.round(fee / 10) * 10;
  }
  const aumFor = (deal, fee) => Math.round(fee * AUM_PER_FEE * (1 + 0.06 * teamBonus(deal.topic).n) * (hasGear("analyst-briefcase") ? 1.1 : 1));

  // ---------- combo: right answers in a row ----------
  // Every right answer (client calls, Pitch Day, walk-up tasks) adds one; a miss quietly resets it.
  // Fees grow 10% per step, up to double at 10 in a row. The deal bell rings at 5, the office cheers every 10.
  let combo = 0, toldBest = false;
  const comboMult = () => 1 + 0.1 * Math.min(combo, 10);
  function showCombo(bump) {
    const el = $("combo"); if (!el) return;
    if (combo < 2) { el.classList.add("hidden"); return; }
    el.className = (combo >= 10 ? "blaze" : combo >= 5 ? "hot" : "") + (bump ? " bump" : "");
    el.innerHTML = `🔥 ${combo}<small>in a row · fees ×${comboMult().toFixed(1)}</small>`;
    if (bump) setTimeout(() => el.classList.remove("bump"), 300);
  }
  function comboHit() {
    combo++;
    setTimeout(() => Sfx.combo(combo), 160);
    showCombo(true);
    if (combo === 5) setTimeout(() => { Sfx.bell(); Scene.tickerFlash("🔔 DEAL BELL · 5 IN A ROW · " + (S.firm || "FELINE INVESTMENTS").toUpperCase()); toast("🔔 Deal bell! 5 in a row. Fees ×1.5 now.", "gold"); }, 450);
    if (combo >= 10 && combo % 10 === 0) setTimeout(() => { Scene.cheer(); Sfx.cheer(); toast(`🎉 ${combo} in a row! The whole floor is cheering.`, "gold"); }, 450);
    if (combo > (S.bestCombo || 0)) {
      const was = S.bestCombo || 0; S.bestCombo = combo;
      if (!toldBest && was >= 3 && combo > was) { toldBest = true; setTimeout(() => { Sfx.congrats(); toast(`🏆 New best streak: ${combo}!`, "gold"); }, 900); }
    }
    updateTicker();
  }
  function comboMiss() { combo = 0; showCombo(false); }

  // ---------- money you can see: coins fly to the cash counter, which rolls up ----------
  let dispCash = S.cash, rolling = false;
  function payout(si, amount) {
    const to = $("cash").getBoundingClientRect(), from = Scene.staffPoint(si);
    rolling = true;                                   // hold the counter until the coins land
    const n = Math.min(10, 3 + Math.floor(amount / 600));
    for (let k = 0; k < n; k++) {
      const c = document.createElement("div"); c.className = "flycoin";
      c.style.left = (from.x + (Math.random() - 0.5) * 24) + "px"; c.style.top = (from.y + (Math.random() - 0.5) * 16) + "px";
      document.body.appendChild(c);
      setTimeout(() => {
        c.style.transform = `translate(${to.left + to.width - 14 - parseFloat(c.style.left)}px, ${to.top + to.height / 2 - parseFloat(c.style.top)}px) scale(0.7)`;
        c.style.opacity = "0.2";
      }, 30 + k * 45);
      setTimeout(() => c.remove(), 800 + k * 45);
    }
    setTimeout(rollCash, 650);
  }
  function rollCash() {
    const start = dispCash, end = S.cash, t0 = performance.now(), el = $("cash");
    if (start === end) { rolling = false; return; }
    rolling = true; el.classList.add("pulse"); setTimeout(() => el.classList.remove("pulse"), 360);
    const step = now => {
      const k = Math.min(1, (now - t0) / 650), e = 1 - Math.pow(1 - k, 3);
      dispCash = Math.round(start + (end - start) * e);
      el.textContent = money(dispCash);
      if (k < 1) requestAnimationFrame(step); else { rolling = false; dispCash = S.cash; el.textContent = money(dispCash); }
    };
    requestAnimationFrame(step);
  }

  // ---------- the wall ticker ----------
  // Market names drift on their own (scenery). Your firm's ticker tracks real progress:
  // AUM grown this session, plus a bump for the current streak.
  const sessionAum = S.aum;
  const MARKET = [["BAMB", 42.1], ["TALL", 118.4], ["NITE", 23.9], ["FLOK", 77.2], ["BULL", 64.5], ["WOLF", 51.3], ["OWLY", 33.8], ["TRTL", 19.6], ["FOXX", 88.0], ["HRSE", 45.2]]
    .map(([sym, px]) => ({ sym, px, ch: (Math.random() - 0.45) * 3 }));
  function firmSym() {
    const w = (S.firm || "Feline Investments").toUpperCase().replace(/[^A-Z ]/g, "").split(/\s+/).filter(Boolean);
    if (w.join(" ") === "FELINE INVESTMENTS" || !w.length) return "FELN";
    return (w.length > 1 ? w[0].slice(0, 3) + w[1][0] : w[0]).slice(0, 4);
  }
  function updateTicker() {
    MARKET.forEach(m => { const d = (Math.random() - 0.48) * 0.8; m.ch = Math.max(-6, Math.min(6, m.ch + d)); m.px = Math.max(1, m.px * (1 + d / 100)); });
    const ch = (S.aum - sessionAum) / Math.max(1, sessionAum) * 100 + combo * 0.4;
    const mine = { sym: firmSym(), px: 10 + S.aum / 1e6, ch, mine: true };
    Scene.setTicker([mine, ...MARKET.slice(0, 5), mine, ...MARKET.slice(5)]);
  }

  // ---------- walk-ups: an analyst comes to your desk with a quick task ----------
  // When it happens is a surprise. What it pays is fixed and shown before you start.
  let walkup = null, callsSinceWalk = 0, walkTarget = 6 + Math.floor(Math.random() * 6), lastWalkAt = Date.now(), lastDesk = -1;
  const OPENERS = [
    ["Boss! Client's on hold and I need a quick sanity check.", "Three quick ones, then I'm back on the phone."],
    ["My pension fund contact sent questions. Help me look smart?", "They like fast answers. So do I."],
    ["Three quick ones. I want this closed today.", "No pressure. Okay, a little pressure."],
    ["Sorry to bother you… could you check my work?", "I think I'm right. I'd like to be sure."]
  ];
  const archOf = st => (st.v + TOPICS.indexOf(topic(st.topic))) % ARCH.length;
  const taskPay = () => Math.round(4500 * (1 + 0.25 * S.office) * (1 + LEVEL_FEE * (S.level - 1)) / 100) * 100;
  function taskItems(tp) {
    // a topic still being covered brings new concepts; a covered topic brings your faintest memories
    if (remainingNew(tp) > 0) return (NEW_ORDER[tp] || []).filter(isNew).slice(0, 3).map(id => ({ id, mode: "new" }));
    const now = Date.now();
    const pool = (TOPIC_ITEMS[tp] || []).filter(id => { const st = S.items[id]; return st && !S.study[id] && !(st.at && now - st.at < MIN_GAP_MS); })
      .map(id => [id, memNow(id, now) ?? 0]).sort((a, b) => a[1] - b[1]).slice(0, 8);
    return shuffle(pool).slice(0, 3).map(([id, r]) => ({ id, mode: r < 0.9 ? "due" : "practice" }));
  }
  function canWalkup() {
    return !walkup && !busy && modal.classList.contains("hidden") && !document.hidden && S.staff.length > 0;
  }
  function maybeWalkup(force) {
    if (!canWalkup()) return;
    const due = force || callsSinceWalk >= walkTarget || Date.now() - lastWalkAt > 4 * 60000;
    if (!due) return;
    const free = Life.free().filter(i => S.staff[i] && taskItems(S.staff[i].topic).length >= 2);
    if (!free.length) return;
    const i = free[Math.floor(Math.random() * free.length)], st = S.staff[i];
    callsSinceWalk = 0; walkTarget = 6 + Math.floor(Math.random() * 6); lastWalkAt = Date.now();
    walkup = { i, arrived: false };
    Life.hold(i);
    Scene.walk(i, "ceo").then(() => {
      if (!walkup || walkup.i !== i) return;
      walkup.arrived = true;
      Scene.setAlert(i, true); Sfx.alert(); setTimeout(() => Sfx.walkup(), 350);
      Scene.say(i, OPENERS[archOf(st)][0], 2600);
      const co = $("callout");
      co.innerHTML = `<img src="${Sprites.cowUrl(st.species, st.v, 1)}" alt=""><span>${esc(st.name.split(" ")[0])} needs you</span>`;
      co.classList.remove("hidden");
      co.onclick = () => { Sfx.accept(); openTask(i); };
      walkup.timer = setTimeout(() => endWalkup("I'll come back later."), 90000);
    });
  }
  function endWalkup(line) {
    if (!walkup) return;
    const i = walkup.i; clearTimeout(walkup.timer); walkup = null;
    $("callout").classList.add("hidden");
    Scene.setAlert(i, false);
    if (line) Scene.say(i, line, 1500);
    setTimeout(() => Scene.goBack(i).then(() => Life.release(i)), line ? 900 : 200);
  }
  function openTask(i) {
    if (!walkup || walkup.i !== i || !walkup.arrived) return;
    clearTimeout(walkup.timer);
    $("callout").classList.add("hidden");
    Scene.setAlert(i, false);
    const st = S.staff[i], picks = taskItems(st.topic);
    if (!picks.length) { endWalkup("Never mind, sorted it."); return; }
    runTask({ i, st, deals: picks.map(p => buildDeal(p)), k: 0, right: 0, studied: 0, pay: taskPay() });
  }
  function runTask(run) {
    const deal = run.deals[run.k], st = run.st, keys = ["A", "B", "C", "D"], m = mod(deal.mk);
    modal.dataset.lock = "1";
    CTX.question = { kind: "walk-up task", itemId: deal.id, topic: deal.topic, module: deal.m, mode: deal.mode, format: deal.type, prompt: strip(deal.prompt), options: deal.opts.map(o => o.text), answer: deal.opts.find(o => o.right).text };
    const pips = run.deals.map((_, k) => `<i class="${k < run.k ? "done" : k === run.k ? "now" : ""}"></i>`).join("");
    const head = run.k === 0 ? `<div class="taskhead"><img src="${Sprites.cowUrl(st.species, st.v, 2)}" alt=""><div class="line">${esc(OPENERS[archOf(st)][0])} ${esc(OPENERS[archOf(st)][1])}</div></div>
      <div class="reward">Reward: ${money(run.pay)} and +${XP.review * 3} XP for all ${run.deals.length}. Get them all right and the deal bell rings.</div>` : "";
    openWin(`<div class="win"><div class="head"><span>${esc(st.name)}'s request</span><small>${run.k + 1} of ${run.deals.length}</small></div>
      <div class="body">${head}<div class="pips2">${pips}</div>
        <div class="pitchtop"><div><span class="tag">${esc(deal.label)}</span><span class="tag">${esc(topic(deal.topic).short)} M${m.id} ${esc(m.short)}</span></div><button id="t-idk" class="idk">📖 I don't know</button></div>
        <div class="prompt">${deal.prompt}</div><div class="ask">${esc(deal.ask.replace("the client", st.name.split(" ")[0]))}</div>
        <div class="opts">${deal.opts.map((o, k) => `<button class="opt" data-i="${k}"><span class="k">${keys[k]}</span><span>${esc(o.text)}</span></button>`).join("")}</div>
        <div id="res"></div></div>
      <div class="foot" id="dealfoot" style="display:none"><button id="nx" class="primary">${run.k + 1 < run.deals.length ? "Next" : "Wrap up"}</button></div></div>`, root => {
      const next = () => { Sfx.tap(); run.k++; if (run.k < run.deals.length) runTask(run); else taskSummary(run); };
      root.querySelector("#t-idk").onclick = () => {
        Sfx.printer();
        addStudy(deal.id, { kind: "call", tp: deal.topic, m: deal.m, format: deal.type, label: deal.label, prompt: strip(deal.prompt) });
        run.studied++;
        root.querySelectorAll(".opt, #t-idk").forEach(b => b.disabled = true);
        root.querySelector(".opts").style.display = "none"; root.querySelector(".ask").style.display = "none";
        root.querySelector("#res").innerHTML = studiedNote();
        root.querySelector("#dealfoot").style.display = "flex";
        root.querySelector("#nx").onclick = next;
        save(); hud();
      };
      root.querySelectorAll(".opt").forEach(btn => btn.onclick = () => {
        const btns = [...root.querySelectorAll(".opt")]; btns.forEach(b => b.disabled = true);
        const k = +btn.dataset.i, right = deal.opts[k].right, ri = deal.opts.findIndex(o => o.right);
        btns[ri].classList.add("right"); if (!right) btns[k].classList.add("wrong");
        btns.forEach((b, j) => { if (j !== ri && j !== k) b.classList.add("dim"); });
        grade(deal, right); S.deals++;
        if (right) { run.right++; Sfx.register(); comboHit(); gainXP(XP.review, run.i); Scene.say(run.i, "Nice.", 900); }
        else { comboMiss(); Sfx.thud(); }
        root.querySelector("#res").innerHTML = `<div class="result ${right ? "good" : "bad"}"><div class="title">${right ? "Spot on" : "Not quite"}</div><div class="why">${deal.why}</div></div>`;
        root.querySelector("#dealfoot").style.display = "flex";
        root.querySelector("#nx").onclick = next;
        root.querySelector("#res").scrollIntoView({ behavior: "smooth", block: "nearest" });
        save(); hud(); refreshScene(false);
      });
    });
  }
  function taskSummary(run) {
    CTX.question = null; delete modal.dataset.lock;
    const n = run.deals.length, answered = n - run.studied, perfect = run.right === n;
    const cash = Math.round(run.pay * run.right / n / 10) * 10, bonusXp = perfect ? XP.mastery : 0;
    S.cash += cash; if (bonusXp) gainXP(bonusXp, run.i);
    const line = perfect ? "You're the best. Closing it now!" : run.right ? "That helps a lot, thanks boss." : "Back to the books for both of us.";
    openWin(`<div class="win"><div class="head"><span>${esc(run.st.name)}</span><small>Task done</small></div>
      <div class="body"><div class="taskhead"><img src="${Sprites.cowUrl(run.st.species, run.st.v, 2)}" alt=""><div class="line">${esc(line)}</div></div>
        <div class="kv"><span>Right</span><span>${run.right} of ${answered}</span><span>Cash</span><span>+${money(cash)}</span>${bonusXp ? `<span>Perfect bonus</span><span>+${bonusXp} XP</span>` : ""}${run.studied ? `<span>Added to Need to study</span><span>${run.studied}</span>` : ""}</div></div>
      <div class="foot"><button id="x" class="primary">Back to work</button></div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); endWalkup(perfect ? "🔔" : ""); };
    });
    if (cash) payout(run.i, cash);
    if (perfect) { Sfx.taskDone(); Scene.cheer(); }
    save(); hud();
  }

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
    if (!rolling) dispCash = S.cash;
    $("cash").textContent = money(dispCash);
    $("firmname").textContent = S.firm || "Feline Investments";
    const tt = totals();
    $("s-aum").textContent = money(S.aum);
    $("s-mastered").textContent = tt.mastered + "/" + TOTAL_ITEMS;
    $("s-due").textContent = tt.due;
    const next = OFFICES[S.office + 1];
    const pct = levelProgress();
    $("s-bar").style.width = (pct * 100) + "%";
    $("s-next").textContent = S.level >= MAX_LEVEL ? `Lv ${MAX_LEVEL} · Max level` : `Lv ${S.level} · ${Math.floor(pct * 100)}%`;
    const pl = pitchesLeft();
    $("btn-pitch").classList.toggle("ready", pl > 0);
    $("btn-pitch").classList.toggle("dot", pl > 0 && !S.pitch.runs);
    const sc = studyCount();
    $("btn-library").classList.toggle("count", sc > 0);
    $("btn-library").dataset.n = sc;
    $("btn-hire").classList.toggle("dot", hireOptions().some(o => o.can));
    $("btn-office").classList.toggle("dot", !!(next && officeReady(next)));
    const nl = staffedTopics().reduce((a, tp) => a + remainingNew(tp), 0);
    let hint;
    const fkN = focusKeys().length;
    if (fkN) hint = `🎯 Focused on ${fkN} module${fkN > 1 ? "s" : ""}. Change it in the Library.`;
    else if (tt.due > 0) hint = `${tt.due} review${tt.due > 1 ? "s" : ""} due today. Clients pay more for these.`;
    else if (nl > 0) hint = `${nl} new concept${nl > 1 ? "s" : ""} to cover. Reviews start once a topic is fully seen.`;
    else hint = "All caught up! " + (tt.tomorrow ? tt.tomorrow + " due tomorrow. " : "") + "Extra calls pay less.";
    $("hint").textContent = hint;
    $("sound").classList.toggle("off", S.muted);
  }

  // ---------- the client loop ----------
  let busy = false;
  const wait = ms => new Promise(r => setTimeout(r, ms));
  let desk = null;                       // set when you take calls from one analyst; "Next client" stays on that desk
  async function nextClient(onlyTopic) {
    if (busy) return;
    desk = onlyTopic || null;
    Sfx.unlock();
    if (!S.staff.length) { hireWin(); return; }
    const pick = pickDeal(onlyTopic);
    if (!pick) { toast("No clients right now."); return; }
    busy = true; $("btn-client").disabled = true;
    const deal = buildDeal(pick);
    const t = team(deal.topic);
    S.rr[deal.topic] = ((S.rr[deal.topic] || 0) + 1) % t.length;
    const si = S.staff.indexOf(t[S.rr[deal.topic]]);
    lastDesk = si;
    Sfx.door();
    const client = CLIENTS[Math.floor(Math.random() * CLIENTS.length)];
    deal.client = client;
    Life.hold(si);
    if (Scene.isAway(si) && !(walkup && walkup.i === si)) await Scene.goBack(si);
    await Scene.clientVisit(si, client.sprite);
    Sfx.keys(5);
    await wait(250);
    showDeal(deal, si);
  }

  function showDeal(deal, si) {
    const st = S.staff[si], m = mod(deal.mk);
    const tag = deal.retest ? "<span class='tag due'>Retest</span>" : deal.mode === "new" ? "<span class='tag new'>New concept</span>" : deal.mode === "due" ? "<span class='tag due'>Review due</span>" : "<span class='tag prac'>Extra call</span>";
    const keys = ["A", "B", "C", "D"];
    modal.dataset.lock = "1";
    CTX.question = { kind: "client call", itemId: deal.id, topic: deal.topic, module: deal.m, mode: deal.mode, format: deal.type, prompt: strip(deal.prompt), options: deal.opts.map(o => o.text), answer: deal.opts.find(o => o.right).text };
    openWin(`
      <div class="win">
        <div class="head"><span>${esc(deal.label)}</span><small>${esc(st.name)}</small></div>
        <div class="body">
          <div class="clientrow"><img src="${Sprites.url(deal.client.sprite, 2)}" alt=""><div><b>${esc(deal.client.name)}</b><span>${esc(deal.client.who)}</span></div><button id="d-idk" class="idk">📖 I don't know</button><div class="tags">${tag}<span class="tag">${LIVE.length > 1 ? esc(topic(deal.topic).short) + " " : ""}M${m.id} ${esc(m.short)}</span></div></div>
          <div class="prompt">${deal.prompt}</div>
          <div class="ask">${esc(deal.ask)}</div>
          <div class="opts">${deal.opts.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${keys[i]}</span><span>${esc(o.text)}</span></button>`).join("")}</div>
          <div id="res"></div>
        </div>
        <div class="foot" id="prefoot"><button id="d-decline">Decline client</button></div>
        <div class="foot" id="dealfoot" style="display:none">
          <button id="d-office">Office</button>
          <button id="d-next" class="primary">${desk ? "Next " + esc(topic(desk).short) + " client" : "Next client"}</button>
        </div>
      </div>`, root => {
      root.querySelectorAll(".opt").forEach(btn => btn.addEventListener("click", () => answer(deal, si, +btn.dataset.i, root)));
      root.querySelector("#d-idk").onclick = () => {
        Sfx.printer();
        addStudy(deal.id, { kind: "call", tp: deal.topic, m: deal.m, format: deal.type, label: deal.label, prompt: strip(deal.prompt) });
        S.recent.push(deal.id); if (S.recent.length > 4) S.recent.shift();
        root.querySelectorAll(".opt, #d-idk").forEach(b => b.disabled = true);
        root.querySelector(".opts").style.display = "none"; root.querySelector(".ask").style.display = "none";
        root.querySelector("#res").innerHTML = studiedNote();
        root.querySelector("#prefoot").style.display = "none";
        root.querySelector("#dealfoot").style.display = "flex";
        root.querySelector("#d-next").onclick = () => { Sfx.tap(); finishDeal(true); };
        root.querySelector("#d-office").onclick = () => { Sfx.tap(); finishDeal(false); };
        Scene.staffSay(si, "I'll hit the books.", 1400);
        save(); hud(); refreshScene(false);
      };
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
      comboHit();
      payout(si, fee);
      Scene.reward(si, "+" + money(fee));
      const xp = (deal.mode === "due" ? XP.review : deal.mode === "practice" ? XP.practice : XP.call) + (g.newlyMastered ? XP.mastery : 0);
      gainXP(xp, si);
      Scene.staffSay(si, CHEERS[Math.floor(Math.random() * CHEERS.length)], 1400);
      const fire = S.streak[deal.topic] === 3 ? `<div class='money'>🔥 The ${esc(topic(deal.topic).name)} desk is on fire! Bigger fees.</div>` : "";
      const s = S.items[deal.id];
      const days = s.due - today();
      const nextDue = deal.mode === "practice" ? "Extra call: schedule unchanged." : `Next review in ${days} day${days > 1 ? "s" : ""}.`;
      html = `<div class="result good"><div class="title">Deal closed</div><div class="why">${deal.why}</div>
        <div class="money">+${money(fee)} fees · +${money(aum)} AUM · +${xp} XP${g.newlyMastered ? " (mastery bonus)" : ""} · ${nextDue}</div>${fire}</div>`;
      if (g.newlyMastered) setTimeout(() => { Sfx.sting(); toast("★ Mastered: " + esc(nameOf(deal.id)), "gold"); }, 500);
      if (S.streak[deal.topic] === 3) setTimeout(() => Sfx.sting(), 300);
    } else {
      S.streak[deal.topic] = 0;
      comboMiss();
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
  // ---------- Need to study ledger ----------
  function addStudy(id, entry) { S.study[id] = Object.assign({ day: today(), at: Date.now() }, entry); }
  // concepts dropped from a study file keep their saved history but stay out of sight
  const liveStudy = () => Object.keys(S.study).filter(id => ITEMS[id] || qById(id));
  const studyCount = () => liveStudy().length;
  const studiedNote = () => `<div class="result study"><div class="title">Added to Need to study</div>
    <div class="why">No guessing, no penalty. Look it up in your book, then open <b>Library, Need to study</b> and tap <b>Studied it</b>. It stays out of your client calls until then.</div></div>`;
  function markStudied(id) {
    const e = S.study[id]; if (!e) return;
    delete S.study[id];
    if (e.kind === "pitch") { const qs = qState(id); qs.wrongDay = today(); }       // comes back in a later pitch
    else {
      const d = today();
      const s = S.items[id] || (S.items[id] = { b: 0, due: d, n: 0, ok: 0, bad: 0 });
      s.b = 0; s.due = d; s.studied = true;
      s.lock = S.deals + 1 + RELEARN_GAP;                                           // back after a few other calls
      s.flipTo = /^r/.test(e.format || "") ? "normal" : "reverse";                  // ...asked the other way round
    }
    save(); hud(); refreshScene(false);
  }

  const CTX = { question: null };
  const strip = h => String(h).replace(/<[^>]+>/g, "");
  const clip = (s, n) => s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s;
  const nameOf = id => ITEMS[id].kind === "term" ? ITEMS[id].src.term : ITEMS[id].kind === "rule" ? clip(ITEMS[id].src.q, 60) : ITEMS[id].src.name;

  function finishDeal(again) {
    CTX.question = null;
    Life.release(lastDesk);
    callsSinceWalk++;
    if (!again) setTimeout(maybeWalkup, 1500);
    delete modal.dataset.lock;
    closeWin(); Scene.clientLeave();
    busy = false; $("btn-client").disabled = false;
    if (again) setTimeout(() => nextClient(desk), 350);
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

  function officeReady(next) { return S.level >= next.level && S.cash >= next.cost; }

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
        const cost = !S.staff.length ? 0 : hireCost(c, seat);                // only the very first hire of a new game is free
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
    const intro = first ? `<div class="note" style="margin:0 0 10px;color:var(--ink)">Pick your first analyst. This hire is on the house. Stats only change how much money they bring in, never what you study.</div>`
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
  // Pitch Day is open any time, as often as you like
  function pitchesLeft() { rollPitchDay(); return pitchPool().length ? 1 : 0; }
  const qState = id => S.pitch.q[id] || (S.pitch.q[id] = { okDays: [], seen: 0, wrongDay: null, lastDay: null });

  // Pitch Day draws from every desk you have staffed
  const pitchPool = () => { const st = staffedTopics(); return QUESTIONS.filter(q => st.includes(q.tp)); };
  function pickPitch() {
    const d = today();
    const pool = pitchPool();
    const allDone = pool.every(q => S.pitch.tombs.includes(q.id));
    const open = pool.filter(q => { const st = S.pitch.q[q.id]; return !S.study[q.id] && !(st && st.lastDay === d) && (allDone || !S.pitch.tombs.includes(q.id)); });
    const st = q => S.pitch.q[q.id] || { okDays: [], seen: 0, wrongDay: null };
    const groups = [
      open.filter(q => st(q).okDays.length === 1),                          // one more right day makes a tombstone
      open.filter(q => !st(q).seen),                                         // never pitched
      open.filter(q => st(q).seen && st(q).wrongDay !== null && st(q).okDays.length === 0), // missed before
      open.filter(q => st(q).seen && st(q).okDays.length !== 1 && !(st(q).wrongDay !== null && st(q).okDays.length === 0))
    ];
    // once every question has had its turn today, keep going with today's ones (misses first)
    const again = pool.filter(q => !S.study[q.id] && !open.includes(q) && (allDone || !S.pitch.tombs.includes(q.id)));
    groups.push(again.filter(q => !st(q).okDays.includes(d)), again.filter(q => st(q).okDays.includes(d)));
    const out = [];
    groups.forEach(g => shuffle(g.slice()).forEach(q => { if (out.length < PITCH_LEN && !out.includes(q)) out.push(q); }));
    return out.map(q => q.id);
  }

  function pitchWin() {
    const left = pitchesLeft();
    const nextGear = GEAR.find(g => tombCount() < g.tombs);
    const inst = INSTITUTIONS[(today() + S.pitch.runs) % INSTITUTIONS.length];
    const qs = left ? pickPitch() : [];
    const why = "Hire an analyst first. Pitch Day uses the questions from your staffed desks.";
    openWin(`<div class="win"><div class="head"><span>Pitch Day</span><small>${tombCount()}/${QUESTIONS.length} tombstones</small></div>
      <div class="body">
        <div class="pitchhero"><img src="${Sprites.url(inst.sprite, 3)}" alt=""><div><b>${esc(inst.name)}</b><span>wants to hear your pitch.</span></div></div>
        ${left && qs.length ? `<p>${qs.length} exam-style questions from ${esc(pitchTopicsText())}. Every right answer wins a mandate worth about <b>${money(pitchAum())}</b> in AUM. Get a question right on two different days and it becomes a deal tombstone for your wall. Pitch as many times as you like.</p>` : `<p>${esc(why)}</p>`}
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
  const pitchTopicsText = () => { const n = staffedTopics().map(tp => topic(tp).name); return n.length > 1 ? n.slice(0, -1).join(", ") + " and " + n[n.length - 1] : "all of " + (n[0] || "your topics"); };
  // question text: paragraphs, "- " lines as a list, and the data table where the file had one
  function renderQ(q) {
    // a side-by-side balance sheet (label, value, label, value) is stacked into two tables to fit a phone
    let tables = q.table && q.table.length ? [q.table] : [];
    const h = tables.length && q.table[0];
    if (h && h.length === 4 && !h[1] && !h[3]) tables = [q.table.map(r => r.slice(0, 2)), q.table.map(r => r.slice(2, 4))].map(t => t.filter((r, i) => i === 0 || r.some(c => c)));
    const table = tables.map(t => `<div class="qtwrap"><table class="qt${t[0].length > 2 ? " wide" : ""}">${t.map((r, i) => `<tr>${r.map(c => i === 0 ? `<th>${esc(c)}</th>` : `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table></div>`).join("");
    const paras = String(q.q).split(/\n\s*\n/);
    const html = paras.map(p => {
      const lines = p.split("\n");
      const lead = lines.filter(l => !/^\s*[-•]\s/.test(l)), items = lines.filter(l => /^\s*[-•]\s/.test(l));
      return (lead.length ? `<p>${lead.map(esc).join("<br>")}</p>` : "") + (items.length ? `<ul>${items.map(l => `<li>${esc(l.replace(/^\s*[-•]\s/, ""))}</li>`).join("")}</ul>` : "");
    });
    if (table) html.splice(Math.min(1, html.length), 0, table);
    return html.join("");
  }
  const pitchAum = () => Math.round(250000 * (1 + 0.25 * S.office) * (hasGear("analyst-briefcase") ? 1.1 : 1));

  function runPitch(run) {
    const q = qById(run.qs[run.i]);
    const opts = shuffle(q.o.map((text, k) => ({ text, right: k === q.a })));
    const keys = ["A", "B", "C", "D"];
    CTX.question = { kind: "pitch day", itemId: q.id, topic: q.tp, module: q.m, prompt: q.q, options: opts.map(o => o.text), answer: q.o[q.a] };
    modal.dataset.lock = "1";
    const pips = run.qs.map((_, k) => `<i class="${k < run.i ? "done" : k === run.i ? "now" : ""}"></i>`).join("");
    const st = S.pitch.q[q.id];
    const tag = st && st.lastDay === today() ? "<span class='tag prac'>Practice round</span>" : st && st.okDays.length === 1 ? "<span class='tag new'>Tombstone chance</span>" : st && st.seen ? "<span class='tag'>Seen before</span>" : "<span class='tag'>New question</span>";
    openWin(`<div class="win"><div class="head"><span>${esc(run.inst.name)}</span><small>Question ${run.i + 1} of ${run.qs.length}</small></div>
      <div class="body"><div class="pips2">${pips}</div><div class="pitchtop"><div>${tag}<span class="tag">${esc(topic(q.tp).short)} M${q.m}</span></div><button id="p-idk" class="idk">📖 I don't know</button></div>
        <div class="prompt qtext">${renderQ(q)}</div>
        <div class="opts">${opts.map((o, k) => `<button class="opt" data-i="${k}"><span class="k">${keys[k]}</span><span>${esc(o.text)}</span></button>`).join("")}</div>
        <div id="res"></div></div>
      <div class="foot" id="prefoot"><button id="leave">End pitch</button></div>
      <div class="foot" id="dealfoot" style="display:none"><button id="nx" class="primary">${run.i + 1 < run.qs.length ? "Next question" : "See results"}</button></div></div>`, root => {
      root.querySelector("#leave").onclick = () => { Sfx.tap(); pitchSummary(run); };
      root.querySelector("#p-idk").onclick = () => {
        Sfx.printer();
        addStudy(q.id, { kind: "pitch", tp: q.tp, m: q.m, label: "Pitch Day question", prompt: q.q });
        run.studied = (run.studied || 0) + 1;
        root.querySelectorAll(".opt, #p-idk").forEach(b => b.disabled = true);
        root.querySelector(".opts").style.display = "none";
        root.querySelector("#res").innerHTML = studiedNote().replace("your client calls", "Pitch Day");
        root.querySelector("#prefoot").style.display = "none";
        root.querySelector("#dealfoot").style.display = "flex";
        save(); hud();
        root.querySelector("#nx").onclick = () => { Sfx.tap(); run.i++; if (run.i < run.qs.length) runPitch(run); else pitchSummary(run); };
      };
      root.querySelectorAll(".opt").forEach(btn => btn.onclick = () => {
        const btns = [...root.querySelectorAll(".opt")]; btns.forEach(b => b.disabled = true);
        const k = +btn.dataset.i, right = opts[k].right, ri = opts.findIndex(o => o.right);
        btns[ri].classList.add("right"); if (!right) btns[k].classList.add("wrong");
        btns.forEach((b, j) => { if (j !== ri && j !== k) b.classList.add("dim"); });
        const d = today(), qs = qState(q.id);
        qs.seen++; qs.lastDay = d;
        let html;
        if (right) {
          const repeat = qs.okDays.includes(d);                       // already right today: a practice round
          const aum = Math.round(pitchAum() * (repeat ? 0.4 : 1)), fees = repeat ? 600 : 1500;
          run.correct++; run.aum += aum; run.cash += fees; S.aum += aum; S.cash += fees;
          let pxp = repeat ? XP.practice : XP.pitch;
          if (!qs.okDays.includes(d)) qs.okDays.push(d);
          let tombMsg = qs.okDays.length === 1 ? "Get it right on another day to earn its tombstone." : "";
          if (qs.okDays.length >= 2 && !S.pitch.tombs.includes(q.id)) {
            const before = tombCount();
            S.pitch.tombs.push(q.id); run.tombsNew.push(q.id); pxp += XP.tombstone;
            tombMsg = "🏛 Deal tombstone earned!";
            setTimeout(() => { Scene.cheer(); Sfx.bell(); }, 300);
            setTimeout(() => { Sfx.sting(); toast("🏛 Deal tombstone earned! " + tombCount() + "/" + QUESTIONS.length, "gold"); }, 400);
            const g = GEAR.find(g => before < g.tombs && tombCount() >= g.tombs);
            if (g) setTimeout(() => { Sfx.fanfare(); toast("🎁 New gear: " + esc(g.name) + ". " + esc(g.effect), "gold"); }, 1400);
          }
          Sfx.register(); Scene.ceoCheer(); gainXP(pxp, -1); run.xp = (run.xp || 0) + pxp;
          comboHit(); payout(-1, fees);
          html = `<div class="result good"><div class="title">Mandate won</div><div class="why">${esc(q.why)}</div><div class="money">+${money(aum)} AUM · +${money(fees)} fees · +${pxp} XP${repeat ? " (practice round: already right today)" : ""}${tombMsg ? " · " + tombMsg : ""}</div></div>`;
        } else {
          qs.wrongDay = d;
          comboMiss();
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
    const answered = Math.min(run.i + (document.querySelector("#res .result") ? 1 : 0), run.qs.length) - (run.studied || 0);
    openWin(`<div class="win"><div class="head"><span>Pitch results</span><small>${esc(run.inst.name)}</small></div>
      <div class="body"><div class="pitchhero"><img src="${Sprites.url(run.inst.sprite, 3)}" alt=""><div><b>${run.correct} of ${answered} mandates won</b><span>${run.correct ? "They're impressed." : "They'll be back."}</span></div></div>
        <div class="kv"><span>XP earned</span><span>+${run.xp || 0}</span><span>AUM won</span><span>${money(run.aum)}</span><span>Fees</span><span>${money(run.cash)}</span><span>New tombstones</span><span>${run.tombsNew.length}</span>${run.studied ? `<span>Added to Need to study</span><span>${run.studied}</span>` : ""}<span>Total tombstones</span><span>${tombCount()}/${QUESTIONS.length}</span></div>
        <div class="note">Pitch again any time. Questions you've already got right today come back as practice rounds that pay less.</div>
      </div>
      <div class="foot"><button id="x" class="primary">Back to the office</button></div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
    });
    save(); hud(); refreshScene(false);
  }

  // ---------- office ----------
  function officeWin() {
    const cur = Scene.LAYOUTS[S.office], next = OFFICES[S.office + 1], tt = totals();
    let body = `<div class="kv"><span>Firm level</span><span>${S.level} · ${S.xp} XP</span><span>Current office</span><span>${cur.name}</span><span>Desks</span><span>${S.staff.length}/${OFFICES[S.office].cap}</span><span>Office fee boost</span><span>x${(1 + 0.25 * S.office).toFixed(2)}</span><span>Level fee boost</span><span>+${Math.round(LEVEL_FEE * 100 * (S.level - 1))}%</span><span>Cash</span><span>${money(S.cash)}</span></div>`;
    let btn = "";
    if (next) {
      const okL = S.level >= next.level, okC = S.cash >= next.cost;
      body += `<div class="sect">Next: ${Scene.LAYOUTS[S.office + 1].name}</div>
        <div class="kv"><span>Firm level</span><span style="color:${okL ? "var(--green)" : "var(--red)"}">${S.level} / ${next.level}</span>
        <span>Moving cost</span><span style="color:${okC ? "var(--green)" : "var(--red)"}">${money(next.cost)}</span>
        <span>Desks</span><span>${next.cap}</span><span>Fee boost</span><span>x${(1 + 0.25 * (S.office + 1)).toFixed(2)}</span></div>
        <div class="note">Every right answer earns XP: client calls ${XP.call}, reviews ${XP.review}, extra calls ${XP.practice}, Pitch Day wins ${XP.pitch}. Bonuses: +${XP.mastery} for each new mastery, +${XP.tombstone} for each tombstone. Each level adds +${Math.round(LEVEL_FEE * 100)}% to fees.</div>`;
      btn = `<button id="mv" class="primary" ${okL && okC ? "" : "disabled"}>Move in</button>`;
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
  const STATES = [
    { k: "unseen",   label: "Not seen" },
    { k: "study",    label: "To study" },
    { k: "shaky",    label: "Shaky" },
    { k: "learned",  label: "Learned" },
    { k: "mastered", label: "Mastered" }
  ];
  function cardIcon(id) {
    const st = status(id);
    if (st === "unseen") return "<span class='unseen'>not seen</span>";
    const icon = { study: "study-book-stack", shaky: "weak-mastery-card", learned: "learned-mastery-card", mastered: "mastered-card" }[st];
    return `<img class="mi" src="${Sprites.url(icon, 1)}" alt="${st}" title="${st}">`;
  }
  function badge(key) {
    const st = moduleStats(key); const r = st.total ? st.mastered / st.total : 0;
    const name = r >= 1 ? "platinum-peak-badge" : r >= 0.75 ? "gold-peak-badge" : r >= 0.5 ? "silver-peak-badge" : r >= 0.25 ? "bronze-peak-badge" : "locked-vault";
    return `<img class="bi" src="${Sprites.url(name, 1)}" alt="">`;
  }
  // stacked bar: mastered, learned, shaky, to study, not seen
  function stackBar(st) {
    const order = ["mastered", "learned", "shaky", "study", "unseen"];
    return `<div class="stack">${order.map(k => st[k] ? `<i class="s-${k}" style="flex:${st[k]}"></i>` : "").join("")}</div>`;
  }
  function legend(st) {
    return `<div class="legend">${STATES.slice().reverse().map(x => `<span><i class="s-${x.k}"></i>${x.label} <b>${st[x.k]}</b></span>`).join("")}</div>`;
  }
  const pct = r => Math.round(r * 100) + "%";
  function memChip(id) {
    const r = memNow(id); if (r == null) return "";
    return `<span class="memchip ${memBand(r)}" title="Recall chance now">${pct(r)}</span>`;
  }
  // a bar showing average recall now, with a tick for where it will be on exam day
  function memBar(st) {
    if (st.mem == null) return `<div class="membar none"><span>Memory: nothing seen yet</span></div>`;
    return `<div class="membar"><i class="${memBand(st.mem)}" style="width:${Math.round(st.mem * 100)}%"></i><b style="left:${Math.round(st.exam * 100)}%"></b></div>
      <div class="memline"><span>Memory now <b>${pct(st.mem)}</b></span><span>On exam day <b>${pct(st.exam)}</b></span>${st.faded ? `<span class="faded">${st.faded} faded</span>` : ""}</div>`;
  }
  function moduleRows(tp) {
    return topicMods(tp).map(M => {
      const st = moduleStats(M.key);
      const lit = st.total && st.mastered / st.total >= 0.8;
      return `<button class="modbtn" data-k="${M.key}">
        <span class="ml">${badge(M.key)}<span>M${M.id} ${esc(M.short)}${lit ? " <span class='tag new'>Skill +5%</span>" : ""}${isFocusKey(M.key) ? " <span class='tag due'>🎯 Focus</span>" : ""}</span></span>
        <span class="mr">Seen ${st.total - st.unseen}/${st.total} · ★${st.mastered}${st.mem != null ? ` · <span class="memtxt ${memBand(st.mem)}">${pct(st.mem)}</span>` : ""}</span>
        ${stackBar(st)}</button>`;
    }).join("");
  }
  function studyList() {
    const ids = liveStudy().sort((a, b) => (S.study[b].at || 0) - (S.study[a].at || 0));
    if (!ids.length) return `<div class="note">Nothing here. When a question stumps you, tap <b>📖 I don't know</b> and it lands here for real-life study.</div>`;
    return `<div class="list">${ids.map(id => {
      const e = S.study[id], tp = e.tp || (ITEMS[id] && ITEMS[id].topic) || (qById(id) && qById(id).tp) || "equity", M = ITEMS[id] ? mod(ITEMS[id].mk) : mod(mkey(tp, e.m));
      const asked = e.kind === "pitch" ? "Pitch Day question" : (e.label || "Client call");
      return `<div class="li studyitem"><div class="sq">${esc(asked)} · added ${e.day === today() ? "today" : (today() - e.day) + "d ago"}</div>
        <div class="sp">${esc(e.prompt)}</div>
        <div class="sw">Read: <b>${esc(topic(tp).name)}, Module ${M ? M.id : e.m}${M ? ", " + esc(M.name) : ""}</b></div>
        <button class="studied" data-id="${id}">✓ Studied it</button></div>`;
    }).join("")}</div>`;
  }
  let libTopic = null;
  function libraryWin(tp) {
    Sfx.printer();
    const staffed = staffedTopics();
    tp = tp || libTopic || LIVE.find(t => staffed.includes(t)) || LIVE[0];
    libTopic = tp;
    const all = topicStats(tp), T = topic(tp);
    const n = studyCount();
    const tabs = LIVE.length > 1 ? `<div class="tabs ttabs">${LIVE.map(t => `<button data-tp="${t}" class="${t === tp ? "on" : ""}">${esc(topic(t).short)}</button>`).join("")}</div>` : "";
    openWin(`<div class="win"><div class="head"><span>Library</span><small>${esc(T.name)}</small></div>
      <div class="body">
        <div class="sect first">📖 Need to study <small>${n}</small></div>
        ${studyList()}
        ${focusPanel()}
        ${tabs}
        <div class="sect">${esc(T.name)} progress <small>${all.total - all.unseen}/${all.total} seen</small></div>
        ${stackBar(all)}${legend(all)}
        ${memBar(all)}
        <div class="cover ${all.unseen ? "" : "done"}">${all.unseen ? `<b>Covering: ${all.unseen} left to see.</b> Scheduled reviews start once you've seen everything in ${esc(T.name)}${all.held ? ` (${all.held} waiting)` : ""}. Misses still come back for a retest.` : `<b>All ${all.total} seen.</b> Reviews are on: ${all.due} due now, ${all.tomorrow} tomorrow.`}</div>
        ${staffed.includes(tp) ? "" : `<div class="note" style="color:var(--red)">No ${esc(T.name)} analyst yet. Hire one to start getting these concepts in client calls.</div>`}
        <div class="note">Learned: right the first time. Mastered: right again at a later day's review. Shaky: missed, waiting for a retest. Memory is your chance of recalling a concept right now; it fades every day you don't review it. The tick shows where it lands on exam day if you stop reviewing. Tap a module to see each concept.</div>
        <div class="sect">Modules</div>
        ${moduleRows(tp)}
        <div class="note">Master 80% of a module to light it up for +5% ${esc(T.name)} fees.</div>
      </div>
      <div class="foot"><button id="x">Close</button></div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
      root.querySelectorAll(".ttabs button").forEach(b => b.onclick = () => { Sfx.tap(); libraryWin(b.dataset.tp); });
      root.querySelectorAll(".modbtn").forEach(b => b.onclick = () => { Sfx.tap(); moduleWin(b.dataset.k); });
      wireFocusPanel(root, () => libraryWin(tp));
      root.querySelectorAll(".studied").forEach(b => b.onclick = () => {
        const pitchQ = S.study[b.dataset.id] && S.study[b.dataset.id].kind === "pitch";
        Sfx.register(); markStudied(b.dataset.id);
        toast(pitchQ ? "✓ Back in the Pitch Day pool." : "✓ Back in rotation. It comes up after a few calls, asked a new way.", "gold");
        libraryWin(tp);
      });
    });
  }
  // ---------- focus on several modules ----------
  const modLabel = k => `${topic(MODS[k].tp).short} M${MODS[k].id} ${MODS[k].short}`;
  function focusPanel() {
    const fk = S.focusSet || [];
    if (fk.length) return `<div class="focusbox on"><div><b>🎯 Focused on ${fk.length} module${fk.length > 1 ? "s" : ""}</b><span>${fk.map(k => esc(modLabel(k))).join(" · ")}</span><small>Calls come only from these: anything unseen first, then the most faded.</small></div>
      <div class="fbtns"><button id="f-pick">Change</button><button id="f-stop">Stop focusing</button></div></div>`;
    return `<div class="focusbox"><div><b>🎯 Focus</b><small>Pick modules to drill. Calls then come only from them: anything unseen first, then whatever has faded most.</small></div>
      <div class="fbtns"><button id="f-pick">Choose modules</button><button id="f-auto" class="primary">Most faded</button></div></div>`;
  }
  // the modules with the weakest memory right now (only ones you've started)
  function mostFaded(n = 3) {
    return Object.values(MODS).filter(M => staffedTopics().includes(M.tp)).map(M => [M.key, moduleStats(M.key)])
      .filter(([, st]) => st.mem != null).sort((a, b) => a[1].mem - b[1].mem).slice(0, n).map(([k]) => k);
  }
  function setFocus(keys) {
    S.focusSet = keys; save(); hud();
    toast(keys.length ? `🎯 Calls now come only from ${keys.length} module${keys.length > 1 ? "s" : ""}.` : "Back to the normal mix.");
  }
  function wireFocusPanel(root, back) {
    const pk = root.querySelector("#f-pick"); if (pk) pk.onclick = () => { Sfx.tap(); focusPickWin(back); };
    const st = root.querySelector("#f-stop"); if (st) st.onclick = () => { Sfx.tap(); setFocus([]); back(); };
    const au = root.querySelector("#f-auto"); if (au) au.onclick = () => {
      Sfx.tap(); const k = mostFaded();
      if (!k.length) { toast("Nothing has faded yet. Answer a few concepts first."); return; }
      setFocus(k); back();
    };
  }
  function focusPickWin(back, picked) {
    const sel = new Set(picked || S.focusSet || []);
    const staffed = staffedTopics();
    const rows = Object.values(MODS).filter(M => staffed.includes(M.tp)).map(M => [M, moduleStats(M.key)])
      .sort((a, b) => (a[1].mem == null) - (b[1].mem == null) || (a[1].mem ?? 0) - (b[1].mem ?? 0) || a[0].tp.localeCompare(b[0].tp) || a[0].id - b[0].id);
    openWin(`<div class="win"><div class="head"><span>Choose modules</span><small>${sel.size} picked</small></div>
      <div class="body"><div class="note" style="margin-top:0">Most faded first. Tap to pick as many as you like, from any topic.</div>
        <div class="picklist">${rows.map(([M, st]) => `<button class="pickrow ${sel.has(M.key) ? "on" : ""}" data-k="${M.key}">
          <span class="box">${sel.has(M.key) ? "✓" : ""}</span>
          <span class="pk"><b>${esc(topic(M.tp).short)} M${M.id} ${esc(M.short)}</b>
            <small>${st.mem == null ? `Not started · ${st.total} concepts` : `Now <b class="memtxt ${memBand(st.mem)}">${pct(st.mem)}</b> · exam day ${pct(st.exam)}${st.faded ? ` · ${st.faded} faded` : ""}${st.unseen ? ` · ${st.unseen} unseen` : ""}`}</small>
            ${st.mem != null ? `<span class="minibar"><i class="${memBand(st.mem)}" style="width:${Math.round(st.mem * 100)}%"></i></span>` : ""}</span></button>`).join("")}</div></div>
      <div class="foot"><button id="cancel">Cancel</button><button id="auto">Most faded 3</button><button id="go" class="primary" ${sel.size ? "" : "disabled"}>Focus on ${sel.size}</button></div></div>`, root => {
      root.querySelectorAll(".pickrow").forEach(b => b.onclick = () => {
        Sfx.tap(); const k = b.dataset.k; sel.has(k) ? sel.delete(k) : sel.add(k);
        const y = root.querySelector(".body").scrollTop; focusPickWin(back, [...sel]); modal.querySelector(".body").scrollTop = y;
      });
      root.querySelector("#auto").onclick = () => { Sfx.tap(); focusPickWin(back, mostFaded()); };
      root.querySelector("#cancel").onclick = () => { Sfx.tap(); back(); };
      root.querySelector("#go").onclick = () => { Sfx.register(); setFocus([...sel]); back(); };
    });
  }

  function moduleWin(key, filter = "all") {
    const M = mod(key), tp = M.tp, m = M.id, C = TC[tp], st = moduleStats(key);
    const focusNote = isFocusKey(key) ? `<div class="cover"><b>🎯 In your focus.</b> Calls come from your focused modules: ${st.unseen ? `${st.unseen} unseen here first, then` : ""} the most faded concepts.</div>` : "";
    const show = id => filter === "all" || status(id) === filter;
    const terms = C.terms.filter(t => t.m === m && show(t.id)).map(t => `<div class="li">${cardIcon(t.id)}${memChip(t.id)}<b>${esc(t.term)}</b><br>${esc(t.def)}</div>`).join("");
    const forms = C.formulas.filter(f => f.m === m && show(f.id)).map(f => `<div class="li">${cardIcon(f.id)}${memChip(f.id)}<b>${esc(f.name)}</b><br><span class="f">${esc(f.formula)}</span></div>`).join("");
    const rules = (C.rules || []).filter(r => r.m === m && show(r.id)).map(r => `<div class="li">${cardIcon(r.id)}${memChip(r.id)}<b>${esc(r.q)}</b><br>${esc(r.a)}</div>`).join("");
    const traps = filter === "all" ? (C.traps || []).filter(t => t.m === m).map(t => `<div class="li">⚠ ${esc(t.text)}</div>`).join("") : "";
    const tabs = [{ k: "all", label: "All", n: st.total }].concat(STATES.map(x => ({ k: x.k, label: x.label, n: st[x.k] })));
    openWin(`<div class="win"><div class="head"><span>M${m} ${esc(M.short)}</span><small>Seen ${st.total - st.unseen}/${st.total} · ★${st.mastered}</small></div>
      <div class="body"><div class="subtitle">${esc(topic(tp).name)} · ${esc(M.name)}</div>${focusNote}
        ${stackBar(st)}${memBar(st)}
        <div class="tabs">${tabs.map(t => `<button data-f="${t.k}" class="${t.k === filter ? "on" : ""}" ${t.n || t.k === "all" ? "" : "disabled"}>${t.label} ${t.n}</button>`).join("")}</div>
        ${terms ? `<div class="sect">Key terms</div><div class="list">${terms}</div>` : ""}
        ${rules ? `<div class="sect">Rules</div><div class="list">${rules}</div>` : ""}
        ${forms ? `<div class="sect">Formulas</div><div class="list">${forms}</div>` : ""}
        ${!terms && !rules && !forms ? `<div class="note">Nothing in this group.</div>` : ""}
        ${traps ? `<div class="sect">Exam traps</div><div class="list">${traps}</div>` : ""}
      </div>
      <div class="foot"><button id="back">Back</button><button id="focus" class="${isFocusKey(key) ? "" : "primary"}">${isFocusKey(key) ? "Unfocus" : "🎯 Focus"}</button><button id="x">Close</button></div></div>`, root => {
      root.querySelector("#back").onclick = () => { Sfx.tap(); libraryWin(tp); };
      root.querySelectorAll(".tabs button").forEach(b => b.onclick = () => { Sfx.tap(); moduleWin(key, b.dataset.f); });
      const fb = root.querySelector("#focus");
      if (fb) fb.onclick = () => { Sfx.tap(); const f = (S.focusSet || []).filter(k => k !== key); setFocus(isFocusKey(key) ? f : f.concat([key])); moduleWin(key, filter); };
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
    });
  }

  // ---------- staff window ----------
  function staffWin(i) {
    const s = S.staff[i]; if (!s) return;
    if (walkup && walkup.i === i && walkup.arrived) { Sfx.accept(); openTask(i); return; }
    if (walkup && walkup.i === i) return;                         // on their way to you
    const t = topic(s.topic), st = topicStats(s.topic), mood = moodFor(s.topic);
    const moodTxt = mood === "sleepy" ? `😴 Sleepy: ${st.overdue} overdue concept${st.overdue > 1 ? "s" : ""} in ${t.name}. Half fees until reviewed.` : mood === "fire" ? "🔥 On fire! Bigger fees." : "🙂 Focused";
    const c = candidate(s.topic, s.v);
    Sfx.tap();
    openWin(`<div class="win"><div class="head"><span>${esc(s.name)}</span><small>${esc(t.name)} desk</small></div>
      <div class="body"><div class="card" style="margin-bottom:8px"><img class="pt" src="${Sprites.cowUrl(s.species, s.v, 2)}" alt="">
        <div><div class="quip">"${esc(c.quip)}"</div>${statBar("Sales", s.s)}${statBar("Network", s.n)}${statBar("Drive", s.d)}<div class="meta">${moodTxt}</div></div></div>
        <div class="kv"><span>Concepts introduced</span><span>${st.intro}/${st.total}</span><span>Mastered</span><span>${st.mastered}</span><span>Due today</span><span>${st.due}</span></div>
        <div class="sect">${esc(t.name)} skills</div>${moduleRows(s.topic)}</div>
      <div class="foot"><button id="x">Close</button><button id="tr" class="primary">Take a call</button></div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
      root.querySelector("#tr").onclick = () => { closeWin(); nextClient(s.topic); };
      root.querySelectorAll(".modbtn").forEach(b => b.onclick = () => { Sfx.tap(); moduleWin(b.dataset.k); });
    });
  }

  function ceoWin() {
    const tt = totals();
    Sfx.tap();
    openWin(`<div class="win"><div class="head"><span>CEO's office</span><small>${esc(S.firm)}</small></div>
      <div class="body"><div class="trophies">${["bronze-laurel-trophy", "silver-laurel-trophy", "gold-laurel-trophy", "crystal-championship-trophy"].map((n, i) => `<img src="${Sprites.url(n, 2)}" class="${i <= S.office ? "" : "dimmed"}" alt="">`).join("")}</div>
        <div class="kv"><span>Firm level</span><span>${S.level} (${S.xp} XP)</span><span>Office</span><span>${Scene.LAYOUTS[S.office].name}</span>
        <span>AUM</span><span>${money(S.aum)}</span><span>Cash</span><span>${money(S.cash)}</span>
        <span>Deals closed</span><span>${S.deals}</span><span>Staff</span><span>${S.staff.length}</span>
        <span>Concepts seen</span><span>${tt.intro}/${TOTAL_ITEMS}</span><span>Mastered</span><span>${tt.mastered}</span>
        <span>Due today</span><span>${tt.due}</span><span>Due tomorrow</span><span>${tt.tomorrow}</span>
        <span>Deal tombstones</span><span>${tombCount()}/${QUESTIONS.length}</span>
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
        <div class="label">Sound effects</div>
        <div class="seg"><button data-s="on" class="${S.muted ? "" : "on"}">On</button><button data-s="off" class="${S.muted ? "on" : ""}">Off</button></div>
        <div class="label">Office sounds (keyboards, phones, footsteps)</div>
        <div class="seg"><button data-a="on" class="${S.ambient !== false ? "on" : ""}">On</button><button data-a="off" class="${S.ambient === false ? "on" : ""}">Off</button></div>
        <button id="ceo" class="wide">Firm stats</button>
        <button id="help" class="wide">How to play</button>
        <button id="rename" class="wide">Rename firm</button>
        <button id="backup" class="wide">Backup or restore progress</button>
        <button id="remind" class="wide">Phone reminders</button>
        ${Store.cloud ? "" : `<button id="sendnotes" class="wide">Send notes to Claude (${Store.notes().filter(n => !n.shared).length} new)</button>`}
        <button id="reset" class="wide" style="color:var(--red)">Reset all progress</button>
        <div class="note">${Store.cloud ? "Progress saves on this device and to your Claude account." : "Progress saves on this device. Use a backup code to move it."} Content: CFA Level I ${esc(LIVE.map(t => topic(t).name).join(", "))}.</div>
      </div>
      <div class="foot"><button id="x" class="primary">Close</button></div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
      root.querySelectorAll("[data-s]").forEach(b => b.onclick = () => { S.muted = b.dataset.s === "off"; Sfx.setMuted(S.muted); save(); hud(); Sfx.tap(); menuWin(); });
      root.querySelectorAll("[data-a]").forEach(b => b.onclick = () => { S.ambient = b.dataset.a === "on"; Sfx.setAmbient(S.ambient); save(); Sfx.tap(); menuWin(); });
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

  // split notes into batches that each fit in one GitHub link, so nothing gets cut off
  function noteBatches(notes) {
    const out = []; let cur = [];
    notes.forEach(n => {
      const next = cur.concat([n]);
      if (cur.length && Reminders.notesIssueUrl(next, { lean: true }).length > 7000) { out.push(cur); cur = [n]; }
      else cur = next;
    });
    if (cur.length) out.push(cur);
    return out;
  }
  // One button at a time. A GitHub link can only carry so much text, so if there are many new
  // notes the button sends as many as fit, and then offers the rest.
  function notesText(notes) {
    return notes.map((n, i) => {
      const q = n.screen && n.screen.question;
      return `${i + 1}. ${n.kind}: ${n.text}` + (n.pointed ? `\n   Pointing at: ${n.pointed.label}` : "") + (q ? `\n   Question (${q.itemId}): ${q.prompt}\n   Options: ${q.options.join(" | ")}` : "");
    }).join("\n\n");
  }
  function notesWin() {
    const all = Store.notes();
    const fresh = all.filter(n => !n.shared);
    const batch = fresh.length ? noteBatches(fresh)[0] : [];
    const rest = fresh.length - batch.length;
    const label = !rest ? `Send ${batch.length} new note${batch.length > 1 ? "s" : ""} to GitHub` : `Send the first ${batch.length} of ${fresh.length} new notes`;
    openWin(`<div class="win"><div class="head"><span>Notes for Claude</span><small>${fresh.length} new</small></div>
      <div class="body">${fresh.length ? `<p>Tap the button, then <b>Submit new issue</b> on GitHub.${rest ? " Your notes are too long for one GitHub link, so they go in two steps. Come back here after submitting for the rest." : ""}</p>
        <a class="btnlink sendlink" href="${Reminders.notesIssueUrl(batch)}" target="_blank" rel="noopener">${label}</a>
        <button id="copy" class="wide">Or copy them to paste to Claude</button>`
        : `<p>All your notes have been sent. Tap 📝 at the top any time to add one.</p>`}
        <div class="sect">Recent notes</div>
        <div class="list">${all.slice().reverse().slice(0, 12).map(n => `<div class="li"><b>${esc(n.kind)}</b> · ${esc(n.text)}${n.shared ? " <span class='tag'>sent</span>" : " <span class='tag new'>new</span>"}</div>`).join("")}</div></div>
      <div class="foot"><button id="x" class="primary">Close</button></div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
      const a = root.querySelector(".sendlink");
      if (a) a.addEventListener("click", () => {
        Store.markShared(batch.map(n => n.id));
        setTimeout(() => notesWin(), 600);                       // shows the next step, or "all sent"
      });
      const cp = root.querySelector("#copy");
      if (cp) cp.onclick = async () => {
        try { await navigator.clipboard.writeText(notesText(fresh)); Store.markShared(fresh.map(n => n.id)); toast("Copied. Paste it in your chat with Claude."); notesWin(); }
        catch (e) { toast("Couldn't copy here. Use the GitHub button."); }
      };
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
        <p><b>Clients bring deals.</b> Each deal is a term, rule or formula from your CFA notes, sent to the desk for that topic. Answer right to close it and earn fees.</p>
        <p><b>Your memory runs the firm.</b> Concepts you get right come back after 1, 2, 4, 7 and 12 days, never later than exam day. Miss one and it comes back after a few other calls, asked the other way round.</p>
        <p><b>Don't let the desk get sleepy.</b> Any overdue concept halves that desk's fees until you review it. Three right in a row sets it on fire 🔥.</p>
        <p><b>Grow the team.</b> Each CFA topic has its own desk. New seats open as you introduce more of a topic. Each analyst's stats change how much money they bring in.</p>
        <p><b>Pitch Day.</b> Pitch 5 exam-style questions from your staffed desks to a big client, as often as you like. Right answers win mandates. A question you get right on two different days becomes a deal tombstone, and tombstones unlock gear.</p>
        <p><b>Level up.</b> Every right answer earns XP, with bonuses for reviews, masteries, Pitch Day wins and tombstones. Each level adds +3% to fees, and offices unlock at levels 4, 9 and 15.</p>
        <p><b>Streaks.</b> Right answers in a row build a combo: each one plays a higher note and adds 10% to fees, up to double. Five in a row rings the deal bell. A miss just resets it.</p>
        <p><b>Walk-ups.</b> Now and then an analyst walks over with a "!" and a quick task. The reward is shown before you start. Tap them, or the yellow note at the top.</p>
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
        <div class="kv"><span>Reviews due</span><span style="color:var(--red)">${tt.due}</span><span>New concepts waiting</span><span>${nl}</span>${studyCount() ? `<span>📖 Need to study</span><span>${studyCount()}</span>` : ""}<span>Pitch Day</span><span>${S.pitch.runs ? "Open" : "Ready"}</span><span>AUM</span><span>${money(S.aum)}</span>${interest ? `<span>Vault interest</span><span>+${money(interest)}</span>` : ""}</div>
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
    Feedback.init({ context: () => ({ question: CTX.question, office: Scene.LAYOUTS[S.office].name, deals: S.deals, cash: S.cash, staff: S.staff.length, tombstones: tombCount(), level: S.level, daysLeft: daysLeft(), layout: Scene.debugInfo(), standalone: Reminders.installed(), build: "2026-10-28b" }) });
    Scene.init({ wrap: $("scene"), canvas: $("canvas"), overlay: $("overlay"), onStaffTap: staffWin, onCeoTap: ceoWin, bottomInset: () => $("stats").offsetHeight + 12 });
    Sfx.setMuted(S.muted); Sfx.setAmbient(S.ambient !== false);
    refreshScene(true);
    updateTicker();
    Life.init({ paused: () => false, busy: () => busy || !!walkup });
    setInterval(() => { updateTicker(); maybeWalkup(); }, 30000);
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

  window.__game = { get S() { return S; }, forceWalkup: () => maybeWalkup(true), taskItems, comboHit, comboMiss, comboMult, firmSym, feeFor, nextClient, notesWin, QUESTIONS, MODS, renderQ, libraryWin, moduleWin, pitchWin, hireWin, pickPitch, pitchesLeft, ITEMS, pickDeal, buildDeal, grade, totals, topicStats, openSeats, EXAM_DAY };
})();
