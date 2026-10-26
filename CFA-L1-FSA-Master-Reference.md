# CFA Level I FSA: Master Study Reference (Tested Concepts)

A single reference for FSA, built only from what the mocks test. Every concept here appears in a mock question, either in the question itself, the right answer, or a wrong answer you need to rule out. Each one is explained fully, so you can study from this file without the curriculum. Organized module by module (1 to 12), then a formula quick sheet, then the full question bank with an answer key.

How to use it: read a module's key terms, formulas and exam traps, then do that module's questions closed-book. Check the answer key only after you commit. Drill the formula quick sheet before any calculation set.

The mocks hold 43 FSA questions (22 in Official Mock 1A, 21 in Meldrum mock 2). Modules 11, 2, 3, 6 and 7 carry 26 of them, so they get the most space here.

---

## Module 1: Introduction to Financial Statement Analysis (2 questions)

### Key terms
- **Standard setters**: the bodies that write accounting rules. The **IASB** (International Accounting Standards Board) writes IFRS, used in most of the world including Saudi Arabia. The **FASB** (Financial Accounting Standards Board) writes US GAAP. They decide *how* things are recorded, but they have no power to force any company to follow the rules.
- **Regulators**: government bodies that require listed companies to follow the standards and file reports, and that punish those who don't. In the US this is the **SEC** (Securities and Exchange Commission). Think of it this way: FASB writes the rulebook, the SEC is the referee.
- **Sarbanes-Oxley Act (SOX, 2002)**: the US law passed after the Enron and WorldCom scandals. It created the **PCAOB** (Public Company Accounting Oversight Board) to oversee auditors, and it requires management to report on whether its **internal control over financial reporting** works, with the auditor confirming that assessment. The **SEC** is responsible for carrying out SOX and overseeing the PCAOB, so it is the body that requires the internal control report.
- **Internal controls**: the company's own processes for making sure transactions are recorded correctly (approvals, reconciliations, segregation of duties). Management is responsible for them, not the auditor.
- **Audit and audit opinion**: an independent accounting firm examines the statements and gives an opinion on whether they are fairly presented under the accounting standards. The opinion types:
  - **Unqualified (clean, unmodified)**: the statements are fairly presented with no material errors. This is what you want to see.
  - **Qualified**: the statements are fairly presented *except* for specific exceptions to the accounting principles, which the auditor explains. The problem is real but contained.
  - **Adverse**: the statements are *not* fairly presented; they materially depart from the standards. A severe red flag.
  - **Disclaimer**: the auditor can't form an opinion at all, usually because it couldn't get enough evidence (a scope limitation).

### Exam traps
- Who *requires* the SOX internal control report: the SEC. FASB is the tempting wrong answer because it sounds like the US accounting authority, but it only writes standards.
- "Certain exceptions to the accounting principles" points to **qualified**, not adverse. Adverse means the statements as a whole are unreliable.

---

## Module 2: Analyzing Income Statements (5 questions)

### Key terms
- **Accrual accounting**: revenue is recorded when it is earned and expenses when they are incurred, not when cash moves. This is why cash and revenue often land in different periods.
- **Unearned (deferred) revenue**: cash received before the company has delivered the goods or service. Because the company still owes the customer the product, it records a **liability**, not revenue. Example: a magazine or software subscription paid upfront for next year. On receipt, cash (an asset) goes up and unearned revenue (a liability) goes up. Revenue is recognized later, as the issues or service are delivered.
- **Revenue recognized over time**: for long contracts such as construction, revenue is recognized as the work progresses rather than all at the end. Progress can be measured with an **input method**, which compares the costs incurred so far with the total estimated costs. If you've spent 40% of the expected cost, you recognize 40% of the contract revenue.
- **Revised cost estimate on an over-time contract**: when the total cost estimate changes, you recompute the **cumulative** percentage complete using the new estimate, find the total revenue earned to date, and subtract what was already recognized in earlier years. Earlier years are not restated.
- **Change in accounting policy**: switching between allowed methods (for example, changing the inventory cost method). It is applied **retrospectively**: all prior periods shown in the report are restated as if the new policy had always been used, so the years stay comparable. The exception is when this is impractical.
- **Change in accounting estimate**: revising a judgment within the same method, such as an asset's useful life, its salvage value, or the bad debt rate. It is applied **prospectively**: it affects the current and future periods only, and prior statements are left alone. Estimates are expected to change as information improves, so restating history would make no sense.
- **Earnings per share (EPS)**: net income available to common shareholders divided by the number of common shares. It is the headline profitability number per share.
- **Weighted average shares outstanding (WASO)**: shares are weighted by how long they were outstanding during the year. 1,000,000 shares all year plus 120,000 issued on 1 July counts as 1,000,000 + 120,000 × 6/12 = 1,060,000.
- **Basic EPS**: (net income − preferred dividends) / WASO. Preferred dividends are subtracted because that income belongs to preferred shareholders, not common. Non-convertible preferred stock only matters through its dividend.
- **Diluted EPS**: what EPS would be if every security that could become common stock (convertible bonds, convertible preferred, options) did so. It shows the worst-case dilution for current shareholders.
- **If-converted method (convertible bonds)**: assume the bonds converted at the start of the year (or when issued). Two things change. The numerator rises because the company would no longer pay the bond interest, so you add back the interest **after tax** (face × coupon × (1 − t)), since the interest had been reducing taxes. The denominator rises by the shares the bonds convert into.
- **Antidilutive security**: a security whose conversion would *increase* EPS. It is left out of diluted EPS. The rule that settles it: diluted EPS can never be higher than basic EPS. If your diluted calculation comes out above basic, the security is antidilutive and you report basic.

### Formulas
- WASO = shares at start + new shares × (months outstanding / 12)
- Basic EPS = (net income − preferred dividends) / WASO
- After-tax interest on convertible debt = face value × coupon rate × (1 − tax rate)
- Diluted EPS = (net income − preferred dividends + after-tax interest on convertible debt) / (WASO + shares from conversion)
- Revenue to date (input method) = (cumulative costs incurred / current total estimated cost) × contract price
- This year's revenue = revenue to date − revenue recognized in prior years

### Exam traps
- Reporting a diluted EPS that is above basic. In the official mock, basic was $1.60 and the if-converted figure $1.61, so the answer is $1.60.
- Subtracting the interest instead of adding it back, or adding the interest before tax.
- Using year-end share count instead of WASO, or forgetting to time-weight a mid-year issue.
- Applying this year's percentage to the full contract instead of using the cumulative percentage and subtracting prior revenue.
- "Both policy and estimate changes are applied retrospectively" is false. Only policy changes are.
- Recognizing revenue when the cash arrives. Cash in advance is a liability.

---

## Module 3: Analyzing Balance Sheets (5 questions)

