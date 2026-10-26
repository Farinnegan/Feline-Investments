# CFA Level I Equity — Master Study Reference

A single reference for the whole Equity topic: the terms, definitions, and formulas you are tested on, plus the full mock-style question bank with an answer key. Organized module by module (1–8), then a formula quick sheet, then the questions.

How to use it: read the module sections to review concepts, drill the formula sheet before any calculation set, and use the question bank closed-book, checking the answer key only after you commit.

---

## Module 1 — Market Organization and Structure

### Key terms
- **Bid**: highest price a buyer will pay. **Offer / ask**: lowest price a seller will accept. **Spread** = offer − bid (narrow spread = liquid).
- **Takes the market**: an order priced to execute immediately against the best quote. **Makes a new market**: an order posted inside the spread that becomes the new best bid/offer. **Makes the market**: an order at the existing best quote. **Behind the market**: an order priced worse than the best quote; it waits.
- **Market structures**: quote-driven (dealer) markets trade against dealer inventory; order-driven markets match orders by rules; brokered markets use a broker to find a counterparty for large/illiquid/unique positions.
- **Intermediaries**: broker (agent, finds counterparty, earns commission); dealer (principal, supplies liquidity from inventory, earns spread); investment bank (helps issue new securities); securitizer (pools assets and issues claims backed by the pool).
- **Long position**: owns the asset; loss capped at the purchase price, upside unlimited. **Short position**: borrows and sells the security, later buys it back to return it; maximum gain capped (price can only fall to zero), maximum loss theoretically unlimited.
- **Margin / leverage**: buying with borrowed money. Initial margin = equity % put up to open. Maintenance margin = minimum equity % that must be kept; falling below triggers a margin call.

### Formulas
- Spread = best offer − best bid; best bid = best offer − spread
- Leverage ratio = position value / equity
- Maximum leverage = 1 / minimum margin requirement
- Margin call price (long) = P0 × (1 − initial margin) / (1 − maintenance margin)

### Exam traps
- Given the offer and the spread, the bid is offer **minus** spread. Never add the spread to the offer.
- Read order aggressiveness from the side of the order: for a sell, a lower price is more aggressive; for a buy, a higher price is more aggressive.
- Initial margin sets starting equity; maintenance margin sets the trigger ratio. The initial equity amount is not the margin call price.
- Max leverage divides by the equity fraction, never the borrowed fraction.
- A short is defined by borrowing then selling, not merely by selling.

---

## Module 2 — Security Market Indexes

### Key terms
- **Security market index**: a number representing a market, segment, or asset class; built as a portfolio of constituent securities and valued regularly from their prices.
- **Price return index** vs **total return index**: price return counts only prices; total return counts prices plus reinvested income (dividends/interest). Equal at inception; total return exceeds price return thereafter.
- **Weighting methods**: price-weighted (like the Dow), equal-weighted (like S&P 500 Equal Weight), market-cap weighted (like the S&P 500), float-adjusted market-cap weighted (the real S&P method, counts only publicly tradable shares).
- **Rebalancing**: resetting weights back to target, mainly needed for equal-weighted indexes; cap-weighted indexes are largely self-adjusting. **Reconstitution**: changing the index membership; triggers a rebalance and keeps the index representative.
- **Equity index types**: broad market, multi-market (multiple countries), sector, style (size and value/growth).

### Formulas
- Price return index value = Σ(nᵢ × Pᵢ) / Divisor
- Single-period price return PR = (V₁ − V₀) / V₀
- Single-period total return TR = (V₁ − V₀ + income) / V₀
- Multi-period value = V₀ × (1 + r₁)(1 + r₂)…(1 + r_T)   (chain the returns, do not add)
- Price weight: wᵢ = Pᵢ / ΣP
- Equal weight: wᵢ = 1 / N
- Market-cap weight: wᵢ = (Qᵢ Pᵢ) / Σ(Qⱼ Pⱼ)
- Float-adjusted weight: wᵢ = (fᵢ Qᵢ Pᵢ) / Σ(fⱼ Qⱼ Pⱼ)

### Exam traps
- "At inception" overrides the later relationship: equal at launch, total return higher only after dividends.
- Keep the three tilts straight: price-weighted tilts to high-priced stocks, cap-weighted tilts to large companies, equal-weighted tilts to small companies.
- Equal-weighted indexes need frequent rebalancing; cap-weighted do not.

---

## Module 3 — Market Efficiency

