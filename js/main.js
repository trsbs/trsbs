/* ═══════════════════════════════════════════════════════════
   MAIN — boot sequence
   Loaded last (after datasets.js, navigation.js, catalog.js,
   search.js), so window.TRSBS is fully populated by the time
   this runs. This file only wires up generic, page-agnostic
   click handling — anything dataset- or catalog-specific lives
   in catalog.js.
═══════════════════════════════════════════════════════════ */
(function (TRSBS) {

  // Any element anywhere in the page with a data-page attribute
  // navigates when clicked — sidebar links, primary-nav links,
  // hero buttons, "view all" links, quick-link cards, etc.
  // Adding a new one requires zero JS changes.
  document.querySelectorAll("[data-page]").forEach((item) => {
    item.addEventListener("click", (event) => {
      if (item.tagName === "A") event.preventDefault();
      const targetPage = item.dataset.page;
      if (targetPage) TRSBS.navigateTo(targetPage);
    });
  });

  // Hamburger only exists/is visible in section-mode (home-mode hides
  // it entirely via CSS — see .app.home-mode .menu-button in app.css).
  // Its current job: jump back to the Catalog page.
  const menuButton = document.getElementById("menuButton");
  if (menuButton) {
    menuButton.addEventListener("click", () => TRSBS.navigateTo("catalog"));
  }

  TRSBS.initCatalog();
  TRSBS.initGlobalSearch();

  // Boot on Home.
  TRSBS.navigateTo("home");

})(window.TRSBS);
