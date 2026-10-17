# Financial Planning Tools 2.0

Static, dependency-free calculators, now hosted in the dedicated `tools.html` workspace. See `TOOLS-CENTRE.md` for the move from the homepage and the direct PDF exporter.

## Files and architecture

- `tools.html`: calculator forms, the tool index and existing model integration. `index.html` now contains a compact workspace link; its `#financial-tools` and `#score-tool` anchors remain. The calculator panel IDs remain on the dedicated page.
- `financial-tools.css`: existing theme plus scoped `.ft-v2` controls, charts, result cards and report-print styles.
- `financial-tools.js`: accessible tabs, linked sliders, validation, local model rendering, SVG charts, annual tables and direct PDF export.
- `wealth-calculations.js`: deterministic UMD model module, usable directly in browsers and Node tests. No DOM, storage or network.
- `tests/wealth-calculations.test.cjs`: independent formula and boundary checks.

There is no framework, bundler, package manifest, charting library or lint configuration in the repository. No new runtime dependency is needed. Static files work with the existing GitHub Pages workflow. The logo, header, navigation, footer, service-role disclosure, consultation destination, portfolio links, video and unrelated homepage sections are preserved.

## Timing and compounding

Annual investment-return inputs are nominal assumptions converted to monthly rate `r = annual rate / 12`. They are not effective annual yields. Inflation and contribution/withdrawal increases compound once per year. Internal values use full precision; currency display rounds to whole rupees, with short chart labels in lakh/crore. Fixed non-negative returns are supported; negative-return paths and market volatility are outside this model.

### SIP and annual step-up

For month `m` starting at 1, contribution is `P × (1+s)^floor((m−1)/12)`. Update balance using `B[m] = B[m−1] × (1+r) + contribution`. Thus each contribution is at month-end, and the first increase occurs in month 13. At fixed contributions, future value is `P × a`, where `a = ((1+r)^n−1)/r`; at zero return `a=n`. Tables distinguish invested capital from gains. No taxes, charges or inflation adjustment is applied to SIP results.

### SWP

Withdrawal at month `m` is `W × (1+u)^floor((m−1)/12)`. Pay the lesser of the requested withdrawal and available corpus, then grow what remains at `r`. Report funded withdrawals, total requested withdrawals, unmet requested withdrawals, remaining corpus, growth and the first month ending at zero. A partial final withdrawal is included. Never allow a negative corpus. These are gross redemptions, not guaranteed income; tax, exit loads and charges are excluded.

### Inflation- and tax-aware goals

`T = today's target × (1+inflation)^years`. With existing savings `E`, monthly SIP `P`, and `n` months, `F = E(1+r)^n + P×a`. Contributions are `C=E+Pn`. Illustrative terminal tax is `t × max(F−C,0)`.

Existing savings are assumed to have a current tax cost basis equal to their current value. The rate `t` is user-entered, hypothetical and applied only at final redemption; it is not a statement of Indian tax law. Exemptions, tax slabs, holding periods, asset categories, cost-basis history, indexation, cess, surcharge and loss offsets are not modelled.

If `E_net` is the existing savings' after-tax future value, required SIP is `max(0, (T−E_net)/((1−t)×a+t×n))`. Existing savings already sufficient produce a zero SIP. Without a monthly budget, the funding projection uses this unrounded required SIP; the displayed required SIP rounds up to the next rupee. A user-entered budget instead exposes a funding shortfall or surplus. “Total contributions” includes the existing savings.

### Retirement

Expenses at retirement are `W = today's monthly expense × (1+inflation)^years_to_retirement`. Over `N` retirement months, corpus required at retirement is:

`sum(k=0..N−1) [ W × (1+inflation)^floor(k/12) / (1+post_return/12)^k ]`.

The first withdrawal is immediate at retirement. Living expenses increase at every retirement-year anniversary. Summing discounted cash flows avoids any singularity when the return equals inflation and handles returns below, equal to or above inflation. The target funds only the chosen duration and leaves no intended bequest.

