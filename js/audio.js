// Sound kit. Real recordings (Kenney CC0 packs in assets/sfx, streamed from GitHub Pages and
// never stored by the offline cache) layered with small synthesized tones (Web Audio API).
// Two channels: effects (answers, bells, jingles) and ambience (keyboards, clicks, phones,
// footsteps), each with its own switch. If a recording can't load, the synth version plays.
window.Sfx = (function () {
  let ctx = null, fxBus = null, ambBus = null;
  let muted = false, ambientOn = true;

  function ac() {
    if (!ctx) {
      const C = window.AudioContext || window.webkitAudioContext;
      if (!C) return null;
      // iPhone: treat game sounds like media so they play even with the ringer switch on silent
      try { if (navigator.audioSession) navigator.audioSession.type = "playback"; } catch (e) {}
      ctx = new C();
      fxBus = ctx.createGain(); fxBus.connect(ctx.destination);
      ambBus = ctx.createGain(); ambBus.gain.value = 0.55; ambBus.connect(ctx.destination);
      loadSamples();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  // ---------- recordings ----------
  const GROUPS = {
    bell: ["bell-deal"], ding: ["bell-ding"],
    step: ["step-0", "step-1", "step-2", "step-3", "step-4"],
    coins: ["coins", "coins-2"], chips: ["chips-1", "chips-2", "chips-3"],
    key: ["click-2", "click-3", "click-4", "click-5"], click: ["tick-1", "tick-2", "tick-4", "click-1"],
    paper: ["paper-flip1", "paper-flip2", "paper-place1"], paperOpen: ["paper-open"],
    alert: ["alert"], accept: ["accept"], bong: ["bong"],
    jLevel: ["jingle-level"], jTomb: ["jingle-tombstone"], jNews: ["jingle-news"], jWalk: ["jingle-walkup"], jCombo: ["jingle-combo"],
    vCongrats: ["voice-congratulations"], vHigh: ["voice-new-highscore"], vLevel: ["voice-level-up"], vDone: ["voice-objective-achieved"]
  };
  const buf = {};
  let loading = false;
  function loadSamples() {
    if (loading) return; loading = true;
    const names = [...new Set(Object.values(GROUPS).flat())];
    names.forEach(n => {
      fetch("assets/sfx/" + n + ".mp3", { cache: "no-store" })
        .then(r => r.ok ? r.arrayBuffer() : Promise.reject())
        .then(ab => new Promise((res, rej) => ctx.decodeAudioData(ab, res, rej)))
        .then(b => { buf[n] = b; })
        .catch(() => {});
    });
  }
  // play a recording from a group; returns false if none is loaded (caller falls back to synth)
  function sample(group, o = {}) {
    const a = ac(); if (!a || muted) return true;
    const amb = !!o.amb; if (amb && !ambientOn) return true;
    const list = (GROUPS[group] || []).filter(n => buf[n]);
    if (!list.length) return false;
    const src = a.createBufferSource(); src.buffer = buf[list[Math.floor(Math.random() * list.length)]];
    src.playbackRate.value = (o.rate || 1) * (o.jitter ? 1 + (Math.random() - 0.5) * o.jitter : 1);
    const g = a.createGain(); g.gain.value = o.vol == null ? 1 : o.vol;
    src.connect(g).connect(amb ? ambBus : fxBus);
    src.start(a.currentTime + (o.at || 0));
    return true;
  }

  // ---------- synth ----------
  function tone(freq, start, dur, type = "square", vol = 0.08, slideTo = null, amb = false) {
    const a = ac(); if (!a || muted || (amb && !ambientOn)) return;
    const t = a.currentTime + start;
    const o = a.createOscillator();
    const g = a.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(amb ? ambBus : fxBus);
    o.start(t); o.stop(t + dur + 0.02);
  }

  function noise(start, dur, vol = 0.06, filterFreq = 3000, q = 1, type = "bandpass", amb = false) {
    const a = ac(); if (!a || muted || (amb && !ambientOn)) return;
    const t = a.currentTime + start;
    const len = Math.max(1, Math.floor(a.sampleRate * dur));
    const b = a.createBuffer(1, len, a.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = a.createBufferSource(); src.buffer = b;
    const f = a.createBiquadFilter(); f.type = type; f.frequency.value = filterFreq; f.Q.value = q;
    const g = a.createGain(); g.gain.value = vol;
    src.connect(f).connect(g).connect(amb ? ambBus : fxBus);
    src.start(t);
  }

  // unlock audio on the very first touch (iOS only allows it inside a gesture)
  const firstTouch = () => {
    const a = ac(); if (!a) return;
    const b = a.createBuffer(1, 1, 22050), src = a.createBufferSource();
    src.buffer = b; src.connect(a.destination); src.start(0);
  };
  ["touchend", "pointerdown", "click"].forEach(ev => document.addEventListener(ev, firstTouch, { once: true, capture: true }));

  // C major pentatonic, climbing: each combo step plays the next note up
  const PENTA = [523, 587, 659, 784, 880, 1047, 1175, 1319, 1568, 1760, 2093, 2349];

  return {
    unlock() { ac(); },
    setMuted(m) { muted = m; },
    isMuted() { return muted; },
    setAmbient(on) { ambientOn = on; },
    ambientOn() { return ambientOn; },

    // UI tap
    tap() { if (!sample("click", { vol: 0.5, jitter: 0.1 })) tone(880, 0, 0.04, "square", 0.04); },

    // a burst of typing; amb = background typing from the floor
    keys(count = 6, amb = false, vol = 0.45) {
      for (let i = 0; i < count; i++) {
        const at = i * (0.06 + Math.random() * 0.05);
        if (!sample("key", { vol: vol * (0.6 + Math.random() * 0.4), jitter: 0.25, at, amb })) {
          noise(at, 0.025, 0.09 * vol, 2500 + Math.random() * 2500, 4, "bandpass", amb);
          tone(1800 + Math.random() * 600, at, 0.015, "square", 0.015 * vol, null, amb);
        }
      }
    },
    mouse(amb = true) { if (!sample("click", { vol: 0.35, jitter: 0.2, amb })) tone(2400, 0, 0.012, "square", 0.02, null, amb); },
    step(amb = true, vol = 0.35) { sample("step", { vol, jitter: 0.15, amb }); },

    // an office phone: two short electronic trills
    phone(amb = true, vol = 0.05) {
      for (let r = 0; r < 2; r++) for (let k = 0; k < 8; k++) {
        tone(k % 2 ? 1320 : 1100, r * 0.55 + k * 0.045, 0.045, "square", vol, null, amb);
      }
    },

    // Printer / paper for reports, study cards, the Library
    printer() {
      if (sample("paper", { vol: 0.8, jitter: 0.1 })) return;
      for (let i = 0; i < 5; i++) { noise(i * 0.09, 0.08, 0.05, 900 + i * 120, 6); tone(180, i * 0.09, 0.06, "sawtooth", 0.02); }
    },
    paper(amb = true) { sample("paper", { vol: 0.3, jitter: 0.15, amb }); },

    // Deal closed: ka-ching plus coins
    register() {
      noise(0, 0.05, 0.12, 1800, 2);
      tone(1318, 0.05, 0.12, "triangle", 0.12);
      tone(1760, 0.12, 0.35, "triangle", 0.12);
      tone(2637, 0.12, 0.25, "sine", 0.05);
      sample("coins", { vol: 0.55, jitter: 0.1, at: 0.08 });
    },

    // combo step n (1, 2, 3 ...): each right answer in a row sounds one note higher
    combo(n) {
      const f = PENTA[Math.min(PENTA.length - 1, Math.max(0, n - 1))];
      tone(f, 0, 0.14, "triangle", 0.11); tone(f * 2, 0.02, 0.1, "sine", 0.03);
      if (n >= 3) sample("chips", { vol: 0.5, jitter: 0.1, at: 0.05 });
    },
    // the deal bell, rung on big moments
    bell() { if (!sample("bell", { vol: 0.9 })) { tone(1046, 0, 1.2, "sine", 0.12); tone(2093, 0, 0.8, "sine", 0.05); } },
    ding() { if (!sample("ding", { vol: 0.7 })) tone(1568, 0, 0.5, "sine", 0.08); },
    cheer() { this.bell(); sample("jCombo", { vol: 0.8, at: 0.25 }); sample("vHigh", { vol: 0.9, at: 0.7 }); },

    // Bigger completion sting (mastered / milestone)
    sting() {
      if (sample("jTomb", { vol: 0.8 })) return;
      const notes = [523, 659, 784, 1047];
      notes.forEach((n, i) => tone(n, i * 0.08, 0.18, "square", 0.06));
      tone(1568, 0.34, 0.45, "triangle", 0.08);
    },

    // Wrong answer: soft thud
    thud() {
      tone(160, 0, 0.18, "sine", 0.18, 70);
      noise(0, 0.08, 0.05, 300, 1, "lowpass");
    },

    // Hire / office upgrade / level-up fanfare
    fanfare() {
      if (sample("jLevel", { vol: 0.85 })) return;
      const seq = [[523, 0], [523, 0.1], [523, 0.2], [698, 0.3], [880, 0.5], [784, 0.62], [1047, 0.78]];
      seq.forEach(([n, s]) => tone(n, s, 0.16, "square", 0.06));
      tone(1047, 0.78, 0.5, "triangle", 0.07);
    },
    levelUp() { this.fanfare(); sample("vLevel", { vol: 0.9, at: 0.5 }); },

    // an analyst has something for you
    alert() { if (!sample("alert", { vol: 0.8 })) { tone(880, 0, 0.08, "square", 0.06); tone(1320, 0.1, 0.12, "square", 0.06); } },
    walkup() { sample("jWalk", { vol: 0.7 }); },
    accept() { if (!sample("accept", { vol: 0.8 })) tone(1320, 0, 0.12, "triangle", 0.08); },
    taskDone() { this.bell(); sample("vDone", { vol: 0.9, at: 0.5 }); },
    news() { if (!sample("jNews", { vol: 0.85 })) { tone(784, 0, 0.12, "square", 0.07); tone(1047, 0.14, 0.2, "square", 0.07); } },
    congrats() { sample("vCongrats", { vol: 0.9 }); },

    // Door chime when a client walks in
    door() { tone(988, 0, 0.12, "triangle", 0.06); tone(784, 0.12, 0.2, "triangle", 0.06); },

    // Little blip for floating coins
    coin() { tone(1568, 0, 0.06, "square", 0.04); tone(2093, 0.06, 0.1, "square", 0.04); }
  };
})();
