// Tiny synthesized sound kit (Web Audio API). No files needed.
window.Sfx = (function () {
  let ctx = null;
  let muted = false;

  function ac() {
    if (!ctx) {
      const C = window.AudioContext || window.webkitAudioContext;
      if (!C) return null;
      ctx = new C();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tone(freq, start, dur, type = "square", vol = 0.08, slideTo = null) {
    const a = ac(); if (!a || muted) return;
    const t = a.currentTime + start;
    const o = a.createOscillator();
    const g = a.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(a.destination);
    o.start(t); o.stop(t + dur + 0.02);
  }

  function noise(start, dur, vol = 0.06, filterFreq = 3000, q = 1, type = "bandpass") {
    const a = ac(); if (!a || muted) return;
    const t = a.currentTime + start;
    const len = Math.max(1, Math.floor(a.sampleRate * dur));
    const buf = a.createBuffer(1, len, a.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = a.createBufferSource(); src.buffer = buf;
    const f = a.createBiquadFilter(); f.type = type; f.frequency.value = filterFreq; f.Q.value = q;
    const g = a.createGain(); g.gain.value = vol;
    src.connect(f).connect(g).connect(a.destination);
    src.start(t);
  }

  return {
    unlock() { ac(); },
    setMuted(m) { muted = m; },
    isMuted() { return muted; },

    // UI tap
    tap() { tone(880, 0, 0.04, "square", 0.04); },

    // Keyboard clatter while a client is being looked up
    keys(count = 6) {
      for (let i = 0; i < count; i++) {
        const s = i * 0.07 + Math.random() * 0.03;
        noise(s, 0.025, 0.09, 2500 + Math.random() * 2500, 4);
        tone(1800 + Math.random() * 600, s, 0.015, "square", 0.015);
      }
    },

    // Printer whirr for reports / study cards
    printer() {
      for (let i = 0; i < 5; i++) {
        noise(i * 0.09, 0.08, 0.05, 900 + i * 120, 6);
        tone(180, i * 0.09, 0.06, "sawtooth", 0.02);
      }
    },

    // Deal closed: ka-ching
    register() {
      noise(0, 0.05, 0.12, 1800, 2);
      tone(1318, 0.05, 0.12, "triangle", 0.12);
      tone(1760, 0.12, 0.35, "triangle", 0.12);
      tone(2637, 0.12, 0.25, "sine", 0.05);
    },

    // Bigger completion sting (mastered / milestone)
    sting() {
      const notes = [523, 659, 784, 1047];
      notes.forEach((n, i) => tone(n, i * 0.08, 0.18, "square", 0.06));
      tone(1568, 0.34, 0.45, "triangle", 0.08);
    },

    // Wrong answer: soft thud
    thud() {
      tone(160, 0, 0.18, "sine", 0.18, 70);
      noise(0, 0.08, 0.05, 300, 1, "lowpass");
    },

    // Hire / office upgrade fanfare
    fanfare() {
      const seq = [[523, 0], [523, 0.1], [523, 0.2], [698, 0.3], [880, 0.5], [784, 0.62], [1047, 0.78]];
      seq.forEach(([n, s]) => tone(n, s, 0.16, "square", 0.06));
      tone(1047, 0.78, 0.5, "triangle", 0.07);
    },

    // Door chime when a client walks in
    door() { tone(988, 0, 0.12, "triangle", 0.06); tone(784, 0.12, 0.2, "triangle", 0.06); },

    // Little blip for floating coins
    coin() { tone(1568, 0, 0.06, "square", 0.04); tone(2093, 0.06, 0.1, "square", 0.04); }
  };
})();
