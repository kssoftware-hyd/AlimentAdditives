/* ===== Loader: real-readiness progress with 00-100% counter ===== */
/* First visit in a session = full cinematic intro. Later pages = quick loader. */
(function () {
  const body = document.body;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { body.classList.add("ready"); return; }

  let seen = null;
  try { seen = sessionStorage.getItem("aaSeen"); } catch (e) {}
  const quick = !!seen;
  const MSGS = ["Preparing Quality Ingredients...", "Connecting Global Supply Solutions...", "Building Trusted Partnerships...", "Welcome to Aliment Additives FZE."];

  body.insertAdjacentHTML("afterbegin",
    '<div id="loader" class="' + (quick ? "quick" : "full") + '" role="status" aria-live="polite"><div class="dust" id="dust"></div><div class="l-giant" aria-hidden="true">ALIMENT ADDITIVES</div><div class="l-in">' +
    '<div class="l-logo"><img id="l-img" src="assets/images/logo.png" alt="Aliment Additives" width="352" height="290"></div>' +
    '<div class="l-bar"><i id="bar"></i></div><div class="l-msg" id="msg">' + MSGS[0] + '</div><div class="l-pct" id="pct">0%</div>' +
    '<div class="l-end" id="lend">YOUR TRUSTED PARTNER IN FOOD INGREDIENTS.</div></div></div>');

  const $ = (id) => document.getElementById(id);
  const dust = $("dust");
  for (let i = 0; i < (quick ? 0 : 14); i++) {
    const p = document.createElement("i");
    p.style.left = Math.random() * 100 + "%";
    p.style.animationDelay = -Math.random() * 9 + "s";
    p.style.animationDuration = 7 + Math.random() * 6 + "s";
    dust.appendChild(p);
  }

  /* Real tasks that gate 100% */
  const weight = { logo:20, fonts:30, load:50 };
  const task = { logo:false, fonts:false, load:false };
  let target = 0, shown = 0, finished = false, last = performance.now();
  const update = () => { target = Object.keys(task).reduce((s, k) => s + (task[k] ? weight[k] : 0), 0); };
  const mark = (k) => () => { task[k] = true; update(); };
  const img = $("l-img");
  if (img.complete) mark("logo")(); else { img.addEventListener("load", mark("logo")); img.addEventListener("error", mark("logo")); }
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(mark("fonts"));
  if (document.readyState === "complete") mark("load")(); else addEventListener("load", mark("load"));
  setTimeout(() => { task.logo = task.fonts = task.load = true; update(); }, 6000);

  function finish() {
    if (finished) return;
    finished = true;
    try { sessionStorage.setItem("aaSeen", "1"); } catch (e) {}
    $("lend").classList.add("show");
    setTimeout(() => {
      $("loader").classList.add("done");
      body.classList.add("ready");
      setTimeout(() => { const l = $("loader"); if (l) l.remove(); }, 1100);
    }, quick ? 250 : 800);
  }

  /* Rate-limited counter so the percentage is visible (about 2.2s first visit, 0.7s after) */
  const rate = quick ? 140 : 46;
  (function tick(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    shown = Math.min(target, shown + rate * dt);
    const p = Math.floor(shown);
    $("pct").textContent = p + "%";
    $("bar").style.width = p + "%";
    $("msg").textContent = MSGS[p >= 100 ? 3 : p >= 66 ? 2 : p >= 33 ? 1 : 0];
    if (p >= 100) { finish(); return; }
    requestAnimationFrame(tick);
  })(performance.now());
})();
