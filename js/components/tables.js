window.TRSBS=window.TRSBS||{};
window.TRSBS.tables={
  observationRows:(d,limit=15)=>(d.series||[]).slice(-limit).reverse().map(r=>`<tr><td>${r.period}</td><td>Taraba State</td><td>TOTAL</td><td>ALL</td><td>${d.dataflow}</td><td class="observation-value">${Number(r.value).toLocaleString()}</td><td>${TRSBS.badges.status("A")}</td></tr>`).join(""),
  csv:d=>["TIME_PERIOD,GEOGRAPHY,SEX,AGE_GROUP,INDICATOR,OBS_VALUE",...(d.series||[]).map(r=>`${r.period},Taraba State,TOTAL,ALL,${d.dataflow},${r.value}`)].join("\n")
};