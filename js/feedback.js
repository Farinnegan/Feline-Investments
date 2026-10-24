// "Report to Claude": a small note button. Each note records what you wrote,
// what was on screen (the open window, the current question) and, optionally,
// the exact thing you tapped. Notes save on the device and, on claude.ai,
// to the artifact database so Claude can review them.

window.Feedback = (function () {
  let getContext = () => ({});
  let pointed = null, draft = "", kind = "Bug";
  const KINDS = ["Bug", "Content", "Idea", "Visual"];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function init(opts) {
    getContext = opts.context || getContext;
    const btn = document.getElementById("report");
    btn.addEventListener("click", e => { e.stopPropagation(); open(); });
  }

  // the window open underneath the report form, captured when the button is pressed
  let underneath = null;
  function snapshotScreen() {
    const modal = document.getElementById("modal");
    const open = !modal.classList.contains("hidden");
    const title = open ? (modal.querySelector(".head span") || {}).textContent : null;
    return { window: title || "Office", ...getContext() };
  }

  function open() {
    if (!underneath) underneath = { html: document.getElementById("modal").innerHTML, ctx: snapshotScreen(), hidden: document.getElementById("modal").classList.contains("hidden") };
    const box = document.getElementById("reportbox");
    box.innerHTML = `<div class="win report">
      <div class="head"><span>Report to Claude</span><small>${Store.cloud ? "Saved for review" : "Saved on this device"}</small></div>
      <div class="body">
        <div class="seg">${KINDS.map(k => `<button data-k="${k}" class="${k === kind ? "on" : ""}">${k}</button>`).join("")}</div>
        <textarea id="fb-text" class="input" rows="4" placeholder="What did you notice?">${esc(draft)}</textarea>
        <button id="fb-point" class="wide">📍 ${pointed ? "Point again" : "Point at it"}</button>
        ${pointed ? `<div class="note">Pointing at: <b>${esc(pointed.label)}</b></div>` : ""}
        <div class="note">Also attached: ${esc(underneath.ctx.window)}${underneath.ctx.question ? " · the current question" : ""}.</div>
        <div class="note">${Store.notes().length} note${Store.notes().length === 1 ? "" : "s"} so far.</div>
      </div>
      <div class="foot"><button id="fb-cancel">Cancel</button><button id="fb-send" class="primary">Save note</button></div></div>`;
    box.classList.remove("hidden");
    box.querySelectorAll("[data-k]").forEach(b => b.onclick = () => { draft = box.querySelector("#fb-text").value; kind = b.dataset.k; open(); });
    box.querySelector("#fb-cancel").onclick = close;
    box.querySelector("#fb-point").onclick = () => { draft = box.querySelector("#fb-text").value; startPointing(); };
    box.querySelector("#fb-send").onclick = () => {
      const text = box.querySelector("#fb-text").value.trim();
      if (!text) { box.querySelector("#fb-text").focus(); return; }
      Store.addNote({ kind, text, at: new Date().toISOString(), screen: underneath.ctx, pointed });
      close(true);
    };
  }

  function close(sent) {
    document.getElementById("reportbox").classList.add("hidden");
    document.getElementById("reportbox").innerHTML = "";
    pointed = null; draft = ""; underneath = null;
    if (sent) {
      const t = document.createElement("div");
      t.className = "toast gold"; t.textContent = "📝 Note saved. I'll see it at our next review.";
      document.getElementById("toasts").appendChild(t);
      setTimeout(() => t.classList.add("out"), 2400); setTimeout(() => t.remove(), 2800);
    }
  }

  function describe(el, e) {
    if (el.id === "canvas" && window.Scene && Scene.describeAt) return Scene.describeAt(e.clientX, e.clientY);
    const target = el.closest("button, .opt, .prompt, .card, .li, .stat, .progress, .head, .result, #topbar > div") || el;
    const text = (target.innerText || target.textContent || "").replace(/\s+/g, " ").trim().slice(0, 140);
    const what = target.id ? "#" + target.id : target.className ? target.tagName.toLowerCase() + "." + String(target.className).split(" ")[0] : target.tagName.toLowerCase();
    return { label: text || what, element: what, text };
  }

  function startPointing() {
    const box = document.getElementById("reportbox");
    box.classList.add("hidden");
    const tip = document.getElementById("pointtip");
    tip.classList.remove("hidden");
    const handler = e => {
      e.preventDefault(); e.stopPropagation();
      if (e.target.closest("#pointtip")) { cleanup(); setTimeout(open, 50); return; }
      const d = describe(e.target, e);
      pointed = Object.assign({ x: Math.round(e.clientX), y: Math.round(e.clientY), screenW: window.innerWidth, screenH: window.innerHeight }, d);
      cleanup();
      setTimeout(open, 50);
    };
    // the click that follows this tap is swallowed too, so pointing never presses a button
    function cleanup() { tip.classList.add("hidden"); document.removeEventListener("pointerdown", handler, true); setTimeout(() => document.removeEventListener("click", swallow, true), 400); }
    const swallow = e => { e.preventDefault(); e.stopPropagation(); document.removeEventListener("click", swallow, true); };
    setTimeout(() => { document.addEventListener("pointerdown", handler, true); document.addEventListener("click", swallow, true); }, 50);
  }

  return { init };
})();