### Key terms
- **Retained earnings**: the cumulative profits a company has kept rather than paid out as dividends. Each year it grows by net income and shrinks by dividends declared. If you know the beginning and ending balances and the dividends, you can back out net income.
- **Acquisition method**: how a company records buying another company. The buyer records each identifiable asset and liability of the target at **fair value** on the purchase date.
- **Identifiable assets**: assets that can be separated or that arise from legal rights, such as property, patents, licenses, brands and customer lists. They are recorded individually.
- **Goodwill**: whatever is left of the purchase price after allocating fair value to all identifiable assets and liabilities. It represents things like expected synergies, an assembled workforce and market position that can't be recorded separately. When Facebook bought Instagram in 2012, a large part of the price ended up as goodwill, because the young app had few separately recordable assets. Goodwill is recorded as an **asset**. It is not amortized; it is tested for impairment at least once a year. It is never recorded as a gain (only a bargain purchase, where the price is *below* fair value, creates a gain).
- **Goodwill and analyst adjustments**: goodwill makes companies that grow by acquisition look different from companies that grow on their own (a company's internally built reputation never appears as goodwill). To compare them fairly, analysts **remove goodwill from total assets**, **remove the same amount from shareholders' equity**, and **exclude goodwill impairment losses from the income statement**.
- **Measurement bases under US GAAP**: different assets are carried at different values.
  - **Available-for-sale (AFS) securities**: debt securities the company might sell before maturity. Carried at **fair value**, with unrealized gains and losses going to OCI, not the income statement.
  - **Held-to-maturity securities**: debt the company intends to hold to maturity. Carried at **amortized cost** (purchase price adjusted for any premium or discount over time). Amortized cost is the HTM answer, not the AFS answer.
  - **Patents and other finite-life intangibles**: carried at **amortized cost**, meaning historical cost minus accumulated amortization. Plain "historical cost" is wrong because it ignores the amortization.
  - **LIFO inventory**: carried at the **lower of cost or market**, not plain historical cost, so it gets written down if its value falls.
- **Current ratio**: current assets / current liabilities. Measures whether short-term assets cover short-term obligations.
- **Quick ratio**: (cash + short-term investments + receivables) / current liabilities. It leaves out inventory and prepaid expenses because they can't be turned into cash quickly.
- **Reading the gap between current and quick ratios**: the bigger the gap, the more of the company's current assets is inventory. If sales fall sharply, that inventory becomes hard to sell, and the company has to pay its bills from quick assets alone.
- **Financial leverage ratio**: total assets / total equity. How many dollars of assets the company controls for each dollar of equity. Higher means more of the assets are financed by liabilities, so a riskier capital structure.

### Formulas
- Ending retained earnings = beginning RE + net income − dividends declared
- Goodwill = purchase price − fair value of identifiable net assets
- Current ratio = current assets / current liabilities
- Quick ratio = (cash + short-term investments + receivables) / current liabilities
- Financial leverage = total assets / total equity

### Exam traps
- In the retained earnings question, adding dividends instead of subtracting them gives 100; ignoring them gives 500. The answer is 900.
- Recording goodwill as a gain in P&L or OCI. It's an asset.
- "Include goodwill impairment losses on the income statement" is the wrong analyst adjustment. Analysts exclude them.
- A higher current ratio than peers does not mean better liquidity if the quick ratio is far lower. Meldrum's balance sheet had a current ratio of 1.99 but a quick ratio of 0.13: almost all inventory.
- A financial leverage ratio above the industry average means a riskier, not safer, capital structure.

---

## Module 4: Analyzing Statements of Cash Flows I (3 questions)

### Key terms
- **Cash flow from operations (CFO)**: cash generated by the core business. Under the indirect method, it starts from net income and adjusts for non-cash items and for changes in working capital.
- **Working capital effects on CFO**: when an operating current asset rises, cash is tied up, so CFO falls. When an operating current liability rises, the company is holding on to cash longer, so CFO rises.
  - Receivables up → CFO down. Customers owe you more instead of paying cash.
  - Inventory up → CFO down. Inventory down → CFO up.
  - Accounts payable up → CFO up. You've delayed paying suppliers.
- **Cash sales vs credit sales**: if sales stay the same but a larger share is made on credit, receivables pile up and CFO falls even though net income doesn't change. A big drop in CFO with flat sales and net income is the classic sign.
- **Interest-bearing debt vs trade payables**: shifting from trade payables (operating) toward bank debt (financing) means paying suppliers sooner, which would lower CFO. Moving the other way, toward more trade payables, would raise CFO.
- **Purchases**: what the company bought from suppliers during the period. It isn't reported directly, so you derive it from the inventory equation: purchases = COGS + ending inventory − beginning inventory. If inventory fell, the company sold some of its old stock, so purchases were less than COGS.
- **Cash paid to suppliers**: purchases minus the increase in accounts payable. If payables grew, part of the purchases hasn't been paid yet.
- **Classifying taxes paid, IFRS vs US GAAP**: US GAAP puts **all** income taxes paid in operating activities, even tax on selling an investment. IFRS also defaults to operating, but taxes that can be specifically identified with an investing or financing transaction can be classified there. So tax paid on selling investment property is operating under US GAAP and investing under IFRS.

### Formulas
- Purchases = COGS + ending inventory − beginning inventory = COGS + increase in inventory (or − decrease)
- Cash paid to suppliers = purchases − increase in accounts payable (+ decrease)

### Exam traps
- In the cash-to-suppliers question, adding the inventory decrease (950) or adding both the inventory decrease and the payables increase (1,150). The answer is 800 − 250 − 100 = 450.
- Picking "inventory decreased" to explain a CFO collapse. A falling inventory would push CFO *up*.
- "Investing activity under both US GAAP and IFRS" for taxes on an investment sale. US GAAP keeps all taxes in operating.

---

## Module 5: Analyzing Statements of Cash Flows II (1 question)

### Key terms
- **Free cash flow to the firm (FCFF)**: the cash left over for *all* providers of capital, both debt holders and shareholders, after the company pays its operating costs and makes the investments it needs. It is the cash the business throws off before any financing decisions.
- **Non-cash charges**: expenses that reduce net income without using cash, mainly depreciation and amortization. They are added back.
- **After-tax interest add-back**: interest is a payment to debt holders, who are capital providers, so FCFF adds it back. It is added back **after tax** because the interest expense had saved the company taxes; without it, taxes would have been higher.
- **Fixed capital investment (FCInv)**: net capital expenditure on long-term assets. Subtracted.
- **Working capital investment (WCInv)**: the increase in working capital during the year. Cash tied up in working capital isn't free, so it's subtracted.

### Formulas
- FCFF = net income + non-cash charges + interest × (1 − tax rate) − fixed capital investment − working capital investment

### Exam traps
- Adding back pre-tax interest (that gives 80.50 in the Meldrum question). The add-back is 22.5 × 0.8 = 18, so FCFF = 110 + 24 + 18 − 48 − 28 = 76.0.
- Revenue (500) is a distractor in the question. FCFF starts from net income.

---

## Module 6: Analysis of Inventories (5 questions)

### Key terms
- **Cost flow methods**: how the cost of inventory is split between what was sold (COGS) and what is left (ending inventory). **FIFO** (first in, first out) sends the oldest costs to COGS. **LIFO** (last in, first out) sends the newest costs to COGS. **Weighted average cost** uses the average cost of everything available. LIFO is allowed only under US GAAP; ExxonMobil, for example, has long used it.
- **Rising prices: how the methods compare** (assuming inventory quantities stay the same or grow). Newest costs are the highest, so:
  - **LIFO** has the highest COGS, lowest gross margin, lowest ending inventory, lowest taxes.
  - **FIFO** has the lowest COGS, highest gross margin, highest ending inventory.
  - **Weighted average** sits in the middle on everything.
- **Ratio effects of the method choice**: lower inventory (LIFO, then weighted average) means:
  - **Lower current ratio** and lower working capital, because current assets are smaller.
  - **Higher inventory turnover** (COGS / inventory), because the numerator is bigger and the denominator smaller.
  - **Fewer days of inventory on hand**, so a **shorter cash conversion cycle**.
  - **Higher debt-to-assets ratio**, because total assets are smaller while debt is unchanged.
  - **Higher working capital turnover** (revenue / working capital), because working capital is smaller.
- **Cash conversion cycle**: days of inventory + days of receivables − days of payables. The number of days between paying for inventory and collecting cash from customers.
- **Net realizable value (NRV)**: estimated selling price minus the costs to complete and sell the item. What the company can realistically get for its inventory.
- **Inventory measurement and write-downs**: inventory can't be carried above what it's worth. Under IFRS it is carried at the **lower of cost and NRV**. Under US GAAP, FIFO and weighted average inventory also use the lower of cost and NRV, while LIFO (and the retail method) use the **lower of cost or market**, where "market" is replacement cost, capped at NRV and floored at NRV minus a normal profit margin. The "NRV minus a normal profit margin" idea belongs to US GAAP's market floor, not to IFRS's definition of anything.
- **Reversing a write-down**: IFRS allows a write-down to be reversed if the value recovers, up to the original cost. **US GAAP does not allow reversals.**
- **Agricultural inventory**: both IFRS and US GAAP allow agricultural produce (and some commodities) to be carried at NRV or fair value less costs to sell, even above cost.
- **Effect of a write-down on ratios**: the write-down lowers inventory and profit. Profitability ratios fall, liquidity ratios fall (current assets are smaller) and solvency ratios worsen (equity is smaller). But **activity ratios improve**: inventory turnover and total asset turnover go up because their denominators shrink.
- **LIFO reserve**: the difference between what inventory would be under FIFO and what it is under LIFO. US companies using LIFO must disclose it.
- **LIFO liquidation**: when a LIFO company sells more units than it buys, it dips into old inventory layers bought at much lower prices. Those old cheap costs flow into COGS, so margins and profit jump for that year. The boost isn't sustainable, because the company can't keep selling stock it doesn't replace. US GAAP requires material income from a LIFO liquidation to be disclosed. A sharp fall in inventory units (or a falling LIFO reserve) is the signal.

### Formulas
- Inventory turnover = COGS / average inventory
- Days of inventory on hand = 365 / inventory turnover
- Cash conversion cycle = days of inventory + days of receivables − days of payables

### Exam traps
- Weighted average vs FIFO in rising prices: weighted average has a *lower* gross margin and *higher* turnover, so a *shorter* cash conversion cycle. "Higher gross margin than FIFO" is the trap.
- LIFO vs weighted average: LIFO has a **higher** debt-to-assets ratio (smaller asset base). "Lower debt-to-assets" is the trap.
- "Both IFRS and US GAAP allow write-down reversals" is false. US GAAP doesn't.
- After a write-down, only activity ratios improve. Liquidity and solvency get worse.
- When a LIFO company's units drop sharply and then get replaced, the missing disclosure is the **LIFO liquidation**. There is nothing to disclose about write-down reversals under US GAAP.

---

## Module 7: Analysis of Long-Term Assets (5 questions)

### Key terms
- **Cost model**: a long-term asset is carried at historical cost minus accumulated depreciation (or amortization) and impairment.
- **Revaluation model**: the asset is carried at fair value at the revaluation date, minus later depreciation and impairment. **IFRS allows either the cost model or the revaluation model** for PP&E and intangible assets. **US GAAP allows only the cost model.**
- **Fair value model**: the model IFRS uses for **investment property**, where all fair value changes go to profit or loss. It is not the model for intangibles, so "cost model or fair value model" is a trap.
- **Held for sale**: assets the company plans to sell soon. Depreciation stops, and they are carried at the lower of carrying amount and fair value less costs to sell.
- **Disposed of other than by sale**: assets the company will spin off to its shareholders, abandon, or swap for other assets. Because there is no sale, they stay **held for use** until they leave, and **depreciation continues**. A spin-off distributes a business to the company's own shareholders, so it is not a sale.
- **Carrying amount**: the asset's value on the balance sheet (cost minus accumulated depreciation and any prior impairment).
- **Impairment**: a write-down when an asset's carrying amount is more than it can recover.
- **Recoverable amount (IFRS)**: the **higher** of two values, because a rational owner would choose the better option:
  - **Fair value less costs to sell**: what you'd get by selling it, net of selling costs.
  - **Value in use**: the present value of the cash flows you'd get by keeping and using it.
- **IFRS impairment loss**: carrying amount − recoverable amount, recognized in the income statement. IFRS allows reversals later if the value recovers.
- **Fair value through an income approach**: valuing an asset by discounting the cash flows it is expected to produce. A **longer useful life** gives more years of cash flows, and a **higher salvage value** adds a bigger final cash flow, so both raise the fair value.
- **Fair value and goodwill**: goodwill is the residual of the purchase price. The higher the fair values assigned to identifiable assets, the less is left over as goodwill. A buyer that wants to record as little goodwill as possible prefers assumptions that raise asset values.
- **Research vs development**: **research** is the search for new knowledge; it is always expensed. **Development** applies that knowledge to a specific product. Under IFRS, development costs are capitalized once certain criteria are met (technical feasibility, intent and ability to complete, probable future benefits). Under US GAAP, both are generally expensed.
- **Expensing vs capitalizing and EBITDA**: expensed R&D reduces EBITDA directly. Capitalized development costs are spread out as amortization, and amortization is excluded from EBITDA. So a company that capitalizes has **higher EBITDA** than an otherwise identical company that expenses everything.
- **EV/EBITDA or market cap / EBITDA multiple**: value divided by EBITDA. With the same market value, the company with lower EBITDA trades at a **higher** multiple.

### Formulas
- Recoverable amount = max(fair value − costs to sell, value in use)
- IFRS impairment loss = carrying amount − recoverable amount

### Exam traps
- "Cost model only" is the US GAAP answer. The IFRS answer is cost **or revaluation**.
- In the impairment question: ignoring costs to sell gives 2 (50 − 48); taking the lower of the two amounts gives 5 (50 − 45). The answer is 50 − max(45, 46) = 4.
- Classifying a spin-off as held for sale, or stopping depreciation.
- To minimize goodwill, revise useful life and salvage value **upward**, not downward.
- The company that expenses all R&D has lower EBITDA, so it trades at the higher EBITDA multiple.

---

## Module 8: Topics in Long-Term Liabilities and Equity (3 questions)

### Key terms
- **Defined benefit (DB) pension plan**: the employer promises employees a specific retirement benefit, usually based on salary and years of service, and bears the risk that the plan's investments fall short.
- **Net pension liability (asset)**: the present value of the promised benefits (the defined benefit obligation) minus the fair value of the plan's assets. If the obligation is larger, the plan is underfunded and the company reports a liability.
- **How IFRS splits the change in the net pension liability**: three components.
  - **Service cost** (to **P&L**): the present value of the extra benefit employees earned by working another year. It also includes **past service cost**, which arises when the company amends the plan and changes benefits for service already given. A change favorable to employees creates a past service cost in P&L.
  - **Net interest** (to **P&L**): the discount rate applied to the net pension liability or asset at the start of the year.
  - **Remeasurements** (to **OCI**, never recycled to P&L): **actuarial gains and losses**, which come from changing assumptions such as life expectancy, employee turnover, retirement age or salary growth, plus the difference between the **actual return on plan assets** and the return assumed in net interest. If retirees are expected to live longer, the obligation grows, creating an actuarial loss in OCI, not an operating expense.
- **Leases from the lessee's side**: the curriculum lists these advantages of leasing over buying with a loan:
  - Often **less costly financing**: little or no down payment and often lower fixed interest rates than borrowing to buy.
  - **Less restrictive provisions** than other forms of borrowing.
  - Less exposure to obsolescence, since the lessor keeps the residual value risk.

### Exam traps
- Under IFRS, service cost and net interest go to P&L; **only remeasurements go to OCI**.
- An actuarial loss from longer life expectancy belongs in **OCI**, not operating expenses.
- A plan amendment that helps employees is a past service cost reported in P&L under IFRS. That statement is correct, not the "least accurate" one.
- "Leases are costly and need large down payments" and "leases are more restrictive" are both false.

---

## Module 9: Analysis of Income Taxes (4 questions)

### Key terms
- **Accounting profit (pretax income)**: profit on the income statement, under accounting rules.
- **Taxable income**: profit on the tax return, under tax rules. The two differ because the rules differ.
- **Carrying amount**: an asset's or liability's value on the balance sheet.
- **Tax base**: the value the tax authority assigns to that asset or liability, meaning the amount still deductible for tax in future.
- **Temporary difference**: a difference between carrying amount and tax base that will reverse over time. It creates deferred tax.
- **Permanent difference**: a difference that will **never** reverse, such as an expense the tax authority will never allow (fines, non-deductible insurance premiums) or income that is never taxed. It creates **no deferred tax at all**. It just makes the effective tax rate differ from the statutory rate.
- **Deferred tax liability (DTL)**: tax the company has put off paying. It arises when accounting profit is **higher** than taxable income now, so less tax is paid today and more later. For an asset, the carrying amount is **above** the tax base. Example: tax rules let a company deduct an asset's whole cost in year one, while the books spread it over five years. The tax base drops to zero while the carrying amount stays positive, so a DTL appears. Airlines and utilities carry large DTLs for this reason, from accelerated tax depreciation on big fleets and plants.
- **Deferred tax asset (DTA)**: tax the company has effectively prepaid. It arises when taxable income is **higher** than accounting profit now, so more tax is paid today and less later. For an asset, the carrying amount is **below** the tax base.
- **Valuation allowance**: a US GAAP reduction to a DTA when it is more likely than not that the company won't earn enough future taxable income to use it. It's a reduction to a DTA, not something a timing difference creates.
- **Deferred tax follows the item**: the deferred tax is recorded wherever the underlying change was recorded. If an asset write-down hits the income statement, its deferred tax goes there too.
- **Revaluation and deferred tax**: if an asset is revalued down for the books but the tax authority keeps its original tax base, the carrying amount falls below the tax base. That creates a **DTA** equal to the decrease × the tax rate, because the company will get a bigger tax deduction later than its books suggest.

### Formulas
- Deferred tax = (carrying amount − tax base) × tax rate. For an asset, a positive result is a DTL and a negative result is a DTA.

### Exam traps
- "The tax base of equipment is greater than its carrying value" creates a **DTA**, not a DTL.
- "Tax authorities do not allow an expense item" is a permanent difference, so no DTL or DTA.
- An asset expensed at once for tax but capitalized for the books creates a **DTL**, not a DTA or a valuation allowance.
- Non-deductible key person insurance premiums create **neither** a DTA nor a DTL.
- The revaluation question: 8.5m − 5.8m = 2.7m × 30% = 0.81m **DTA**, not a DTL and not a direct charge to equity.

---

## Module 10: Financial Reporting Quality (2 questions)

### Key terms
- **Conservative accounting**: choices within the rules that **lower** reported earnings and financial position in the current period, and may raise them in later periods. Examples: recognizing revenue later, bigger provisions, faster depreciation.
- **Aggressive accounting**: choices that **raise** current earnings or financial position, and may lower them later. Examples: recognizing revenue early, capitalizing costs that could be expensed, longer useful lives.
- **Sustainable earnings**: earnings expected to continue in the future, such as profit from higher efficiency or market share. One-time gains from selling assets or currency moves aren't sustainable. Conservative accounting by itself doesn't make earnings unsustainable; it only moves them later.
- **Revenue timing and conservatism**: for a multi-year contract, the three choices rank like this, from most aggressive to most conservative:
  - Recognize all revenue at the start: most aggressive.
  - Recognize revenue as costs are incurred: in the middle.
  - Recognize revenue only on completion: most conservative, because current income is lowest.

### Exam traps
- "Decrease reported performance now, may increase it later" is **conservative**, not aggressive and not "unsustainable."
- The most conservative revenue approach is recognizing only on completion, not recognizing in proportion to costs.

---

## Module 11: Financial Analysis Techniques (6 questions)

### Key terms
- **Return on equity (ROE)**: net income / average equity. The return earned for shareholders.
- **Return on assets (ROA)**: net income / average total assets. How much profit the whole asset base produces.
- **Net profit margin**: net income / revenue.
- **Total asset turnover**: revenue / average total assets. How many dollars of sales each dollar of assets generates.
- **Financial leverage ratio**: average total assets / average total equity. In DuPont it is the "multiplier" that turns ROA into ROE. It is **not** liabilities / equity and not debt / assets.
- **3-part DuPont**: ROE = net profit margin × total asset turnover × financial leverage. It shows whether ROE comes from profitability, efficiency or borrowing. Since margin × turnover = ROA, ROE also = ROA × leverage.
- **5-part DuPont**: splits the net margin further.
  - **Tax burden** = net income / EBT = 1 − effective tax rate. A **lower** tax rate means a **higher** tax burden ratio (the company keeps more), so a higher ROE.
  - **Interest burden** = EBT / EBIT. Falls when interest expense rises.
  - **EBIT margin (operating margin)** = EBIT / revenue.
  - Then total asset turnover and financial leverage as before.
- **Days of sales outstanding (DSO)**: average receivables / (revenue / 365). How long customers take to pay. A **lower** DSO means smaller receivables, so higher asset turnover and higher ROE.
- **Retention rate (b)**: the share of earnings kept in the business = 1 − dividend payout ratio.
- **Sustainable growth rate**: how fast a company can grow using only the earnings it retains, without changing its capital structure. Equal to b × ROE.
- **Purchases**: derived from the inventory equation, since it's rarely reported (COGS + ending inventory − beginning inventory). Used in payables turnover.
- **Solvency**: the ability to meet long-term obligations.
- **Leverage ratios vs coverage ratios**: **leverage ratios** come from the **balance sheet** and show how much of the company is financed with debt (debt-to-assets, debt-to-equity, financial leverage). With total debt in the numerator, a **higher** ratio means **more** financial risk and **weaker** solvency. **Coverage ratios** come from the **income statement and cash flow statement** and show whether the company can pay its debt costs (interest coverage).
- **Total debt ratio**: total debt / total assets. A different ratio from financial leverage, often used as a distractor.

### Formulas
- ROA = net income / average total assets
- ROE = net income / average total equity
- Financial leverage = average total assets / average total equity
- ROE = net profit margin × total asset turnover × financial leverage = ROA × financial leverage
- ROE = (NI / EBT) × (EBT / EBIT) × (EBIT / revenue) × (revenue / average assets) × (average assets / average equity)
- Retention rate = 1 − dividend payout ratio
- Sustainable growth = retention rate × ROE
- Purchases = COGS + ending inventory − beginning inventory

### Exam traps
- Financial leverage from assets 600, liabilities 120, equity 480, debt 60 is 600 / 480 = 1.25. Liabilities / equity (0.25) and debt / assets (0.10) are the traps.
- Back-solving from margin 4%, ROA 8%, ROE 16%, revenue 2.5m: NI = 100,000; equity = 100,000 / 16% = 625,000; assets = 1,250,000; turnover = 2; leverage = 2. "Turnover is 4" and "leverage is 4" are traps.
- A lower tax rate and a lower DSO both **raise** ROE. Only lower leverage lowers it.
- Sustainable growth uses retention (0.45), not payout (0.55), and the answer is g (5.88%), not ROE (13.06%).
- Purchases = COGS + **ending** − **beginning** inventory. Flipping the signs is the trap.
- "Higher debt-based leverage ratios mean stronger solvency" is false.

---

## Module 12: Introduction to Financial Statement Modeling (2 questions)

### Key terms
- **Organic growth**: revenue growth from the existing business, made up of changes in **volume** (selling more units) and **price/mix** (charging more, or selling a richer mix of products). The curriculum's revenue model shows it separately from **scope changes** (growth from acquisitions or losses from divestitures) and the **FX impact** (currency moves). Organic growth is both volume and price/mix together.
- **Sales-based pro forma model**: a forecast that projects revenue first, then projects each expense and balance sheet item as a percentage of revenue, using historical percentages unless there's a reason to change them.
- **Net working capital (NWC) in a model**: often forecast as a percentage of sales. When revenue grows, the NWC balance grows with it, and that increase uses cash.
- **Pro forma cash flow from operations**: net income plus non-cash charges (depreciation) minus the **increase** in net working capital. It is the change in NWC that affects cash, not the NWC balance itself.

### Formulas
- Forecast line item = forecast revenue × that item's historical % of revenue
- Pro forma CFO = net income + depreciation − increase in net working capital

### Exam traps
- "Volume only" or "price/mix only" for organic growth. It's both.
- In the AZ Manufacturing question, NWC goes from 20 to 24 (20% of 120), so subtract 4. Subtracting the full 24 gives 4.8; adding it gives 28.8. The answer is 16.8 + 12.0 − 4 = 24.8.

---

## Formula Quick Sheet

| Module | Formula |
| --- | --- |
| 2 | WASO = start shares + new shares × months outstanding / 12 |
| 2 | Basic EPS = (NI − preferred dividends) / WASO |
| 2 | Diluted EPS = (NI − pref div + face × coupon × (1 − t)) / (WASO + conversion shares). If above basic, report basic |
| 2 | Revenue this year = (cumulative cost / total estimated cost) × contract price − prior revenue |
| 3 | Ending RE = beginning RE + NI − dividends |
| 3 | Goodwill = purchase price − FV of identifiable net assets |
| 3 | Current ratio = CA / CL |
| 3 | Quick ratio = (cash + ST investments + receivables) / CL |
| 3, 11 | Financial leverage = total assets / total equity |
| 4, 11 | Purchases = COGS + ending inventory − beginning inventory |
| 4 | Cash paid to suppliers = purchases − increase in payables |
| 5 | FCFF = NI + D&A + interest × (1 − t) − FCInv − WCInv |
| 6 | Inventory turnover = COGS / average inventory |
| 6 | Cash conversion cycle = DOH + DSO − days of payables |
| 7 | IFRS impairment = carrying amount − max(FV − costs to sell, value in use) |
| 9 | Deferred tax = (carrying amount − tax base) × tax rate |
| 11 | ROE = net margin × asset turnover × leverage = ROA × leverage |
| 11 | ROE = tax burden × interest burden × EBIT margin × asset turnover × leverage |
| 11 | Sustainable growth = (1 − payout) × ROE |
| 12 | Pro forma CFO = NI + depreciation − increase in NWC |

---

## Mock Question Bank

All 43 FSA questions from your mocks, grouped by module, with the original wording. "Official" is CFA Mock 1A; "Meldrum" is Meldrum mock 2. Answer closed-book, record your confidence, then check the key.

### Module 1: Introduction to FSA

**1. (Official Q36)** Which of the following requires management to report on the effectiveness of the company's internal control over financial reporting in accordance with the Sarbanes–Oxley Act?
A. Securities and Exchange Commission
B. Financial Accounting Standards Board
C. International Accounting Standards Board

**2. (Meldrum Q76)** While conducting an audit, the auditor observes that certain exceptions to the accounting principles have been made in the preparation of financial statements. Upon completion of the audit, the auditor's most appropriate opinion is a(n):
A. adverse opinion.
B. qualified opinion.
C. unqualified opinion.

### Module 2: Analyzing Income Statements

**3. (Official Q28)** A company receives a subscription payment for a publication to be delivered next fiscal year. Ignoring income taxes, the company would recognize in the current fiscal year an increase in:
A. assets and revenue.
B. assets and liabilities.
C. liabilities and revenue.

**4. (Official Q44)** Unless it is impractical to do so, which of the following is reported through retrospective application?
A. Changes in accounting policies only
B. Changes in accounting estimates only
C. Both changes in accounting policies and accounting estimates

**5. (Official Q54)** Selected year-end financial data for a company is as follows:

| Item | Value |
| --- | --- |
| Net income | $200,000 |
| Tax rate | 15% |
| Weighted average number of common shares outstanding | 125,000 |
| 12% bond convertible into 3,000 common shares (potentially dilutive) | $60,000 |

Given this information, the diluted EPS of the company is closest to:
A. $1.51.
B. $1.60.
C. $1.61.

**6. (Meldrum Q38)** An analyst gathered the following information regarding a company for one fiscal year:

| Item | Value |
| --- | --- |
| Net Income (in CAD) | 1,475,000 |
| Dividends Paid to Preferred Shareholders (in CAD) | 160,000 |
| Shares of Common Stock Outstanding at 1 January | 925,000 |
| New Shares of Common Stock Issued on 1 July | 105,000 |
| Non-Convertible Preferred Stock | 110,000 |
| CAD 1,000 par, 6% Convertible Bonds Outstanding | 750 |

The company's tax rate is 30%. If each bond is convertible to 150 shares of common stock, the company's diluted EPS for the year should be closest to:
A. CAD 1.24
B. CAD 1.34
C. CAD 1.38

**7. (Meldrum Q58)** Ace Construction was selected by the city of Londrina to build a pedestrian bridge over a busy intersection in the city center. Ace signed a $3 million contract with the city to be paid in three equal installments over the next three years. Ace plans to complete the project at the end of the third year and estimates a total cost of $2.2 million for the entire project. During the first year, Ace incurred $700,000 in costs. At the start of year 2, Ace revised its total cost estimate to $2.5 million. In year 2, Ace incurred $900,000 in costs. Under progress towards completion and using the input method of costs incurred relative to estimated total costs, what is the revenue that Ace should recognize in year 2?
A. $954,545
B. $965,455
C. $1,000,000

### Module 3: Analyzing Balance Sheets

**8. (Official Q42)** An analyst gathers the following information (in € thousands) about a company:

| Item | Value |
| --- | --- |
| Beginning retained earnings | 1,500 |
| Ending retained earnings | 2,000 |
| Dividends declared and paid | 400 |

If there are no other items affecting shareholders' equity, net income (in € thousands) is:
A. 100.
B. 500.
C. 900.

**9. (Official Q72)** Under the acquisition method, if the purchase price of an acquired company exceeds the sum of the fair value amounts that can be allocated to individual identifiable assets and liabilities, the acquiring company should record the excess as:
A. goodwill.
B. a gain reflected in profit and loss.
C. a gain reflected in other comprehensive income.

**10. (Meldrum Q45)** Outer Limits Sporting Goods' (OLSG's) 2018 balance sheet is (USD thousands):

