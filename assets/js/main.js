/* ===== Configuration (client to supply / confirm) ===== */
const CFG = {
  email: "info@alimentad.com",
  sales: "sales@alimentad.com",
  whatsapp: "971585589794"   /* +971 58 558 9794 - contact form messages are sent to this WhatsApp number */
};
const DUBAI = "Dubai Branch Office - AB Plaza 8, Dubai - United Arab Emirates";
const DUBAI_MAP = "https://maps.app.goo.gl/bXoricVvBZL6pHzK7";
const ADDRESS = "Industrial Area Umm Al Quwain - Emirate of Umm Al Quwain - United Arab Emirates";
const NAV = [["index.html","HOME","home"],["about.html","ABOUT US","about"],["products.html","PRODUCTS","products",[["products.html","Products","products"],["beverage-juice-concentrate.html","Juice and Beverages","juice"]]],["consulting.html","CONSULTING","consulting"],["contact.html","CONTACT US","contact"]];
const navItem = (n) => {
  if (!n[3]) return `<a href="${n[0]}" class="${n[2] === page ? "on" : ""}">${n[1]}</a>`;
  const active = n[3].some((c) => c[2] === page);
  return `<div class="dd"><a href="${n[0]}" class="${active ? "on" : ""}" aria-haspopup="true">${n[1]}<svg class="dd-ar" viewBox="0 0 10 6" width="10" height="6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></a><div class="dd-m">${n[3].map((c) => `<a href="${c[0]}" class="${c[2] === page ? "on" : ""}">${c[1]}</a>`).join("")}</div></div>`;
};
const page = document.body.dataset.page;
const waLink = CFG.whatsapp ? `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent("Hello Aliment Additives, I would like to enquire about food ingredients.")}` : "contact.html";

/* ===== Header ===== */
document.getElementById("site-header").innerHTML = `<div class="wrap bar">
  <a class="logo" href="index.html" aria-label="Aliment Additives home"><img src="assets/images/logo-sm.png" alt="Aliment Additives logo" width="68" height="56"><span class="brand">ALIMENT ADDITIVES</span></a>
  <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false"><i></i></button>
  <nav id="nav" aria-label="Main">${NAV.map(navItem).join("")}<a class="nav-cta" href="contact.html">REQUEST A QUOTE<i data-lucide="arrow-right"></i></a></nav></div>`;
document.getElementById("burger").onclick = () => {
  const open = document.getElementById("nav").classList.toggle("open");
  document.getElementById("burger").classList.toggle("x", open);
  document.body.classList.toggle("nolock", open);
  document.getElementById("burger").setAttribute("aria-expanded", open);
};

/* ===== Footer and floating elements ===== */
document.getElementById("site-footer").innerHTML = `<div class="wrap"><div class="fgrid">
  <div><a class="logo" href="index.html"><img src="assets/images/logo-sm.png" alt="Aliment Additives logo" width="92" height="76" loading="lazy"><span class="brand">ALIMENT ADDITIVES</span></a><p>Your Trusted Partner in Food Ingredients. A UAE-based food ingredients and specialty additives trading company.</p></div>
  <div><h3>QUICK LINKS</h3><a href="about.html">About Us</a><a href="products.html">Products</a><a href="beverage-juice-concentrate.html">Juice Concentrate</a><a href="consulting.html">Consulting</a><a href="index.html#why">Why Choose Us</a><a href="contact.html">Contact</a></div>
  <div><h3>PRODUCTS</h3>${PRODUCTS.slice(0, 6).map((p) => `<a href="${p.slug}.html">${p.name}</a>`).join("")}<a href="products.html">All categories</a></div>
  <div><h3>CONTACT</h3><a class="cinfo" href="${DUBAI_MAP}" target="_blank" rel="noopener"><i data-lucide="building-2"></i>${DUBAI}</a><p class="cinfo"><i data-lucide="map-pin"></i>${ADDRESS}</p><a class="cinfo" href="mailto:${CFG.email}"><i data-lucide="mail"></i>${CFG.email}</a><a class="cinfo" href="mailto:${CFG.sales}"><i data-lucide="mail"></i>${CFG.sales}</a><a class="cinfo" href="${waLink}" target="_blank" rel="noopener"><i data-lucide="phone"></i>+971 58 558 9794</a><p class="cinfo"><i data-lucide="clock"></i>Mon–Sat 09:00 AM – 06:00 PM, Sun Closed</p><a class="btn sm" href="${waLink}" ${CFG.whatsapp ? 'target="_blank" rel="noopener"' : ""}>WHATSAPP ENQUIRY<i data-lucide="message-circle"></i></a></div>
  </div><div class="fine"><p>© 2026 Aliment Additives. All rights reserved.</p><p class="dev">Designed &amp; Developed by<a href="https://kssoftware.co.in/" target="_blank" rel="noopener">KS Software</a></p></div></div>`;
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
  sel.innerHTML = '<option value="">Select (optional)</option>' + PRODUCTS.map((p) => `<option>${p.name}</option>`).join("") + "<option>Beverage Juice Concentrate</option><option>Other</option>";
  const wanted = new URLSearchParams(location.search).get("product");
  if (wanted) sel.value = wanted;
  const item = new URLSearchParams(location.search).get("item");
  if (item) document.getElementById("ms").value = "I would like a quote for " + item + ". Please share availability, specifications and a commercial offer.";

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

  /* Submit: validate, then open WhatsApp with the enquiry pre-filled for +971 58 558 9794 */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const st = document.getElementById("status");
    st.className = "status show";
    if (!Object.keys(RULES).map(check).every(Boolean)) { st.classList.add("fail"); st.textContent = "Please fix the highlighted fields."; return; }
    const v = (id) => document.getElementById(id).value.trim();
    const text = [
      "*New website enquiry - Aliment Additives*",
      "Name: " + v("fn"),
      v("co") && "Company: " + v("co"),
      "Email: " + v("em"),
      v("ph") && "Phone: " + v("ph"),
      v("ct") && "Country: " + v("ct"),
      v("pr") && "Product interest: " + v("pr"),
      "Message: " + v("ms")
    ].filter(Boolean).join("\n");
    const url = "https://wa.me/" + CFG.whatsapp + "?text=" + encodeURIComponent(text);
    st.textContent = "Opening WhatsApp... tap Send in WhatsApp to deliver your enquiry.";
    const win = window.open(url, "_blank", "noopener");
    if (!win) location.href = url;
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