### Key terms
- **Informationally efficient market**: prices reflect information quickly and rationally. Efficiency is a continuum, not all-or-nothing.
- **Market value vs intrinsic value**: inefficiency is the gap between the two; only that gap can be profited from.
- **Three forms**: weak form (prices reflect all past price/volume data → technical analysis cannot earn abnormal returns); semi-strong form (prices reflect all public information → public-information fundamental analysis cannot earn abnormal returns without a comparative advantage); strong form (prices reflect public and private information → even insiders cannot profit). Markets are generally weak and semi-strong efficient, not strong-form efficient (insider-trading laws are the proof).
- **Factors affecting efficiency**: more market participants/analysts, cheaper and wider information, and easier/cheaper trading raise efficiency; short-sale restrictions, transaction costs, and limits to arbitrage lower it.
- **Anomalies**: apparent inefficiencies. The two cross-sectional ones that are tested: size effect (small-caps outperform risk-adjusted) and value effect (low P/E, low P/B, high yield outperform).
- **Data mining / snooping**: testing many strategies guarantees some look profitable by chance; a discovered pattern is a candidate anomaly needing validation, not proof of inefficiency.

### Exam traps
- An observed anomaly is not automatic proof of an exploitable inefficiency (model error, data mining, transaction costs, disappearing effects).
- Fundamental analysis still matters in a semi-strong market; abnormal returns require a comparative advantage, such as a better earnings-surprise forecast.
- Fama–French three-factor model makes the value "anomaly" disappear, suggesting it is risk compensation.

---

## Module 4 — Overview of Equity Securities

### Key terms
- **Debt vs equity**: debt is a contractual obligation; equity is a residual claim with no obligation to pay dividends.
- **Common shares**: ownership with voting rights, residual claim, and discretionary dividends.
- **Preference shares**: rank above common for dividends and liquidation, usually no vote, fixed dividend that is not a contractual obligation. Feature switches: cumulative vs non-cumulative (skipped dividends accrue or are forfeited); participating vs non-participating (share extra profits/liquidation or not; participating is common for small, risky firms); convertible (convert to common; popular in VC/PE for risky, unseasoned firms); callable (issuer redeems, riskier to investor) vs putable (investor sells back, less risky to investor).
### Exam traps
- A question may give two valid reasons a company issues equity and make "both" the answer; do not stop at the first true statement.
- Keep preference-share features in their lanes; convertible = exchangeable into common, cumulative = unpaid dividends accrue, putable = investor's sell-back option.

---

## Module 5 — Company Analysis: Past and Present

### Key terms
- **Operating company analysis** begins with the business model and revenue drivers.
- **The bank exception**: a bank's analysis begins with the **balance sheet**, because its balance sheet holds the core earning assets, funding, liquidity, and risk exposures; revenue and profitability follow from that composition.

### Exam traps
- Do not apply the ordinary "revenue first" sequence to a bank.

---

## Module 6 — Industry and Competitive Analysis

### Key terms
- **Industry classification systems**: commercial systems (GICS, ICB, Refinitiv Business Classification) are global, product/service based, updated regularly; government systems (SIC, NAICS, ISIC) are production based, country specific, updated infrequently. Both types exist.
- **Limitation of hierarchical schemes**: a diversified company is assigned to a single principal group even when it operates in several industries.

### Exam traps
- Industry classification systems are developed by both government agencies and commercial entities.
- The hierarchical limitation is the one-group assignment, not lack of coverage or updating.

---

## Module 8 — Equity Valuation: Concepts and Basic Tools

### Key terms
- **Intrinsic (fundamental) value vs market price**: intrinsic value above price = undervalued (buy); below = overvalued; approximately equal = fairly valued. Compare market price to intrinsic value. Confidence in the model and inputs matters.
- **Three model families**: present value / discounted cash flow (dividend discount model, free-cash-flow-to-equity; most rigorous, input-sensitive); multiples / market (relative valuation; simple but comparability is the weakness); asset-based (assets − liabilities; good for asset-heavy firms and liquidation, weak for intangible-heavy going concerns).
- **Dividends and distributions**: regular cash dividend, extra/special dividend, stock dividend, stock split, reverse split, share repurchase. Stock dividends and splits leave total value and proportional ownership unchanged; a repurchase reduces shares outstanding.
- **Price multiples**: P/E (most common; trailing vs forward), P/B, P/S (useful when earnings are negative), P/CF (harder to manipulate than earnings). Valued by comparables.
- **Model selection** is the tested skill: match the model to the cash flows the question gives.