Existing assets grow at the pre-retirement monthly rate. Current month-end contributions use the annuity factor. Additional monthly SIP is `max(required − projected,0)/a`. If retiring now (`n=0`), show the shortfall needed immediately; do not calculate an impossible SIP. The current-plan charts exclude the additional SIP so they do not imply an unfunded target has already been achieved. Pensions, taxes, fees, one-off healthcare costs, irregular spending and sequence-of-returns risk are excluded.

### Educational financial-wellness rubric

This rubric is not scientifically validated and is not a diagnosis or suitability assessment. Age does not change the score. Monthly living expenses exclude both EMI payments and investment contributions. Cash-flow surplus is income minus living expenses minus EMI, before investing. Investments are scored separately as a habit; they are not subtracted again in the savings-rate metric. Emergency savings are separate from investment corpus; insurance is cover, not a portfolio asset.

| Component | Weight | Full-credit benchmark |
|---|---:|---|
| Cash-flow surplus | 20 | 20% of income |
| Debt burden | 15 | No EMI; linear reduction to zero credit at 40% EMI/income |
| Emergency reserve | 20 | Six months of living expenses plus EMI |
| Investment contributions | 15 | 20% of income |
| Existing investments | 10 | One year's income |
| Life insurance cover | 10 | Ten times annual income |
| Health insurance cover | 10 | ₹5 lakh |

Each component scales linearly, clipped to 0..its weight. Sum and round to 0..100. Categories: 80+ stronger foundation; 60–79 building resilience; 40–59 areas to review; below 40 needs attention. Benchmarks are chosen for an illustrative checklist and are not individual recommendations. If expenses and EMI are zero, months of reserve is unavailable. The reserve component then gets full credit only when a positive reserve is reported; the result asks the visitor to check zero-outgo inputs. Dependants, income reliability, exclusions, occupational risk, financial goals and many other circumstances are not assessed.

## Validation and privacy

- Numeric model inputs reject strings, blanks, nonfinite values, negative monetary inputs and unsupported rates/durations. Required browser fields show inline errors; optional savings default to zero and an empty optional goal budget means “use the required SIP”.
- Durations and ages are integers. Retirement age cannot precede current age, and age plus retirement duration must not exceed 120. Retirement today is supported.
- Annual returns: 0–30%; SIP step-up: 0–25%; inflation/withdrawal increases: 0–15%; illustrative effective goal tax: 0–60%. Money and durations have explicit caps. Projections beyond ₹10^15 trigger an error rather than displaying invalid numbers.
- An invalid scenario hides stale results and disables printing. No `NaN` or `Infinity` is rendered.
- No financial inputs, score, report or scenario are saved to browser storage or transmitted to a server, analytics API, WhatsApp or lead form by these tools. Existing unrelated website forms remain unchanged. The consultation link is simply `contact.html`, without financial query parameters.
- No signup or contact details are required. The single Download PDF action generates a local PDF Blob and initiates a browser download. No print dialog is opened.

## Verification performed

Run from this repository:

`node --test tests/wealth-calculations.test.cjs`

18 model tests passed: ordinary SIP, annual step-up timing and independent growth calculation, zero returns, inflation-adjusted goals, funded goals, tax and budget scenarios, SWP timing/partial depletion, retirement cash flows at returns below/equal/above inflation, additional funding, immediate retirement, health-score weights/boundaries, zero outgo, invalid inputs and extreme projection limits.

Also executed `node --check financial-tools.js` and `node --check wealth-calculations.js`. No configured build or lint command exists.

The workspace browser harness `../verify-wealth-tools.cjs` passed: live updates, 4 main tabs plus SWP mode, linked sliders, chart year controls, input preservation, keyboard tab navigation, field labels, empty/negative/fractional/age validation, goal-name escaping, no calculator-triggered requests/storage, no console errors, no horizontal page/dashboard overflow at 1440/1024/768/390/320 pixels, 44px tab controls, reduced motion and an A4 print/PDF export. The harness compared the rest of the homepage with its baseline and confirmed only the calculator section, calculator listeners and script/style references changed.

Review outputs: `outputs/wealth-tools-2/` in the parent workspace, including screenshots, verification JSON and a sample retirement report. This implementation does not automatically deploy to production.
