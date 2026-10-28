// Art layer built on the Finance Pixel Pack ("The Climb"): four 128x128 sheets,
// 4x4 grid of 32x32 cells, plus tiles.png (floor/wall textures in the same palette).

window.Sprites = (function () {
  const OUTSIDE = "#16233d";
  const SHEETS = {
    env:   { src: "assets/environment-sheet.png", names: ["single-glass-office-door", "double-glass-entry-door", "wide-glass-wall-panel", "marble-wall-tile", "dark-navy-floor-tile", "pale-marble-floor-tile", "wall-column", "reception-counter", "straight-trading-desk", "curved-trading-desk", "compact-study-desk", "office-chair-front", "office-chair-rear", "low-cabinet", "tall-bookcase", "office-plant"] },
    props: { src: "assets/study-props-sheet.png", names: ["monitor-rising-chart", "monitor-falling-chart", "multi-monitor-terminal", "chart-laptop", "financial-calculator", "study-book-stack", "notebook-and-pen", "flash-card-stack", "analyst-briefcase", "locked-document-case", "bond-certificate-scroll", "pie-chart-report", "bar-chart-report", "desk-lamp", "coffee-mug", "potted-plant"] },
    prog:  { src: "assets/progression-sheet.png", names: ["bronze-peak-badge", "silver-peak-badge", "gold-peak-badge", "platinum-peak-badge", "bronze-laurel-trophy", "silver-laurel-trophy", "gold-laurel-trophy", "crystal-championship-trophy", "locked-vault", "open-vault", "growth-shield", "check-shield", "weak-mastery-card", "learned-mastery-card", "mastered-card", "radar-pass-meter"] },
    chars: { src: "assets/characters-sheet.png", names: ["owl", "bull", "black-cat", "wolf", "turtle", "rabbit", "lion", "tiger", "alligator", "bear", "dove", "horse", "fox", "snake"] },
    clients: { src: "assets/clients-sheet.png", names: ["penguin", "pig", "panda", "giraffe", "raccoon", "sheep"] },
    tiles: { src: "assets/tiles.png" }
  };
  const INDEX = {}; // name -> { sheet, i }
  Object.entries(SHEETS).forEach(([k, s]) => (s.names || []).forEach((n, i) => { INDEX[n] = { sheet: k, i }; }));

  // coworker pack: one 128x64 sheet per species, 5 variants (4 on row 1, 1 on row 2)
  const COW = ["owl", "bull", "black-cat", "wolf", "turtle", "rabbit", "lion", "tiger", "alligator", "bear", "dove", "horse", "fox", "snake"];
  COW.forEach(sp => { SHEETS["cow:" + sp] = { src: "assets/coworkers/" + sp + "-coworkers.png" }; });

  const imgs = {};
  let ready = false;
  function load() {
    return Promise.all(Object.entries(SHEETS).map(([k, s]) => new Promise(res => {
      const im = new Image(); im.onload = () => res(); im.onerror = () => res(); im.src = s.src; imgs[k] = im;
    }))).then(() => { ready = true; });
  }

  // draw coworker variant v (0-4) of a species
  function cow(ctx, species, v, x, y, o = {}) {
    const im = imgs["cow:" + species]; if (!im || !im.naturalWidth) return;
    const sx = (v % 4) * 32, sy = Math.floor(v / 4) * 32;
    if (o.alpha != null) ctx.globalAlpha = o.alpha;
    if (o.flip) {
      ctx.save(); ctx.translate(Math.round(x) + 32, Math.round(y)); ctx.scale(-1, 1);
      ctx.drawImage(im, sx, sy, 32, 32, 0, 0, 32, 32); ctx.restore();
    } else ctx.drawImage(im, sx, sy, 32, 32, Math.round(x), Math.round(y), 32, 32);
    if (o.alpha != null) ctx.globalAlpha = 1;
  }

  // draw a named 32x32 cell. opts: flip, alpha, sx/sy/sw/sh (sub-rect inside the cell)
  function draw(ctx, name, x, y, o = {}) {
    const e = INDEX[name]; if (!e) return;
    const im = imgs[e.sheet]; if (!im || !im.naturalWidth) return;
    const cx = (e.i % 4) * 32 + (o.sx || 0), cy = Math.floor(e.i / 4) * 32 + (o.sy || 0);
    const w = o.sw || 32, h = o.sh || 32;
    if (o.alpha != null) ctx.globalAlpha = o.alpha;
    if (o.flip) {
      ctx.save(); ctx.translate(Math.round(x) + w, Math.round(y)); ctx.scale(-1, 1);
      ctx.drawImage(im, cx, cy, w, h, 0, 0, w, h); ctx.restore();
    } else ctx.drawImage(im, cx, cy, w, h, Math.round(x), Math.round(y), w, h);
    if (o.alpha != null) ctx.globalAlpha = 1;
  }

  // tiles.png rows: 0 navy carpet, 1 marble floor, 2 marble wall; 4 variants each
  function tile(ctx, kind, variant, x, y) {
    const im = imgs.tiles; if (!im || !im.naturalWidth) return;
    const row = { navy: 0, marble: 1, wall: 2 }[kind] || 0;
    ctx.drawImage(im, (variant % 4) * 32, row * 32, 32, 32, x, y, 32, 32);
  }

  // HTML <img> data URLs for windows (crisp nearest-neighbour upscale)
  const urlCache = {};
  function url(name, scale = 2) {
    const key = name + "@" + scale;
    if (urlCache[key]) return urlCache[key];
    const c = document.createElement("canvas"); c.width = 32 * scale; c.height = 32 * scale;
    const g = c.getContext("2d"); g.imageSmoothingEnabled = false; g.scale(scale, scale);
    draw(g, name, 0, 0);
    return (urlCache[key] = c.toDataURL());
  }

  function cowUrl(species, v, scale = 2) {
    const key = "cow:" + species + v + "@" + scale;
    if (urlCache[key]) return urlCache[key];
    const c = document.createElement("canvas"); c.width = 32 * scale; c.height = 32 * scale;
    const g = c.getContext("2d"); g.imageSmoothingEnabled = false; g.scale(scale, scale);
    cow(g, species, v, 0, 0);
    return (urlCache[key] = c.toDataURL());
  }

  return { OUTSIDE, load, draw, tile, url, cow, cowUrl, get ready() { return ready; } };
})();