### Formulas
- Perpetual (level, non-callable) preferred: V = D / r
- Term / retractable preferred: V = PV of dividends to the date + PV of redemption/retraction price. Match timing units: quarterly dividend, quarterly required return, periods in quarters.
- Finite-horizon DDM: V₀ = Σ [Dₜ / (1 + r)ᵗ] + P_N / (1 + r)^N, with each Dₜ grown from D₀
- Gordon (constant) growth: V₀ = D₁ / (r − g), where D₁ = D₀(1 + g); requires g < r
- Sustainable growth: g = retention × ROE; retention b = 1 − payout; ROE = ROA × leverage
- Justified forward P/E = payout / (r − g)

### Exam traps
- The mock tests model selection as much as arithmetic; most wrong answers apply a familiar model that does not fit the cash flows.
- Gordon uses next year's dividend D₁, not this year's D₀; do not use Gordon when an explicit terminal sale price is supplied.
- A retractable/term preferred valued as a perpetuity ignores the redemption payment and undervalues it.
- Sustainable growth uses retention (not payout); convert ROA to ROE with leverage.
- Required return sits in the denominator of justified P/E, so a higher required return lowers the multiple.
- A low multiple is not proof of undervaluation unless the benchmark and fundamentals are comparable.

---

## Formula Quick Sheet (all in one place)

| Topic | Formula |
|---|---|
| Spread | best offer − best bid |
| Max leverage | 1 / minimum margin |
| Margin call price (long) | P0 × (1 − IM) / (1 − MM) |
| Index price return | (V₁ − V₀) / V₀ |
| Index total return | (V₁ − V₀ + income) / V₀ |
| Multi-period value | V₀ (1+r₁)(1+r₂)…(1+r_T) |
| Price weight | Pᵢ / ΣP |
| Equal weight | 1 / N |
| Cap weight | QᵢPᵢ / ΣQⱼPⱼ |
| Float-adjusted weight | fᵢQᵢPᵢ / ΣfⱼQⱼPⱼ |
| Perpetual preferred | D / r |
| Term/retractable preferred | PV(dividends) + PV(redemption) |
| Finite-horizon DDM | Σ Dₜ/(1+r)ᵗ + P_N/(1+r)^N |
| Gordon growth | D₁ / (r − g), D₁ = D₀(1+g) |
| Sustainable growth | (1 − payout) × ROE; ROE = ROA × leverage |
| Justified forward P/E | payout / (r − g) |

---

## Question Bank

### Module 1 — Market Organization and Structure
1. A stock is quoted with a best offer of $41.80 and a bid offer spread of $0.30. The best bid is closest to: A. $41.50  B. $41.80  C. $42.10
2. A stock is quoted at $26.10 bid and $26.30 offered. A new sell limit order at $26.20 most likely: A. takes the market  B. makes a new market  C. sits behind the market
3. A stock is quoted at $73.40 bid and $73.60 offered. A new buy limit order at $73.20 most likely: A. takes the market  B. makes the market  C. sits behind the market
4. A client wants to sell an unusually large block of a thinly traded company's shares without forcing a dealer to hold the position. The trade is most appropriately arranged in a: A. brokered market  B. continuous order driven market  C. quote driven market
5. The service most directly supplied by a securities dealer is: A. liquidity  B. credit rating  C. security issuance advice
6. An intermediary purchases a portfolio of loans, places them in a pool, and sells claims backed by the pool. The intermediary is acting as a: A. broker  B. dealer  C. securitizer
7. An investor creates a short position in listed shares by: A. borrowing and then selling the shares  B. selling shares already owned  C. buying the shares with borrowed cash
8. For an unhedged short sale of a common share, the investor's maximum potential loss is: A. limited to the initial margin  B. limited to the sale proceeds  C. theoretically unlimited
9. If a position is financed with a minimum margin requirement of 40 percent, its maximum leverage ratio is closest to: A. 1.40  B. 1.67  C. 2.50
10. An investor purchases a stock at $50 using a 60 percent initial margin. If the maintenance margin is 25 percent, a margin call begins when the stock price falls below: A. $20.00  B. $26.67  C. $30.00

### Module 2 — Security Market Indexes
11. At the date an index provider launches matching price return and total return indexes, their values are most likely: A. equal  B. lower for the price return version  C. higher for the price return version
12. One year after inception, an index's constituent prices are unchanged but the constituents paid positive dividends. Compared with the price return index, the total return index is most likely: A. lower  B. equal  C. higher
13. An equal weighted equity index most likely has a structural tilt toward: A. smaller capitalization companies  B. higher priced shares  C. larger capitalization companies
14. Maintaining an equal weighted index generally requires: A. frequent rebalancing  B. no rebalancing because weights adjust automatically  C. rebalancing only when a stock splits
15. An index containing large and small companies from twenty developed countries and ten emerging countries is best described as a: A. global sector index  B. multi market equity index  C. single market broad index
16. An index containing only global health care companies is best described as a: A. sector equity index  B. multi market equity index only  C. broad market equity index

