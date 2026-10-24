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

  function init(opts) {
    wrap = opts.wrap; canvas = opts.canvas; overlay = opts.overlay;
    onStaffTap = opts.onStaffTap; onCeoTap = opts.onCeoTap; insetFn = opts.bottomInset;
    ctx = canvas.getContext("2d");
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointerdown", handleTap);
    resize();
    requestAnimationFrame(loop);
  }

  function resize() {
    const w = wrap.clientWidth, h = Math.max(200, wrap.clientHeight);
    DPR = window.devicePixelRatio || 1;
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
    const usableH = canvas.height - inset;
    P = Math.max(1, Math.min(canvas.width / W, usableH / H));
    OXd = Math.round((canvas.width - W * P) / 2);
    OYd = Math.max(0, Math.round((usableH - H * P) / 2));
  }

  function setOffice(newTier, staffList) {
    tier = Math.min(newTier, LAYOUTS.length - 1);
    layout = LAYOUTS[tier];
    camera();
    staff = staffList.map(s => ({ species: s.species, v: s.v, mood: "ok", jump: 0, name: s.name }));
  }
  function setCeo(v) { ceo = { species: "black-cat", v: v || 0, jump: 0, ceo: true }; }
  function setTrophies(n, g) { tombs = n; gear = g || []; }
  function setMoods(moods) { moods.forEach((m, i) => { if (staff[i]) staff[i].mood = m; }); }

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

  function update(dt) {
    staff.forEach(s => { s.jump = Math.max(0, s.jump - dt * 2.5); });
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
    (layout.columns || []).forEach(c => Sprites.draw(ctx, "wall-column", M + c * T, M + 2));
    Sprites.draw(ctx, layout.door.type, M + layout.door.col * T, M + 1);
    ctx.fillStyle = "#c2bebc"; ctx.fillRect(M, M + T - 2, W, 2);           // baseboard
    ctx.fillStyle = "#00000022"; ctx.fillRect(M, M + T, W, 3);             // wall shadow on floor
    ctx.fillStyle = "#585e6f"; ctx.fillRect(M, M - 3, W, 3);               // top trim
    // deal tombstones: little gold plaques along the wall, skipping doors and windows
    const blocked = new Set([layout.door.col].concat(layout.windows || [], layout.columns || []));
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
      const dp = deskPos(i);
      if (staff[i]) items = items.concat(drawSeated(staff[i], staffAnchor(i), layout.deskType, dp.x, dp.y, i));
      else items.push({ y: dp.y + 1, fn: () => Sprites.draw(ctx, layout.deskType, dp.x, dp.y, { alpha: 0.45 }) });
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
    for (let i = 0; i < staff.length; i++) if (hit(staffAnchor(i))) { onStaffTap && onStaffTap(i); return; }
    if (hit(ceoAnchor())) onCeoTap && onCeoTap();
  }

  return { init, setOffice, setCeo, setTrophies, describeAt, setMoods, reward, staffSay, ceoCheer, clientVisit, clientLeave, floatText, resize, LAYOUTS };
})();
