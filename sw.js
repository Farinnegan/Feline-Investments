// Service worker: works offline once opened, and shows daily study reminders.
// The reminder text is written here from the game's own saved summary, so it
// can say how many reviews are actually due today.
const CACHE = "fi-app-v10";
const SHELL = [
  "./", "index.html", "css/style.css", "manifest.webmanifest",
  "js/content.js", "js/content-fsa.js", "js/store.js", "js/audio.js", "js/sprites.js", "js/scene.js", "js/feedback.js", "js/reminders.js", "js/game.js",
  "assets/environment-sheet.png", "assets/study-props-sheet.png", "assets/progression-sheet.png", "assets/characters-sheet.png",
  "assets/clients-sheet.png", "assets/tiles.png", "assets/coworkers/black-cat-coworkers.png", "assets/coworkers/bull-coworkers.png", "assets/coworkers/wolf-coworkers.png",
  "assets/fonts/Lexend.ttf", "assets/fonts/AtkinsonHyperlegible-Regular.ttf", "assets/fonts/AtkinsonHyperlegible-Bold.ttf",
  "assets/icons/icon-192.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("fi-app-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// network first (so updates show up right away), cache as the offline fallback
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});

const dayNum = d => Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);

async function readSummary() {
  try { const r = await (await caches.open("fi-summary")).match("summary.json"); return r ? await r.json() : null; } catch (e) { return null; }
}

self.addEventListener("push", e => {
  let msg = {};
  try { msg = e.data ? e.data.json() : {}; } catch (err) { msg = {}; }
  e.waitUntil((async () => {
    const s = await readSummary();
    const today = dayNum(new Date());
    const left = s && s.examDay ? s.examDay - today : null;
    const tag = left > 0 ? `D-${left} · ` : "";
    let due = 0;
    if (s && s.dueByDay) for (const [d, n] of Object.entries(s.dueByDay)) if (+d <= today) due += n;
    const pitchReady = !s || s.pitchDay !== today;
    let title = "Feline Investments", body;
    if (msg.kind === "evening") {
      body = due ? `${tag}${due} review${due > 1 ? "s" : ""} still due. Clear them before the desk gets sleepy.`
        : pitchReady ? `${tag}Reviews are clear. Pitch Day is still waiting for you.` : `${tag}All clear today. Nice work, boss.`;
    } else {
      body = due ? `${tag}${due} review${due > 1 ? "s" : ""} due today${pitchReady ? ", and Pitch Day is ready" : ""}.`
        : `${tag}New concepts are waiting${pitchReady ? " and Pitch Day is ready" : ""}.`;
    }
    if (msg.body) body = msg.body;
    await self.registration.showNotification(msg.title || title, { body, icon: "assets/icons/icon-192.png", badge: "assets/icons/icon-192.png", tag: "daily", renotify: true });
  })());
});

self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    for (const c of list) if ("focus" in c) return c.focus();
    return self.clients.openWindow("./index.html");
  }));
});