### Module 3 — Market Efficiency
17. A market in which prices reflect all publicly available information is described as: A. weak form efficient  B. semi strong form efficient  C. strong form efficient only
18. In a semi strong efficient market, a fundamental analyst is most likely to earn abnormal returns by: A. applying a widely known price to earnings screen  B. forecasting an earnings surprise more accurately than competitors  C. extrapolating last year's sales growth
19. Which change most likely improves market efficiency? A. more analysts covering each issuer  B. greater restrictions on short sales  C. longer delays between order entry and execution
20. The size effect refers to the historical tendency for: A. small capitalization shares to outperform on a risk adjusted basis  B. low price to earnings shares to outperform  C. recent winners to continue outperforming
21. A strategy that buys shares with low price to earnings ratios is designed to capture the: A. size effect  B. value effect  C. January effect
22. A researcher finds abnormal returns in a historical sample after testing hundreds of strategies. The finding is best interpreted initially as: A. a guaranteed future profit  B. conclusive proof of market inefficiency  C. a possible anomaly requiring further validation

### Module 4 — Overview of Equity Securities
23. A company may issue equity to: A. finance an acquisition only  B. improve compliance with a debt covenant only  C. both finance an acquisition and improve covenant compliance
24. Preference shares exchangeable into a stated number of common shares are: A. convertible  B. cumulative  C. participating
25. A preference share whose unpaid dividends must be settled before common dividends can resume is: A. convertible  B. cumulative  C. participating
26. A putable preference share is generally less risky to the investor because it: A. allows the investor to sell the share back on stated terms  B. allows the issuer to redeem the share  C. guarantees common share participation

### Module 5 — Company Analysis: Past and Present
27. Compared with analysis of most industrial companies, analysis of a bank most appropriately begins with the: A. balance sheet  B. revenue growth rate  C. cash flow statement
28. For a non bank operating company, an analyst's initial historical analysis most commonly begins by understanding: A. revenue and its drivers  B. the retraction value of preferred shares  C. the bid offer spread

### Module 6 — Industry and Competitive Analysis
29. Industry classification systems are developed by: A. government agencies only  B. commercial entities only  C. both government agencies and commercial entities
30. A primary limitation of a strictly hierarchical commercial industry classification is that it: A. cannot include public companies  B. assigns a diversified company to one principal group  C. is never updated

### Module 8 — Equity Valuation: Concepts and Basic Tools
31. An analyst estimates a share's intrinsic value at $46 when its market price is $41. The share appears: A. undervalued  B. fairly valued  C. overvalued
32. To determine whether a traded common share is fairly valued, its market price is most directly compared with its: A. par value  B. book value  C. intrinsic value
33. A major disadvantage of price multiples is that: A. they cannot support cross sectional comparison  B. they are difficult to calculate  C. accounting differences can reduce comparability
34. A stock dividend most likely: A. creates value because the investor owns more shares  B. leaves total value and proportional ownership unchanged  C. reduces the number of shares outstanding
35. A company performs a two for one stock split. Immediately after the split and ignoring market effects, each shareholder's proportional ownership most likely: A. increases  B. decreases  C. remains unchanged
36. An investor expects dividends of $1.20 and $1.30 over the next two years and an end of Year 2 stock price of $24. If the required return is 10 percent, intrinsic value is closest to: A. $20.91  B. $22.00  C. $24.00
37. A company paid a $2 dividend. Dividends are forecast to grow 7 percent for three years, and the end of Year 3 share price is given. The first dividend used in the valuation should be: A. $2.00  B. $2.07  C. $2.14
38. When a finite horizon dividend problem supplies an expected sale price at the end of the horizon, the analyst should most likely: A. ignore the sale price and use only dividends  B. discount the dividends and sale price  C. apply the Gordon model to the current dividend
39. A perpetual preferred share pays an annual dividend of $5 and has a required return of 8 percent. If it is non callable and non convertible, intrinsic value is closest to: A. $40.00  B. $62.50  C. $67.50
40. A preferred share is retractable at $50 in three years and currently trades far below $50. If retraction is likely, its value is best estimated as the present value of: A. dividends only as a perpetuity  B. dividends through Year 3 plus $50  C. $50 only
41. A preferred share pays quarterly dividends and is retractable after five years. To value it consistently, the analyst should use: A. five periods and the annual required return  B. twenty periods and the quarterly required return  C. twenty periods and the annual required return
42. A company has a dividend payout ratio of 30 percent and return on equity of 12 percent. Its sustainable growth rate is closest to: A. 3.6 percent  B. 8.4 percent  C. 12.0 percent
43. A company has return on assets of 9 percent, leverage of 1.5, and a payout ratio of 40 percent. Sustainable growth is closest to: A. 5.4 percent  B. 8.1 percent  C. 13.5 percent
44. Holding payout and required return constant, an increase in sustainable growth causes the justified forward price to earnings multiple to: A. decrease  B. remain unchanged  C. increase
45. Holding payout and growth constant, an increase in required return causes the justified forward price to earnings multiple to: A. decrease  B. remain unchanged  C. increase
46. A company has a payout ratio of 48 percent, a required return of 11 percent, and sustainable growth of 5 percent. Its justified forward price to earnings multiple is closest to: A. 4.4  B. 8.0  C. 10.5

