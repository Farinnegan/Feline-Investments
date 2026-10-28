// Office life: the background bustle that runs while you play. Keyboards and mouse clicks
// from whoever is at their desk, phones ringing, coffee runs, analysts wandering over to
// chat or to the printer. Purely cosmetic: nothing here touches studying or money.
window.Life = (function () {
  let opts = null, timers = [];
  const held = new Set();                  // analysts busy with something else (a walk-up, a client)
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const rand = (a, b) => a + Math.random() * (b - a);

  const CHAT = [
    ["Did you see that spread?", "Tighter than my budget."],
    ["Coffee's on me today.", "Then I'm buying the dip."],
    ["Boss looks focused.", "Exam season. Let her cook."],
    ["Who moved my calculator?", "It's in the vault. Again."],
    ["Lunch at noon?", "Only if the market closes green."],
    ["That client was tough.", "Nothing a DCF can't fix."],
    ["Read the 10-K yet?", "Twice. Still love the footnotes."],
    ["Printer's jammed again.", "Classic Monday."],
    ["New mandate incoming?", "I can feel it in my spreadsheets."],
    ["Big day today.", "Every day is big here."]
  ];
  const SOLO = [
    ["☕", "Coffee break."], ["📈", "Green candles!"], ["📉", "Hmm, red day."], ["🧮", "Running the numbers."],
    ["📞", "Feline Investments, how can I help?"], ["🗂️", "Filing that report."], ["🙆", "*stretch*"], ["💡", "Got an idea."]
  ];

  function later(fn, ms) { const id = setTimeout(() => { timers = timers.filter(x => x !== id); fn(); }, ms); timers.push(id); }
  const free = () => {
    const n = Scene.staffCount, out = [];
    for (let i = 0; i < n; i++) if (!held.has(i) && !Scene.isAway(i)) out.push(i);
    return out;
  };
  const quiet = () => document.hidden || !opts || opts.paused();

  // the floor's typing: busier with more analysts
  function typeLoop() {
    const n = Scene.staffCount;
    if (!quiet() && n) {
      const f = free();
      if (f.length) {
        const i = pick(f);
        Scene.typing(i, rand(0.8, 2));
        Sfx.keys(Math.round(rand(3, 8)), true, 0.22);
        if (Math.random() < 0.35) later(() => Sfx.mouse(true), rand(200, 900));
      }
    }
    later(typeLoop, n ? rand(900, 2600) / Math.sqrt(n) : 4000);
  }

  // every so often, something happens on the floor
  async function eventLoop() {
    if (!quiet() && Scene.staffCount && !opts.busy()) {
      const f = free(), r = Math.random();
      if (f.length >= 2 && r < 0.3) await chat(f);
      else if (f.length && r < 0.5) await printer(pick(f));
      else if (f.length && r < 0.7) phone(pick(f));
      else if (f.length) { const i = pick(f), [e, line] = pick(SOLO); Scene.say(i, e + " " + line, 1800); if (e === "🙆") Scene.stretch(i); }
    }
    later(eventLoop, rand(14000, 30000));
  }

  async function chat(f) {
    const a = pick(f), b = pick(f.filter(x => x !== a));
    held.add(a); held.add(b);
    const [l1, l2] = pick(CHAT);
    await Scene.walk(a, "desk", b);
    Scene.say(a, l1, 1700);
    await new Promise(r => setTimeout(r, 1800));
    Scene.say(b, l2, 1700);
    await new Promise(r => setTimeout(r, 1900));
    await Scene.goBack(a);
    held.delete(a); held.delete(b);
  }
  async function printer(i) {
    held.add(i);
    await Scene.walk(i, "printer");
    Sfx.paper(true); Scene.say(i, "Printing the deck…", 1500);
    await new Promise(r => setTimeout(r, 1700));
    Sfx.paper(true);
    await Scene.goBack(i);
    held.delete(i);
  }
  function phone(i) {
    Sfx.phone(true, 0.035);
    later(() => Scene.say(i, "📞 Feline Investments, how can I help?", 2000), 1100);
  }

  return {
    // opts: paused() true while sound or play should stay calm; busy() true while a client or task is on
    init(o) { opts = o; later(typeLoop, 1500); later(eventLoop, 9000); },
    hold(i) { held.add(i); }, release(i) { held.delete(i); }, isHeld: i => held.has(i),
    free
  };
})();
