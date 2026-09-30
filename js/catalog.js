/* ═══════════════════════════════════════════════════════════
   CATALOG
   Everything specific to the Catalog page: opening a dataset's
   detail view, filtering the grid by category, switching the
   dataset's internal tabs (Overview / Dimensions / Observations
   / Metadata / API), and the catalog's own search box (separate
   from the global header search in search.js).
═══════════════════════════════════════════════════════════ */
window.TRSBS = window.TRSBS || {};

(function (TRSBS) {

  function openDataset(datasetId) {
    const dataset = TRSBS.datasets[datasetId];
    if (!dataset) {
      console.warn(`openDataset: no dataset registered for "${datasetId}"`);
      return;
    }

    TRSBS.navigateTo("catalog");

    document.getElementById("catalogListView").classList.add("hidden");
    document.getElementById("datasetDetail").classList.add("active");

    document.getElementById("detailTitle").textContent = dataset.title;
    document.getElementById("detailDescription").textContent = dataset.description;
    document.getElementById("detailDataflow").textContent = dataset.dataflow;
    document.getElementById("detailFrequency").textContent = dataset.frequency;
    document.querySelector(".dataset-detail-breadcrumb").textContent =
      `Catalog / Dataflow / ${dataset.dataflow}`;

    document.querySelectorAll(".data-panel").forEach((panel) => panel.classList.remove("active"));
    document.getElementById("panel-overview").classList.add("active");
    document.querySelectorAll(".dataset-tab").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.panel === "overview");
    });

    document.querySelector(".main").scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeDataset() {
    const listView = document.getElementById("catalogListView");
    const detail = document.getElementById("datasetDetail");
    if (listView) listView.classList.remove("hidden");
    if (detail) detail.classList.remove("active");
  }

  function initCatalog() {
    // any dataset-card / catalog-dataset-card with data-dataset opens the detail view
    document.querySelectorAll("[data-dataset]").forEach((card) => {
      card.addEventListener("click", () => openDataset(card.dataset.dataset));
    });

    const datasetBack = document.getElementById("datasetBack");
    if (datasetBack) {
      datasetBack.addEventListener("click", () => {
        closeDataset();
        document.querySelector(".main").scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // catalog-local search — filters the grid in place
    const catalogSearch = document.getElementById("catalogSearch");
    const catalogCards = document.querySelectorAll(".catalog-dataset-card");
    if (catalogSearch) {
      catalogSearch.addEventListener("input", () => {
        const query = catalogSearch.value.trim().toLowerCase();
        catalogCards.forEach((card) => {
          const searchable = (card.innerText + " " + (card.dataset.search || "")).toLowerCase();
          card.style.display = searchable.includes(query) ? "" : "none";
        });
      });
    }

    // category filter chips
    document.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        document.querySelectorAll(".filter-chip").forEach((item) => item.classList.remove("active"));
        chip.classList.add("active");
        const filter = chip.dataset.filter;
        catalogCards.forEach((card) => {
          card.style.display = (filter === "all" || card.dataset.category === filter) ? "" : "none";
        });
      });
    });

    // dataset detail's internal tabs (Overview / Dimensions / Observations / Metadata / API)
    document.querySelectorAll(".dataset-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.panel;
        document.querySelectorAll(".dataset-tab").forEach((item) => item.classList.remove("active"));
        tab.classList.add("active");
        document.querySelectorAll(".data-panel").forEach((panel) => panel.classList.remove("active"));
        const targetPanel = document.getElementById(`panel-${target}`);
        if (targetPanel) targetPanel.classList.add("active");
      });
    });

    // "API" action button jumps straight to the API tab
    const apiButton = document.getElementById("apiButton");
    if (apiButton) {
      apiButton.addEventListener("click", () => {
        document.querySelectorAll(".dataset-tab").forEach((tab) => {
          tab.classList.toggle("active", tab.dataset.panel === "api-preview");
        });
        document.querySelectorAll(".data-panel").forEach((panel) => panel.classList.remove("active"));
        document.getElementById("panel-api-preview").classList.add("active");
      });
    }

    // "Copy" button on the API code block
    const copyApi = document.getElementById("copyApi");
    const apiCode = document.getElementById("apiCode");
    if (copyApi && apiCode) {
      copyApi.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(apiCode.innerText);
          copyApi.textContent = "Copied";
          setTimeout(() => { copyApi.textContent = "Copy"; }, 1500);
        } catch (error) {
          copyApi.textContent = "Copy failed";
        }
      });
    }

    // demo "Download CSV" — swap this for a real API/tsbsR-backed export later
    const downloadButton = document.getElementById("downloadButton");
    if (downloadButton) {
      downloadButton.addEventListener("click", () => {
        const csv = [
          "TIME_PERIOD,GEOGRAPHY,SEX,AGE_GROUP,INDICATOR,OBS_VALUE",
          "2026,Taraba State,TOTAL,ALL,POPULATION,3800000",
          "2025,Taraba State,TOTAL,ALL,POPULATION,3700000",
          "2024,Taraba State,TOTAL,ALL,POPULATION,3610000",
          "2023,Taraba State,TOTAL,ALL,POPULATION,3520000",
          "2022,Taraba State,TOTAL,ALL,POPULATION,3430000",
          "2021,Taraba State,TOTAL,ALL,POPULATION,3340000",
          "2020,Taraba State,TOTAL,ALL,POPULATION,3250000",
        ].join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "trsbs-population-observations.csv";
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      });
    }

    // demo "Refresh data" button — placeholder for a real re-fetch later
    const refreshData = document.getElementById("refreshData");
    if (refreshData) {
      refreshData.addEventListener("click", (event) => {
        const button = event.currentTarget;
        const original = button.textContent;
        button.textContent = "Refreshing...";
        button.disabled = true;
        setTimeout(() => {
          button.textContent = "Updated";
          setTimeout(() => { button.textContent = original; button.disabled = false; }, 1200);
        }, 700);
      });
    }
  }

  TRSBS.openDataset = openDataset;
  TRSBS.closeDataset = closeDataset;
  TRSBS.initCatalog = initCatalog;

})(window.TRSBS);
