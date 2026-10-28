# FSA

Rewritten to the card spec (content-card-spec.md) on 28 Oct 2026. Source: the 108 terms, 34 formulas and 47 exam traps in js/content-fsa.js, which were built from CFA-L1-FSA-Master-Reference.md. Terms that were really rules (IFRS vs US GAAP, effects, classifications, directions of change) have been moved to the Rules section of their module. This is a clean rebuild: the builder re-mints IDs from this file, so existing FSA progress resets.

Decoy terms (marked `(decoy)`) are added only where a group had fewer than 4 look-alikes. They are real, plausible siblings from the same area and are not tested as cards themselves, only shown as wrong options.

The exam question bank is unchanged and still lives in CFA-L1-FSA-Master-Reference.md in the Master Reference format the parser already reads.

---

## Module 1: Introduction to Financial Statement Analysis

### Terms
- [body] IASB :: Standard setter behind the rules used across most of the world, including Saudi Arabia.
- [body] FASB :: Standard setter behind the rules used in the United States.
- [body] SEC :: US regulator that forces listed companies to file and requires the internal control report.
- [body] PCAOB :: US board that oversees the auditors of public companies.
- [body] Sarbanes-Oxley (2002) :: US law passed after Enron that created the public-company audit overseer.
- [body] (decoy) IFRS Foundation
- [audit] Internal controls :: A company's own processes for recording transactions correctly, owned by management.
- [audit] Audit opinion :: An outside firm's verdict on whether the statements are fairly presented.
- [audit] (decoy) Management commentary
- [audit] (decoy) Proxy statement
- [opinion] Unqualified opinion :: The clean verdict: fairly presented, no material errors.
- [opinion] Qualified opinion :: Fairly presented apart from specific, contained exceptions the auditor names.
- [opinion] Adverse opinion :: The statements as a whole are unreliable and depart materially from the rules.
- [opinion] Disclaimer of opinion :: The auditor could not gather enough evidence to judge at all.

### Rules
- [body] Q: Who requires a public company's SOX internal control report? :: A: The SEC :: X: The FASB | The PCAOB | The external auditor
- [opinion] Q: The auditor cites certain exceptions to the accounting principles. Which opinion? :: A: Qualified :: X: Adverse | Disclaimer | Unqualified

### Exam traps
- The SEC, not the FASB, requires the SOX internal control report. The FASB only writes standards.
- "Certain exceptions to the principles" means qualified, not adverse. Adverse means the whole set is unreliable.

---

## Module 2: Analyzing Income Statements

### Terms
- [rev] Accrual accounting :: Recording revenue when earned and expenses when incurred, regardless of cash timing.
- [rev] Unearned (deferred) revenue :: Cash collected before delivery, owed back as a service, so booked as a liability.
- [rev] Input method :: Measuring a long contract's progress by cost spent against total cost expected.
- [eps] Earnings per share (EPS) :: Profit belonging to common owners, divided by the common stock count.
- [eps] Weighted average shares outstanding (WASO) :: The stock count, each block scaled by the slice of the year it existed.
- [eps] Diluted EPS :: The worst-case per-share figure if every convertible security turned into stock.
- [eps] Antidilutive security :: A convertible whose conversion would lift per-share profit, so it is ignored.
- [eps] If-converted method :: The way convertible bonds are folded into diluted per-share profit.
- [change] Change in accounting policy :: Moving from one permitted method to another permitted method.
- [change] Change in accounting estimate :: Revising a judgment inside the same method, such as useful life.

### Rules
- [change] Q: How is a change in accounting policy applied? :: A: Retrospectively, restating prior periods shown :: X: Prospectively, current and future only | Only in the current year | To future periods once impractical
- [change] Q: How is a change in accounting estimate applied? :: A: Prospectively, current and future only :: X: Retrospectively, restating prior periods | By restating the earliest year only | The same way as a policy change
- [eps] Q: A convertible security raises calculated EPS above basic. What do you report? :: A: Basic EPS, the security is antidilutive :: X: The higher diluted figure | The average of the two | Basic, then add the interest back
- [eps] Q: Adding back convertible-bond interest for diluted EPS, you add it: :: A: After tax :: X: Before tax | At the full coupon with no tax | Net of preferred dividends
- [rev] Q: A customer pays in advance for next year's service. The company records: :: A: A liability :: X: Revenue now | An asset only, no liability | Deferred expense
- [rev] Q: A contract's total cost estimate rises mid-way. This year's revenue is: :: A: Cumulative revenue to date minus prior years' :: X: This year's % applied to the full contract | The full contract restated | Prior years restated to the new estimate