| Assets | | Liabilities and equity | |
| --- | --- | --- | --- |
| Cash | 270,000 | Accounts payable | 7,600,000 |
| Short-term investments | 380,000 | Accrued expenses | 6,400,000 |
| Accounts receivable | 1,300,000 | Taxes payable | 1,065,000 |
| Inventory | 28,100,000 | Bonds payable | 6,100,000 |
| Prepaid expenses | 850,000 | Mortgage payable | 2,900,000 |
| Long-term investments | 620,000 | Total liabilities | 24,065,000 |
| Land | 220,000 | Common stock | 3,650,000 |
| PP&E, gross | 8,850,000 | Retained earnings | 11,675,000 |
| Less: accumulated depreciation | −1,550,000 | Total equity | 15,325,000 |
| PP&E, net | 7,300,000 | | |
| Intangibles | 350,000 | | |
| Total assets | 39,390,000 | Total liabilities + equity | 39,390,000 |

In OLSG's industry, the average current ratio is 1.65, the average quick ratio is 0.57 and the average financial leverage ratio is 1.73, all using similar accounting methods to OLSG's. Compared to the industry average, OLSG most likely:
A. has a less risky capital structure.
B. has less inventory compared to its current liabilities.
C. faces a greater liquidity problem if sales decline markedly.

