# Services — photographic redesign

Implemented locally for review. Not deployed.

The page now uses the simple title **Services**, with the subheading and introduction above the service list. The layout follows the owner's latest request for real-world photography and a personal tone.

## Changes

- Replaced the connected-node hero, six SVG illustrations, sticky secondary navigation, product tabs and interest selector with a straightforward photographic services layout.
- Six services: Stock Broking, Portfolio Management, Financial Planning, Private Wealth, Mutual Fund Distribution, Bonds & IPOs.
- Six compact investment-detail links retain all `product-*` deep links. Insurance remains linked as information, with the existing authorization qualification.
- Added the supplied Ajay Singh Mahala and Abhishek Mahala portraits to the consultation section.
- Retained a compact Portfolio Analyser / Financial Tools invitation and the existing booking route.
- Title and navigation label are now Services. Private Wealth and Insights remain in both menus.
- Preserved all three existing regulatory paragraphs verbatim. Provider roles and relevant service risks remain visible. Header/footer content is preserved except for the requested menu-label change.
- Existing white, blue and lavender tokens and typography remain. No new dependencies. All content works without JavaScript; the small script only handles header clearance and old anchor aliases.

## Files

Main: `services.html`, `offerings.css`, `offerings.js`, `products.html`, `images/services-stock-broking.webp`, `SERVICES-PHOTOGRAPHY.md`, and a historical-note addition to `OFFERINGS-MERGER.md`.

Other HTML pages with the shared navigation have only the Services & Products → Services menu-label replacement. The existing Private Wealth and Insights links remain present. No other body content or analysis/calculator implementation was changed.

## Real-world photography

The five existing self-hosted About photographs are reused with their existing source/license records in `ABOUT-PREMIUM.md`. These contextual stock photographs are not presented as Investo Experts staff, clients or premises.

New stock-broking context photograph by Firmbee.com:
https://www.pexels.com/photo/a-person-using-laptop-with-graph-on-screen-7013100/

License: https://www.pexels.com/license/

The new image is self-hosted as a 41 KB WebP. The two leadership portraits are the images previously supplied by the owner. No generated scene or diagram was used in this redesign.

## Executed checks

63 local headless-Chrome checks passed: title and heading order, all six photo sections, working internal routes, preserved disclosures/footer, unchanged unrelated body content, mobile menu, legacy Products redirects, old starting-point alias, no-JavaScript content, image decoding and no runtime errors.

Responsive checks at 320, 375, 390, 768, 1024 and 1440 px passed for page overflow, header clearance and minimum 44 px action heights. Desktop/mobile screenshots reviewed in `../../outputs/services-photography/`.

`node --check offerings.js` and CRLF-aware `git diff --check` passed. No configured build/lint commands exist for this static site. External ticker/font services were blocked in automated checks; their existing implementation was not changed. No booking submission was performed.
