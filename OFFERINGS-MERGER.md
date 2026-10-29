# Services & Investment Products merger

Historical implementation record. The subsequent owner-requested photographic Services redesign is documented in `SERVICES-PHOTOGRAPHY.md`; its page layout supersedes the layout described below.

Status: implemented locally; not deployed. Review at http://127.0.0.1:8831/services.html.

## Improvements

One flagship `services.html` replaces the separate overview pages while retaining existing detail routes. The existing light white/blue/lavender theme, fonts, logo, header, ticker and footer design remain. New layouts use the established CSS variables, lightweight inline SVG, CSS and dependency-free JavaScript.

- Editorial hero with a six-node connected financial ecosystem, entry sequence, line drawing and a restrained one-cycle float. Shorter mobile labels remain readable; the SVG has a full accessible description.
- Sticky six-section navigation below the actual website header, active-location underline, mobile horizontal scrolling and anchor offsets.
- Six alternating editorial service showcases, each with a different custom illustration. Charts are illustrative and show no fabricated prices.
- Keyboard-accessible six-category product explorer with roving focus, arrows/Home/End, deep links and a complete readable no-JavaScript fallback.
- Six-choice educational starting-point guide with relevant links and consultation access. It does not assess suitability or recommend investments.
- Actual Portfolio X-Ray interface preview generated from illustrative test holdings, compressed to a 56.6 KB WebP. Existing upload/analysis code is unchanged.
- Central business-supplied metrics, provider-role disclosures and consultation/tools CTA.
- Reduced-motion, save-data, touch and hidden-tab handling; illustrations/reveals run once rather than continuously. Cursor lighting is limited to fine pointers.

## Inventory and content decisions

Original Services categories were Stock Broking, Portfolio Management, Financial Planning and Mutual Fund Distribution. The homepage additionally already described Wealth Advisory and Bonds & IPO. All six are represented in the merged page, with descriptions distinguishing distributor/partner introductions from regulated activities performed by providers.

Original Products categories were Financial Planning, Mutual Funds, Direct Equity, Bonds & Fixed Income, IPO Investment, Sovereign Gold Bonds and Insurance Solutions.

The explorer includes Financial Planning first, Equity Shares, Mutual Funds, Bonds & Fixed Income, IPO Investments and Sovereign Gold Bonds. Financial Planning is explicitly described as a process rather than an investment instrument. Each panel includes explanation, characteristics, considerations, risks, eligibility and a detail/tool link. No current SGB issuance or availability is asserted.

Insurance remains linked as an existing informational page. No insurance distribution authorization or provider arrangement has been supplied, so it is not presented as an active distribution category. ETFs, derivatives, commodities and international products have not been added without verified arrangements.

The three existing regulatory paragraphs are preserved verbatim, including the supplied ARN 191362, EUIN E384337 and AP0297145661. The PMS description names Motilal Oswal Asset Management Company Limited, distinguishes the provider from Investo Experts, and explains the generally applicable standard ₹50 lakh minimum subject to current rules, exceptions and provider terms. Primary reference: https://investor.sebi.gov.in/pms_final.html.

Metrics are the owner's supplied 12+ years, 2,100 client relationships and ₹270+ crore reported AUM. They are centralized for this page in `business-profile.js`, not independently audited. The AUM definition remains broad (across client/product/provider relationships); the page does not imply independent PMS management. A dated, precisely defined and evidenced AUM scope remains needed before a more specific assertion can be published.

Original CTA destinations remain available: stock broking, PMS, financial planning, mutual funds, equity, bonds, IPO, gold, insurance, private wealth, tools and consultation. The supplied Motilal Oswal Demat URL is used. No important old Products fragment IDs were found, but common legacy aliases are supported.

## Navigation, routing and SEO

Main and mobile navigation now read Home | About Us | Services & Products | Private Wealth | Financial Tools | Insights | Contact Us, with Book Consultation retained. Private Wealth and Insights were restored to the main menu at the owner’s request after the initial merger. The existing mobile menu is used up to 1280 px so all links remain accessible without crowding.

All internal old Products page links and applicable breadcrumb URLs now point to the merged investment-products section. Existing detail-page body content was otherwise preserved by an automated comparison against pre-change copies.

`services.html` has the combined SEO title, description, canonical, social metadata, updated breadcrumb and six-service ItemList structured data. `sitemap.xml` retains Services and removes the retired Products overview.

`products.html` is a compatibility stub with canonical Services URL, noindex/follow, a visible fallback link and `products-redirect.js`. The JavaScript redirect preserves the query and maps known fragments. With JavaScript disabled, a noscript meta refresh opens the product explorer.

Limitation: the current static GitHub Pages setup provides no configured server-side 301 redirect. This compatibility strategy cannot emit an HTTP 301; the no-JavaScript refresh cannot preserve the original query/fragment. Search engines decide when to recrawl and update snippets; there is no instant search-result update guarantee.

## Modified files

Main implementation:
- services.html
- products.html
- offerings.css (new)
- offerings.js (new)
- products-redirect.js (new)
- business-profile.js (new)
- images/portfolio-interface-preview.webp (new)
- sitemap.xml
- OFFERINGS-MERGER.md (new)

Navigation, shared Products links or breadcrumb routing only:
about.html, bonds-fixed-income.html, book-consultation.html, contact.html, direct-equity.html, financial-planning.html, index.html, insights.html, insurance-solutions.html, ipo-investments.html, mutual-funds.html, newsletter-october-2026.html, portfolio-management.html, portfolio-xray.html, post-5cr-portfolio.html, post-market-trends-geopolitics-2026.html, post-nifty-outlook.html, post-sector-outlook.html, post-sip-strategy.html, post-stock-analysis-methodology.html, private-consultation.html, private-wealth.html, sovereign-gold-bonds.html, stock-broking.html, tools.html.

The Services page's pre-existing truncated inline calculator script tail was removed; the working header/hamburger behavior was retained. No calculator feature was moved or changed.

## Executed verification

- Local headless Chrome / Playwright: 95 checks passed. Verified six showcases/panels, main navigation labels, CTA/internal paths and fragments, keyboard tabs, hash selection, generated guide links, accurate final counters, runtime errors, original disclosure preservation and unchanged unrelated content.
- Responsive checks at 320, 375, 390, 768, 1024 and 1440 px: no horizontal page overflow; sticky strip clears header; hero breadcrumb clears header; visible CTA/tab/guide targets at least 44 px high.
- Redirects tested with query strings, legacy and direct product fragments, unknown/malformed fragments, and JavaScript disabled.
- Reduced-motion, save-data, touch and missing IntersectionObserver fallbacks checked. All six panels remain readable with JavaScript disabled.
- Normal-motion reveal and counter completion checked.
- Desktop/mobile screenshots visually reviewed for hero, product explorer, service showcase, guide, X-Ray preview and final CTA. Outputs: `../../outputs/offerings/`.
- Existing `node --test tests/wealth-calculations.test.cjs`: 18 passed, 0 failed.
- `node --check` on all three new JavaScript files: passed.
- `git -c core.whitespace=cr-at-eol diff --check`: passed (Git's LF-to-CRLF notice is informational).
- No package.json, build command or configured lint command exists; none is claimed to have run.

Browser checks blocked external requests for deterministic local testing. Existing external ticker/font/provider services and actual booking submission/email delivery were not end-to-end tested. Existing font declarations remain unchanged and fall back to the existing sans-serif stack if unavailable.

No heavy libraries, new API services, credentials, live market feed, private client data or generated investment recommendations were introduced. No deployment has been performed.
