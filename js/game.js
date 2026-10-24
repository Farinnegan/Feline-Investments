// Equity Firm Story — game logic, spaced repetition, economy and windows.
(function () {
  const C = window.CONTENT;
  const SAVE_KEY = "felineInvestments.v1";

  // ---------- tuning ----------
  const INTERVALS = [1, 3, 7, 14, 30];          // days for boxes 1..5
  const MASTER_BOX = 4;                          // box 4+ counts as mastered
  const HIRE_COST = [0, 6000, 12000, 20000, 32000, 45000, 60000, 80000];
  const OFFICES = [
    { aum: 0,          cost: 0,      cap: 1 },
    { aum: 1000000,    cost: 15000,  cap: 3 },
    { aum: 4000000,    cost: 50000,  cap: 6 },
    { aum: 12000000,   cost: 120000, cap: 8 }
  ];
  const BASE_FEE = { term: 500, rterm: 600, formula: 800, rformula: 700, case: 1500 };
  const AUM_PER_FEE = 50;
  // one animal analyst per module; the CEO is the black cat
  const STAFF = {
    1: { animal: "bull",  name: "Barry Bull",  quip: "Charges at every trade." },
    2: { animal: "owl",   name: "Olive Owl",   quip: "Has strong opinions about divisors." },
    3: { animal: "fox",   name: "Felix Fox",   quip: "Always hunting for an anomaly." },
    4: { animal: "lion",  name: "Leo Lion",    quip: "Knows every share class by heart." },
    8: { animal: "wolf",  name: "Willa Wolf",  quip: "Can smell an overvalued stock." },
    5: { animal: "bear",  name: "Bruno Bear",  quip: "Starts with the balance sheet. Always." },
    6: { animal: "horse", name: "Hazel Horse", quip: "Five forces? Make it six." },
    7: { animal: "dove",  name: "Daisy Dove",  quip: "Sees the future, one scenario at a time." }
  };
  const CLIENTS = ["rabbit", "tiger", "turtle", "alligator", "snake"];
  const CHEERS = ["Deal closed!", "Well done.", "Nailed it!", "Client signed!", "Smooth.", "Easy money."];
  const OOPS = ["Lost that one...", "Hmm, not quite.", "Client walked."];

  // ---------- items (one per term / formula / question) ----------
  const ITEMS = {};
  C.terms.forEach(t => ITEMS[t.id] = { id: t.id, m: t.m, kind: "term", src: t });
  C.formulas.forEach(f => ITEMS[f.id] = { id: f.id, m: f.m, kind: "formula", src: f });
  C.questions.forEach(q => ITEMS[q.id] = { id: q.id, m: q.m, kind: "case", src: q });

  // order new items per module: term, term, formula, case ... (easy first)
  const NEW_ORDER = {};
  C.modules.forEach(mod => {
    const terms = C.terms.filter(t => t.m === mod.id).map(t => t.id);
    const forms = C.formulas.filter(f => f.m === mod.id).map(f => f.id);
    const cases = C.questions.filter(q => q.m === mod.id).map(q => q.id);
    const out = [];
    let i = 0;
    while (terms.length || forms.length || cases.length) {
      const pattern = ["t", "t", "f", "c"][i++ % 4];
      const src = pattern === "t" ? terms : pattern === "f" ? forms : cases;
      if (src.length) out.push(src.shift());
      else (terms.length ? terms : forms.length ? forms : cases).length && out.push((terms.length ? terms : forms.length ? forms : cases).shift());
    }
    NEW_ORDER[mod.id] = out;
  });
  const TOTAL_ITEMS = Object.keys(ITEMS).length;

  // ---------- state ----------
  function today() { const d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000); }

  function freshState() {
    return {
      v: 1, firm: "", started: false,
      cash: 0, aum: 100000, week: 0, office: 0, deals: 0,
      staff: [{ m: 1, name: STAFF[1].name, animal: STAFF[1].animal }],
      items: {}, streak: {}, recent: [],
      newDay: today(), newCount: 0, newCap: 12,
      lastDay: null, muted: false, best: 0, mastered: {}
    };
  }

  let S = load() || freshState();
  function load() { try { const r = localStorage.getItem(SAVE_KEY); return r ? JSON.parse(r) : null; } catch (e) { return null; } }
  function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) {} }

  // ---------- helpers ----------
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function money(n) {
    const a = Math.abs(n);
    if (a >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B";
    if (a >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
    if (a >= 1e3) return "$" + (n / 1e3).toFixed(1) + "K";
    return "$" + Math.round(n);
  }
  function dateLabel(w) { return "Y" + (Math.floor(w / 48) + 1) + " M" + (Math.floor((w % 48) / 4) + 1) + " W" + (w % 4 + 1); }
  function mod(id) { return C.modules.find(m => m.id === id); }
  function hiredModules() { return S.staff.map(s => s.m); }
  function staffIndexFor(m) { return S.staff.findIndex(s => s.m === m); }
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  const $ = id => document.getElementById(id);

  function rollDay() {
    const d = today();
    if (S.newDay !== d) { S.newDay = d; S.newCount = 0; }
  }

  // ---------- spaced repetition ----------
  function itemState(id) { return S.items[id]; }
  function isMastered(id) { const s = S.items[id]; return s && s.b >= MASTER_BOX; }
  function moduleStats(m) {
    const ids = Object.values(ITEMS).filter(i => i.m === m).map(i => i.id);
    const d = today();
    let intro = 0, due = 0, overdue = 0, mastered = 0;
    ids.forEach(id => {
      const s = S.items[id]; if (!s) return;
      intro++;
      if (s.due <= d) due++;
      if (s.due < d) overdue++;
      if (s.b >= MASTER_BOX) mastered++;
    });
    return { total: ids.length, intro, due, overdue, mastered };
  }
  function totals() {
    const d = today(); let due = 0, mastered = 0, intro = 0, tomorrow = 0;
    const hired = hiredModules();
    Object.entries(S.items).forEach(([id, s]) => {
      if (!ITEMS[id]) return;
      intro++;
      if (s.b >= MASTER_BOX) mastered++;
      if (hired.includes(ITEMS[id].m)) { if (s.due <= d) due++; else if (s.due === d + 1) tomorrow++; }
    });
    return { due, mastered, intro, tomorrow };
  }
  function newLeft() { rollDay(); return Math.max(0, S.newCap - S.newCount); }
  function nextNewId() {
    // pick from the hired module that has introduced the smallest share of its items
    const options = hiredModules().map(m => {
      const next = NEW_ORDER[m].find(id => !S.items[id]);
      const st = moduleStats(m);
      return next ? { id: next, share: st.intro / st.total } : null;
    }).filter(Boolean).sort((a, b) => a.share - b.share);
    return options.length ? options[0].id : null;
  }

  function pickDeal(onlyModule) {
    rollDay();
    const d = today();
    const hired = hiredModules();
    const ok = id => ITEMS[id] && hired.includes(ITEMS[id].m) && (!onlyModule || ITEMS[id].m === onlyModule);
    const notRecent = id => !S.recent.includes(id);

    let due = Object.keys(S.items).filter(id => ok(id) && S.items[id].due <= d);
    if (due.length) {
      let pool = due.filter(notRecent); if (!pool.length) pool = due;
      const minDue = Math.min(...pool.map(id => S.items[id].due));
      const top = pool.filter(id => S.items[id].due === minDue);
      return { id: top[Math.floor(Math.random() * top.length)], mode: "due" };
    }
    if (newLeft() > 0) {
      let id = null;
      if (onlyModule) id = NEW_ORDER[onlyModule].find(x => !S.items[x]);
      else id = nextNewId();
      if (id) return { id, mode: "new" };
    }
    const intro = Object.keys(S.items).filter(ok);
    if (!intro.length) return null;
    let pool = intro.filter(notRecent); if (!pool.length) pool = intro;
    const minB = Math.min(...pool.map(id => S.items[id].b));
    const low = pool.filter(id => S.items[id].b <= minB + 1);
    return { id: low[Math.floor(Math.random() * low.length)], mode: "practice" };
  }

  function grade(id, correct, mode) {
    const d = today();
    let s = S.items[id];
    const was = s ? s.b : 0;
    if (!s) { s = S.items[id] = { b: 0, due: d, n: 0, ok: 0, bad: 0 }; S.newCount++; }
    s.n++;
    if (correct) {
      s.ok++;
      if (mode !== "practice") { s.b = Math.min(5, s.b + 1); s.due = d + INTERVALS[s.b - 1]; }
    } else {
      s.bad++;
      s.b = 1; s.due = d;
    }
    S.recent.push(id); if (S.recent.length > 4) S.recent.shift();
    return { was, now: s.b, newlyMastered: correct && was < MASTER_BOX && s.b >= MASTER_BOX };
  }

  // ---------- moods ----------
  function moodFor(m) {
    const st = moduleStats(m);
    if (st.overdue > 0) return "sleepy";
    if ((S.streak[m] || 0) >= 3) return "fire";
    return "ok";
  }
  function refreshScene(full) {
    if (full) Scene.setOffice(S.office, S.staff);
    Scene.setMoods(S.staff.map(s => moodFor(s.m)));
  }

  // ---------- building a deal (question) ----------
  function pickDistractors(list, correct, count, keyFn) {
    const same = list.filter(x => x !== correct && x.g === correct.g && x.m === correct.m);
    const mod_ = list.filter(x => x !== correct && x.g !== correct.g && x.m === correct.m);
    const other = list.filter(x => x !== correct && x.m !== correct.m);
    const out = [];
    const seen = new Set([keyFn(correct)]);
    [shuffle(same), shuffle(mod_), shuffle(other)].forEach(pool => pool.forEach(x => {
      if (out.length < count && !seen.has(keyFn(x))) { seen.add(keyFn(x)); out.push(x); }
    }));
    return out;
  }

  function buildDeal(pick) {
    const it = ITEMS[pick.id];
    const s = S.items[pick.id];
    const box = s ? s.b : 0;
    if (it.kind === "case") {
      const q = it.src;
      const opts = shuffle(q.o.map((text, i) => ({ text, right: i === q.a })));
      return { id: it.id, m: it.m, type: "case", label: "Client case", ask: "Choose your answer", prompt: esc(q.q), opts, why: esc(q.why), mode: pick.mode };
    }
    if (it.kind === "term") {
      const t = it.src;
      const reverse = box >= 2 && Math.random() < 0.5; // after the basics, sometimes ask term → definition
      const ds = pickDistractors(C.terms, t, reverse ? 2 : 3, x => reverse ? x.def : x.term);
      if (reverse) {
        const opts = shuffle([{ text: t.def, right: true }, ...ds.map(x => ({ text: x.def, right: false }))]);
        return { id: t.id, m: t.m, type: "rterm", label: "Define it", ask: "Which definition fits this term?", prompt: "<b>" + esc(t.term) + "</b>", opts, why: "<b>" + esc(t.term) + "</b>: " + esc(t.def), mode: pick.mode };
      }
      const opts = shuffle([{ text: t.term, right: true }, ...ds.map(x => ({ text: x.term, right: false }))]);
      return { id: t.id, m: t.m, type: "term", label: "Name the term", ask: "Which term is the client describing?", prompt: esc(t.def), opts, why: "<b>" + esc(t.term) + "</b>: " + esc(t.def), mode: pick.mode };
    }
    const f = it.src;
    const reverse = box >= 2 && Math.random() < 0.4;
    const ds = pickDistractors(C.formulas, f, 3, x => reverse ? x.name : x.formula);
    if (reverse) {
      const opts = shuffle([{ text: f.name, right: true }, ...ds.map(x => ({ text: x.name, right: false }))]);
      return { id: f.id, m: f.m, type: "rformula", label: "Read the formula", ask: "What does this formula calculate?", prompt: "<span class='formula'>" + esc(f.formula) + "</span>", opts, why: "<b>" + esc(f.name) + "</b> = " + esc(f.formula), mode: pick.mode };
    }
    const opts = shuffle([{ text: f.formula, right: true }, ...ds.map(x => ({ text: x.formula, right: false }))]);
    return { id: f.id, m: f.m, type: "formula", label: "Pick the formula", ask: "Which formula gives this?", prompt: "<b>" + esc(f.name) + "</b>", opts, why: "<b>" + esc(f.name) + "</b> = " + esc(f.formula), mode: pick.mode };
  }

  function feeFor(deal, boxBefore) {
    const m = deal.m;
    let fee = BASE_FEE[deal.type] * (1 + 0.5 * S.office) * (1 + 0.15 * boxBefore);
    const mood = moodFor(m);
    if (mood === "fire") fee *= 1.5;
    if (mood === "sleepy") fee *= 0.5;
    if (deal.mode === "due") fee *= 1.2;
    if (deal.mode === "practice") fee *= 0.3;
    return Math.round(fee / 10) * 10;
  }

  // ---------- UI: windows ----------
  const modal = $("modal");
  function openWin(html, onMount) {
    modal.innerHTML = html;
    modal.classList.remove("hidden");
    onMount && onMount(modal);
  }
  function closeWin() { modal.classList.add("hidden"); modal.innerHTML = ""; }
  modal.addEventListener("pointerdown", e => { if (e.target === modal && !modal.dataset.lock) { Sfx.tap(); closeWin(); } });

  function toast(text, cls = "") {
    const el = document.createElement("div");
    el.className = "toast " + cls; el.innerHTML = text;
    $("toasts").appendChild(el);
    setTimeout(() => el.classList.add("out"), 2600);
    setTimeout(() => el.remove(), 3000);
  }

  // ---------- HUD ----------
  function hud() {
    rollDay();
    $("date").textContent = dateLabel(S.week);
    $("cash").textContent = money(S.cash);
    $("firmname").textContent = S.firm || "Feline Investments";
    const tt = totals();
    $("s-aum").textContent = money(S.aum);
    $("s-deals").textContent = S.deals;
    $("s-mastered").textContent = tt.mastered + "/" + TOTAL_ITEMS;
    $("s-due").textContent = tt.due;
    const next = OFFICES[S.office + 1];
    if (next) {
      const prev = OFFICES[S.office].aum || 100000;
      const pct = Math.max(0, Math.min(1, (S.aum - prev) / (next.aum - prev)));
      $("s-bar").style.width = (pct * 100) + "%";
      $("s-next").textContent = S.aum >= next.aum ? Scene.LAYOUTS[S.office + 1].name + " unlocked!" : "Next: " + Scene.LAYOUTS[S.office + 1].name + " at " + money(next.aum) + " AUM";
    } else { $("s-bar").style.width = "100%"; $("s-next").textContent = "Top floor reached"; }

    const canHire = S.staff.length < OFFICES[S.office].cap && S.staff.length < C.modules.length && S.cash >= HIRE_COST[S.staff.length];
    const canMove = next && S.aum >= next.aum && S.cash >= next.cost;
    $("btn-hire").classList.toggle("dot", !!canHire);
    $("btn-office").classList.toggle("dot", !!canMove);

    let hint = "";
    if (tt.due > 0) hint = tt.due + " concept" + (tt.due > 1 ? "s" : "") + " due today. Clients pay more for these.";
    else if (newLeft() > 0 && nextNewId()) hint = newLeft() + " new concept" + (newLeft() > 1 ? "s" : "") + " left today.";
    else hint = "All caught up! " + (tt.tomorrow ? tt.tomorrow + " due tomorrow." : "") + " Extra calls pay less.";
    $("hint").textContent = hint;
    $("sound").classList.toggle("off", S.muted);
  }

  // ---------- the client loop ----------
  let busy = false;
  async function nextClient(onlyModule) {
    if (busy) return;
    Sfx.unlock();
    const pick = pickDeal(onlyModule);
    if (!pick) { toast("No clients right now."); return; }
    busy = true; $("btn-client").disabled = true;
    const deal = buildDeal(pick);
    const si = staffIndexFor(deal.m);
    Sfx.door();
    await Scene.clientVisit(si, CLIENTS[Math.floor(Math.random() * CLIENTS.length)]);
    Sfx.keys(5);
    await wait(250);
    showDeal(deal, si);
  }
  const wait = ms => new Promise(r => setTimeout(r, ms));

  function showDeal(deal, si) {
    const st = S.staff[si];
    const m = mod(deal.m);
    const modeTag = deal.mode === "new" ? "<span class='tag new'>New concept</span>" : deal.mode === "due" ? "<span class='tag due'>Review due</span>" : "<span class='tag prac'>Extra call</span>";
    const keys = ["A", "B", "C", "D"];
    modal.dataset.lock = "1";
    openWin(`
      <div class="win">
        <div class="head"><span>${esc(deal.label)}</span><small>${esc(st.name)} · ${esc(m.role)}</small></div>
        <div class="body">
          <div>${modeTag}<span class="tag">M${m.id} ${esc(m.short)}</span></div>
          <div class="prompt">${deal.prompt}</div>
          <div class="ask">${esc(deal.ask)}</div>
          <div class="opts">${deal.opts.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${keys[i]}</span><span>${esc(o.text)}</span></button>`).join("")}</div>
          <div id="res"></div>
        </div>
        <div class="foot hidden" id="dealfoot" style="display:none">
          <button id="d-office">Office</button>
          <button id="d-next" class="primary">Next client</button>
        </div>
      </div>`, root => {
      root.querySelectorAll(".opt").forEach(btn => btn.addEventListener("click", () => answer(deal, si, +btn.dataset.i, root)));
    });
  }

  function answer(deal, si, i, root) {
    const btns = [...root.querySelectorAll(".opt")];
    btns.forEach(b => b.disabled = true);
    const picked = deal.opts[i];
    const rightIdx = deal.opts.findIndex(o => o.right);
    btns[rightIdx].classList.add("right");
    if (!picked.right) btns[i].classList.add("wrong");
    btns.forEach((b, k) => { if (k !== rightIdx && k !== i) b.classList.add("dim"); });

    const before = S.items[deal.id] ? S.items[deal.id].b : 0;
    const fee = picked.right ? feeFor(deal, before) : 0;
    const g = grade(deal.id, picked.right, deal.mode);
    S.week++; S.deals++;

    let html;
    if (picked.right) {
      S.streak[deal.m] = (S.streak[deal.m] || 0) + 1;
      S.cash += fee; S.aum += fee * AUM_PER_FEE;
      Sfx.register();
      Scene.reward(si, "+" + money(fee));
      Scene.staffSay(si, CHEERS[Math.floor(Math.random() * CHEERS.length)], 1400);
      const fire = S.streak[deal.m] === 3 ? "<div class='money'>🔥 " + esc(S.staff[si].name) + " is on fire! Fees x1.5</div>" : "";
      const nextDue = deal.mode === "practice" ? "Extra call: schedule unchanged." : "Next review in " + INTERVALS[g.now - 1] + " day" + (INTERVALS[g.now - 1] > 1 ? "s" : "") + ".";
      html = `<div class="result good"><div class="title">DEAL CLOSED</div><div class="why">${deal.why}</div>
        <div class="money">+${money(fee)} fees · +${money(fee * AUM_PER_FEE)} AUM · ${nextDue}</div>${fire}</div>`;
      if (g.newlyMastered) setTimeout(() => { Sfx.sting(); toast("★ Mastered: " + esc(nameOf(deal.id)), "gold"); }, 500);
      if (S.streak[deal.m] === 3) setTimeout(() => Sfx.sting(), 300);
    } else {
      S.streak[deal.m] = 0;
      Sfx.thud();
      Scene.staffSay(si, OOPS[Math.floor(Math.random() * OOPS.length)], 1400);
      html = `<div class="result bad"><div class="title">CLIENT LOST</div><div class="why">${deal.why}</div>
        <div class="money">No fee. This one comes back later today.</div></div>`;
    }
    root.querySelector("#res").innerHTML = html;
    const foot = root.querySelector("#dealfoot"); foot.style.display = "flex";
    root.querySelector("#d-next").addEventListener("click", () => { Sfx.tap(); finishDeal(true); });
    root.querySelector("#d-office").addEventListener("click", () => { Sfx.tap(); finishDeal(false); });
    root.querySelector("#res").scrollIntoView({ behavior: "smooth", block: "nearest" });
    checkMilestones();
    save(); hud(); refreshScene(false);
  }

  function nameOf(id) { const it = ITEMS[id]; return it.kind === "term" ? it.src.term : it.kind === "formula" ? it.src.name : "Case " + id.slice(1); }

  function finishDeal(again) {
    delete modal.dataset.lock;
    closeWin();
    Scene.clientLeave();
    busy = false; $("btn-client").disabled = false;
    if (again) setTimeout(() => nextClient(), 350);
  }

  let toldOffice = S.office;
  function checkMilestones() {
    const next = OFFICES[S.office + 1];
    if (next && S.aum >= next.aum && toldOffice <= S.office) {
      toldOffice = S.office + 1;
      setTimeout(() => { Sfx.fanfare(); toast("🏢 " + Scene.LAYOUTS[S.office + 1].name + " is available! Open Office.", "gold"); }, 700);
    }
    const tt = totals();
    if (tt.mastered === TOTAL_ITEMS && !S.won) { S.won = true; setTimeout(winGame, 1200); }
  }

  // ---------- hire ----------
  function hireWin() {
    const cap = OFFICES[S.office].cap;
    const cost = HIRE_COST[S.staff.length];
    const hired = hiredModules();
    const open = C.modules.filter(m => !hired.includes(m.id));
    const full = S.staff.length >= cap;
    const cards = open.map(m => {
      const c = STAFF[m.id];
      const n = Object.values(ITEMS).filter(i => i.m === m.id).length;
      const can = !full && S.cash >= cost;
      return `<div class="card ${can ? "" : "locked"}">
        <img class="pt" src="${Sprites.url(c.animal, 2)}" alt="">
        <div><div class="nm">${esc(c.name)}</div><div class="role">${esc(m.role)}</div>
          <div class="meta">Module ${m.id}: ${esc(m.name)} · ${n} concepts</div>
          <div class="quip">"${esc(c.quip)}"</div></div>
        <div class="act"><span>Cost <b>${money(cost)}</b></span><button data-m="${m.id}" ${can ? "" : "disabled"}>Hire</button></div>
      </div>`;
    }).join("");
    const note = !open.length ? "Your whole team is hired." : full ? `Your ${Scene.LAYOUTS[S.office].name} is full (${cap} desk${cap > 1 ? "s" : ""}). Move to a bigger office to hire more.` : S.cash < cost ? `You need ${money(cost)} to hire. Close more deals.` : "Each hire brings a new module's concepts into your daily calls.";
    openWin(`<div class="win"><div class="head"><span>Hire staff</span><small>${S.staff.length}/${cap} desks</small></div>
      <div class="body"><div class="note" style="margin:0 0 10px">${note}</div>${cards}</div>
      <div class="foot"><button id="x">Close</button></div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
      root.querySelectorAll("button[data-m]").forEach(b => b.onclick = () => hire(+b.dataset.m));
    });
  }

  function hire(m) {
    const cost = HIRE_COST[S.staff.length];
    if (S.cash < cost || S.staff.length >= OFFICES[S.office].cap) return;
    S.cash -= cost;
    const c = STAFF[m];
    S.staff.push({ m, name: c.name, animal: c.animal });
    save(); closeWin(); refreshScene(true); hud();
    Sfx.fanfare();
    const i = S.staff.length - 1;
    setTimeout(() => Scene.staffSay(i, "Morning!", 1800), 200);
    toast("👋 " + esc(c.name) + " joined as " + esc(mod(m).role) + ".", "gold");
  }


  // ---------- office ----------
  function officeWin() {
    const cur = Scene.LAYOUTS[S.office];
    const next = OFFICES[S.office + 1];
    let body = `<div class="kv"><span>Current office</span><span>${cur.name}</span><span>Desks</span><span>${S.staff.length}/${OFFICES[S.office].cap}</span><span>AUM</span><span>${money(S.aum)}</span><span>Cash</span><span>${money(S.cash)}</span></div>`;
    let btn = "";
    if (next) {
      const L = Scene.LAYOUTS[S.office + 1];
      const okA = S.aum >= next.aum, okC = S.cash >= next.cost;
      body += `<div class="sect">Next: ${L.name}</div>
        <div class="kv"><span>AUM needed</span><span style="color:${okA ? "var(--green)" : "var(--red)"}">${money(next.aum)}</span>
        <span>Moving cost</span><span style="color:${okC ? "var(--green)" : "var(--red)"}">${money(next.cost)}</span>
        <span>Desks</span><span>${next.cap}</span><span>Fee boost</span><span>x${(1 + 0.5 * (S.office + 1)).toFixed(1)}</span></div>`;
      btn = `<button id="mv" class="primary" ${okA && okC ? "" : "disabled"}>Move in</button>`;
    } else body += `<div class="note">You run the whole tower. Keep your team sharp.</div>`;
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

  // ---------- library ----------
  function libraryWin() {
    Sfx.printer();
    const rows = C.modules.slice().sort((a, b) => a.id - b.id).map(m => {
      const st = moduleStats(m.id);
      const hired = hiredModules().includes(m.id);
      return `<button class="modbtn" data-m="${m.id}"><span class="ml">${badge(m.id)}M${m.id} ${esc(m.short)}${hired ? "" : " <span class='tag prac'>not hired</span>"}</span><span>${st.mastered}/${st.total}</span></button>`;
    }).join("");
    openWin(`<div class="win"><div class="head"><span>Library</span><small>Your study reference</small></div>
      <div class="body">${rows}<div class="note">Cards crack, then glow, then shine as you recall a concept over more days. Badges go bronze, silver, gold and platinum as a module fills up.</div></div>
      <div class="foot"><button id="x">Close</button></div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
      root.querySelectorAll(".modbtn").forEach(b => b.onclick = () => { Sfx.tap(); moduleWin(+b.dataset.m); });
    });
  }

  function stars(id) {
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

  function moduleWin(m) {
    const M = mod(m);
    const terms = C.terms.filter(t => t.m === m).map(t => `<div class="li"><span class="stars">${stars(t.id)}</span><b>${esc(t.term)}</b><br>${esc(t.def)}</div>`).join("");
    const forms = C.formulas.filter(f => f.m === m).map(f => `<div class="li"><span class="stars">${stars(f.id)}</span><b>${esc(f.name)}</b><br><span class="f">${esc(f.formula)}</span></div>`).join("");
    const traps = C.traps.filter(t => t.m === m).map(t => `<div class="li">⚠ ${esc(t.text)}</div>`).join("");
    const st = moduleStats(m);
    openWin(`<div class="win"><div class="head"><span>M${m} ${esc(M.short)}</span><small>${st.mastered}/${st.total} mastered</small></div>
      <div class="body"><div style="font-weight:600">${esc(M.name)}</div>
        <div class="sect">Key terms</div><div class="list">${terms || "<div class='li'>None</div>"}</div>
        ${forms ? `<div class="sect">Formulas</div><div class="list">${forms}</div>` : ""}
        ${traps ? `<div class="sect">Exam traps</div><div class="list">${traps}</div>` : ""}
      </div>
      <div class="foot"><button id="back">Back</button><button id="x">Close</button></div></div>`, root => {
      root.querySelector("#back").onclick = () => { Sfx.tap(); libraryWin(); };
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
    });
  }

  // ---------- staff window (tap a staff member) ----------
  function staffWin(i) {
    const s = S.staff[i]; if (!s) return;
    const M = mod(s.m); const st = moduleStats(s.m); const mood = moodFor(s.m);
    const moodTxt = mood === "sleepy" ? "😴 Sleepy: " + st.overdue + " overdue concept" + (st.overdue > 1 ? "s" : "") + ". Fees halved until reviewed." : mood === "fire" ? "🔥 On fire! Fees x1.5" : "🙂 Focused";
    Sfx.tap();
    openWin(`<div class="win"><div class="head"><span>${esc(s.name)}</span><small>${esc(M.role)}</small></div>
      <div class="body"><div class="card" style="margin-bottom:8px"><img class="pt" src="${Sprites.url(s.animal, 2)}" alt="">
        <div><div class="role">Module ${M.id}</div><div style="font-weight:600">${esc(M.name)}</div><div class="meta">${moodTxt}</div></div></div>
        <div class="kv"><span>Concepts introduced</span><span>${st.intro}/${st.total}</span><span>Mastered</span><span>${st.mastered}</span><span>Due today</span><span>${st.due}</span><span>Streak</span><span>${S.streak[s.m] || 0}</span></div>
        <div class="meter"><div style="width:${st.total ? st.mastered / st.total * 100 : 0}%"></div></div></div>
      <div class="foot"><button id="x">Close</button><button id="tr" class="primary">Take a ${esc(M.short)} call</button></div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
      root.querySelector("#tr").onclick = () => { closeWin(); nextClient(s.m); };
    });
  }

  function ceoWin() {
    const tt = totals();
    Sfx.tap();
    openWin(`<div class="win"><div class="head"><span>CEO's office</span><small>${esc(S.firm)}</small></div>
      <div class="body"><div class="trophies">${["bronze-laurel-trophy", "silver-laurel-trophy", "gold-laurel-trophy", "crystal-championship-trophy"].map((n, i) => `<img src="${Sprites.url(n, 2)}" class="${i <= S.office ? "" : "dimmed"}" alt="">`).join("")}</div>
        <div class="kv">
        <span>Office</span><span>${Scene.LAYOUTS[S.office].name}</span>
        <span>AUM</span><span>${money(S.aum)}</span><span>Cash</span><span>${money(S.cash)}</span>
        <span>Deals closed</span><span>${S.deals}</span><span>Staff</span><span>${S.staff.length}</span>
        <span>Concepts seen</span><span>${tt.intro}/${TOTAL_ITEMS}</span><span>Mastered</span><span>${tt.mastered}</span>
        <span>Due today</span><span>${tt.due}</span><span>Due tomorrow</span><span>${tt.tomorrow}</span></div></div>
      <div class="foot"><button id="x" class="primary">Back to work</button></div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
    });
  }

  // ---------- menu / settings ----------
  function menuWin() {
    const caps = [8, 12, 20, 30];
    openWin(`<div class="win"><div class="head"><span>Menu</span></div>
      <div class="body">
        <div style="font-weight:600">New concepts per day</div>
        <div class="seg">${caps.map(c => `<button data-c="${c}" class="${S.newCap === c ? "on" : ""}">${c}</button>`).join("")}</div>
        <div style="font-weight:600">Sound</div>
        <div class="seg"><button data-s="on" class="${S.muted ? "" : "on"}">On</button><button data-s="off" class="${S.muted ? "on" : ""}">Off</button></div>
        <button id="ceo" style="width:100%;margin-bottom:8px">Firm stats</button>
        <button id="help" style="width:100%;margin-bottom:8px">How to play</button>
        <button id="rename" style="width:100%;margin-bottom:8px">Rename firm</button>
        <button id="reset" style="width:100%;color:var(--red)">Reset all progress</button>
        <div class="note">Progress saves on this device. Content: CFA Level I Equity, Modules 1 to 8.<br>Art credits: see README.</div>
      </div>
      <div class="foot"><button id="x" class="primary">Close</button></div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
      root.querySelectorAll("[data-c]").forEach(b => b.onclick = () => { S.newCap = +b.dataset.c; save(); hud(); Sfx.tap(); menuWin(); });
      root.querySelectorAll("[data-s]").forEach(b => b.onclick = () => { S.muted = b.dataset.s === "off"; Sfx.setMuted(S.muted); save(); hud(); Sfx.tap(); menuWin(); });
      root.querySelector("#ceo").onclick = ceoWin;
      root.querySelector("#help").onclick = () => helpWin(false);
      root.querySelector("#rename").onclick = () => introWin(true);
      root.querySelector("#reset").onclick = () => {
        if (confirm("Reset everything? Your firm and all review history will be deleted.")) {
          try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
          S = freshState(); toldOffice = 0; closeWin(); refreshScene(true); hud(); introWin(false);
        }
      };
    });
  }

  function helpWin(first) {
    openWin(`<div class="win"><div class="head"><span>How to play</span></div>
      <div class="body">
        <p><b>Clients bring deals.</b> Each deal is a CFA Equity concept from your study file. Answer right to close it and earn fees.</p>
        <p><b>Fees</b> are cash you spend on hiring and moving offices. <b>AUM</b> grows with every deal and unlocks bigger offices.</p>
        <p><b>Your memory runs the firm.</b> Concepts you get right come back after 1, 3, 7, 14 and 30 days. Miss one and it comes back today.</p>
        <p><b>Don't let staff get sleepy.</b> If a concept is overdue, that analyst earns half fees until you review it. Three right in a row puts them on fire 🔥.</p>
        <p><b>Each hire</b> brings a new module into your daily calls. Tap any staff member to see their progress or take a call in their module.</p>
      </div>
      <div class="foot"><button id="x" class="primary">${first ? "Open for business" : "Got it"}</button></div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); if (first) morning(true); };
    });
  }

  function introWin(rename) {
    modal.dataset.lock = rename ? "" : "1";
    if (rename) delete modal.dataset.lock;
    openWin(`<div class="win"><div class="head"><span>${rename ? "Rename firm" : "Welcome, Boss"}</span></div>
      <div class="body">
        ${rename ? "" : "<p>You're the cat. You just opened a tiny investment firm in your home office, and Barry Bull, your first trader, is already at his desk.</p><p>Grow it into a skyscraper by closing client deals, all built from your CFA Equity notes.</p>"}
        <div style="font-weight:600">Name your firm</div>
        <input id="fn" class="input" maxlength="22" placeholder="Feline Investments" value="${esc(S.firm)}">
      </div>
      <div class="foot">${rename ? '<button id="x">Cancel</button>' : ""}<button id="go" class="primary">${rename ? "Save" : "Start"}</button></div></div>`, root => {
      const go = () => {
        Sfx.unlock(); Sfx.tap();
        S.firm = (root.querySelector("#fn").value || "").trim() || "Feline Investments";
        const first = !S.started; S.started = true;
        save(); hud(); delete modal.dataset.lock; closeWin();
        if (first) helpWin(true);
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
    const sleepy = S.staff.filter(s => moodFor(s.m) === "sleepy").map(s => s.name);
    const nl = nextNewId() ? newLeft() : 0;
    setTimeout(() => { Scene.staffSay(-1, "Morning!", 1800); S.staff.forEach((s, i) => setTimeout(() => Scene.staffSay(i, "Morning!", 1400), 300 + i * 250)); }, 300);
    if (firstEver) return;
    openWin(`<div class="win"><div class="head"><span>Morning report</span><small>${dateLabel(S.week)}</small></div>
      <div class="body"><div class="vault"><img src="${Sprites.url(tt.due ? "locked-vault" : "open-vault", 2)}" alt=""><div>${tt.due ? "Clear today's " + tt.due + " review" + (tt.due > 1 ? "s" : "") + " to open the vault." : "Vault open. No reviews due!"}</div></div>
        <div class="kv">
        <span>Reviews due</span><span style="color:var(--red)">${tt.due}</span>
        <span>New concepts today</span><span>${nl}</span>
        <span>AUM</span><span>${money(S.aum)}</span></div>
        ${sleepy.length ? `<div class="note" style="color:var(--red)">😴 ${esc(sleepy.join(", "))} ${sleepy.length > 1 ? "are" : "is"} sleepy. Clear their reviews to wake them up.</div>` : `<div class="note">Everyone is sharp today.</div>`}
      </div>
      <div class="foot"><button id="x" class="primary">Let's go</button></div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.unlock(); Sfx.tap(); closeWin(); };
    });
  }

  function winGame() {
    Sfx.fanfare();
    openWin(`<div class="win"><div class="head"><span>Equity mastered!</span></div>
      <div class="body"><p>Every concept in your Equity file is mastered. ${esc(S.firm)} is officially a powerhouse.</p><p>Keep taking calls to hold it all in memory until exam day.</p></div>
      <div class="foot"><button id="x" class="primary">Keep going</button></div></div>`, root => {
      root.querySelector("#x").onclick = () => { Sfx.tap(); closeWin(); };
    });
  }

  // ---------- wire up ----------
  Sprites.load().then(boot);
  function boot() {
  Scene.init({ wrap: $("scene"), canvas: $("canvas"), overlay: $("overlay"), onStaffTap: staffWin, onCeoTap: ceoWin });
  Sfx.setMuted(S.muted);
  refreshScene(true);
  hud();

  $("btn-client").onclick = () => { Sfx.tap(); nextClient(); };
  $("btn-hire").onclick = () => { Sfx.tap(); hireWin(); };
  $("btn-office").onclick = () => { Sfx.tap(); officeWin(); };
  $("btn-library").onclick = () => libraryWin();
  $("btn-menu").onclick = () => { Sfx.tap(); menuWin(); };
  $("sound").onclick = () => { S.muted = !S.muted; Sfx.setMuted(S.muted); save(); hud(); Sfx.unlock(); Sfx.tap(); };

  if (!S.started) introWin(false); else morning(false);

  // refresh moods and day rollover every minute
  setInterval(() => { hud(); refreshScene(false); }, 60000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) { hud(); refreshScene(false); morning(false); } });
  }

  // expose for testing
  window.__game = { get S() { return S; }, ITEMS, pickDeal, buildDeal, grade, totals, moduleStats };
})();
