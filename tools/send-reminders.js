// Sends the daily push reminder to every phone that shared its reminder code
// (open GitHub issues titled "[reminder] ..."). The phone's service worker writes
// the actual message from the game's own data (reviews due, Pitch Day).
const webpush = require("web-push");

const VAPID_PUBLIC = "BPhEzBcitdODAKYAR6_UNIQ7bbpItW6KXtkVwBetT6HzWRfYNDjjZniD2M9hzUNUiWvNCDHpxVnfRPd-K9eZED4";
const { GITHUB_TOKEN, REPO, VAPID_PRIVATE_KEY, KIND } = process.env;

async function main() {
  if (!VAPID_PRIVATE_KEY) { console.log("VAPID_PRIVATE_KEY secret is missing."); process.exit(1); }
  webpush.setVapidDetails("https://farinnegan.github.io/Feline-Investments/", VAPID_PUBLIC, VAPID_PRIVATE_KEY);
  const res = await fetch(`https://api.github.com/repos/${REPO}/issues?state=open&per_page=100`, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github+json" }
  });
  const issues = await res.json();
  const subs = [];
  for (const is of issues) {
    if (!is.title || !is.title.startsWith("[reminder]") || is.pull_request) continue;
    const m = (is.body || "").match(/```json\s*([\s\S]*?)```/);
    if (!m) continue;
    try { subs.push({ issue: is.number, sub: JSON.parse(m[1]) }); } catch (e) { console.log(`Issue #${is.number}: code is not valid JSON`); }
  }
  console.log(`Sending ${KIND} reminder to ${subs.length} device(s).`);
  for (const { issue, sub } of subs) {
    try {
      await webpush.sendNotification(sub, JSON.stringify({ kind: KIND }), { TTL: 4 * 3600, urgency: "normal" });
      console.log(`Issue #${issue}: sent`);
    } catch (e) {
      console.log(`Issue #${issue}: failed (${e.statusCode || ""}) ${e.body || e.message}`);
    }
  }
}
main().catch(e => { console.error(e); process.exit(1); });
