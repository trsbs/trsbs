# TrSBS Statistics Portal — Project Scaffold

## Folder structure

```
trsbs-portal/
├── index.html          all page markup (shell + Home + Catalog + section pages)
├── css/
│   ├── tokens.css       design tokens ONLY — colors, spacing, fonts. Change a
│   │                    value here and it propagates everywhere.
│   └── app.css          every visual rule, reading from tokens.css. Never a
│                        hardcoded color/size here — if you see one, promote
│                        it to a token instead.
├── js/
│   ├── datasets.js       the dataset registry — titles, descriptions, SDMX
│   │                     dataflow/structure/frequency. Loaded first.
│   ├── navigation.js      one function, navigateTo(pageName), owns all
│   │                     page-switching + home-mode/section-mode state.
│   ├── catalog.js         everything specific to the Catalog page: opening
│   │                     a dataset, filtering, tabs, copy/download buttons.
│   ├── search.js          the global header search box.
│   └── main.js            boots the app — loaded LAST, after everything
│                          else has registered itself on window.TRSBS.
└── data/                 reserved for a future data/datasets.json — see
                          "Going further" below. Empty for now.
```

**Load order matters** and is already correct in `index.html`:
`datasets.js → navigation.js → catalog.js → search.js → main.js`.
Everything hangs off one global, `window.TRSBS`, so each file can rely on
the ones before it having run.

---

## The three things you'll do most often

### 1. Add a new dataset to the Catalog

Two touchpoints today (a known, documented tradeoff — see "Going further"):

**a) Register it** in `js/datasets.js`:
```js
window.TRSBS.datasets.transport = {
  title: "Road Transport & Infrastructure",
  description: "Road network, vehicle registrations, and transport indicators.",
  dataflow: "TRANSPORT",
  structure: "TRN.GEO.MODE.MEASURE.TIME",
  frequency: "Annual",
};
```

**b) Add a card** in `index.html`, inside `#catalogDatasetGrid`:
```html
<article class="catalog-dataset-card" data-category="economy" data-dataset="transport"
         data-search="transport roads vehicles infrastructure">
  <div class="catalog-dataset-top">
    <span class="dataset-badge">SDMX · DATAFLOW</span>
    <span class="dataset-updated">Updated 2026</span>
  </div>
  <h3>Road Transport &amp; Infrastructure</h3>
  <p>Road network, vehicle registrations, and transport indicators.</p>
  <div class="catalog-dataset-meta">
    <span class="catalog-meta-tag">Transport</span>
    <span class="catalog-meta-tag">Annual</span>
  </div>
  <div class="catalog-dataset-footer">
    <span class="catalog-dataset-id">TRN.TRANSPORT.01</span>
    <span class="catalog-open">View dataset →</span>
  </div>
</article>
```

`data-dataset="transport"` is the link between the two — `catalog.js`'s
`openDataset()` reads that key straight out of the registry. Nothing else
needs touching: click handling, filtering, and search all already query
`[data-dataset]` and `.catalog-dataset-card` generically.

To also feature it on the Home page, copy the same `<article class="dataset-card"
data-dataset="transport" ...>` pattern into the "Featured Datasets" grid.

### 2. Add a new top-level page (e.g. "Maps")

1. Add a `<section class="page section-page" id="page-maps">...</section>` in `index.html`.
2. Add a `data-page="maps"` button anywhere you want it reachable from — sidebar,
   primary nav, a "view all" link, a quick-link card. `main.js` wires up **every**
   element with a `data-page` attribute automatically; no JS changes needed.

### 3. Change a color, spacing value, or font

Edit `css/tokens.css` only. Every rule in `app.css` reads from a `var(--token)`,
so one change there is enough — you should never need to hunt through `app.css`
for a hardcoded hex value.

---

## Known limitation

The dataset detail view's **Dimensions**, **Observations**, and **Metadata**
tabs currently show the same static population-shaped placeholder content
regardless of which dataset you open (the Overview tab's title/description/
dataflow/frequency ARE correctly per-dataset — only those three deeper tabs
aren't yet). This is flagged here rather than hidden. Fixing it means
extending each registry entry in `datasets.js` with its own `dimensions[]`,
`sampleObservations[]`, and `metadata{}`, then having `catalog.js`'s
`openDataset()` render those into the tabs instead of leaving the static
HTML in place.

---

## Going further

- **Reduce dataset-adding to one touchpoint.** Right now step 1 above is two
  edits (registry + HTML card) that have to stay in sync manually. The
  registry could instead be treated as the *only* source of truth, with
  `catalog.js` generating every card (`#catalogDatasetGrid` and the Home
  "Featured Datasets" grid) from `window.TRSBS.datasets` at boot time. Worth
  doing once the dataset count grows past a dozen or so and manual sync
  starts causing real bugs; not worth the added indirection at 8 datasets.

- **Live data.** `trsbs-sdmx-engine.html` (the separate data explorer) already
  fetches `data/trsbs-data.json` with a fallback to embedded demo data if
  that fetch fails. This portal's `data/` folder is reserved for the same
  pattern later — `datasets.js` would `fetch("./data/datasets.json")` and
  fall back to the object literal already in the file, the same way the
  SDMX engine does. Not implemented yet since catalog metadata (titles,
  descriptions) changes far less often than the actual observation data
  the engine handles.
