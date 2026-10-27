# Portfolio dashboard refresh

Prepared locally, not deployed. Full analyser page; existing white/blue/lavender theme retained. Homepage is unchanged.

- Four summary cards: uploaded holdings value, profit/loss, invested amount and security count.
- Cost/current-value bar chart with Top 6/Top 10 switching, rupee scale and per-bar details.
- Sector allocation ring and asset-class cards using labels supplied in the upload. Missing asset labels stay unclassified; missing costs are never treated as zero.
- Growth scenario: adjustable annual return, monthly additions and 1/3/5/10-year horizons, including illustrative next-month/quarter values.
- Goal planner: nominal goal, horizon and assumed return determine the illustrative monthly contribution needed after the growth of starting holdings.
- Holdings search and sorting; filters do not change the source report or PDF contents.
- Existing concentration signals, insights, upload, clear/re-upload and PDF generation retained.
- New sidebar destinations and mobile horizontal navigation; embedded tools workspace supported.

No historical series, monthly yield, market prices or AI research are fabricated. A holdings snapshot does not supply income history or dated performance. Scenarios are deterministic illustrations with constant effective annual return, monthly compounding and end-of-month contributions, excluding fees, taxes, inflation and withdrawals. They are not forecasts or recommendations. Goals/scenarios remain on screen only; the existing PDF contains the holdings analysis. Nothing is stored or uploaded by this addition.

Implementation: scoped `portfolio-dashboard.css`, additive `portfolio-dashboard.js`, an event at the end of the existing render function, and new assets/sidebar links in `portfolio-xray.html`. Import parsing, portfolio calculations and PDF engine are unchanged.

Validation: upload-to-dashboard, exact totals, chart switching, asset grouping, search/sort, zero and negative return scenarios, goal math, missing data, clear/re-upload, PDF generation, embedded tools view and widths 320–1600px. Visual previews use synthetic holdings, not a client file. Automated browser download was cancelled by the test environment; PDF bytes were verified through the existing generator.
