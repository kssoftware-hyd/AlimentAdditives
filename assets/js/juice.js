/* ===== Juice concentrate page: filter the product cards by fruit family ===== */
(function () {
  const chips = document.querySelectorAll("[data-fam]");
  const cards = document.querySelectorAll(".jc");
  const count = document.getElementById("jcount");
  chips.forEach((chip) => chip.addEventListener("click", () => {
    const fam = chip.dataset.fam;
    let shown = 0;
    chips.forEach((c) => c.classList.toggle("on", c === chip));
    cards.forEach((card) => {
      const show = fam === "All" || card.dataset.family === fam;
      card.hidden = !show;
      if (show) shown += 1;
    });
    if (count) count.textContent = shown + (shown === 1 ? " product" : " products");
  }));
})();
