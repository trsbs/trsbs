/* ═══════════════════════════════════════════════════════════
   DATASET REGISTRY
   This is the bridge between the public UI and the future SDMX
   service. Every dataset shown in the catalog and dataset-detail
   view reads from this object.

   TO ADD A NEW DATASET:
   1. Add an entry here with a unique key (e.g. "education").
   2. Add a matching <article class="catalog-dataset-card"
      data-dataset="education" data-category="..."> card in
      index.html's Catalog page.
   3. Nothing else needs to change — openDataset() in catalog.js
      reads whatever key you clicked.

   TO CONNECT REAL DATA LATER:
   Replace the object literal below with a fetch() against your
   API/SDMX endpoint, e.g.:

     window.TRSBS.datasets = await fetch("/api/datasets").then(r => r.json());

   ...and make sure main.js awaits that before calling
   TRSBS.navigateTo("home"). Everything downstream (catalog
   cards, dataset detail, observation table) reads this object's
   shape, not this file specifically — the shape is documented
   per-field below.
═══════════════════════════════════════════════════════════ */
window.TRSBS = window.TRSBS || {};

window.TRSBS.datasets = {

  population: {
    title: "Taraba State Population & Demography",
    description: "Population estimates, demographic structure and geographic distribution across Taraba State and its 16 Local Government Areas.",
    dataflow: "POPULATION",       // SDMX dataflow ID
    structure: "POP.GEO.SEX.AGE.TIME", // SDMX dimension structure
    frequency: "Annual",
  },

  agriculture: {
    title: "Agriculture & Livestock Statistics",
    description: "Crop production, livestock population, agricultural activities and production indicators across Taraba State.",
    dataflow: "AGRICULTURE",
    structure: "AGR.GEO.PRODUCT.MEASURE.TIME",
    frequency: "Annual",
  },

  health: {
    title: "Health & Health Facilities",
    description: "Health facilities, service delivery, maternal health and selected health indicators across Taraba State.",
    dataflow: "HEALTH",
    structure: "HLT.GEO.INDICATOR.TIME",
    frequency: "Annual",
  },

  education: {
    title: "Education Statistics",
    description: "Schools, enrolment, teachers, pupils and selected education indicators across Taraba State.",
    dataflow: "EDUCATION",
    structure: "EDU.GEO.SEX.LEVEL.TIME",
    frequency: "Annual",
  },

  labour: {
    title: "Labour & Employment",
    description: "Employment, unemployment, labour-force participation and workforce indicators.",
    dataflow: "LABOUR",
    structure: "LBR.GEO.SEX.INDICATOR.TIME",
    frequency: "Quarterly",
  },

  cpi: {
    title: "Consumer Prices & CPI",
    description: "Consumer price indices, inflation and selected price indicators.",
    dataflow: "CPI",
    structure: "CPI.GEO.ITEM.MEASURE.TIME",
    frequency: "Monthly",
  },

  gdp: {
    title: "Taraba State GDP",
    description: "Economic output and sectoral contribution to Taraba State's economy.",
    dataflow: "GDP",
    structure: "GDP.GEO.SECTOR.MEASURE.TIME",
    frequency: "Quarterly",
  },

  poverty: {
    title: "Poverty & Household Welfare",
    description: "Poverty, household welfare, living conditions and selected deprivation indicators.",
    dataflow: "POVERTY",
    structure: "POV.GEO.INDICATOR.TIME",
    frequency: "Survey",
  },

};
