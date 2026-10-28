# About Us redesign

Status: completed locally, not deployed. Scope is `about.html` plus its new scoped CSS and JavaScript. Other pages and shared tokens are unchanged.

## Implemented

- Editorial split hero with real-world photography, soft blue background treatment and staggered load entrance.
- Company story using existing factual business-role copy and the two portraits already provided by the owner. No invented establishment dates, personal history or achievements. The philosophy quotation uses wording approved in the supplied brief and is not attributed to an individual.
- Four statistics panels use the latest owner-approved figures: 12+ years, 2,100 clients and ₹270+ crore reported AUM; Jaipur is the fourth panel. No invented fourth numerical metric. The asset figure is qualified as client/provider relationships and does not imply independently registered portfolio management. Count-up finishes at exactly 12 / 2,100 / 270; static values are available without JS.
- Larger editorial leadership profiles for Ajay Singh Mahala, Abhishek Mahala and Priyanka Mahala. Existing titles/telephone links retained; wording that could suggest independent regulated investment advice is avoided. Priyanka has a branded monogram, not an invented portrait.
- Four photographic philosophy panels, clear partnership presentation, visible role/registration/PMS panels and booking/tools closing CTA.
- Lightweight once-only reveals, short stagger, subtle image interactions and desktop pointer lighting. Reduced motion, save-data and no-observer fallbacks. Counter animation ends immediately if the page becomes hidden.
- Header, ticker, footer and navigation markup/code are preserved. A pre-existing truncated unused calculator script at the end of the About file was removed and the document closed properly; the retained navigation script now parses and works.

## Missing source information and limitations

- Priyanka's professional photograph is not supplied.
- No three verified dated company milestones are available; the requested history timeline is deliberately omitted.
- Existing owner-provided portraits are reused; their provenance was not independently authenticated.
- No new founding story, awards or credentials are claimed. Business figures/registration identifiers are the existing business-supplied information, not independently audited evidence.
- Motilal Oswal is presented as text; no new third-party logo asset is introduced without authorization.
- No suitable custom video asset was supplied. The hero uses an optimized local WebP photo; no video, WebGL or new runtime dependency.

## Validation actually executed

`node --check about-premium.js`; inline executable scripts compiled with Node `vm.Script`; CRLF-aware `git diff --check`. No package manifest, build or lint command is configured for this static page.

Playwright checks pass at 320, 375, 390, 768, 1024, 1440 and 1920px: no document horizontal overflow or clipped text/cards, CTA routes/anchors, 44px CTA targets, keyboard/focus, mobile menu/navigation, exact counters, source comparisons for header/footer/navigation, all three old regulatory paragraphs preserved verbatim, original design-token values, no-JS/no-observer/save-data and reduced-motion behavior. No runtime console errors. Desktop and mobile screenshots reviewed in `outputs/about-premium/` outside the checkout.


## Photography revision requested by the owner

The abstract hero SVG and all four principle illustrations are replaced with real stock photography, self-hosted as optimized WebP files (about 244 KB total). These are contextual photographs, not claims about Investo Experts staff, clients or premises. Existing leadership portraits remain unchanged; Priyanka retains her monogram.

Source/license: https://www.pexels.com/license/ (website use permitted; no endorsement implied).
- Hero: https://www.pexels.com/photo/people-having-a-meeting-7433838/
- Research: https://www.pexels.com/photo/a-person-working-on-the-documents-using-a-calculator-8297220/
- Risk review: https://www.pexels.com/photo/hands-on-table-with-chart-8068694/
- Long-term: https://www.pexels.com/photo/contemporary-glass-skyscrapers-under-cloudless-blue-sky-7078663/
- Transparency: https://www.pexels.com/photo/a-person-holding-a-paper-with-graphs-and-charts-7109317/
