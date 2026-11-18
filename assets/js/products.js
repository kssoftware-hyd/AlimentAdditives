/* ===== Product data (from the client's Product List PDF) ===== */
/* To add or change products, edit this file only. */
const PRODUCTS = [
  { name:"Acids & Acidulants", group:"Additives & Texture", items:["Acetic Acid","Citric Acid","Citric Acid Monohydrate","Citric Acid Anhydrous","Lactic Acid","Malic Acid","Phosphoric Acid","Sodium Acetate","Trisodium Citrate"] },
  { name:"Thickeners & Stabilizers", group:"Additives & Texture", items:["Carrageenan (Kappa & Iota)","Guar Gum","Locust Bean Gum","Modified Starch","Native Starch","Potato Starch","Pre-gelatinized Starch","Rice Starch","Xanthan Gum"] },
  { name:"Binders & Texturizers", group:"Additives & Texture", items:["CMC (Carboxymethyl Cellulose)","HPMC (Hydroxypropyl Methylcellulose)","Methyl Cellulose","Ethyl Cellulose","Microcrystalline Cellulose","Cellulose Gum","Pectin","Sorbitol","Tapioca Starch"] },
  { name:"Minerals", group:"Nutrition & Function", items:["Calcium Acetate","Calcium Ascorbate","Calcium Carbonate","Calcium Chloride","Calcium Gluconate","Calcium Propionate","Calcium Phosphate","Carbonates (Capsanthin)","Chromium","Cocoa Powder","Collagen","Co-enzyme"] },
  { name:"Enzymes", group:"Enzymes, Dairy & Oils", items:["Amylase (Alpha, Fungal, Bacterial)","Beta Glucanase","Cellulase","Hemicellulase","Glucose Oxidase","Lipase","Pectinase","Protease (Acid, Neutral, Alkaline)","Transglutaminase"] },
  { name:"Functional Ingredients", group:"Nutrition & Function", items:["Choline Chloride","Creatine Monohydrate","Glutathione","L-Carnitine","L-Glutamine","Omega 3 Fatty Acids (ALA, EPA, DHA)","Omega 6 Fatty Acids (Arachidonic Acid, GLA)","Vitamin & Mineral Premixes (A, D3, E, K, B1, B2, B3, B5, B6, B9, B12)"] },
  { name:"Sweeteners", group:"Taste & Flavour", items:["Aspartame","Stevia (Natural Sweetener)","Sucralose","Xylitol"] },
  { name:"Dairy & Milk Products", group:"Enzymes, Dairy & Oils", items:["Lactase Enzymes","Lecithin (Soya)","Liquid Glucose","Milk Protein Concentrate (MPC)","Whey Powder","Whole Milk Powder","Skimmed Milk Powder"] },
  { name:"Oils & Fats", group:"Enzymes, Dairy & Oils", items:["Palm Oil (RBD)","Vegetable Oils (Soybean, Sunflower, Canola)","Fish Oil","MCT Oil","Refined/Deodorized Oils","Soybean Oil"] },
  { name:"Flavors & Extracts", group:"Taste & Flavour", items:["Natural Flavors","Artificial Flavors","Vanilla Flavour","Liquid Vanilla","Fruit Extracts","Yeast Extract","Vegetable Extracts"] },
  { name:"Other Ingredients", group:"Additives & Texture", items:["DAPP (Di-ammonium Phosphate)","PVD Salt (Purified Vacuum Dried Salt)","Magnesium Sulphate","Sodium Chloride"] },
  { name:"Specialty Ingredients", group:"Nutrition & Function", items:["Tapioca Starch","Tartaric Acid","Thiamine Hydrochloride","TBHQ (tert-butylhydroquinone)","Titanium Dioxide","Tricalcium Phosphate","Turmeric Extract"] }
];

/* ===== Helpers ===== */
/* Soft pastel hues used for card tints (sage, sand, mint, peach, sky, butter) */
const HUES = [92, 38, 165, 24, 205, 58];
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
const hi = (s, q) => (q ? esc(s).replace(new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig"), "<mark>$1</mark>") : esc(s));

/* ===== Product card markup ===== */
function productCard(p, i, q) {
  const num = String(PRODUCTS.indexOf(p) + 1).padStart(2, "0");
  return `<article class="pc reveal in" style="--h:${HUES[PRODUCTS.indexOf(p) % HUES.length]}">
    <span class="pn">${num}</span>
    <h3>${hi(p.name, q)}</h3>
    <p class="pcount">${p.items.length} products</p>
    <ul class="plist">${p.items.map((x) => `<li>${hi(x, q)}</li>`).join("")}</ul>
    <div class="prow">
      <button class="lnk" data-toggle aria-expanded="false">VIEW PRODUCTS<span class="arr"><i data-lucide="arrow-right"></i></span></button>
      <a class="lnk" href="contact.html?product=${encodeURIComponent(p.name)}">REQUEST ENQUIRY<i data-lucide="send"></i></a>
    </div>
  </article>`;
}

/* ===== Home page: first six categories ===== */
function renderHomeProducts() {
  const el = document.getElementById("home-cats");
  if (el) { el.innerHTML = PRODUCTS.slice(0, 6).map((p) => productCard(p)).join(""); hydrateIcons(el); }
}

/* ===== Products page: filter chips, search, grid ===== */
function renderProductsPage() {
  const grid = document.getElementById("pgrid");
  if (!grid) return;
  const groups = ["All", ...new Set(PRODUCTS.map((p) => p.group))];
  let group = "All", q = "";
  const chips = document.getElementById("chips");
  function draw() {
    chips.innerHTML = groups.map((g) => `<button class="chip ${g === group ? "on" : ""}" data-g="${esc(g)}">${esc(g)}</button>`).join("");
    const needle = q.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => (group === "All" || p.group === group) && (!needle || p.name.toLowerCase().includes(needle) || p.items.some((x) => x.toLowerCase().includes(needle))));
    grid.innerHTML = list.length ? list.map((p) => productCard(p, 0, q.trim())).join("") : '<p class="none">No matching products. Contact us and we will help source it.</p>';
    hydrateIcons(grid);
    if (needle) grid.querySelectorAll(".pc").forEach((c) => c.classList.add("open"));
  }
  chips.addEventListener("click", (e) => { if (e.target.dataset.g) { group = e.target.dataset.g; draw(); } });
  document.getElementById("search").addEventListener("input", (e) => { q = e.target.value; draw(); });
  draw();
}

/* ===== Expand and collapse a card's full list ===== */
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-toggle]");
  if (!b) return;
  const open = b.closest(".pc").classList.toggle("open");
  b.setAttribute("aria-expanded", open);
});
