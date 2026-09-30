window.TRSBS=window.TRSBS||{};
TRSBS.data={getDataset:async id=>TRSBS.getDataset(id),getObservations:async id=>(TRSBS.getDataset(id)||{}).series||[],getDomains:async()=>TRSBS.domains};