/* ═══════════════════════════════════════════════════════════
   NAVIGATION
   One function, navigateTo(pageName), owns all page-switching
   state: which .page is visible, home-mode vs section-mode on
   the .app shell, and which sidebar/header-nav link is active.

   TO ADD A NEW TOP-LEVEL PAGE (e.g. "Maps"):
   1. Add a <section class="page section-page" id="page-maps"> in index.html.
   2. Add a matching [data-page="maps"] button/link wherever it
      should be reachable from (sidebar, primary-nav, a card, etc.)
      — navigateTo() is wired to ANY element with a data-page
      attribute, so no JS changes are needed here.
═══════════════════════════════════════════════════════════ */
window.TRSBS = window.TRSBS || {};

window.TRSBS.navigateTo = function navigateTo(pageName) {
  const selectedPage = document.getElementById(`page-${pageName}`);
  if (!selectedPage) {
    console.warn(`navigateTo: no page found for "${pageName}"`);
    return;
  }

  document.querySelectorAll(".page").forEach((page) => page.classList.remove("active"));
  selectedPage.classList.add("active");

  const app = document.getElementById("app");
  if (pageName === "home") {
    app.classList.add("home-mode");
    app.classList.remove("section-mode");
  } else {
    app.classList.remove("home-mode");
    app.classList.add("section-mode");
  }

  document.querySelectorAll(".sidebar-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === pageName);
  });
  document.querySelectorAll(".primary-nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === pageName);
  });

  const main = document.querySelector(".main");
  if (main) main.scrollTo({ top: 0, behavior: "smooth" });

  // Leaving the Catalog page always resets back to the list view,
  // never leaves a dataset detail view stranded behind the scenes.
  if (pageName === "catalog" && window.TRSBS.closeDataset) {
    window.TRSBS.closeDataset();
  }
};
