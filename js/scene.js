// Office scene: pixel office drawn on a canvas at whole-number zoom (crisp
// pixels), with an HTML overlay for floating numbers and speech bubbles.

window.Scene = (function () {
  const T = 32;
  const VW = 352, VH = 352; // logical view; camera zooms to fit each office

  // how far the visible art sits from the top of its 32px cell, so things stand on the floor line
  const BOTTOM = { "tall-bookcase": 27, "office-plant": 27, "low-cabinet": 26, "reception-counter": 30, "potted-plant": 29, "wall-column": 30, "gold-laurel-trophy": 30, "crystal-championship-trophy": 30, "study-book-stack": 32, "flash-card-stack": 32 };

  // Office tiers. Coordinates in tiles. desks: top-left of the desk cell.
  // decor: [sprite, x, footLineY]
  // Portrait rooms so the office fills a phone screen. Desk capacity: 3, 6, 10, 16.
  const LAYOUTS = [
    { name: "Home Office", w: 6, h: 9, floor: "marble", door: { col: 4, type: "single-glass-office-door" },
      ceo: { x: 3.9, y: 2.0, desk: "compact-study-desk" }, deskType: "compact-study-desk",
      desks: [{ x: 0.45, y: 4.3 }, { x: 2.2, y: 4.3 }, { x: 3.95, y: 4.3 }],
      decor: [["tall-bookcase", 0.1, 1.45], ["low-cabinet", 1.15, 1.45], ["office-plant", 5.05, 1.45],
              ["potted-plant", 0.1, 8.9], ["study-book-stack", 1.2, 8.9], ["low-cabinet", 3.7, 8.9], ["office-plant", 5.0, 8.9]] },
    { name: "Small Office", w: 7, h: 10, floor: "navy", door: { col: 5, type: "single-glass-office-door" },
      ceo: { x: 4.6, y: 2.0, desk: "straight-trading-desk" }, deskType: "compact-study-desk",
      desks: [{ x: 0.5, y: 4.3 }, { x: 2.25, y: 4.3 }, { x: 4.0, y: 4.3 }, { x: 0.5, y: 6.7 }, { x: 2.25, y: 6.7 }, { x: 4.0, y: 6.7 }],
      decor: [["tall-bookcase", 0.1, 1.45], ["low-cabinet", 1.15, 1.45], ["office-plant", 2.3, 1.45], ["office-plant", 6.05, 1.45],
              ["potted-plant", 6.0, 9.9], ["study-book-stack", 0.2, 9.9], ["low-cabinet", 2.6, 9.9], ["office-plant", 6.1, 5.6]] },
    { name: "Downtown Floor", w: 8, h: 12, floor: "marble", door: { col: 4, type: "double-glass-entry-door" }, windows: [1, 2, 6],
      ceo: { x: 6.0, y: 2.0, desk: "curved-trading-desk" }, deskType: "straight-trading-desk",
      desks: [0, 1, 2].flatMap(r => [0.5, 2.15, 3.8, 5.45].map(x => ({ x, y: 4.3 + r * 2.4 }))).slice(0, 10),
      decor: [["office-plant", 0.1, 1.45], ["low-cabinet", 1.2, 1.45], ["tall-bookcase", 2.4, 1.45], ["reception-counter", 3.4, 1.55],
              ["potted-plant", 7.05, 11.9], ["office-plant", 0.1, 11.9], ["low-cabinet", 3.5, 11.9], ["office-plant", 7.1, 6.0]] },
    { name: "Skyscraper HQ", w: 9, h: 13, floor: "navy", door: { col: 4, type: "double-glass-entry-door" }, windows: [1, 2, 3, 5, 6, 7], columns: [0, 8],
      ceo: { x: 7.0, y: 2.0, desk: "curved-trading-desk" }, deskType: "curved-trading-desk",
      desks: [0, 1, 2, 3].flatMap(r => [0.5, 2.2, 3.9, 5.6].map(x => ({ x, y: 4.3 + r * 2.3 }))),
      decor: [["low-cabinet", 1.1, 1.45], ["crystal-championship-trophy", 1.1, 1.0], ["tall-bookcase", 2.3, 1.45], ["reception-counter", 5.2, 1.55],
              ["office-plant", 0.1, 1.45], ["potted-plant", 8.05, 12.9], ["office-plant", 7.6, 6.0], ["office-plant", 7.6, 9.0], ["office-plant", 0.1, 12.9]] }
  ];

  let canvas, ctx, overlay, wrap;
  let DPR = 1, P = 1, OXd = 0, OYd = 0; // P = device pixels per art pixel; offsets in device px
  let tier = 0, layout = LAYOUTS[0];
  const M = 12; // margin around room (art px)
  let staff = [], ceo = null, client = null;
  let t = 0, last = 0, particles = [];
  let tombs = 0, gear = [];
  let onStaffTap = null, onCeoTap = null, insetFn = null;
  let monitors = [], tickerEl = null, tickerTrack = null;

  function init(opts) {
    wrap = opts.wrap; canvas = opts.canvas; overlay = opts.overlay;
    onStaffTap = opts.onStaffTap; onCeoTap = opts.onCeoTap; insetFn = opts.bottomInset;
    ctx = canvas.getContext("2d");
    // stock ticker scrolling along the top of the office
    tickerEl = document.createElement("div"); tickerEl.id = "ticker";
    tickerTrack = document.createElement("div"); tickerTrack.className = "track";
    tickerEl.appendChild(tickerTrack); wrap.appendChild(tickerEl);
    tickerTrack.addEventListener("animationiteration", () => { if (tickerTrack.dataset.next) { tickerTrack.innerHTML = tickerTrack.dataset.next; delete tickerTrack.dataset.next; } });
    // re-measure whenever the play area changes size: first layout on iPhone home-screen apps,
    // fonts finishing loading, rotation, toolbars appearing. Measuring only once left the office tiny.
    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", () => setTimeout(resize, 250));
    document.addEventListener("visibilitychange", () => { if (!document.hidden) resize(); });
    if (window.ResizeObserver) new ResizeObserver(() => resize()).observe(wrap);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(resize);
    [100, 400, 1200].forEach(ms => setTimeout(resize, ms));
    canvas.addEventListener("pointerdown", handleTap);
    resize();
    requestAnimationFrame(loop);
  }

  let lastW = 0, lastH = 0;
  function resize() {
    const w = wrap.clientWidth, h = wrap.clientHeight;
    if (!w || !h) return;
    DPR = window.devicePixelRatio || 1;
    if (w === lastW && h === lastH && canvas.width === Math.round(w * DPR)) { camera(); return; }
    lastW = w; lastH = h;
    canvas.width = Math.round(w * DPR); canvas.height = Math.round(h * DPR);
    canvas.style.width = w + "px"; canvas.style.height = h + "px";
    overlay.style.width = w + "px"; overlay.style.height = h + "px";
    camera();
  }

  function camera() {
    if (!canvas) return;
    const W = layout.w * T + M * 2, H = layout.h * T + M * 2;
    // fill the screen: zoom to fit (not just whole steps); the stats card may float over the bottom lounge
    const inset = Math.round((insetFn ? insetFn() : 0) * DPR * 0.35);
    const top = Math.round(24 * DPR);                                      // the ticker strip
    const usableH = canvas.height - inset - top;
    P = Math.max(1, Math.min(canvas.width / W, usableH / H));
    OXd = Math.round((canvas.width - W * P) / 2);
    OYd = top + Math.max(0, Math.round((usableH - H * P) / 2));
  }

  function setOffice(newTier, staffList) {
    tier = Math.min(newTier, LAYOUTS.length - 1);
    layout = LAYOUTS[tier];
    camera();
    staff = staffList.map(s => ({ species: s.species, v: s.v, mood: "ok", jump: 0, name: s.name,
      away: false, x: 0, y: 0, path: [], walking: false, flip: false, speed: 70, alert: false, typing: 0, stepT: 0, onArrive: null }));
    monitors = wallMonitorCols();
  }
  function xpFloat(i, text) {
    const a = i === -1 || i == null ? ceoAnchor() : staffAnchor(i);
    floatText(a.x + 16, a.y - 8, text, "xp", 1400);
  }
  // sizes, for feedback notes about layout
  function debugInfo() {
    return { scene: [lastW, lastH], canvas: [canvas.width, canvas.height], dpr: DPR, zoom: +P.toFixed(2), office: layout.name, viewport: [window.innerWidth, window.innerHeight] };
  }
  function setCeo(v) { ceo = { species: "black-cat", v: v || 0, jump: 0, ceo: true }; }
  function setTrophies(n, g) { tombs = n; gear = g || []; }
  function setMoods(moods) { moods.forEach((m, i) => { if (staff[i]) staff[i].mood = m; }); }

  // wall columns free of doors, windows, columns and tall furniture, for the market screens
  function wallMonitorCols() {
    const busy = new Set([layout.door.col].concat(layout.windows || [], layout.columns || []));
    // tall furniture against the wall blocks a screen; plants can stand in front of one
    layout.decor.forEach(([n, x, foot]) => { if (foot < 2 && !/plant/.test(n)) { busy.add(Math.floor(x)); busy.add(Math.floor(x + 0.9)); } });
    const free = []; for (let c = 0; c < layout.w; c++) if (!busy.has(c)) free.push(c);
    return free.slice(0, tier >= 2 ? 3 : 2);
  }

  // ---------- coordinates (art px, room origin = M,M) ----------
  const rx = x => M + Math.round(x * T), ry = y => M + Math.round(y * T);
  function deskPos(i) { const d = layout.desks[i]; return { x: rx(d.x), y: ry(d.y) }; }
  function seatOf(dx, dy, deskName) { return { x: dx + (deskName === "compact-study-desk" ? 7 : 0), y: dy - 19 }; }
  function staffAnchor(i) { const d = deskPos(i); return seatOf(d.x, d.y, layout.deskType); }
  function ceoAnchor() { return seatOf(rx(layout.ceo.x), ry(layout.ceo.y), layout.ceo.desk); }
  function toCss(x, y) { return { x: (OXd + x * P) / DPR, y: (OYd + y * P) / DPR }; }

  // ---------- loop ----------
  function loop(now) {
    const dt = Math.min(0.05, (now - last) / 1000 || 0);
    last = now; t += dt;
    update(dt); draw();
    requestAnimationFrame(loop);
  }

  function moveAlong(w, dt) {
    if (!w.path.length) return;
    const target = w.path[0];
    const dx = target.x - w.x, dy = target.y - w.y;
    const dist = Math.hypot(dx, dy), step = w.speed * dt;
    w.walking = true;
    if (Math.abs(dx) > 0.5) w.flip = dx < 0;
    if (dist <= step) {
      w.x = target.x; w.y = target.y; w.path.shift();
      if (!w.path.length) { w.walking = false; const cb = w.onArrive; w.onArrive = null; cb && cb(); }
    } else { w.x += dx / dist * step; w.y += dy / dist * step; }
  }

  function update(dt) {
    staff.forEach(s => {
      s.jump = Math.max(0, s.jump - dt * 2.5);
      s.typing = Math.max(0, s.typing - dt);
      if (s.away) {
        moveAlong(s, dt);
        if (s.walking) { s.stepT -= dt; if (s.stepT <= 0) { s.stepT = 0.32; window.Sfx && Sfx.step(true, 0.25); } }
      }
    });
    if (ceo) ceo.jump = Math.max(0, ceo.jump - dt * 2.5);
    if (client) {
      client.fade = Math.min(1, client.fade + dt * 4);
      if (client.path.length) {
        const target = client.path[0];
        const dx = target.x - client.x, dy = target.y - client.y;
        const dist = Math.hypot(dx, dy), step = client.speed * dt;
        client.walking = true;
        if (Math.abs(dx) > 0.5) client.flip = dx < 0;
        if (dist <= step) {
          client.x = target.x; client.y = target.y; client.path.shift();
          if (!client.path.length) { client.walking = false; const cb = client.onArrive; client.onArrive = null; cb && cb(); }
        } else { client.x += dx / dist * step; client.y += dy / dist * step; }
      }
    }
    staff.forEach((s, i) => {
      if (s.away) return;
      if (s.typing > 0 && Math.random() < dt * 6) {
        const d = deskPos(i);
        particles.push({ x: d.x + 9 + Math.random() * 14, y: d.y + 6, vy: -10, life: 0.25, age: 0, kind: "spark" });
      }
      if (s.mood === "fire" && Math.random() < dt * 45) {
        const a = staffAnchor(i);
        particles.push({ x: a.x + 8 + Math.random() * 16, y: a.y + 18, vy: -18 - Math.random() * 22, life: 0.5 + Math.random() * 0.4, age: 0, kind: "flame" });
      }
      if (s.mood === "sleepy" && Math.random() < dt * 0.45) { const a = staffAnchor(i); floatText(a.x + 22, a.y + 4, "z", "zz", 1700); }
    });
    particles.forEach(p => { p.age += dt; p.y += p.vy * dt; if (p.vx) p.x += p.vx * dt; if (p.g) p.vy += p.g * dt; });
    particles = particles.filter(p => p.age < p.life);
  }

  // ---------- drawing ----------
  function hash(a, b) { return ((a * 73856093) ^ (b * 19349663)) >>> 0; }

  function drawRoom() {
    const W = layout.w * T, H = layout.h * T;
    // floor
    for (let ty = 1; ty < layout.h; ty++) for (let tx = 0; tx < layout.w; tx++)
      Sprites.tile(ctx, layout.floor, hash(tx, ty + tier * 7) % 4, M + tx * T, M + ty * T);
    // back wall
    for (let tx = 0; tx < layout.w; tx++) Sprites.tile(ctx, "wall", hash(tx, 99) % 4, M + tx * T, M);
    (layout.windows || []).forEach(c => Sprites.draw(ctx, "wide-glass-wall-panel", M + c * T, M + 1));
    // wall screens: market charts that flip between up and down days, each on its own rhythm
    monitors.forEach((c, k) => {
      const up = Math.floor((t + k * 2.3) / (4 + k * 1.7)) % 3 !== 1;
      Sprites.draw(ctx, up ? "monitor-rising-chart" : "monitor-falling-chart", M + c * T, M - 1);
      if (Math.floor(t * 2 + k) % 2) { ctx.fillStyle = up ? "#5be38455" : "#ff5d5d55"; ctx.fillRect(M + c * T + 9, M + 6, 14, 2); }
    });
    (layout.columns || []).forEach(c => Sprites.draw(ctx, "wall-column", M + c * T, M + 2));
    Sprites.draw(ctx, layout.door.type, M + layout.door.col * T, M + 1);
    ctx.fillStyle = "#c2bebc"; ctx.fillRect(M, M + T - 2, W, 2);           // baseboard
    ctx.fillStyle = "#00000022"; ctx.fillRect(M, M + T, W, 3);             // wall shadow on floor
    ctx.fillStyle = "#585e6f"; ctx.fillRect(M, M - 3, W, 3);               // top trim
    // deal tombstones: little gold plaques along the wall, skipping doors and windows
    const blocked = new Set([layout.door.col].concat(layout.windows || [], layout.columns || [], monitors));
    let placed = 0;
    for (let row = 0; row < 2 && placed < tombs; row++) {
      for (let x = 4; x + 6 <= W - 4 && placed < tombs; x += 8) {
        const col = Math.floor((x + 3) / T);
        if (blocked.has(col)) continue;
        const px = M + x, py = M + 3 + row * 9;
        ctx.fillStyle = "#0b1120"; ctx.fillRect(px, py, 6, 8);
        ctx.fillStyle = "#e8b43a"; ctx.fillRect(px + 1, py + 1, 4, 6);
        ctx.fillStyle = "#1d3255"; ctx.fillRect(px + 2, py + 2, 2, 2);
        placed++;
      }
    }
    // outer frame
    ctx.fillStyle = "#0b1120";
    ctx.fillRect(M - 3, M - 3, 3, H + 6); ctx.fillRect(M + W, M - 3, 3, H + 6);
    ctx.fillRect(M - 3, M - 6, W + 6, 3); ctx.fillRect(M - 3, M + H, W + 6, 3);
  }

  function drawSeated(who, a, deskName, dx, dy, i) {
    const items = [];
    const sleepy = who.mood === "sleepy";
    const tt = t + (i || 0) * 0.37;
    const bob = sleepy ? 2 : (Math.floor(tt * 3) % 2 ? -1 : 0);
    const hop = Math.round(Math.sin(who.jump * Math.PI) * 7);
    items.push({ y: dy - 1, fn: () => Sprites.draw(ctx, "office-chair-front", a.x, dy - 15) });
    items.push({ y: dy, fn: () => {
      Sprites.cow(ctx, who.species, who.v, a.x, a.y + bob - hop);
      if (who.ceo) crown(a.x, a.y + bob - hop);
    } });
    items.push({ y: dy + 1, fn: () => Sprites.draw(ctx, deskName, dx, dy) });
    return items;
  }

  // a little pixel "!" speech box: this analyst has something for you
  function alertMark(x, y) {
    ctx.fillStyle = "#0b1120"; ctx.fillRect(x - 1, y - 1, 9, 12);
    ctx.fillStyle = "#ffe27a"; ctx.fillRect(x, y, 7, 10);
    ctx.fillStyle = "#0b1120"; ctx.fillRect(x + 3, y + 2, 2, 4); ctx.fillRect(x + 3, y + 7, 2, 2);
    ctx.fillStyle = "#ffe27a"; ctx.fillRect(x + 1, y + 10, 2, 2);
  }

  function crown(x, y) {
    ctx.fillStyle = "#0b1120"; ctx.fillRect(x + 11, y + 3, 9, 4);
    ctx.fillStyle = "#e8b43a"; ctx.fillRect(x + 12, y + 4, 7, 2); ctx.fillRect(x + 12, y + 2, 1, 2); ctx.fillRect(x + 15, y + 1, 1, 3); ctx.fillRect(x + 18, y + 2, 1, 2);
  }

  function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = Sprites.OUTSIDE; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(P, 0, 0, P, OXd, OYd);
    ctx.imageSmoothingEnabled = false;
    drawRoom();

    let items = [];
    layout.decor.forEach(([name, x, foot]) => {
      const fy = ry(foot);
      items.push({ y: fy, fn: () => Sprites.draw(ctx, name, rx(x), fy - (BOTTOM[name] || 30)) });
    });
    // Pitch Day gear sits in a row near the bottom of the office
    gear.forEach((name, k) => {
      const gx = 0.35 + k * 1.1, foot = layout.h - 1.35;
      const fy = ry(foot);
      items.push({ y: fy, fn: () => Sprites.draw(ctx, name, rx(gx), fy - (BOTTOM[name] || 30)) });
    });
    const cd = { x: rx(layout.ceo.x), y: ry(layout.ceo.y) };
    if (ceo) items = items.concat(drawSeated(ceo, ceoAnchor(), layout.ceo.desk, cd.x, cd.y, 9));
    layout.desks.forEach((d, i) => {
      const dp = deskPos(i), s = staff[i];
      if (s && !s.away) {
        items = items.concat(drawSeated(s, staffAnchor(i), layout.deskType, dp.x, dp.y, i));
        if (s.alert) items.push({ y: 9999, fn: () => alertMark(staffAnchor(i).x + 18, staffAnchor(i).y - 10) });
      } else if (s) {
        // out of their seat: empty chair at the desk, the analyst walking the floor
        items.push({ y: dp.y - 1, fn: () => Sprites.draw(ctx, "office-chair-front", staffAnchor(i).x, dp.y - 15) });
        items.push({ y: dp.y + 1, fn: () => Sprites.draw(ctx, layout.deskType, dp.x, dp.y) });
        const bob = s.walking ? (Math.floor(t * 8 + i) % 2 ? -1 : 0) : 0, hop = Math.round(Math.sin(s.jump * Math.PI) * 7);
        items.push({ y: s.y + 31, fn: () => Sprites.cow(ctx, s.species, s.v, s.x, s.y + bob - hop, { flip: s.flip }) });
        if (s.alert) items.push({ y: 9999, fn: () => alertMark(s.x + 18, s.y - 10 + (Math.floor(t * 3) % 2 ? -1 : 0)) });
      } else items.push({ y: dp.y + 1, fn: () => Sprites.draw(ctx, layout.deskType, dp.x, dp.y, { alpha: 0.45 }) });
    });
    if (client) {
      const bob = client.walking ? (Math.floor(t * 9) % 2 ? -1 : 0) : 0;
      items.push({ y: client.y + 31, fn: () => Sprites.draw(ctx, client.animal, client.x, client.y + bob, { flip: client.flip, alpha: client.fade }) });
    }
    items.sort((a, b) => a.y - b.y).forEach(it => it.fn());

    particles.forEach(p => {
      const k = 1 - p.age / p.life;
      if (p.kind === "flame") {
        ctx.fillStyle = k > 0.6 ? "#ffe066" : k > 0.3 ? "#ff9f1c" : "#e63946";
        const sz = k > 0.5 ? 3 : 2; ctx.fillRect(Math.round(p.x), Math.round(p.y), sz, sz);
      } else if (p.kind === "spark") {
        ctx.fillStyle = "#9fe7ff"; ctx.fillRect(Math.round(p.x), Math.round(p.y), 1, 1);
      } else if (p.kind === "confetti") {
        ctx.fillStyle = p.c; ctx.fillRect(Math.round(p.x), Math.round(p.y), 2, Math.floor(p.age * 10) % 2 ? 1 : 3);
      } else {
        ctx.fillStyle = "#7a5410"; ctx.fillRect(Math.round(p.x) - 1, Math.round(p.y) - 1, 5, 5);
        ctx.fillStyle = "#e8b43a"; ctx.fillRect(Math.round(p.x), Math.round(p.y), 3, 3);
      }
    });
  }

  // ---------- overlay effects ----------
  function floatText(x, y, text, cls = "", ms = 1100) {
    const el = document.createElement("div");
    el.className = "float " + cls; el.textContent = text;
    const c = toCss(x, y); el.style.left = c.x + "px"; el.style.top = c.y + "px";
    el.style.animationDuration = ms + "ms";
    overlay.appendChild(el); setTimeout(() => el.remove(), ms);
  }
  function bubble(x, y, text, ms = 1500) {
    const el = document.createElement("div");
    el.className = "bubble"; el.textContent = text;
    const c = toCss(x, y); el.style.left = c.x + "px"; el.style.top = c.y + "px";
    overlay.appendChild(el);
    setTimeout(() => el.classList.add("out"), ms - 200); setTimeout(() => el.remove(), ms);
  }
  function staffSay(i, text, ms) { const a = i === -1 ? ceoAnchor() : staffAnchor(i); bubble(a.x + 16, a.y + 4, text, ms); }
  function reward(i, text) {
    const a = staffAnchor(i);
    if (staff[i]) staff[i].jump = 1;
    floatText(a.x + 16, a.y + 2, text, "money", 1300);
    for (let k = 0; k < 9; k++) particles.push({ x: a.x + 15, y: a.y + 10, vx: (Math.random() - 0.5) * 90, vy: -60 - Math.random() * 60, g: 260, life: 0.8, age: 0, kind: "coin" });
  }
  function ceoCheer() { if (ceo) ceo.jump = 1; }

  // ---------- staff on the move ----------
  // where an analyst stands when out of their seat, by desk i
  const deskFront = i => { const d = deskPos(i); return { x: d.x, y: d.y + 18 }; };
  const corridorY = () => ry(layout.ceo.y) + 22;
  function route(from, to) {
    const ax = from.x + 30, cy = corridorY();   // the gap to the right of the desk
    return [{ x: ax, y: from.y }, { x: ax, y: cy }, { x: to.x, y: cy }, to];
  }
  function spot(kind, j) {
    if (kind === "ceo") return { x: rx(layout.ceo.x) - 26, y: ry(layout.ceo.y) + 4 };
    if (kind === "desk" && layout.desks[j]) { const f = deskFront(j); return { x: f.x + 24, y: f.y - 2 }; }
    // the printer / filing cabinet by the back wall
    const cab = layout.decor.find(([n, , foot]) => n === "low-cabinet" && foot < 2) || layout.decor[0];
    return { x: rx(cab[1]), y: ry(cab[2]) - 8 };
  }
  // send analyst i somewhere ("ceo", "desk" j, "printer"); resolves on arrival
  function walk(i, kind, j) {
    const s = staff[i]; if (!s) return Promise.resolve(false);
    return new Promise(resolve => {
      if (!s.away) { const f = deskFront(i); s.away = true; s.x = f.x; s.y = f.y; }
      s.speed = 62 + (i % 3) * 6;
      s.path = route({ x: s.x, y: s.y }, spot(kind, j));
      s.onArrive = () => { s.flip = kind === "ceo" ? false : s.flip; resolve(true); };
    });
  }
  function goBack(i) {
    const s = staff[i]; if (!s || !s.away) return Promise.resolve();
    return new Promise(resolve => {
      const f = deskFront(i), cy = corridorY();
      s.path = [{ x: s.x, y: cy }, { x: f.x + 30, y: cy }, { x: f.x + 30, y: f.y }, f];
      s.onArrive = () => { s.away = false; s.alert = false; resolve(); };
    });
  }
  const isAway = i => !!(staff[i] && staff[i].away);
  function setAlert(i, on) { if (staff[i]) staff[i].alert = !!on; }
  function typing(i, sec) { if (staff[i] && !staff[i].away) staff[i].typing = sec; }
  function stretch(i) { if (staff[i] && !staff[i].away) staff[i].jump = 0.6; }
  // where an analyst is right now, in page pixels (for bubbles and coins flying to the cash counter)
  function staffPoint(i) {
    const s = staff[i];
    const p = !s ? ceoAnchor() : s.away ? { x: s.x, y: s.y } : staffAnchor(i);
    const c = toCss(p.x + 16, p.y + 8), r = canvas.getBoundingClientRect();
    return { x: c.x + r.left, y: c.y + r.top };
  }
  function say(i, text, ms = 1600) {
    const s = staff[i]; if (!s) return;
    if (s.away) bubble(s.x + 16, s.y + 2, text, ms); else staffSay(i, text, ms);
  }
  // the whole office celebrates: everyone jumps, confetti falls
  function cheer() {
    staff.forEach(s => { s.jump = 1; }); if (ceo) ceo.jump = 1;
    const cols = ["#ffe27a", "#5be384", "#7cc4ff", "#ff7aa8", "#ffffff"];
    for (let k = 0; k < 70; k++) particles.push({ x: M + Math.random() * layout.w * T, y: M - 4 - Math.random() * 30, vx: (Math.random() - 0.5) * 30, vy: 20 + Math.random() * 30, g: 40, life: 2.2 + Math.random(), age: 0, kind: "confetti", c: cols[k % cols.length] });
  }
  // the scrolling ticker: items are { sym, px, ch }
  function setTicker(items) {
    if (!tickerTrack) return;
    const html = items.map(it => `<span class="${it.ch >= 0 ? "up" : "dn"}${it.mine ? " mine" : ""}"><b>${it.sym}</b> ${it.px.toFixed(2)} ${it.ch >= 0 ? "▲" : "▼"}${Math.abs(it.ch).toFixed(1)}%</span>`).join("");
    // swap the text only when the scroll loops back, so it never jumps mid-read
    if (!tickerTrack.innerHTML) tickerTrack.innerHTML = html + html;   // twice, so the scroll loops without a gap
    else tickerTrack.dataset.next = html + html;
  }
  function tickerFlash(text) {
    if (!tickerEl) return;
    const el = document.createElement("div"); el.className = "flash"; el.textContent = text;
    tickerEl.appendChild(el); setTimeout(() => el.remove(), 4200);
  }

  // ---------- client visits ----------
  function clientVisit(i, animal) {
    return new Promise(resolve => {
      const d = deskPos(i);
      const doorX = rx(layout.door.col), lane = ry(1.05);
      const aisleX = d.x - 22, front = d.y + 18;
      client = { x: doorX, y: ry(0.15), animal, speed: 230, walking: true, flip: false, fade: 0,
        path: [{ x: doorX, y: lane }, { x: aisleX, y: lane }, { x: aisleX, y: front }, { x: d.x, y: front }],
        onArrive: () => { client.flip = false; resolve(); } };
    });
  }
  function clientLeave() {
    if (!client) return;
    const doorX = rx(layout.door.col), lane = ry(1.05);
    const aisleX = client.x - 22;
    client.path = [{ x: aisleX, y: client.y }, { x: aisleX, y: lane }, { x: doorX, y: lane }, { x: doorX, y: ry(0.15) }];
    client.speed = 270;
    client.onArrive = () => { client = null; };
  }

  // what is under a screen point, for feedback notes
  function describeAt(clientX, clientY) {
    const r = canvas.getBoundingClientRect();
    const x = ((clientX - r.left) * DPR - OXd) / P, y = ((clientY - r.top) * DPR - OYd) / P;
    const hit = a => x >= a.x + 4 && x <= a.x + 28 && y >= a.y && y <= a.y + 46;
    for (let i = 0; i < staff.length; i++) if (hit(staffAnchor(i))) return { label: "Office: " + staff[i].name + " (desk " + (i + 1) + ")", element: "scene" };
    if (hit(ceoAnchor())) return { label: "Office: the CEO (you)", element: "scene" };
    const tx = ((x - M) / T).toFixed(1), ty = ((y - M) / T).toFixed(1);
    return { label: `Office: ${layout.name}, tile ${tx}, ${ty}${ty < 1 ? " (back wall)" : ""}`, element: "scene", tile: [+tx, +ty] };
  }

  // ---------- taps ----------
  function handleTap(e) {
    const r = canvas.getBoundingClientRect();
    const x = ((e.clientX - r.left) * DPR - OXd) / P, y = ((e.clientY - r.top) * DPR - OYd) / P;
    const hit = a => x >= a.x + 4 && x <= a.x + 28 && y >= a.y && y <= a.y + 46;
    // analysts out of their seat first (a walk-up waiting by your desk is the likely tap)
    for (let i = 0; i < staff.length; i++) if (staff[i].away && hit({ x: staff[i].x, y: staff[i].y - 8 })) { onStaffTap && onStaffTap(i); return; }
    for (let i = 0; i < staff.length; i++) if (!staff[i].away && hit(staffAnchor(i))) { onStaffTap && onStaffTap(i); return; }
    if (hit(ceoAnchor())) onCeoTap && onCeoTap();
  }

  return { init, setOffice, setCeo, xpFloat, debugInfo, setTrophies, describeAt, setMoods, reward, staffSay, ceoCheer, clientVisit, clientLeave, floatText, resize, LAYOUTS,
    walk, goBack, isAway, setAlert, typing, stretch, staffPoint, say, cheer, setTicker, tickerFlash, get staffCount() { return staff.length; } };
})();
