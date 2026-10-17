# Financial Intelligence Centre

## Experience

`tools.html` is the dedicated tools workspace. The left index opens Portfolio Analyser first, followed by Financial Health, SIP / SWP, Goal Planner and Retirement Planner. On phones, the index becomes a compact grid above the selected tool. Deep links: `#portfolio`, `#score`, `#sip`, `#swp`, `#goal`, `#retirement`.

The homepage calculator dashboard is replaced by a small link to the tools workspace. The homepage hero, existing portfolio analyser feature, its links and animations, navigation, services and footer are preserved. The homepage `#financial-tools` and `#score-tool` anchors still lead to the tools-discovery link.

## Existing portfolio analyser

The analyser runs in a same-origin iframe at `portfolio-xray.html?embed=tools`. Its original upload/parser, calculations and PDF export are unchanged. It accepts the same Excel, CSV, PDF and screenshot inputs as before; supported layouts and existing size limits remain unchanged.

`portfolio-embed.js` activates only for that query parameter inside a frame. It hides the duplicate navigation and resizes the parent frame using a message containing only document height. The parent checks both source window and origin. Holdings are not posted to the parent or uploaded. The frame stays mounted while switching tools, preserving its report until the visitor clears it or leaves the page. The ordinary `portfolio-xray.html` route retains its original layout.

## Calculator PDF downloads

All five calculator modes now have a single **Download PDF** action. No print dialog or extra save/print control is used. `wealth-pdf.js` builds a vector PDF locally, with the existing logo, scenario inputs, metric cards, charts, yearly tables, assumptions and numbered pages. A browser Blob URL and download link initiate the save. The portfolio analyser keeps its existing direct PDF exporter.

The model module `wealth-calculations.js` is unchanged. Financial formulas and limitations remain documented in `FINANCIAL-TOOLS.md` and on the tools page. Model assumptions and inputs stay local. PDFs use portable built-in fonts, Indian digit grouping and `INR` currency labels; non-Latin goal text is not fully supported by the PDF font and may appear as question marks. The web inputs continue to support Unicode.

## Verification

- All 18 deterministic calculation tests pass.
- Browser checks pass for the default analyser, CSV upload, duplicate-holding aggregation, report persistence between tools, clearing a report, frame resizing, invalid-input export disabling, input preservation, vertical keyboard navigation and deep links.
- No horizontal page or workspace overflow at 1440, 1024, 768, 390 and 320 pixels; standalone analyser navigation remains visible at its original route.
- Six generated PDF blobs and their download filenames were verified. Files were captured from the generated blobs and reopened with a strict PDF reader. The automated Chrome session cancels operating-system download saves, including a separate minimal Blob-download test; this environment limitation is recorded in the browser verification JSON rather than reported as a successful browser file save.
- Generated report pages were rendered for visual inspection. No calculator invokes `window.print()`.
- A source comparison confirms the homepage outside the replaced calculator section and its asset references is unchanged.

New assets are ordinary static files and use the existing GitHub Pages workflow. These changes have not been deployed to production.
