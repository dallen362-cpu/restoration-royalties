/* TELVERGENCE — lightweight, dependency-free visit tracker + identity gate.
 * Mirrors every event to localStorage (so the dashboard works locally, as proof),
 * and ALSO POSTs to a Google Apps Script endpoint when ENDPOINT is set (remote tracking).
 *
 * ====== ONE-TIME SETUP ======
 *   1) Deploy analytics/Code.gs as a Google Apps Script Web App (see analytics/SETUP.md).
 *   2) Paste the deployed /exec URL into ENDPOINT below (or send it to me and I'll commit it).
 *   3) GATE=true requires an email before viewing (identity). Set false to make it optional.
 * ============================
 */
(function () {
  var ENDPOINT = "";            // <-- paste Google Apps Script web-app URL here
  var SITE     = "telvergence";
  var GATE     = true;          // require email before viewing (identity capture)

  // ---- ids ----
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function vid() {
    var v = ls("telv_vid");
    if (!v) { v = "v_" + Math.random().toString(36).slice(2, 9) + Date.now().toString(36); ls("telv_vid", v); }
    return v;
  }
  var params    = new URLSearchParams(location.search);
  var recipient = params.get("v") || params.get("rcpt") || "(direct)";   // per-recipient unique link token
  function email(v) { if (v === undefined) return ls("telv_email") || ""; ls("telv_email", v); }

  var pageName = (location.pathname.split("/").pop() || "index.html");
  var startTs  = Date.now();
  var maxScroll = 0, sentDepth = {};

  // ---- send ----
  function send(type, extra) {
    var p = {
      site: SITE, type: type, vid: vid(), email: email(), recipient: recipient,
      page: pageName, title: document.title, url: location.href, ref: document.referrer || "(none)",
      ua: navigator.userAgent, lang: navigator.language || "", scr: (screen.width + "x" + screen.height),
      tz: (Intl.DateTimeFormat().resolvedOptions().timeZone || ""), ts: new Date().toISOString()
    };
    if (extra) for (var k in extra) p[k] = extra[k];

    // local mirror (dashboard reads this when no ENDPOINT)
    try {
      var log = JSON.parse(ls("telv_log") || "[]");
      log.unshift(p); if (log.length > 800) log = log.slice(0, 800);
      ls("telv_log", JSON.stringify(log));
    } catch (e) {}

    // remote
    if (ENDPOINT) {
      try {
        var body = JSON.stringify(p);
        if (navigator.sendBeacon) navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "text/plain;charset=UTF-8" }));
        else fetch(ENDPOINT, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: body });
      } catch (e) {}
    }
  }

  // ---- identity gate ----
  function buildGate() {
    if (!GATE || email()) { start(); return; }
    var o = document.createElement("div");
    o.id = "telvGate";
    o.style.cssText = "position:fixed;inset:0;z-index:99999;background:rgba(6,11,22,.92);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;font-family:'Segoe UI',system-ui,Arial,sans-serif;padding:20px";
    o.innerHTML =
      '<div style="max-width:420px;width:100%;background:#16213d;border:1px solid #26345a;border-radius:18px;padding:30px;text-align:center;color:#eaf2ff;box-shadow:0 24px 60px rgba(0,0,0,.6)">' +
        '<div style="font-size:34px">🔐</div>' +
        '<h2 style="font-family:Segoe UI;margin:8px 0 6px;font-size:22px">Welcome to TELVERGENCE</h2>' +
        '<p style="color:#8ea3c9;font-size:14px;margin-bottom:18px">Enter your email to access the live demo.</p>' +
        '<input id="telvEmail" type="email" placeholder="you@company.com" autocomplete="email" ' +
          'style="width:100%;background:#10182e;border:1px solid #26345a;color:#eaf2ff;border-radius:10px;padding:13px;font-size:15px;margin-bottom:6px">' +
        '<div id="telvErr" style="color:#ff5d73;font-size:12px;height:16px;text-align:left"></div>' +
        '<button id="telvGo" style="width:100%;border:none;border-radius:10px;padding:14px;font-weight:800;font-size:15px;cursor:pointer;margin-top:6px;background:linear-gradient(90deg,#00FF88,#00D4FF);color:#04121c">Enter the demo →</button>' +
        '<p style="color:#5e7099;font-size:11px;margin-top:14px">By entering you agree your visit may be logged for follow-up.</p>' +
      '</div>';
    document.body.appendChild(o);
    var inp = o.querySelector("#telvEmail"), go = o.querySelector("#telvGo"), err = o.querySelector("#telvErr");
    function submit() {
      var v = (inp.value || "").trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) { err.textContent = "Please enter a valid email."; inp.focus(); return; }
      email(v); send("identify", { email: v });
      o.remove(); start();
    }
    go.onclick = submit;
    inp.addEventListener("keydown", function (e) { if (e.key === "Enter") submit(); });
    setTimeout(function () { inp.focus(); }, 60);
  }

  // ---- engagement tracking ----
  function start() {
    send("pageview");

    // scroll depth milestones
    window.addEventListener("scroll", function () {
      var h = document.documentElement;
      var d = (h.scrollTop + window.innerHeight) / (h.scrollHeight || 1) * 100;
      if (d > maxScroll) maxScroll = d;
      [25, 50, 75, 100].forEach(function (m) {
        if (d >= m && !sentDepth[m]) { sentDepth[m] = 1; send("scroll", { depth: m }); }
      });
    }, { passive: true });

    // section focus — observe headings / [data-section] / nav items
    try {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting) {
            var label = en.target.getAttribute("data-section") || en.target.id ||
                        (en.target.textContent || "").trim().slice(0, 48);
            if (label) send("focus", { section: label });
          }
        });
      }, { threshold: 0.6 });
      document.querySelectorAll("[data-section],section[id],h1,h2").forEach(function (el) { io.observe(el); });
    } catch (e) {}

    // SPA nav clicks (dashboard/backoffice)
    document.addEventListener("click", function (e) {
      var nav = e.target.closest("[data-v],[data-view],.nav a,#nav a");
      if (nav) { var t = nav.getAttribute("data-v") || (nav.textContent || "").trim().slice(0, 40); send("nav", { to: t }); }
      var a = e.target.closest("a[href]");
      if (a) {
        var href = a.getAttribute("href") || "";
        if (/^https?:|^tel:|^mailto:/.test(href)) send("click", { href: href, text: (a.textContent || "").trim().slice(0, 60) });
      }
    });

    // COPY events — fires when a visitor copies text (incl. selecting & copying a link on the page)
    document.addEventListener("copy", function () {
      var sel = (window.getSelection && window.getSelection().toString()) || "";
      send("copy", { snippet: sel.slice(0, 140), len: sel.length });
    });

    // tab focus/blur (engagement signal — NOT a screenshot detector)
    document.addEventListener("visibilitychange", function () {
      send(document.hidden ? "blur" : "refocus", { secs: Math.round((Date.now() - startTs) / 1000) });
    });

    // heartbeat every 20s while active
    setInterval(function () { if (!document.hidden) send("heartbeat", { secs: Math.round((Date.now() - startTs) / 1000) }); }, 20000);

    // exit — time on page + max scroll
    window.addEventListener("pagehide", function () {
      send("exit", { secs: Math.round((Date.now() - startTs) / 1000), maxScroll: Math.round(maxScroll) });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", buildGate);
  else buildGate();
})();
