/* ===== Configuration (client to supply / confirm) ===== */
const CFG = {
  email: "info@alimentad.com",
  sales: "sales@alimentad.com",
  whatsapp: "",        /* e.g. "9715XXXXXXXX" (country code, no + or spaces) */
  formEndpoint: ""     /* your backend or form service URL; empty = email fallback */
};
const ADDRESS = "Industrial Area Umm Al Quwain - Emirate of Umm Al Quwain - United Arab Emirates";
const NAV = [["index.html","HOME","home"],["about.html","ABOUT US","about"],["products.html","PRODUCTS","products"],["industries.html","INDUSTRIES","industries"],["index.html#why","WHY CHOOSE US","why"],["contact.html","CONTACT","contact"]];
const page = document.body.dataset.page;
const waLink = CFG.whatsapp ? `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent("Hello Aliment Additives, I would like to enquire about food ingredients.")}` : "contact.html";

/* ===== Header ===== */
document.getElementById("site-header").innerHTML = `<div class="wrap bar">
  <a class="logo" href="index.html" aria-label="Aliment Additives FZE home"><img src="assets/images/logo-light.png" alt="Aliment Additives logo" width="68" height="56"></a>
  <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false"><i></i></button>
  <nav id="nav" aria-label="Main">${NAV.map((n) => `<a href="${n[0]}" class="${n[2] === page ? "on" : ""}">${n[1]}</a>`).join("")}<a class="nav-cta" href="contact.html">REQUEST A QUOTE<i data-lucide="arrow-right"></i></a></nav></div>`;
document.getElementById("burger").onclick = () => {
  const open = document.getElementById("nav").classList.toggle("open");
  document.getElementById("burger").classList.toggle("x", open);
  document.body.classList.toggle("nolock", open);
  document.getElementById("burger").setAttribute("aria-expanded", open);
};

/* ===== Footer and floating elements ===== */
document.getElementById("site-footer").innerHTML = `<div class="wrap"><div class="fgrid">
  <div><a class="logo" href="index.html"><img src="assets/images/logo-light.png" alt="Aliment Additives logo" width="92" height="76" loading="lazy"></a><p>Your Trusted Partner in Food Ingredients. A UAE-based food ingredients and specialty additives trading company.</p></div>
  <div><h3>QUICK LINKS</h3><a href="about.html">About Us</a><a href="products.html">Products</a><a href="industries.html">Industries</a><a href="index.html#why">Why Choose Us</a><a href="contact.html">Contact</a></div>
  <div><h3>PRODUCTS</h3>${PRODUCTS.slice(0, 6).map((p) => `<a href="products.html">${p.name}</a>`).join("")}<a href="products.html">All categories</a></div>
  <div><h3>CONTACT</h3><p class="cinfo"><i data-lucide="map-pin"></i>${ADDRESS}</p><a class="cinfo" href="mailto:${CFG.email}"><i data-lucide="mail"></i>${CFG.email}</a><a class="cinfo" href="mailto:${CFG.sales}"><i data-lucide="mail"></i>${CFG.sales}</a><p class="cinfo"><i data-lucide="clock"></i>Mon–Sat 09:00 AM – 06:00 PM, Sun Closed</p><a class="btn sm" href="${waLink}" ${CFG.whatsapp ? 'target="_blank" rel="noopener"' : ""}>WHATSAPP ENQUIRY<i data-lucide="message-circle"></i></a></div>
  </div><div class="fine"><p>© 2026 Aliment Additives FZE. All rights reserved.</p><p class="dev">Designed &amp; Developed by<a href="https://kssoftware.co.in/" target="_blank" rel="noopener">KS Software</a></p></div></div>`;
document.body.insertAdjacentHTML("beforeend", `<div id="prog"></div>
  <button class="fab" id="asst" aria-label="Enquiry assistant" aria-expanded="false"><i data-lucide="mail"></i></button>
  <div id="panel"><b>Enquiry assistant</b><p>This is an enquiry shortcut, not live customer support. Send your requirement and our team will reply during business hours.</p><a class="btn sm" href="contact.html">SEND AN ENQUIRY<i data-lucide="send"></i></a></div>
  <button class="fab" id="top" aria-label="Back to top"><i data-lucide="arrow-up"></i></button>
  <a class="fab" id="wa" href="${waLink}" ${CFG.whatsapp ? 'target="_blank" rel="noopener"' : ""} aria-label="WhatsApp enquiry"><i data-lucide="message-circle"></i></a>`);