### Formulas
- WASO :: shares at start + new shares × (months outstanding / 12) :: trap: shares at start + new shares | shares at year-end
- Basic EPS :: (net income − preferred dividends) / WASO :: trap: (net income − preferred dividends) / year-end shares | net income / WASO
- After-tax interest on convertible debt :: face value × coupon rate × (1 − tax rate) :: trap: face value × coupon rate | face value × coupon rate × tax rate
- Diluted EPS :: (net income − preferred dividends + after-tax interest on convertible debt) / (WASO + shares from conversion) :: trap: subtract the interest instead of adding it | add pre-tax interest
- Revenue to date (input method) :: (cumulative costs incurred / current total estimated cost) × contract price :: trap: (this year's costs / total estimated cost) × contract price | (costs incurred / contract price) × total cost
- This year's contract revenue :: revenue to date − revenue recognized in prior years :: trap: this year's % × full contract | revenue to date, no subtraction

### Exam traps
- Reporting diluted EPS above basic. If the if-converted figure exceeds basic, the security is antidilutive and you report basic.
- Subtracting convertible interest instead of adding it back, or adding it before tax.
- Using the year-end share count instead of WASO, or forgetting to time-weight a mid-year issue.
- Applying this year's percentage to the whole contract instead of cumulative-minus-prior.
- "Both policy and estimate changes are retrospective" is false. Only policy changes are.
- Recognizing revenue when the cash arrives. Cash in advance is a liability.

---

## Module 3: Analyzing Balance Sheets

### Terms
- [acq] Retained earnings :: The running total of profits a company kept instead of paying out.
- [acq] Acquisition method :: Recording a purchased business by booking its assets and liabilities at fair value.
- [acq] Identifiable assets :: Things that can be sold separately or come from legal rights, booked one by one.
- [acq] Goodwill :: The leftover of a purchase price once every separable asset is valued.
- [acq] (decoy) Bargain purchase
- [meas] Available-for-sale securities :: Debt the holder might sell before it matures.
- [meas] Held-to-maturity securities :: Debt the holder means to keep until it matures.
- [meas] Finite-life intangibles :: Legal rights that expire, such as a patent.
- [meas] (decoy) Trading securities
- [liq] Current ratio :: Short-term assets set against short-term bills.
- [liq] Quick ratio :: The same test with the slow-to-sell items stripped out.
- [liq] Financial leverage ratio :: How many dollars of assets ride on each dollar of equity.
- [liq] (decoy) Cash ratio

### Rules
- [acq] Q: Where does goodwill sit, and is it a gain? :: A: An asset, never a gain :: X: A gain in profit or loss | A gain in OCI | A liability
- [acq] Q: To compare an acquirer with an organic grower, analysts: :: A: Remove goodwill from assets and equity, exclude its impairment :: X: Add goodwill to equity | Keep impairment in income | Amortize goodwill first
- [meas] Q: How are held-to-maturity debt securities carried under US GAAP? :: A: Amortized cost :: X: Fair value through income | Fair value through OCI | Lower of cost or market
- [meas] Q: How are available-for-sale securities carried, and where do gains go? :: A: Fair value, unrealized gains to OCI :: X: Fair value, gains to income | Amortized cost | Historical cost
- [meas] Q: A finite-life patent is carried at: :: A: Amortized cost :: X: Plain historical cost | Fair value | Recoverable amount
- [liq] Q: Two firms share a current ratio but one's quick ratio is far lower. That firm: :: A: Holds much more inventory :: X: Is more liquid | Has more cash | Has less debt
- [liq] Q: A financial leverage ratio above the industry average signals: :: A: A riskier capital structure :: X: A safer capital structure | Stronger liquidity | Higher profitability

### Formulas
- Ending retained earnings :: beginning RE + net income − dividends declared :: trap: beginning RE + net income + dividends declared | beginning RE − net income − dividends
- Goodwill :: purchase price − fair value of identifiable net assets :: trap: fair value of identifiable net assets − purchase price | purchase price − book value of net assets
- Current ratio :: current assets / current liabilities :: trap: current liabilities / current assets | (current assets − inventory) / current liabilities
- Quick ratio :: (cash + short-term investments + receivables) / current liabilities :: trap: (cash + short-term investments + receivables + inventory) / current liabilities | current assets / current liabilities
- Financial leverage :: total assets / total equity :: trap: total liabilities / total equity | total debt / total assets

### Exam traps
- In the retained earnings question, adding dividends gives 100 and ignoring them gives 500. The answer is 900.
- Recording goodwill as a gain in income or OCI. It is an asset.
- "Include goodwill impairment on the income statement" is the wrong analyst adjustment. Analysts exclude it.
- A higher current ratio is not better liquidity if the quick ratio is far lower. Meldrum: current 1.99, quick 0.13, nearly all inventory.
- A financial leverage ratio above the industry average is riskier, not safer.

---

## Module 4: Analyzing Statements of Cash Flows I

### Terms
- [cfo] Cash flow from operations (CFO) :: The money a business throws off from its day-to-day trading.
- [cfo] (decoy) Direct method
- [cfo] (decoy) Indirect method
- [cfo] (decoy) Cash flow from investing

### Rules
- [cfo] Q: An operating current asset rises during the year. CFO: :: A: Falls, cash is tied up :: X: Rises | Is unchanged | Rises only if payables also rise
- [cfo] Q: Accounts payable rise during the year. CFO: :: A: Rises, you held cash longer :: X: Falls | Is unchanged | Falls only if inventory also rises
- [cfo] Q: Sales and net income are flat but CFO drops sharply. The likely cause: :: A: More sales made on credit :: X: Inventory fell | Payables rose | A one-time gain
- [cfo] Q: A firm shifts from trade payables toward bank debt. CFO: :: A: Falls, suppliers are paid sooner :: X: Rises | Is unchanged | Rises then falls
- [cfo] Q: Where does tax paid on selling investment property go under US GAAP? :: A: Operating :: X: Investing | Financing | Operating under IFRS, investing under US GAAP
- [cfo] Q: Under IFRS, tax clearly tied to an investing transaction may be classified as: :: A: Investing :: X: Operating only | Financing only | It must stay operating

### Formulas
- Purchases :: COGS + ending inventory − beginning inventory :: trap: COGS + beginning inventory − ending inventory | COGS − ending inventory + beginning inventory
- Cash paid to suppliers :: purchases − increase in accounts payable :: trap: purchases + increase in accounts payable | purchases − increase in inventory

### Exam traps
- In the cash-to-suppliers question, adding the inventory fall (950) or adding both the inventory fall and the payables rise (1,150). The answer is 800 − 250 − 100 = 450.
- Picking "inventory decreased" to explain a CFO collapse. Falling inventory pushes CFO up.
- "Investing under both US GAAP and IFRS" for tax on an investment sale. US GAAP keeps all tax in operating.

---

## Module 5: Analyzing Statements of Cash Flows II

### Terms
- [fcff] Free cash flow to the firm (FCFF) :: The money left for every provider of capital once needs are met.
- [fcff] Non-cash charges :: Expenses that cut profit without any money moving, mainly depreciation.
- [fcff] Fixed capital investment (FCInv) :: Net spending on long-term assets during the year.
- [fcff] Working capital investment (WCInv) :: The year's rise in receivables and inventory net of payables.

### Rules
- [fcff] Q: Why does FCFF add interest back after tax? :: A: It goes to debt holders and had saved tax :: X: It goes to equity holders | It is a non-cash charge | It was never deducted
- [fcff] Q: In the FCFF build, fixed and working capital investment are: :: A: Subtracted :: X: Added | Ignored | Added after tax

### Formulas
- FCFF :: net income + non-cash charges + interest × (1 − tax rate) − fixed capital investment − working capital investment :: trap: net income + non-cash charges + interest − FCInv − WCInv | net income + non-cash charges − interest × (1 − tax rate) − FCInv − WCInv

### Exam traps
- Adding back pre-tax interest (gives 80.50 in the Meldrum question). The add-back is 22.5 × 0.8 = 18, so FCFF = 110 + 24 + 18 − 48 − 28 = 76.0.
- Revenue (500) is a distractor. FCFF starts from net income.

---

## Module 6: Analysis of Inventories

### Terms
- [flow] FIFO :: The method that sends the oldest costs into cost of goods sold.
- [flow] LIFO :: The method that sends the newest costs into cost of goods sold.
- [flow] Weighted average cost :: The method that blends every purchase into one blended figure per unit.
- [flow] (decoy) Specific identification
- [lifo] LIFO reserve :: The disclosed gap between a firm's stated inventory and the first-in-first-out figure.
- [lifo] LIFO liquidation :: The one-off profit bump when a firm sells more units than it buys and digs into old layers.
- [lifo] (decoy) LIFO conformity rule
- [lifo] (decoy) Inventory write-up
- [meas] Net realizable value (NRV) :: Expected selling price less the cost to finish and sell.
- [meas] (decoy) Replacement cost
- [meas] (decoy) Value in use
- [meas] (decoy) Historical cost

### Rules
- [flow] Q: Which inventory cost method is allowed only under US GAAP? :: A: LIFO :: X: FIFO | Weighted average | Specific identification
- [flow] Q: Under rising prices, LIFO produces: :: A: Highest COGS, lowest profit, lowest taxes :: X: Lowest COGS, highest profit | Highest ending inventory | The same as FIFO
- [flow] Q: Under rising prices, FIFO produces: :: A: Lowest COGS, highest ending inventory :: X: Highest COGS, lowest inventory | The lowest taxes | A result between the other two
- [flow] Q: When inventory falls, which ratio improves? :: A: Inventory turnover :: X: Current ratio | Working capital | Debt-to-assets falls
- [meas] Q: How is inventory measured under IFRS? :: A: Lower of cost and NRV :: X: Lower of cost or market | Historical cost | Fair value less costs to sell
- [meas] Q: For US GAAP LIFO and retail inventory, "market" means: :: A: Replacement cost, floored and capped around NRV :: X: NRV alone | Fair value | Selling price
- [wd] Q: Written-down inventory later recovers in value. What does US GAAP allow? :: A: No reversal :: X: Reversal up to original cost | Full reversal above cost | Reversal through equity only
- [wd] Q: Written-down inventory later recovers in value. What does IFRS allow? :: A: Reversal up to original cost :: X: No reversal | Full reversal above cost | Reversal only on sale
- [wd] Q: After an inventory write-down, inventory turnover: :: A: Improves :: X: Worsens | Does not change | Worsens this year, then improves
- [wd] Q: After a write-down, which ratio family improves? :: A: Activity ratios :: X: Profitability | Liquidity | Solvency
- [wd] Q: How may agricultural inventory be carried under both IFRS and US GAAP? :: A: NRV or fair value less costs to sell, even above cost :: X: Lower of cost and NRV | Historical cost only | IFRS only, not US GAAP

### Formulas
- Inventory turnover :: COGS / average inventory :: trap: average inventory / COGS | COGS / ending inventory
- Days of inventory on hand (DOH) :: 365 / inventory turnover :: trap: inventory turnover / 365 | 365 × inventory turnover
- Cash conversion cycle :: days of inventory + days of receivables − days of payables :: trap: days of inventory − days of receivables + days of payables | days of inventory + days of receivables + days of payables

### Exam traps
- Weighted average vs FIFO in rising prices: weighted average has lower gross margin and higher turnover, so a shorter cash conversion cycle. "Higher gross margin than FIFO" is the trap.
- LIFO vs weighted average: LIFO has a higher debt-to-assets ratio (smaller asset base). "Lower debt-to-assets" is the trap.
- "Both IFRS and US GAAP allow write-down reversals" is false. US GAAP does not.
- After a write-down, only activity ratios improve. Liquidity and solvency get worse.
- When a LIFO firm's units drop sharply then refill, the missing disclosure is LIFO liquidation. US GAAP has nothing to disclose about a reversal.

---

## Module 7: Analysis of Long-Term Assets

### Terms
- [disp] Held for sale :: An asset the firm plans to sell soon rather than keep using.
- [disp] (decoy) Held for use
- [imp] Impairment :: A write-down when an asset's book value tops what it can recover.
- [imp] Recoverable amount :: The better of two exit figures: a quick sale or continued use.
- [imp] Fair value less costs to sell :: The net proceeds from selling the asset.
- [imp] Value in use :: The present value of cash from keeping and using the asset.
- [model] Cost model :: Carrying an asset at what was paid, less the wear and write-downs booked against it.
- [model] Revaluation model :: Carrying PP&E at its latest appraised value, less later wear and write-downs.
- [model] Fair value model :: The IFRS approach for investment property, with every change hitting profit.
- [rd] Research :: The hunt for new knowledge, before any specific product is in view.
- [rd] Development :: Turning that knowledge into a specific, identified product.
- [rd] (decoy) Starting-stage costs

### Rules
- [disp] Q: An asset is classified held for sale. Depreciation: :: A: Stops :: X: Continues | Doubles | Pauses one year then resumes
- [disp] Q: An asset leaves by spin-off or abandonment rather than sale. Until it leaves it is: :: A: Held for use, still depreciating :: X: Held for sale, depreciation stopped | Written to zero at once | Carried at fair value
- [model] Q: Which measurement models does IFRS allow for PP&E? :: A: Cost or revaluation :: X: Cost only | Revaluation only | Fair value or cost
- [model] Q: Which measurement models does US GAAP allow for PP&E? :: A: Cost only :: X: Cost or revaluation | Revaluation only | Fair value only
- [imp] Q: Under IFRS, an impairment loss equals: :: A: Carrying amount minus recoverable amount :: X: Carrying amount minus fair value | Carrying amount minus value in use | Recoverable amount minus carrying amount
- [imp] Q: Under IFRS, can an impairment loss be reversed if value recovers? :: A: Yes :: X: No | Only for goodwill | Only up to half the loss
- [rd] Q: How are research costs treated? :: A: Always expensed :: X: Always capitalized | Capitalized under IFRS | Capitalized once a product is named
- [rd] Q: How are development costs treated under IFRS? :: A: Capitalized once criteria are met :: X: Always expensed | Always capitalized | Expensed, same as US GAAP
- [rd] Q: A firm that capitalizes development vs one that expenses it has: :: A: Higher EBITDA :: X: Lower EBITDA | The same EBITDA | A lower EBITDA multiple
- [fv] Q: A longer useful life and higher salvage value move an income-approach fair value: :: A: Up :: X: Down | Not at all | Up then down
- [fv] Q: A buyer who wants minimal goodwill prefers fair-value assumptions that: :: A: Raise identifiable asset values :: X: Lower identifiable asset values | Leave them at book value | Lower salvage value

### Formulas
- Recoverable amount :: max(fair value − costs to sell, value in use) :: trap: max(fair value, value in use) | min(fair value − costs to sell, value in use)
- IFRS impairment loss :: carrying amount − recoverable amount :: trap: carrying amount − min(fair value − costs to sell, value in use) | recoverable amount − carrying amount

### Exam traps
- "Cost model only" is the US GAAP answer. IFRS allows cost or revaluation.
- In the impairment question, ignoring costs to sell gives 2 (50 − 48); taking the lower amount gives 5 (50 − 45). The answer is 50 − max(45, 46) = 4.
- Classifying a spin-off as held for sale, or stopping its depreciation.
- To minimize goodwill, revise useful life and salvage value upward, not downward.
- The firm that expenses all R&D has lower EBITDA, so it trades at the higher EBITDA multiple.

---

## Module 8: Topics in Long-Term Liabilities and Equity

### Terms
- [pen] Defined benefit (DB) pension plan :: An arrangement where the employer promises a set payout and bears the investment risk.
- [pen] Net pension liability (asset) :: The shortfall or surplus between what a plan owes and what it holds.
- [pen] Service cost :: The value of the extra pension earned by one more year of work.
- [pen] Past service cost :: The pension change created when a plan amendment rewrites benefits already earned.
- [pen] Net interest :: The start-of-year discount rate applied to the plan's net balance.
- [pen] Remeasurements :: The pension items parked in OCI and never moved back to profit.
- [pen] Actuarial gains and losses :: The swings from changing assumptions such as how long retirees live.
- [pen] (decoy) Defined contribution plan

### Rules
- [pen] Q: Under IFRS, service cost and net interest are reported in: :: A: Profit or loss :: X: OCI | Equity directly | Split between P&L and OCI
- [pen] Q: Under IFRS, remeasurements of a pension are reported in: :: A: OCI, never recycled :: X: Profit or loss | OCI, later recycled | Retained earnings directly
- [pen] Q: A plan amendment improves benefits for past service. Under IFRS it is: :: A: Past service cost in P&L :: X: A remeasurement in OCI | Spread over future service | A direct equity charge
- [pen] Q: Longer life expectancy for retirees is: :: A: An actuarial loss in OCI :: X: An actuarial gain in OCI | An operating expense | A service cost in P&L
- [lease] Q: Which is a genuine lessee advantage of leasing? :: A: Less exposure to obsolescence :: X: Large down payment | More restrictive covenants | Always lower total cost

### Exam traps
- Under IFRS, service cost and net interest go to P&L; only remeasurements go to OCI.
- An actuarial loss from longer life expectancy belongs in OCI, not operating expenses.
- A benefit-improving amendment is a past service cost in P&L under IFRS. That statement is correct, not the "least accurate" one.
- "Leases are costly and need big down payments" and "leases are more restrictive" are both false.

---

## Module 9: Analysis of Income Taxes

### Terms
- [inc] Accounting profit :: The pretax figure on the income statement, set by the book rules.
- [inc] Taxable income :: Profit figured under the tax rules, shown on the return.
- [base] Carrying amount :: An item's value as the balance sheet reports it.
- [base] Tax base :: An item's value as the tax authority reckons it, still deductible in future.
- [dt] Deferred tax liability (DTL) :: Tax postponed to later years because the books show profit before the return does.
- [dt] Deferred tax asset (DTA) :: Tax prepaid now that returns as a saving in later years.
- [dt] Valuation allowance :: A US GAAP cut to a deferred tax asset unlikely to be used.
- [diff] Temporary difference :: A books-versus-tax gap that reverses over time.
- [diff] Permanent difference :: A books-versus-tax gap that never reverses.

### Rules
- [dt] Q: An asset's carrying amount sits above its tax base. This creates: :: A: A deferred tax liability :: X: A deferred tax asset | A valuation allowance | A permanent difference
- [dt] Q: An asset's carrying amount sits below its tax base. This creates: :: A: A deferred tax asset :: X: A deferred tax liability | A permanent difference | No deferred tax
- [dt] Q: Where is a deferred tax item recorded? :: A: Wherever its underlying change was recorded :: X: Always in profit or loss | Always in OCI | Always in equity
- [dt] Q: The books revalue an asset down while the tax base holds. This creates: :: A: A DTA equal to the fall times the tax rate :: X: A DTL | A direct charge to equity | No deferred tax
- [dt] Q: When is a US GAAP valuation allowance raised against a DTA? :: A: When future taxable income is more likely than not to fall short :: X: Whenever a DTA exists | When a DTL also exists | When the tax rate rises
- [diff] Q: A temporary difference creates deferred tax because it: :: A: Reverses over time :: X: Never reverses | Changes the statutory rate | Only affects the effective rate
- [diff] Q: A non-deductible fine or premium creates: :: A: No deferred tax, only an effective-rate gap :: X: A deferred tax asset | A deferred tax liability | A valuation allowance

### Formulas
- Deferred tax (for an asset) :: (carrying amount − tax base) × tax rate :: trap: (tax base − carrying amount) × tax rate | (carrying amount − tax base) × (1 − tax rate)

### Exam traps
- "The tax base of equipment is greater than its carrying value" creates a DTA, not a DTL.
- "Tax authorities disallow an expense" is a permanent difference, so no DTA or DTL.
- An asset expensed at once for tax but capitalized for the books creates a DTL, not a DTA or a valuation allowance.
- Non-deductible key-person insurance premiums create neither a DTA nor a DTL.
- The revaluation question: 8.5m − 5.8m = 2.7m × 30% = 0.81m DTA, not a DTL and not a direct equity charge.

---

## Module 10: Financial Reporting Quality

### Terms
- [cons] Conservative accounting :: Choices that hold earnings down now and may release them later.
- [cons] Aggressive accounting :: Choices that push earnings up now and may claw them back later.
- [cons] Sustainable earnings :: The portion of reported profit expected to keep recurring, not one-off.
- [cons] (decoy) Earnings management

### Rules
- [cons] Q: Choices that lower reported performance now and may raise it later are: :: A: Conservative :: X: Aggressive | Unsustainable | A permanent difference
- [cons] Q: Which revenue timing is the most conservative? :: A: Recognizing only on completion :: X: All revenue at the start | As costs are incurred | Half at start, half at completion
- [cons] Q: Which revenue timing is the most aggressive? :: A: All revenue at the start :: X: Only on completion | As costs are incurred | Evenly across the contract

### Exam traps
- "Lowers performance now, may raise it later" is conservative, not aggressive and not "unsustainable."
- The most conservative revenue approach is recognizing only on completion, not in proportion to costs.

---

## Module 11: Financial Analysis Techniques

### Terms
- [dup] DuPont analysis :: The split of return on equity into margin, efficiency and borrowing.
- [dup] Tax burden :: The DuPont piece that keeps whatever profit survives tax.
- [dup] Interest burden :: The DuPont piece that keeps whatever pretax profit survives financing costs.
- [dup] Sustainable growth rate :: The pace a firm can grow on retained earnings alone, capital structure fixed.
- [dup] (decoy) Operating margin
- [solv] Solvency :: The ability to meet obligations that fall due over the long run.
- [solv] Leverage ratios :: Balance-sheet measures of how much is financed with debt.
- [solv] Coverage ratios :: Income and cash-flow measures of the ability to service debt.

### Rules
- [dup] Q: A lower effective tax rate moves the tax-burden ratio and ROE: :: A: Both up :: X: Both down | Tax burden up, ROE down | No effect on ROE
- [dup] Q: A lower days-sales-outstanding moves ROE: :: A: Up, through higher asset turnover :: X: Down | No effect | Up only if margin also rises
- [dup] Q: Of a lower tax rate, a lower DSO and lower leverage, which lowers ROE? :: A: Lower leverage :: X: Lower tax rate | Lower DSO | None of them
- [solv] Q: Higher debt-based leverage ratios mean: :: A: Weaker solvency, more financial risk :: X: Stronger solvency | Better coverage | No change to risk
- [solv] Q: Coverage ratios are built from: :: A: The income and cash-flow statements :: X: The balance sheet | The equity statement | The tax return

### Formulas
- ROE :: net income / average total equity :: trap: net income / average total assets | net income / revenue
- 3-part DuPont :: ROE = net profit margin × total asset turnover × financial leverage :: trap: ROE = net profit margin × total asset turnover | ROE = margin × turnover + leverage
- Financial leverage (DuPont) :: average total assets / average total equity :: trap: total liabilities / total equity | total debt / total assets
- Sustainable growth (g) :: retention rate × ROE :: trap: dividend payout ratio × ROE | (1 + retention rate) × ROE
- Retention rate (b) :: 1 − dividend payout ratio :: trap: dividend payout ratio | 1 + dividend payout ratio

### Exam traps
- Financial leverage from assets 600, equity 480 is 600 / 480 = 1.25. Liabilities/equity (0.25) and debt/assets (0.10) are the traps.
- Back-solving from margin 4%, ROA 8%, ROE 16%, revenue 2.5m: NI = 100,000; equity = 625,000; assets = 1,250,000; turnover = 2; leverage = 2. "Turnover is 4" and "leverage is 4" are traps.
- A lower tax rate and a lower DSO both raise ROE. Only lower leverage lowers it.
- Sustainable growth uses retention (0.45), not payout (0.55); the answer is g (5.88%), not ROE (13.06%).
- "Higher debt-based leverage means stronger solvency" is false.

---

## Module 12: Introduction to Financial Statement Modeling

### Terms
- [mod] Sales-based pro forma model :: A forecast that projects revenue first, then ties each line to revenue.
- [mod] Net working capital in a model :: The forecast item that grows with sales and eats cash as it grows.
- [rev12] Organic growth :: The revenue gain a firm makes from the business it already owns.
- [rev12] Scope changes :: Revenue moves from buying or selling businesses, shown apart from organic growth.
- [rev12] FX impact :: Revenue moves from currency, shown apart from organic growth.

### Rules
- [rev12] Q: Organic growth is made of: :: A: Volume plus price/mix together :: X: Volume only | Price/mix only | Acquisitions and divestitures
- [mod] Q: As a firm's revenue grows, net working capital usually: :: A: Grows with it and uses cash :: X: Shrinks | Stays fixed | Grows and releases cash

### Formulas
- Forecast line item :: forecast revenue × that item's historical % of revenue :: trap: forecast revenue × next year's target % | historical revenue × this year's %
- Pro forma CFO :: net income + depreciation − increase in net working capital :: trap: net income + depreciation − net working capital | net income + depreciation + increase in net working capital

### Exam traps
- "Volume only" or "price/mix only" for organic growth. It is both.
- In the AZ Manufacturing question, NWC goes from 20 to 24 (20% of 120), so subtract 4. Subtracting the full 24 gives 4.8; adding it gives 28.8. The answer is 16.8 + 12.0 − 4 = 24.8.