**11. (Meldrum Q81)** Nacho Odriozola is trying to make sense of the way that asset values are determined for balance sheets. He looks at available-for-sale securities, patents, and inventory (which uses a LIFO cost estimation method). He considers three schemes for determining their values under US GAAP:

| | Available-for-sale securities | Patents | Inventory |
| --- | --- | --- | --- |
| Scheme 1 | Amortized cost | Historical cost | Lower of cost or market |
| Scheme 2 | Fair value | Amortized cost | Lower of cost or market |
| Scheme 3 | Fair value | Historical cost | Historical cost |

The approach that Odriozola should use is most likely:
A. Scheme 1.
B. Scheme 2.
C. Scheme 3.

**12. (Meldrum Q82)** Shane Mathews is a financial analyst at Stonebridge Capital. He is analyzing EZ Net, a payments processing firm that has grown significantly over the last few years, primarily through acquisitions. Each acquisition created goodwill and EZ Net reports the aggregate amount of goodwill on its balance sheet. EZ Net also provides a footnote disclosure that shows the calculation of its goodwill and if any impairments have been taken. So far, EZ Net has partially impaired the goodwill associated with one of its recent acquisitions. Shane is trying to compare EZ Net to other payments processing firms using financial ratio analysis. However, Shane is concerned about the impact of goodwill on EZ Net's financial statements and how this will impact its comparability. Which of the following statements least accurately describes adjustments Shane should make to EZ Net's financial statements when comparing EZ Net to other firms in the industry?
A. Exclude goodwill from the assets section of EZ Net's balance sheet.
B. Include goodwill impairment losses on EZ Net's income statement.
C. Exclude the value of goodwill from the shareholders' equity section of EZ Net's balance sheet.

