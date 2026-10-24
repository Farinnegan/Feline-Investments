// Storage layer. Progress always saves on the device (localStorage). When the
// game runs as a claude.ai artifact it also saves to the artifact's database,
// so progress survives new versions, cleared browsers and switching devices.
// Feedback notes go to the same database so Claude can read them later.

window.Store = (function () {
  const SAVE_KEY = "felineInvestments.v2";      // never rename: old saves must keep loading
  const NOTES_KEY = "felineInvestments.notes";
  let db = null, uid = null, cloudReady = false;
  let writing = false, pending = null, timer = null;

  function readLocal() { try { const r = localStorage.getItem(SAVE_KEY); return r ? JSON.parse(r) : null; } catch (e) { return null; } }
  function writeLocal(S) { try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) {} }
  function readNotes() { try { return JSON.parse(localStorage.getItem(NOTES_KEY) || "[]"); } catch (e) { return []; } }
  function writeNotes(n) { try { localStorage.setItem(NOTES_KEY, JSON.stringify(n)); } catch (e) {} }

  // resolves within a few seconds either way; off claude.ai there is no window.claude at all
  async function init() {
    if (!window.claude || typeof window.claude.use !== "function") return false;
    const timeout = new Promise(r => setTimeout(() => r(null), 6000));
    try {
      const [d, u] = await Promise.race([Promise.all([claude.use("db"), claude.use("user")]), timeout.then(() => [null, null])]);
      if (!d || !u) return false;
      const id = await u.id();
      if (!id) return false;
      db = d; uid = id; cloudReady = true;
      flushNotes();
      return true;
    } catch (e) { return false; }
  }

  async function loadCloud() {
    if (!cloudReady) return null;
    try {
      const snap = await db.doc("saves/" + uid).get();
      return snap.exists ? JSON.parse(snap.data().json) : null;
    } catch (e) { return null; }
  }

  function save(S) {
    S.updatedAt = Date.now();
    writeLocal(S);
    if (!cloudReady) return;
    pending = S;
    clearTimeout(timer);
    timer = setTimeout(pushCloud, 1500); // coalesce bursts into one write
  }
  async function pushCloud() {
    if (writing || !pending) return;
    writing = true;
    const S = pending; pending = null;
    try { await db.doc("saves/" + uid).set({ json: JSON.stringify(S), updatedAt: S.updatedAt, v: S.v || 0 }); } catch (e) { pending = pending || S; }
    writing = false;
    if (pending) timer = setTimeout(pushCloud, 1500);
  }

  // ---------- feedback notes ----------
  function addNote(note) {
    note.id = "n" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    note.sent = false;
    const notes = readNotes(); notes.push(note); writeNotes(notes);
    flushNotes();
    return note;
  }
  async function flushNotes() {
    if (!cloudReady) return;
    const notes = readNotes();
    for (const n of notes.filter(n => !n.sent)) {
      try {
        const body = Object.assign({}, n); delete body.sent;
        await db.doc("feedback/" + n.id).set(body);
        n.sent = true;
      } catch (e) { break; }
    }
    writeNotes(notes);
  }

  // ---------- backup codes (move progress between devices or builds by hand) ----------
  function exportCode(S) { return btoa(unescape(encodeURIComponent(JSON.stringify(S)))); }
  function importCode(code) { return JSON.parse(decodeURIComponent(escape(atob(code.trim())))); }

  function markShared(ids) { const notes = readNotes(); notes.forEach(n => { if (ids.includes(n.id)) n.shared = true; }); writeNotes(notes); }

  return {
    init, loadCloud, save, readLocal, addNote, markShared, notes: readNotes, exportCode, importCode,
    get cloud() { return cloudReady; },
    reset() { try { localStorage.removeItem(SAVE_KEY); } catch (e) {} if (cloudReady) db.doc("saves/" + uid).delete().catch(() => {}); }
  };
})();