document.getElementById("asst").onclick = () => { const o = document.getElementById("panel").classList.toggle("on"); document.getElementById("asst").setAttribute("aria-expanded", o); };
document.getElementById("top").onclick = () => scrollTo({ top: 0 });

/* ===== Page content ===== */
renderHomeProducts();
renderProductsPage();
hydrateIcons(document);

/* ===== Contact page: WhatsApp link, product select, form ===== */
const wa2 = document.getElementById("wa2");
if (wa2) { wa2.href = waLink; if (CFG.whatsapp) { wa2.target = "_blank"; wa2.rel = "noopener"; } }
const form = document.getElementById("form");
if (form) {
  const sel = document.getElementById("pr");
  sel.innerHTML = '<option value="">Select (optional)</option>' + PRODUCTS.map((p) => `<option>${p.name}</option>`).join("") + "<option>Other</option>";
  const wanted = new URLSearchParams(location.search).get("product");
  if (wanted) sel.value = wanted;

  /* Validation rules: true = valid, string = error message */
  const RULES = {
    fn: (v) => v.trim().length > 1 || "Enter your name",
    em: (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) || "Enter a valid email",
    ph: (v) => !v.trim() || /^[+\d][\d\s()-]{6,}$/.test(v.trim()) || "Enter a valid phone number",
    ms: (v) => v.trim().length > 9 || "Message needs at least 10 characters"
  };
  const check = (id) => {
    const el = document.getElementById(id), r = RULES[id](el.value);
    el.classList.toggle("bad", r !== true);
    el.closest(".fld").querySelector(".err").textContent = r === true ? "" : r;
    return r === true;
  };
  Object.keys(RULES).forEach((id) => document.getElementById(id).addEventListener("blur", () => check(id)));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const st = document.getElementById("status"), btn = document.getElementById("sub");
    st.className = "status show";
    if (!Object.keys(RULES).map(check).every(Boolean)) { st.classList.add("fail"); st.textContent = "Please fix the highlighted fields."; return; }
    const data = { name:fn.value, company:co.value, email:em.value, phone:ph.value, country:ct.value, product:sel.value, message:ms.value };
    const orig = btn.innerHTML; btn.disabled = true; btn.textContent = "SENDING...";
    try {
      if (CFG.formEndpoint) {
        const res = await fetch(CFG.formEndpoint, { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify(data) });
        if (!res.ok) throw new Error("send failed");
        st.textContent = "Thank you. Your enquiry has been sent."; form.reset();
      } else {
        location.href = `mailto:${CFG.email}?subject=${encodeURIComponent("Enquiry: " + (data.product || "General"))}&body=${encodeURIComponent(Object.entries(data).map(([k, v]) => k + ": " + v).join("\n"))}`;
        st.textContent = "Your email app should open with the enquiry ready to send.";
      }
    } catch (err) { st.classList.add("fail"); st.textContent = "Could not send. Please email us directly."; }
    btn.disabled = false; btn.innerHTML = orig; hydrateIcons(btn);
  });
}

/* ===== Close the mobile menu when a link is tapped ===== */
document.getElementById("nav").addEventListener("click", (e) => {
  if (e.target.closest("a")) { document.getElementById("nav").classList.remove("open"); document.getElementById("burger").classList.remove("x"); document.body.classList.remove("nolock"); }
});

/* ===== Genuine stats from the product list + ingredient marquee ===== */
const total = PRODUCTS.reduce((s, p) => s + p.items.length, 0);
const statVals = { cats: PRODUCTS.length, items: total, inds: 7 };
document.querySelectorAll(".stat b").forEach((b) => { b.dataset.count = statVals[b.dataset.src]; });
const mq = document.getElementById("marquee");
if (mq) { const names = PRODUCTS.flatMap((p) => p.items).filter((v, i, a) => a.indexOf(v) === i).map((n) => `<span>${esc(n)}</span>`).join(""); mq.innerHTML = names + names; }

/* ===== Contact page: highlight today and show open/closed (Dubai time) ===== */
const hoursEl = document.getElementById("hours");
if (hoursEl) {
  const dubai = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Dubai" }));
  const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  hoursEl.querySelectorAll("tr").forEach((tr) => tr.classList.toggle("today", tr.dataset.d === names[dubai.getDay()]));
  const open = dubai.getDay() !== 0 && dubai.getHours() >= 9 && dubai.getHours() < 18;
  const badge = document.getElementById("openbadge");
  badge.textContent = open ? "OPEN NOW" : "CLOSED NOW";
  badge.classList.toggle("open", open);
}