### Module 4: Analyzing Statements of Cash Flows I

**13. (Official Q62)** The following information is available about a company ($ millions):

| Year ended 31 December | Year 2 | Year 1 |
| --- | --- | --- |
| Sales | 322.8 | 320.1 |
| Net income | 27.2 | 26.8 |
| Cash flow from operations | 15.3 | 38.1 |

During Year 2, the company most likely experienced a significant decrease in:
A. inventory.
B. the proportion of sales made on a cash basis.
C. the proportion of interest-bearing debt relative to trade accounts payable.

**14. (Official Q68)** An analyst gathers the following information (in € millions) about a company:

| Item | Value |
| --- | --- |
| Cost of sales | 800 |
| Decrease in inventory | 250 |
| Increase in accounts payable | 100 |

Cash paid to suppliers (in € millions) is:
A. 450.
B. 950.
C. 1,150.

**15. (Meldrum Q84)** A company sold real estate held for investment for USD 65 million and paid taxes on the sale of USD 13 million. On the cash flow statement, the most appropriate classification of the taxes paid is as an:
A. investing activity under both US GAAP and IFRS.
B. operating activity under both US GAAP and IFRS.
C. operating activity under US GAAP and as an investing activity under IFRS.

### Module 5: Analyzing Statements of Cash Flows II

