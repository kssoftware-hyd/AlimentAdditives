/* ===== Scroll reveal ===== */
const revealIO = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); } }), { threshold: 0.15 });
function observeReveals() { document.querySelectorAll(".reveal:not(.in)").forEach((n) => revealIO.observe(n)); }
observeReveals();

/* ===== Header state, scroll progress, back-to-top, parallax ===== */
const header = document.getElementById("site-header");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
let ticking = false;
function onScroll() {
  const y = scrollY, h = document.documentElement;
  header.classList.toggle("solid", y > 60);
  document.getElementById("top").classList.toggle("on", y > 500);
  document.getElementById("prog").style.width = (y / Math.max(1, h.scrollHeight - innerHeight)) * 100 + "%";
  if (!reduceMotion && innerWidth > 820) document.querySelectorAll("[data-parallax]").forEach((n) => { n.style.transform = `translateY(${y * Number(n.dataset.parallax)}px)`; });
  ticking = false;
}
addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();

/* ===== Smooth page transitions between local pages ===== */
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[href]");
  if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
  const u = new URL(a.href, location.href);
  if (u.origin !== location.origin || u.pathname === location.pathname || !u.pathname.endsWith(".html") && u.pathname !== "/") return;
  e.preventDefault();
  document.body.classList.add("leaving");
  setTimeout(() => { location.href = a.href; }, reduceMotion ? 0 : 250);
});
addEventListener("pageshow", (e) => { if (e.persisted) document.body.classList.remove("leaving"); });

/* ===== In-page anchor on arrival (e.g. index.html#why) ===== */
if (location.hash) setTimeout(() => { const t = document.querySelector(location.hash); if (t) t.scrollIntoView(); }, 400);

/* ===== Animated counters (genuine data only) ===== */
const countIO = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  countIO.unobserve(e.target);
  const end = Number(e.target.dataset.count) || 0, t0 = performance.now(), dur = 1400;
  if (reduceMotion) { e.target.textContent = end; return; }
  (function step(now) { const k = Math.min(1, (now - t0) / dur); e.target.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); })(t0);
}), { threshold: 0.4 });
document.querySelectorAll(".stat b").forEach((b) => countIO.observe(b));

/* ===== Hero: floating particles and cursor glow ===== */
const heroDust = document.getElementById("hero-dust");
if (heroDust && !reduceMotion) {
  const n = innerWidth < 600 ? 8 : 18;
  for (let i = 0; i < n; i++) { const p = document.createElement("i"); p.style.left = Math.random() * 100 + "%"; p.style.animationDelay = -Math.random() * 10 + "s"; p.style.animationDuration = 8 + Math.random() * 8 + "s"; p.style.transform = `scale(${0.6 + Math.random()})`; heroDust.appendChild(p); }
}
const heroEl = document.querySelector(".hero");
if (heroEl && matchMedia("(hover:hover)").matches) heroEl.addEventListener("pointermove", (e) => { const r = heroEl.getBoundingClientRect(); heroEl.style.setProperty("--mx", e.clientX - r.left + "px"); heroEl.style.setProperty("--my", e.clientY - r.top + "px"); });

/* ===== Desktop only: card tilt and magnetic buttons ===== */
if (!reduceMotion && matchMedia("(hover:hover) and (pointer:fine)").matches) {
  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest && e.target.closest(".pc, .wc, .ic");
    if (card) { const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; card.style.transition = "transform .1s"; card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`; }
    const btn = e.target.closest && e.target.closest(".btn");
    if (btn) { const r = btn.getBoundingClientRect(); btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.15}px, ${(e.clientY - r.top - r.height / 2) * 0.25 - 2}px)`; }
  });
  document.addEventListener("pointerout", (e) => {
    const el = e.target.closest && e.target.closest(".pc, .wc, .ic, .btn");
    if (el && !el.contains(e.relatedTarget)) { el.style.transform = ""; el.style.transition = ""; }
  });
}
