# Cinematic investment journey

Status: completed locally; not deployed.

## Scope

Only the homepage `#stories` section previously titled “Start With a Clear Investment Conversation” is replaced. A baseline comparison verifies every other homepage section, header, footer and navigation remains unchanged, apart from two new stylesheet/script references.

Files: `index.html`, `wealth-journey.css`, `wealth-journey.js` and this note.

## Design and behavior

- Existing white, blue and light-purple theme, with subtle pastel lighting and a low-contrast grid texture.
- Horizontal three-stage timeline on desktop; a vertical timeline at 700px and below.
- Three original inline SVG illustrations share glass gradients, edge lighting, elliptical platforms, scale and material treatment: goals conversation, financial dashboard, directional compass.
- Scroll entry reveal and stagger; connecting line draw, traveling blue accent and one gentle illustration movement cycle. No infinite animation, autoplay video, canvas, 3D runtime or dependencies.
- Motion runs once per page load, pauses when the document is hidden and is disabled for reduced-motion/save-data. No IntersectionObserver means a static, fully visible section. Enabling reduced-motion during a session permanently disables decorative motion for that page load.
- CTA points to the existing `book-consultation.html` workflow. Secondary link points to `tools.html`. Clear focus indicators and at least 44px link targets.
- Copy retains the emphasis on circumstances, provider identity, registrations, costs, risks and client choice; no guaranteed outcome or independent authorization claims.

## Validation

`node --check wealth-journey.js` and CRLF-aware `git diff --check` pass. No package manifest/build/lint command is configured for this static homepage.

Browser checks pass at 1440, 1280, 1024, 768, 700, 390 and 320px: section-only source comparison, three semantic stages/SVGs, valid CTA destinations, keyboard/focus, target size, horizontal/vertical layouts, no horizontal or text overflow, single animation iterations and no re-entry restart, hidden-tab pause, reduced-motion, no-JS, no-observer and save-data fallbacks. No runtime console errors.

Visual screenshots and verification data are in `outputs/wealth-journey/` outside the publishable checkout. Graphics use vector gradients to suggest glass depth; they are not rendered 3D scenes. No deployment was performed.
