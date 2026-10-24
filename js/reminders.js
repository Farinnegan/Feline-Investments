// Home-screen app support and phone reminders.
// - registers the service worker (offline play + notifications)
// - keeps a tiny summary (reviews due per day) where the service worker can read it
// - turns on push reminders and hands the reminder code to GitHub, where a daily
//   GitHub Action sends the notifications
window.Reminders = (function () {
  const VAPID_PUBLIC = "BLeJmT93eQjkGnZ3TVeD0zS_-AJMRrzuE4H7l5sUFN1Onf1u4j154xgB62ifqmhhfDlQXTBWvA43Y_YlcMU7hdQ";
  const REPO = "https://github.com/Farinnegan/Feline-Investments";
  let reg = null;

  const supported = () => "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
  const installed = () => window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  async function init() {
    if (!("serviceWorker" in navigator)) return;
    try {
      reg = await navigator.serviceWorker.register("sw.js");
      if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
    } catch (e) { reg = null; } // claude.ai artifacts and file:// can't run service workers
  }

  async function writeSummary(sum) {
    try { const c = await caches.open("fi-summary"); await c.put("summary.json", new Response(JSON.stringify(sum), { headers: { "Content-Type": "application/json" } })); } catch (e) {}
  }

  function b64ToBytes(b64) {
    const pad = "=".repeat((4 - b64.length % 4) % 4);
    const raw = atob((b64 + pad).replace(/-/g, "+").replace(/_/g, "/"));
    return Uint8Array.from(raw, c => c.charCodeAt(0));
  }

  async function status() {
    if (!supported() || !reg) return { state: "unsupported" };
    if (isIOS() && !installed()) return { state: "install" };
    if (Notification.permission === "denied") return { state: "denied" };
    const sub = await reg.pushManager.getSubscription();
    return sub ? { state: "on", sub } : { state: "off" };
  }

  // must be called from a tap
  async function enable() {
    const perm = await Notification.requestPermission();
    if (perm !== "granted") return null;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ToBytes(VAPID_PUBLIC) });
    return sub;
  }

  async function test() {
    if (!reg) return;
    await reg.showNotification("Feline Investments", { body: "Reminders are on. You'll hear from the office each morning and evening.", icon: "assets/icons/icon-192.png" });
  }

  function reminderIssueUrl(sub) {
    const body = "This is the reminder code from my phone. The daily GitHub Action uses it to send study reminders.\n\n```json\n" + JSON.stringify(sub) + "\n```";
    return `${REPO}/issues/new?title=${encodeURIComponent("[reminder] phone")}&body=${encodeURIComponent(body)}`;
  }

  function notesIssueUrl(notes) {
    const lines = notes.map((n, i) => {
      const q = n.screen && n.screen.question;
      return `### ${i + 1}. ${n.kind}: ${n.text}\n- When: ${n.at}\n- Screen: ${n.screen ? n.screen.window : ""}` +
        (n.pointed ? `\n- Pointing at: ${n.pointed.label}` : "") +
        (q ? `\n- Question (${q.kind}, ${q.itemId}): ${q.prompt}\n- Options: ${q.options.join(" | ")}\n- Correct: ${q.answer}` : "");
    }).join("\n\n");
    let body = "Notes from the game for Claude to review.\n\n" + lines + "\n\n<details><summary>Raw</summary>\n\n```json\n" + JSON.stringify(notes) + "\n```\n</details>";
    if (body.length > 6500) body = "Notes from the game for Claude to review.\n\n" + lines.slice(0, 6200) + "\n\n(trimmed)";
    return `${REPO}/issues/new?title=${encodeURIComponent("[notes] " + new Date().toISOString().slice(0, 10))}&body=${encodeURIComponent(body)}`;
  }

  return { init, writeSummary, status, enable, test, reminderIssueUrl, notesIssueUrl, installed, isIOS, get ready() { return !!reg; } };
})();
