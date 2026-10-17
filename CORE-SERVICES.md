# Cinematic Core Services

This change affects only the homepage's Core Services section. It is ready for review and has not been deployed.

## Modified files

- `index.html`: replaces the six uniform service cards and the section introduction; adds the scoped stylesheet and deferred enhancement script.
- `core-services.css`: the intro composition, asymmetric grid, card typography, SVG treatments, hover lighting, responsive rules and motion fallbacks.
- `core-services.js`: progressive entrance effects, visibility-aware decorative animation, fine-pointer light positioning and a restrained featured-card tilt.
- `CORE-SERVICES.md`: implementation, verification and media notes.

The site's existing font family, white/navy/blue/lavender palette, logo, header, hero, portfolio feature, calculator links, other homepage sections and footer are unchanged. All six original service destinations remain intact: portfolio-management.html, stock-broking.html, financial-planning.html, private-wealth.html, mutual-funds.html and products.html.

## Visual design

The introduction uses the requested heading, soft SVG ribbons, a faint grid and a custom glass-like orbital data sculpture. The sculpture uses layered gradients, highlights and overlapping elliptical forms; it does not require WebGL or a 3D engine.

Desktop uses a 12-column bento layout: the navy Portfolio Management feature spans two rows, with Stock Broking and Financial Planning alongside it, followed by Wealth Advisory, Mutual Fund Distribution and Bonds & IPO. Tablet uses a balanced two-column grid with full-width feature and final card. Phones stack all six cards.

Each service has its own SVG: portfolio growth, candlesticks, progress rings/milestones, allocation orbits, a segmented diversification ring, and a certificate with an abstract curve. Chart compositions are labelled illustrative; there is no fabricated market quote or investment performance.

The existing PMS minimum/provider qualification and other service positioning are retained. Wording implying complete financial security or stable investment returns is softened to discuss financial priorities, eligibility, costs and risks. No new registration, product performance or business statistic is introduced.

## Motion and performance

No runtime dependencies, WebGL, canvas, background video, additional fonts or raster media are added. Uncompressed initial sizes are approximately 12.5 KB of CSS, 2.6 KB of deferred JS and 16.8 KB of inline section markup including SVGs. The inline SVGs are immediately available and have fixed aspect ratios to avoid media layout shifts.

Entrance animations run once as elements approach the viewport. All content is visible by default; observer or JavaScript failure cannot leave service links permanently hidden. Decorative loops are limited to the ribbon, orbital sculpture and feature nodes and are gated by viewport visibility. Visibility changes pause continuous motion. Fine-pointer movement is scheduled with requestAnimationFrame, limited to about one degree of featured-card tilt, and resets on pointer leave. Touch input never sets cursor effects.

Reduced-motion and save-data preferences receive static visuals. Phone layouts disable continuous sculpture/ribbon/node motion. SVG geometry remains readable without animation, video or WebGL support. This is a lightweight simulated-depth SVG composition, not an interactive 3D scene.

## Verification

Executed `node --check core-services.js` and `git diff --check` with CRLF-aware whitespace handling. No package manifest, build step or lint task exists in the repository.

The workspace browser verification checks:

- Only the intended section and its two asset references change outside the new files.
- Six service cards and all original link destinations remain; destinations resolve to existing repository pages.
- Desktop, laptop, tablet and phone widths: 1440, 1280, 1024, 768, 390 and 320 pixels, with no page/section horizontal overflow and no card-copy/CTA clipping.
- Two-column tablet and single-column phone layouts; CTA targets at least 44px high.
- Keyboard order, visible focus, fine-pointer lighting/tilt and reset.
- Reduced-motion, touch, hidden-document, save-data, no-JavaScript and unavailable-observer fallbacks.
- No browser console errors in the normal experience.

Screenshots and a machine-readable verification summary are in the parent workspace's `outputs/core-services/` directory. No production Lighthouse or real-device performance score is claimed; final rendering and font metrics can vary with the visitor's browser.

## Optional future video specification

The SVG/CSS treatment meets the brief without a video. If a future art-directed loop is commissioned, use the same abstract blue-glass sculpture/light-ribbon composition, not stock trading-floor footage. Recommended delivery: a seamless 10-14 second, 24 fps, silent 1440x810 WebM (VP9, target under 1 MB) plus an H.264 MP4 fallback (target under 1.5 MB), with a still AVIF/WebP poster under 80 KB. Use no controls, muted inline looping playback, lazy loading near the section, and the existing SVG still for reduced-motion, data-saving and mobile users. These are proposed asset targets, not assets generated or shipped in this change.