---

## Answer Key

| Q | Ans | Why |
|---|---|---|
| 1 | A | Bid = 41.80 − 0.30 = 41.50 |
| 2 | B | Sell at 26.20 beats the 26.30 offer, inside the spread → new market |
| 3 | C | Buy at 73.20 is below the 73.40 bid → behind the market |
| 4 | A | Large illiquid block a dealer won't inventory → brokered market |
| 5 | A | Dealers supply liquidity/immediacy from inventory |
| 6 | C | Pooling assets and issuing claims = securitization |
| 7 | A | Short = borrow then sell |
| 8 | C | Price can rise without bound → unlimited loss |
| 9 | C | 1 / 0.40 = 2.50 |
| 10 | B | 50 × (1−0.60)/(1−0.25) = 26.67 |
| 11 | A | Price and total return versions are equal at inception |
| 12 | C | Flat prices, dividends paid → total return higher |
| 13 | A | Equal weight overweights small caps |
| 14 | A | Equal weight drifts, needs frequent rebalancing |
| 15 | B | Many countries → multi-market index |
| 16 | A | Sliced by industry → sector index ("global" doesn't change that) |
| 17 | B | All public information = semi-strong form |
| 18 | B | Abnormal returns need a comparative advantage (better surprise forecast) |
| 19 | A | More analysts speed information into prices |
| 20 | A | Size effect = small-caps outperform risk-adjusted |
| 21 | B | Low P/E targets the value effect |
| 22 | C | Data mining → candidate anomaly needing validation |
| 23 | C | Equity funds an acquisition and helps covenants; both true |
| 24 | A | Exchangeable into common = convertible |
| 25 | B | Unpaid dividends accrue = cumulative |
| 26 | A | Putable = investor's sell-back option, lowers risk |
| 27 | A | Bank analysis begins with the balance sheet |
| 28 | A | Operating company begins with revenue and its drivers |
| 29 | C | Both government and commercial entities build them |
| 30 | B | Hierarchical schemes force a diversified firm into one group |
| 31 | A | Intrinsic 46 > price 41 → undervalued |
| 32 | C | Compare market price to intrinsic value |
| 33 | C | Accounting differences reduce comparability |
| 34 | B | Stock dividend leaves total value and ownership unchanged |
| 35 | C | A split leaves proportional ownership unchanged |
| 36 | B | 1.20/1.1 + (1.30+24)/1.21 ≈ 22.00 |
| 37 | C | First dividend = 2.00 × 1.07 = 2.14 (D₁, not D₀) |
| 38 | B | Discount the dividends and the sale price (not Gordon) |
| 39 | B | 5 / 0.08 = 62.50 |
| 40 | B | PV of dividends through Year 3 plus the $50 retraction |
| 41 | B | 20 quarterly periods and the quarterly required return |
| 42 | B | (1 − 0.30) × 12% = 8.4% |
| 43 | B | ROE = 9% × 1.5 = 13.5%; × (1 − 0.40) = 8.1% |
| 44 | C | Higher growth raises the justified multiple |
| 45 | A | Higher required return (in the denominator) lowers the multiple |
| 46 | B | 0.48 / (0.11 − 0.05) = 8.0 |

---

*Scope: CFA Level I Equity, Modules 1–8. Questions are mock-style, matched to the topics the official mock emphasizes (Modules 1, 2, 3, 4, and 8 carry the tested load; Module 5 is the bank exception; Module 6 is lightly tested). Confirm any rate, threshold, or figure against the current CFA curriculum before relying on it.*
