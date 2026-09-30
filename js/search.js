/* ═══════════════════════════════════════════════════════════
   GLOBAL HEADER SEARCH
   Searches both the featured dataset cards (visible on Home)
   and the full catalog. If it finds a catalog match, it jumps
   the user to the Catalog page and pre-fills the catalog's own
   search box so the two stay in sync.
═══════════════════════════════════════════════════════════ */
window.TRSBS = window.TRSBS || {};

(function (TRSBS) {

  function initGlobalSearch() {
    const globalSearch = document.getElementById("globalSearch");
    if (!globalSearch) return;

    globalSearch.addEventListener("input", () => {
      const query = globalSearch.value.trim().toLowerCase();
      const catalogCards = document.querySelectorAll(".catalog-dataset-card");

      if (!query) {
        document.querySelectorAll(".dataset-card").forEach((card) => { card.style.display = ""; });
        return;
      }

      const matches = Array.from(catalogCards).filter((card) => {
        const text = (card.innerText + " " + (card.dataset.search || "")).toLowerCase();
        return text.includes(query);
      });

      if (matches.length > 0) {
        TRSBS.navigateTo("catalog");
        const catalogSearch = document.getElementById("catalogSearch");
        if (catalogSearch) catalogSearch.value = query;
        catalogCards.forEach((card) => {
          const text = (card.innerText + " " + (card.dataset.search || "")).toLowerCase();
          card.style.display = text.includes(query) ? "" : "none";
        });
      }
    });
  }

  TRSBS.initGlobalSearch = initGlobalSearch;

})(window.TRSBS);