**16. (Meldrum Q48)** A firm reported earnings of AUD 110 million on revenues of AUD 500 million. The working capital of the company increased by AUD 28 million during the year, net capital expenditure was AUD 48 million and depreciation charge was AUD 24 million. The company's interest expense was AUD 22.5 million. Given a marginal tax rate of 20%, the firm's FCFF (in AUD millions) is closest to:
A. 76.00
B. 78.75
C. 80.50

### Module 6: Analysis of Inventories

**17. (Official Q45)** Which of the following statements regarding inventory valuation is most accurate?
A. IFRS defines market value as net realizable value less a normal profit margin.
B. Both IFRS and US GAAP allow the reversal of write-downs back to the original cost.
C. Both IFRS and US GAAP allow agricultural inventories to be valued at net realizable value.

**18. (Official Q66)** Which of the following types of financial ratios is most likely to be positively affected by an inventory write-down compared to if the write-down had not occurred?
A. Activity ratios
B. Liquidity ratios
C. Solvency ratios

**19. (Official Q84)** All else being equal, during periods of rising prices and constant inventory quantities, a company using the weighted average cost inventory valuation method most likely reports a:
A. higher gross profit margin than if using FIFO.
B. lower inventory turnover ratio than if using FIFO.
C. shorter cash conversion cycle than if using FIFO.

**20. (Meldrum Q39)** In a period of increasing inventory costs and increasing inventory levels, compared to using weighted average cost, the most likely result of using LIFO will be a:
A. lower current ratio.
B. lower debt-to-assets ratio.
C. lower working capital turnover.

**21. (Meldrum Q43)** Bassett Hydraulics (BH) prepares its financial statements according to US GAAP. BH has had inventory levels that have increased every year for this last 10 years, except in 2018, in which the number of units in its ending inventory fell to 25% of the number in 2017; BH replaced those units in early 2019. In its financial statements, BH has these disclosures concerning inventory:
- The inventory costing method used is periodic LIFO
- The value of the inventory on 12/31/18 was USD 215,107,665
- The value of the LIFO reserve on 12/31/18 was USD 35,229,021
- No inventory was carried at fair value less costs to sell in 2018
- 2018 COGS was USD 832,904,117
- No inventory was written down in 2018
- No inventory was pledged as collateral for any liabilities in 2018

BH's inventory disclosures are most likely:
A. adequate.
B. inadequate because they do not mention LIFO liquidation.
C. inadequate because they do not mention reversal of prior years' inventory write-downs.

### Module 7: Analysis of Long-Term Assets

**22. (Official Q30)** Intangible assets are reported using the:
A. cost model only.
B. cost model or fair value model.
C. cost model or revaluation model.

**23. (Official Q78)** A company has announced that it is going to distribute a group of long-lived assets to its owners in a spin-off. The most appropriate way to account for the assets until the distribution occurs is to classify them as:
A. held for sale with no depreciation taken.
B. held for use until disposal with no depreciation taken.
C. held for use until disposal with depreciation continuing to be taken.

**24. (Official Q88)** An analyst gathers the following information (in € thousands) about a machine:

| Item | Value |
| --- | --- |
| Carrying amount prior to impairment | 50 |
| Present value of expected future cash flows | 46 |
| Fair value | 48 |
| Costs to sell | 3 |

Impairment loss (in € thousands) is:
A. 2.
B. 4.
C. 5.

**25. (Meldrum Q57)** Company ABC will be buying Company XYZ on December 31, 2020. It is currently November 1, 2020. Company ABC would like to record the lowest amount of Goodwill possible. Assessments of fair value are conducted by external consultants using an income model (discounted cash flow). In assessing the fair value of tangible and intangible assets, ABC will most likely prefer estimates of useful life and salvage value to be revised:

| | Useful life | Salvage value |
| --- | --- | --- |
| a. | Upwards | Upwards |
| b. | Upwards | Downwards |
| c. | Downwards | Downwards |

A. Upwards and Upwards
B. Upwards and Downwards
C. Downwards and Downwards

**26. (Meldrum Q78)** Two drug companies have the same gross margin. Company A expenses all R&D costs but Company B capitalizes development costs (and expenses research costs). Both companies have the same equity market cap (# shares × share price). Which company trades at a higher multiple of EBITDA if they both have the same P/S multiple?
A. Company A.
B. Company B.
C. Both will trade at the same EBITDA multiple.

### Module 8: Topics in Long-Term Liabilities and Equity

**27. (Official Q73)** Under IFRS, which component of the change in the net pension asset or liability each period is recognized in other comprehensive income?
A. Employees' service costs
B. Actuarial gains and losses and other remeasurements
C. The net interest expense or income accrued on the beginning net pension plan asset or liability

**28. (Meldrum Q35)** Alan Monteiro works in the accounting department of Active Wear Online (AWO), an e-commerce retailer of active wear and related accessories. AWO is based in Australia and uses IFRS when preparing its financial statements. AWO has a defined benefit pension plan that allows employees vested in the plan to accrue benefits that they will receive during their retirement. Alan is organizing the financial reporting for AWO's defined benefit plan. During this process, Alan prepares the following statements that he will present to his supervisor.
- Statement 1: AWO changed the formula used to calculate the benefit payments to future retirees. This change was favorable to the employees and resulted in a past service cost reported on the income statement.
- Statement 2: The actual return on plan assets was greater than the expected return included in net interest income/expense. This difference resulted in a remeasurement gain taken to other comprehensive income.
- Statement 3: AWO reported an actuarial loss for the most recent year due to an increase in the life expectancy of its ex-employees during retirement. This loss should be reported on the income statement as part of AWO's operating expenses.

Which of Alan's statements regarding the accounting treatment of a defined benefit pension plan under IFRS is the least accurate?
A. Statement 1
B. Statement 2
C. Statement 3

**29. (Meldrum Q68)** A credit analyst makes the following statements regarding leasing assets:
- Statement 1: Leases provide costly financing; they usually require large down payments and often are at higher fixed interest rates.
- Statement 2: The lease contract often contains more restrictive provisions than other forms of borrowing.

Concerning these statements, it is most likely that:
A. both statements are accurate.
B. both statements are inaccurate.
C. Statement 1 is accurate and Statement 2 is inaccurate.

### Module 9: Analysis of Income Taxes

**30. (Official Q51)** Deferred tax liabilities could arise when:
A. accounting profit is greater than taxable income.
B. the tax base of equipment is greater than its carrying value.
C. tax authorities do not allow an expense item for tax purposes.

**31. (Meldrum Q50)** A company operates in a tax regime that requires an intangible asset to be expensed in a single year, but the accounting standards require it to be capitalized and amortized over a period of 5 years. In the first year, the company will most likely record a:
A. deferred tax asset.
B. deferred tax liability.
C. valuation allowance.

**32. (Meldrum Q63)** Solfan Industries pays for key person life insurance for its chief executive, financial, and operating officers (CEO, CFO, and COO, respectively). The premia for these life insurance policies are not deductible for income tax purposes, but, should one of the covered individuals pass away, the proceeds from the policy would not be taxable. Solfan deducts the premia on its income statement (as part of SG&A). This difference in treatment will most likely create:
A. a deferred tax asset.
B. a deferred tax liability.
C. neither a deferred tax asset or a deferred tax liability.

**33. (Meldrum Q66)** On 2 January 2015, PK Automotive purchases machinery valued at EUR 12.5 million. The machinery has a ten-year life with a salvage value of EUR 2.5 million, and PK uses straight-line depreciation for both financial reporting and taxes. On 31 December 2018, the carrying value of the machinery is EUR 8.5 million, but the fair value of the machinery has decreased to EUR 5.8 million. PK has chosen to use the revaluation model on this machinery, and their marginal tax rate is 30%. In addition to recording the revaluation, PK will most likely also record a:
A. deferred tax asset of EUR 810,000.
B. deferred tax liability of EUR 810,000.
C. direct-to-equity charge (debit) of EUR 810,000.

### Module 10: Financial Reporting Quality

**34. (Official Q47)** Accounting choices within US GAAP that decrease reported performance in the current period and may increase performance in later periods are most likely examples of:
A. aggressive accounting.
B. conservative accounting.
C. earnings that are not sustainable.

**35. (Meldrum Q74)** Modena Engineering (ME) has a contract to build a bridge in Verona, Italy. ME anticipates that the project will fall into three of its fiscal years. ME is considering three approaches for recognizing the revenue for this project:
- Approach 1: Recognize the full revenue at the inception of the contract.
- Approach 2: Recognize the revenue only upon completion of the bridge.
- Approach 3: Recognize the revenue in proportion to the costs that it incurs.

Of the three approaches that ME could choose, the most conservative is:
A. Approach 1.
B. Approach 2.
C. Approach 3.

### Module 11: Financial Analysis Techniques

**36. (Official Q38)** A company's purchases can be estimated as cost of sales plus:
A. ending inventory less beginning inventory.
B. beginning inventory less ending inventory.
C. the average level of inventory for the period.

**37. (Official Q48)** All else being equal, a decrease in which of the following financial metrics would most likely result in a lower return on equity (ROE)?
A. Leverage
B. The tax rate
C. Days of sales outstanding

**38. (Official Q60)** An analyst collects the following information about a company:

| Item | Value |
| --- | --- |
| Net profit margin | 4% |
| Return on average assets | 8% |
| Return on average equity | 16% |
| Revenue | €2,500,000 |

The company's:
A. total asset turnover is 4.
B. financial leverage ratio is 4.
C. average shareholders' equity is €625,000.

**39. (Official Q89)** An analyst gathers the following information (in £ millions) about a company:

| Item | Value |
| --- | --- |
| Total assets | 600 |
| Total liabilities | 120 |
| Total equity | 480 |
| Total debt | 60 |

Based only on this information, the financial leverage ratio is:
A. 0.10.
B. 0.25.
C. 1.25.

**40. (Meldrum Q67)** An analyst gathers the following data for a company:

| Item | Value |
| --- | --- |
| Operating margin | 9% |
| Asset turnover | 1.60 |
| Interest burden | 0.90 |
| Current ratio | 1.38 |
| Financial leverage | 1.55 |
| Dividend payout ratio | 0.55 |

Based on this information, if the company's average tax rate is 35%, the company's sustainable growth rate is closest to:
A. 5.88%.
B. 7.18%.
C. 13.06%.

**41. (Meldrum Q72)** Consider the following two statements:
- Statement 1: The higher the leverage ratios with Total Debt in the numerator, the stronger the company's solvency.
- Statement 2: Leverage ratios focus on the balance sheet while coverage ratios focus on the income statement and cash flow statement.

Which statement(s) is/are correct?
A. Statement 1 only.
B. Statement 2 only.
C. Neither Statement 1 nor Statement 2 are correct.

### Module 12: Introduction to Financial Statement Modeling

**42. (Official Q50)** Organic growth represents changes in revenue due to the impact of changes in:
A. volume only.
B. price/mix only.
C. both volume and price/mix.

**43. (Meldrum Q77)** Kelly Williams is a financial analyst at Stonebridge Capital. She is building a financial statement model for AZ Manufacturing to project its financial performance for the next year. In the most recent year of 2023, AZ reported the following results (in millions of $):

| | 2023 |
| --- | --- |
| Revenue | 100.0 |
| COGS | (40.0) |
| SG&A, excluding depreciation | (30.0) |
| Depreciation expense | (10.0) |
| Pretax income | 20.0 |
| Tax expense | (6.0) |
| Net income | 14.0 |
| Year-end net working capital investment | 20.0 |

Kelly projects that AZ will grow its revenue by 20% in 2024. She projects the same percentages of revenue in 2024 for each expense item, compared to the percentages of revenue realized in 2023. Kelly also projects that net working capital investment on the balance sheet at the end of 2024 will be the same percentage of sales in 2024 as it was in 2023. What is the projected cash flow from operations in 2024 based on Kelly's forecasts?
A. $4.8 million
B. $24.8 million
C. $28.8 million

---

## Answer Key

| # | Source | Answer | Why |
| --- | --- | --- | --- |
| 1 | Official Q36 | A | The SEC carries out SOX and requires management's internal control report. FASB only writes US GAAP. |
| 2 | Meldrum Q76 | B | Exceptions to accounting principles call for a qualified opinion. Adverse means not fairly presented overall. |
| 3 | Official Q28 | B | Cash (asset) and unearned revenue (liability) rise. No revenue until delivery. |
| 4 | Official Q44 | A | Policy changes are retrospective. Estimate changes are prospective. |
| 5 | Official Q54 | B | Basic = 200,000 / 125,000 = 1.60. If-converted = (200,000 + 6,120) / 128,000 = 1.61, above basic, so the bond is antidilutive. Report 1.60. |
| 6 | Meldrum Q38 | A | WASO = 925,000 + 105,000 × 6/12 = 977,500. (1,475,000 − 160,000 + 31,500) / (977,500 + 112,500) = 1.235. |
| 7 | Meldrum Q58 | B | Year 1: 700/2,200 × 3.0m = 954,545. Cumulative: 1,600/2,500 = 64% × 3.0m = 1,920,000. Year 2 = 965,455. |
| 8 | Official Q42 | C | 2,000 = 1,500 + NI − 400, so NI = 900. |
| 9 | Official Q72 | A | The excess of price over fair value of identifiable net assets is goodwill, an asset. |
| 10 | Meldrum Q45 | C | Current 1.99 vs 1.65 but quick 0.13 vs 0.57: almost all current assets are inventory, so a sales slump leaves little liquidity. Leverage 2.57 vs 1.73 is riskier, ruling out A. |
| 11 | Meldrum Q81 | B | US GAAP: AFS at fair value, finite-life patents at amortized cost, LIFO inventory at lower of cost or market. |
| 12 | Meldrum Q82 | B | Analysts remove goodwill from assets and equity and exclude impairment losses from the income statement. Including them is the wrong adjustment. |
| 13 | Official Q62 | B | Same sales and NI, CFO down sharply: more credit sales, receivables up. Lower inventory or higher payables would raise CFO. |
| 14 | Official Q68 | A | Purchases = 800 − 250 = 550. Cash paid = 550 − 100 = 450. |
| 15 | Meldrum Q84 | C | US GAAP puts all taxes in operating. IFRS can classify tax tied to an investing transaction as investing. |
| 16 | Meldrum Q48 | A | 110 + 24 + 22.5 × 0.8 − 48 − 28 = 76.0. |
| 17 | Official Q45 | C | Both allow agricultural inventory at NRV. US GAAP bans write-down reversals; NRV is selling price less costs to complete and sell. |
| 18 | Official Q66 | A | A smaller inventory denominator raises turnover. Liquidity and solvency ratios get worse. |
| 19 | Official Q84 | C | Weighted average has higher COGS and lower inventory than FIFO, so higher turnover, lower DOH and a shorter cash conversion cycle. |
| 20 | Meldrum Q39 | A | LIFO gives lower inventory, so lower current assets and current ratio. Debt-to-assets is higher and working capital turnover is higher. |
| 21 | Meldrum Q43 | B | Units fell 75% then were replaced: a LIFO liquidation, which US GAAP requires to be disclosed. US GAAP has no reversals to disclose. |
| 22 | Official Q30 | C | IFRS allows cost or revaluation. "Cost only" is the US GAAP answer. |
| 23 | Official Q78 | C | Disposal other than by sale (spin-off) stays held for use and keeps being depreciated. |
| 24 | Official Q88 | B | Recoverable = max(48 − 3, 46) = 46. Loss = 50 − 46 = 4. |
| 25 | Meldrum Q57 | A | Longer life and higher salvage raise the DCF fair value of the assets acquired, shrinking goodwill. |
| 26 | Meldrum Q78 | A | Expensing all R&D lowers EBITDA. Same market cap and lower EBITDA means a higher EBITDA multiple. |
| 27 | Official Q73 | B | Remeasurements go to OCI. Service cost and net interest go to P&L. |
| 28 | Meldrum Q35 | C | Actuarial losses are remeasurements and go to OCI, not operating expense. Statements 1 and 2 are correct. |
| 29 | Meldrum Q68 | B | Leases often provide cheaper financing with little down payment and less restrictive terms. Both statements are false. |
| 30 | Official Q51 | A | Accounting profit above taxable income means less tax now, more later: a DTL. B creates a DTA; C is permanent. |
| 31 | Meldrum Q50 | B | Tax base zero, carrying amount positive: a temporary difference creating a DTL. |
| 32 | Meldrum Q63 | C | Non-deductible premiums are a permanent difference. No deferred tax. |
| 33 | Meldrum Q66 | A | Carrying amount falls 2.7m below the tax base. 2.7m × 30% = 0.81m DTA, matching the P&L treatment of the decrease. |
| 34 | Official Q47 | B | Lower now, possibly higher later is conservative. It does not by itself create unsustainable earnings. |
| 35 | Meldrum Q74 | B | Recognizing revenue only at completion gives the lowest current income. |
| 36 | Official Q38 | A | Purchases = COGS + ending inventory − beginning inventory. |
| 37 | Official Q48 | A | Leverage is a DuPont factor, so lower leverage lowers ROE. A lower tax rate or lower DSO raises ROE. |
| 38 | Official Q60 | C | NI = 2.5m × 4% = 100,000. Equity = 100,000 / 16% = 625,000. Turnover = 2, leverage = 2. |
| 39 | Official Q89 | C | Financial leverage = assets / equity = 600 / 480 = 1.25. |
| 40 | Meldrum Q67 | A | ROE = 0.65 × 0.90 × 0.09 × 1.60 × 1.55 = 13.06%. g = 0.45 × 13.06% = 5.88%. |
| 41 | Meldrum Q72 | B | Higher debt-based leverage means weaker solvency, so Statement 1 is false. Statement 2 is true. |
| 42 | Official Q50 | C | Organic growth is volume plus price/mix, shown separately from acquisitions, divestitures and FX. |
| 43 | Meldrum Q77 | B | NI = 14% × 120 = 16.8. Depreciation = 12.0. NWC rises from 20 to 24, so subtract 4. CFO = 24.8. |

---

*Built from the official Level I Mock 1A, Mark Meldrum mock 2, and the 2026 Level I FSA notes in your Optima CFA project. All 13 calculation answers were recomputed. Confirm any rule against the current CFA curriculum before relying on it.*
