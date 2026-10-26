// Financial Statement Analysis content (tested concepts only). Built by tools/build_fsa.py from CFA-L1-FSA-Master-Reference.md.
// IDs are permanent: progress is saved against them.
window.TOPIC_CONTENT = window.TOPIC_CONTENT || {};
window.TOPIC_CONTENT.fsa = {
 "topic": "fsa",
 "modules": [
  {
   "id": 1,
   "name": "Introduction to Financial Statement Analysis",
   "short": "Intro"
  },
  {
   "id": 2,
   "name": "Analyzing Income Statements",
   "short": "Income Stmt"
  },
  {
   "id": 3,
   "name": "Analyzing Balance Sheets",
   "short": "Balance Sheet"
  },
  {
   "id": 4,
   "name": "Analyzing Statements of Cash Flows I",
   "short": "Cash Flow I"
  },
  {
   "id": 5,
   "name": "Analyzing Statements of Cash Flows II",
   "short": "Cash Flow II"
  },
  {
   "id": 6,
   "name": "Analysis of Inventories",
   "short": "Inventories"
  },
  {
   "id": 7,
   "name": "Analysis of Long-Term Assets",
   "short": "LT Assets"
  },
  {
   "id": 8,
   "name": "Topics in Long-Term Liabilities and Equity",
   "short": "LT Liabilities"
  },
  {
   "id": 9,
   "name": "Analysis of Income Taxes",
   "short": "Income Taxes"
  },
  {
   "id": 10,
   "name": "Financial Reporting Quality",
   "short": "Reporting Quality"
  },
  {
   "id": 11,
   "name": "Financial Analysis Techniques",
   "short": "Analysis Tools"
  },
  {
   "id": 12,
   "name": "Introduction to Financial Statement Modeling",
   "short": "Modeling"
  }
 ],
 "terms": [
  {
   "id": "fsa-t13",
   "m": 1,
   "g": "body",
   "term": "IASB",
   "def": "Standard setter that writes IFRS, used in most of the world including Saudi Arabia. Decides how things are recorded but cannot force any company to follow the rules."
  },
  {
   "id": "fsa-t14",
   "m": 1,
   "g": "body",
   "term": "FASB",
   "def": "Standard setter that writes US GAAP. Writes the rulebook only; it has no power to enforce it."
  },
  {
   "id": "fsa-t15",
   "m": 1,
   "g": "body",
   "term": "SEC",
   "def": "US regulator that requires listed companies to follow the standards and file reports. Carries out SOX and oversees the PCAOB, so it is the body that requires the internal control report."
  },
  {
   "id": "fsa-t16",
   "m": 1,
   "g": "body",
   "term": "Sarbanes-Oxley (2002)",
   "def": "US law passed after Enron and WorldCom. Created the PCAOB to oversee auditors and requires management to report on whether its internal control over financial reporting works, with the auditor confirming it."
  },
  {
   "id": "fsa-t17",
   "m": 1,
   "g": "body",
   "term": "PCAOB",
   "def": "Public Company Accounting Oversight Board: oversees auditors. Created by Sarbanes-Oxley."
  },
  {
   "id": "fsa-t18",
   "m": 1,
   "g": "audit",
   "term": "Internal controls",
   "def": "The company's own processes for making sure transactions are recorded correctly (approvals, reconciliations, segregation of duties). Management is responsible for them, not the auditor."
  },
  {
   "id": "fsa-t177",
   "m": 1,
   "g": "audit",
   "term": "Audit opinion",
   "def": "An independent accounting firm's opinion on whether the statements are fairly presented under the accounting standards."
  },
  {
   "id": "fsa-t21",
   "m": 1,
   "g": "opinion",
   "term": "Unqualified opinion",
   "def": "Clean (unmodified): the statements are fairly presented with no material errors."
  },
  {
   "id": "fsa-t22",
   "m": 1,
   "g": "opinion",
   "term": "Qualified opinion",
   "def": "Fairly presented except for specific exceptions to the accounting principles, which the auditor explains. The problem is real but contained."
  },
  {
   "id": "fsa-t23",
   "m": 1,
   "g": "opinion",
   "term": "Adverse opinion",
   "def": "The statements are not fairly presented; they materially depart from the standards. A severe red flag."
  },
  {
   "id": "fsa-t24",
   "m": 1,
   "g": "opinion",
   "term": "Disclaimer of opinion",
   "def": "The auditor can't form an opinion at all, usually because it couldn't get enough evidence (a scope limitation)."
  },
  {
   "id": "fsa-t178",
   "m": 2,
   "g": "rev",
   "term": "Accrual accounting",
   "def": "Revenue is recorded when earned and expenses when incurred, not when cash moves."
  },
  {
   "id": "fsa-t29",
   "m": 2,
   "g": "rev",
   "term": "Unearned (deferred) revenue",
   "def": "Cash received before delivery. Recorded as a liability, not revenue: cash (asset) up, unearned revenue (liability) up. Revenue is recognized later, as delivered."
  },
  {
   "id": "fsa-t28",
   "m": 2,
   "g": "rev",
   "term": "Input method (revenue over time)",
   "def": "For long contracts, measures progress by costs incurred so far versus total estimated costs. Spent 40% of expected cost, recognize 40% of contract revenue."
  },
  {
   "id": "fsa-t179",
   "m": 2,
   "g": "rev",
   "term": "Revised cost estimate on an over-time contract",
   "def": "Recompute the cumulative percentage complete with the new estimate, find total revenue earned to date, and subtract what earlier years already recognized. Earlier years are not restated."
  },
  {
   "id": "fsa-t36",
   "m": 2,
   "g": "change",
   "term": "Change in accounting policy",
   "def": "Switching between allowed methods. Applied retrospectively: all prior periods shown are restated, unless impractical."
  },
  {
   "id": "fsa-t37",
   "m": 2,
   "g": "change",
   "term": "Change in accounting estimate",
   "def": "Revising a judgment within the same method (useful life, salvage value, bad debt rate). Applied prospectively: current and future periods only."
  },
  {
   "id": "fsa-t180",
   "m": 2,
   "g": "eps",
   "term": "Earnings per share (EPS)",
   "def": "Net income available to common shareholders divided by the number of common shares."
  },
  {
   "id": "fsa-t41",
   "m": 2,
   "g": "eps",
   "term": "Weighted average shares outstanding (WASO)",
   "def": "Shares weighted by how long they were outstanding during the year."
  },
  {
   "id": "fsa-t181",
   "m": 2,
   "g": "eps",
   "term": "Diluted EPS",
   "def": "What EPS would be if every security that could become common stock did so. Shows the worst-case dilution for current shareholders."
  },
  {
   "id": "fsa-t42",
   "m": 2,
   "g": "eps",
   "term": "If-converted method (convertible debt)",
   "def": "Assume the bonds converted at the start of the year: add back the bond interest after tax to the numerator, and add the conversion shares to the denominator."
  },
  {
   "id": "fsa-t45",
   "m": 2,
   "g": "eps",
   "term": "Antidilutive security",
   "def": "A security whose conversion would increase EPS. Left out: diluted EPS can never be higher than basic EPS."
  },
  {
   "id": "fsa-t182",
   "m": 3,
   "g": "acq",
   "term": "Retained earnings",
   "def": "Cumulative profits kept rather than paid out as dividends. Grows by net income, shrinks by dividends declared."
  },
  {
   "id": "fsa-t183",
   "m": 3,
   "g": "acq",
   "term": "Acquisition method",
   "def": "The buyer records each identifiable asset and liability of the target at fair value on the purchase date."
  },
  {
   "id": "fsa-t184",
   "m": 3,
   "g": "acq",
   "term": "Identifiable assets",
   "def": "Assets that can be separated or arise from legal rights (property, patents, licenses, brands, customer lists). Recorded individually."
  },
  {
   "id": "fsa-t60",
   "m": 3,
   "g": "acq",
   "term": "Goodwill",
   "def": "The part of the purchase price left after allocating fair value to identifiable assets and liabilities. An asset, not amortized, tested for impairment at least yearly. Never a gain."
  },
  {
   "id": "fsa-t62",
   "m": 3,
   "g": "acq",
   "term": "Goodwill analyst adjustment",
   "def": "Remove goodwill from total assets, remove the same amount from equity, and exclude goodwill impairment losses from the income statement."
  },
  {
   "id": "fsa-t55",
   "m": 3,
   "g": "meas",
   "term": "Available-for-sale securities",
   "def": "US GAAP: debt securities the company might sell before maturity. Carried at fair value, with unrealized gains and losses in OCI."
  },
  {
   "id": "fsa-t54",
   "m": 3,
   "g": "meas",
   "term": "Held-to-maturity securities",
   "def": "US GAAP: debt the company intends to hold to maturity. Carried at amortized cost."
  },
  {
   "id": "fsa-t185",
   "m": 3,
   "g": "meas",
   "term": "Patents and other finite-life intangibles",
   "def": "Carried at amortized cost: historical cost minus accumulated amortization. Plain historical cost is wrong."
  },
  {
   "id": "fsa-t186",
   "m": 3,
   "g": "meas",
   "term": "LIFO inventory (US GAAP measurement)",
   "def": "Carried at the lower of cost or market, so it gets written down if its value falls."
  },
  {
   "id": "fsa-t187",
   "m": 3,
   "g": "liq",
   "term": "Gap between current and quick ratios",
   "def": "The bigger the gap, the more of current assets is inventory. If sales fall sharply, bills must be paid from quick assets alone."
  },
  {
   "id": "fsa-t65",
   "m": 4,
   "g": "cfo",
   "term": "Cash flow from operations (CFO)",
   "def": "Cash generated by the core business. Under the indirect method it starts from net income and adjusts for non-cash items and working capital changes."
  },
  {
   "id": "fsa-t71",
   "m": 4,
   "g": "cfo",
   "term": "Working capital effects on CFO",
   "def": "Operating current asset up, CFO down (receivables or inventory up). Operating current liability up, CFO up (payables up)."
  },
  {
   "id": "fsa-t188",
   "m": 4,
   "g": "cfo",
   "term": "More credit sales, same total sales",
   "def": "Receivables pile up and CFO falls even though net income doesn't change. A big CFO drop with flat sales and net income is the classic sign."
  },
  {
   "id": "fsa-t189",
   "m": 4,
   "g": "cfo",
   "term": "Shifting from trade payables to bank debt",
   "def": "Means paying suppliers sooner, which lowers CFO. Moving toward more trade payables raises CFO."
  },
  {
   "id": "fsa-t75",
   "m": 4,
   "g": "cfo",
   "term": "Taxes paid (classification)",
   "def": "US GAAP: all income taxes paid are operating. IFRS: operating by default, but tax tied to an investing or financing transaction can be classified there."
  },
  {
   "id": "fsa-t78",
   "m": 5,
   "g": "fcff",
   "term": "Free cash flow to the firm (FCFF)",
   "def": "Cash left over for all providers of capital, debt and equity, after operating costs and needed investments."
  },
  {
   "id": "fsa-t190",
   "m": 5,
   "g": "fcff",
   "term": "Non-cash charges",
   "def": "Expenses that reduce net income without using cash, mainly depreciation and amortization. Added back."
  },
  {
   "id": "fsa-t191",
   "m": 5,
   "g": "fcff",
   "term": "After-tax interest add-back",
   "def": "Interest goes to debt holders, so FCFF adds it back, after tax, because the interest expense had saved taxes."
  },
  {
   "id": "fsa-t192",
   "m": 5,
   "g": "fcff",
   "term": "Fixed capital investment (FCInv)",
   "def": "Net capital expenditure on long-term assets. Subtracted."
  },
  {
   "id": "fsa-t193",
   "m": 5,
   "g": "fcff",
   "term": "Working capital investment (WCInv)",
   "def": "The increase in working capital during the year. Subtracted."
  },
  {
   "id": "fsa-t80",
   "m": 6,
   "g": "flow",
   "term": "Cost flow methods",
   "def": "FIFO sends the oldest costs to COGS, LIFO the newest, weighted average the average. LIFO is allowed only under US GAAP."
  },
  {
   "id": "fsa-t86",
   "m": 6,
   "g": "flow",
   "term": "LIFO under rising prices",
   "def": "Highest COGS, lowest gross margin, lowest ending inventory, lowest taxes."
  },
  {
   "id": "fsa-t87",
   "m": 6,
   "g": "flow",
   "term": "FIFO under rising prices",
   "def": "Lowest COGS, highest gross margin, highest ending inventory."
  },
  {
   "id": "fsa-t88",
   "m": 6,
   "g": "flow",
   "term": "Weighted average under rising prices",
   "def": "Sits in the middle on everything."
  },
  {
   "id": "fsa-t194",
   "m": 6,
   "g": "flow",
   "term": "Ratio effects of lower inventory",
   "def": "Lower current ratio and working capital; higher inventory turnover; fewer days of inventory and a shorter cash conversion cycle; higher debt-to-assets; higher working capital turnover."
  },
  {
   "id": "fsa-t84",
   "m": 6,
   "g": "meas",
   "term": "Net realizable value (NRV)",
   "def": "Estimated selling price minus the costs to complete and sell."
  },
  {
   "id": "fsa-t81",
   "m": 6,
   "g": "meas",
   "term": "IFRS inventory measurement",
   "def": "Lower of cost and NRV. A write-down can be reversed if value recovers, up to original cost."
  },
  {
   "id": "fsa-t82",
   "m": 6,
   "g": "meas",
   "term": "US GAAP inventory measurement (FIFO, weighted average)",
   "def": "Lower of cost and NRV. Write-downs cannot be reversed."
  },
  {
   "id": "fsa-t83",
   "m": 6,
   "g": "meas",
   "term": "Lower of cost or market (US GAAP LIFO and retail)",
   "def": "Market = replacement cost, capped at NRV and floored at NRV minus a normal profit margin. That floor is US GAAP's, not an IFRS definition."
  },
  {
   "id": "fsa-t195",
   "m": 6,
   "g": "wd",
   "term": "Reversing a write-down",
   "def": "IFRS allows it if value recovers, up to original cost. US GAAP does not allow reversals."
  },
  {
   "id": "fsa-t85",
   "m": 6,
   "g": "wd",
   "term": "Agricultural inventory",
   "def": "Both IFRS and US GAAP allow it at NRV or fair value less costs to sell, even above cost."
  },
  {
   "id": "fsa-t92",
   "m": 6,
   "g": "wd",
   "term": "Effect of a write-down on ratios",
   "def": "Profitability, liquidity and solvency ratios get worse, but activity ratios improve because their denominators shrink."
  },
  {
   "id": "fsa-t90",
   "m": 6,
   "g": "lifo",
   "term": "LIFO reserve",
   "def": "FIFO inventory minus LIFO inventory. US LIFO companies must disclose it."
  },
  {
   "id": "fsa-t91",
   "m": 6,
   "g": "lifo",
   "term": "LIFO liquidation",
   "def": "Selling more units than bought dips into old, cheap layers, so margins and profit jump for a year. Not sustainable; US GAAP requires disclosure. A sharp fall in units is the signal."
  },
  {
   "id": "fsa-t196",
   "m": 7,
   "g": "model",
   "term": "Cost model",
   "def": "Historical cost minus accumulated depreciation (or amortization) and impairment."
  },
  {
   "id": "fsa-t197",
   "m": 7,
   "g": "model",
   "term": "Revaluation model",
   "def": "Fair value at the revaluation date minus later depreciation and impairment. IFRS allows it or the cost model for PP&E and intangibles; US GAAP allows only the cost model."
  },
  {
   "id": "fsa-t103",
   "m": 7,
   "g": "model",
   "term": "Fair value model",
   "def": "IFRS model for investment property, with all changes in profit or loss. Not the model for intangibles."
  },
  {
   "id": "fsa-t108",
   "m": 7,
   "g": "disp",
   "term": "Held for sale",
   "def": "Assets planned to be sold soon. Depreciation stops; carried at the lower of carrying amount and fair value less costs to sell."
  },
  {
   "id": "fsa-t109",
   "m": 7,
   "g": "disp",
   "term": "Disposed of other than by sale",
   "def": "Spin-off, abandonment or swap. Stays held for use until it leaves, and depreciation continues."
  },
  {
   "id": "fsa-t198",
   "m": 7,
   "g": "imp",
   "term": "Impairment",
   "def": "A write-down when an asset's carrying amount is more than it can recover."
  },
  {
   "id": "fsa-t106",
   "m": 7,
   "g": "imp",
   "term": "Recoverable amount",
   "def": "The higher of fair value less costs to sell and value in use."
  },
  {
   "id": "fsa-t199",
   "m": 7,
   "g": "imp",
   "term": "Fair value less costs to sell",
   "def": "What you'd get by selling the asset, net of selling costs."
  },
  {
   "id": "fsa-t107",
   "m": 7,
   "g": "imp",
   "term": "Value in use",
   "def": "The present value of the cash flows from keeping and using the asset."
  },
  {
   "id": "fsa-t104",
   "m": 7,
   "g": "imp",
   "term": "IFRS impairment",
   "def": "Loss = carrying amount minus recoverable amount, in the income statement. Reversals allowed if value recovers."
  },
  {
   "id": "fsa-t200",
   "m": 7,
   "g": "fv",
   "term": "Fair value through an income approach",
   "def": "Discounts expected cash flows. A longer useful life and a higher salvage value both raise fair value."
  },
  {
   "id": "fsa-t201",
   "m": 7,
   "g": "fv",
   "term": "Fair value and goodwill",
   "def": "Higher fair values for identifiable assets leave less goodwill. A buyer wanting minimal goodwill prefers assumptions that raise asset values."
  },
  {
   "id": "fsa-t202",
   "m": 7,
   "g": "rd",
   "term": "Research",
   "def": "The search for new knowledge. Always expensed."
  },
  {
   "id": "fsa-t203",
   "m": 7,
   "g": "rd",
   "term": "Development",
   "def": "Applying knowledge to a specific product. IFRS capitalizes it once criteria are met; US GAAP generally expenses it."
  },
  {
   "id": "fsa-t204",
   "m": 7,
   "g": "rd",
   "term": "Capitalizing development and EBITDA",
   "def": "Capitalized costs become amortization, which EBITDA excludes, so the capitalizer has higher EBITDA than an identical company that expenses."
  },
  {
   "id": "fsa-t205",
   "m": 7,
   "g": "rd",
   "term": "EBITDA multiple",
   "def": "Value divided by EBITDA. Same market value and lower EBITDA means a higher multiple."
  },
  {
   "id": "fsa-t206",
   "m": 8,
   "g": "pen",
   "term": "Defined benefit (DB) pension plan",
   "def": "The employer promises a specific retirement benefit and bears the risk that the plan's investments fall short."
  },
  {
   "id": "fsa-t121",
   "m": 8,
   "g": "pen",
   "term": "Net pension liability (asset)",
   "def": "PV of the defined benefit obligation minus the fair value of plan assets. Underfunded means a liability."
  },
  {
   "id": "fsa-t122",
   "m": 8,
   "g": "pen",
   "term": "Service cost (IFRS pension)",
   "def": "PV of the extra benefit earned by another year of work, including past service cost. Goes to P&L."
  },
  {
   "id": "fsa-t207",
   "m": 8,
   "g": "pen",
   "term": "Past service cost",
   "def": "Arises when a plan amendment changes benefits for service already given. Reported in P&L under IFRS."
  },
  {
   "id": "fsa-t123",
   "m": 8,
   "g": "pen",
   "term": "Net interest (IFRS pension)",
   "def": "The discount rate applied to the net pension liability or asset at the start of the year. Goes to P&L."
  },
  {
   "id": "fsa-t124",
   "m": 8,
   "g": "pen",
   "term": "Remeasurements (IFRS pension)",
   "def": "Actuarial gains and losses plus actual return on plan assets minus the return in net interest. Go to OCI, never recycled."
  },
  {
   "id": "fsa-t125",
   "m": 8,
   "g": "pen",
   "term": "Actuarial gains and losses",
   "def": "Come from changing assumptions such as life expectancy, turnover, retirement age or salary growth. Longer life expectancy is an actuarial loss in OCI."
  },
  {
   "id": "fsa-t114",
   "m": 8,
   "g": "lease",
   "term": "Lessee advantages of leasing",
   "def": "Often less costly financing (little or no down payment, often lower fixed rates), less restrictive provisions, less exposure to obsolescence."
  },
  {
   "id": "fsa-t129",
   "m": 9,
   "g": "inc",
   "term": "Accounting profit (pretax income)",
   "def": "Profit on the income statement, under accounting rules."
  },
  {
   "id": "fsa-t128",
   "m": 9,
   "g": "inc",
   "term": "Taxable income",
   "def": "Profit on the tax return, under tax rules."
  },
  {
   "id": "fsa-t132",
   "m": 9,
   "g": "base",
   "term": "Carrying amount",
   "def": "An asset's or liability's value on the balance sheet."
  },
  {
   "id": "fsa-t133",
   "m": 9,
   "g": "base",
   "term": "Tax base",
   "def": "The value the tax authority assigns: the amount still deductible for tax in future."
  },
  {
   "id": "fsa-t134",
   "m": 9,
   "g": "diff",
   "term": "Temporary difference",
   "def": "A carrying amount vs tax base difference that will reverse over time. Creates deferred tax."
  },
  {
   "id": "fsa-t135",
   "m": 9,
   "g": "diff",
   "term": "Permanent difference",
   "def": "Never reverses (fines, non-deductible premiums, untaxed income). Creates no deferred tax; only makes the effective rate differ from the statutory rate."
  },
  {
   "id": "fsa-t136",
   "m": 9,
   "g": "dt",
   "term": "Deferred tax liability (DTL)",
   "def": "Accounting profit above taxable income now: less tax today, more later. For an asset, carrying amount above tax base."
  },
  {
   "id": "fsa-t137",
   "m": 9,
   "g": "dt",
   "term": "Deferred tax asset (DTA)",
   "def": "Taxable income above accounting profit now: more tax today, less later. For an asset, carrying amount below tax base."
  },
  {
   "id": "fsa-t138",
   "m": 9,
   "g": "dt",
   "term": "Valuation allowance",
   "def": "US GAAP reduction to a DTA when it's more likely than not the company won't earn enough future taxable income to use it."
  },
  {
   "id": "fsa-t140",
   "m": 9,
   "g": "dt",
   "term": "Deferred tax follows the item",
   "def": "Deferred tax is recorded wherever the underlying change was recorded."
  },
  {
   "id": "fsa-t208",
   "m": 9,
   "g": "dt",
   "term": "Revaluation down and deferred tax",
   "def": "Books revalued down, tax base unchanged: carrying amount below tax base creates a DTA = decrease × tax rate."
  },
  {
   "id": "fsa-t148",
   "m": 10,
   "g": "cons",
   "term": "Conservative accounting",
   "def": "Choices that lower current reported earnings and position, and may raise them later (later revenue, bigger provisions, faster depreciation)."
  },
  {
   "id": "fsa-t149",
   "m": 10,
   "g": "cons",
   "term": "Aggressive accounting",
   "def": "Choices that raise current earnings or position, and may lower them later (early revenue, capitalizing costs, longer useful lives)."
  },
  {
   "id": "fsa-t209",
   "m": 10,
   "g": "cons",
   "term": "Sustainable earnings",
   "def": "Earnings expected to continue. One-time gains aren't sustainable; conservative accounting alone only moves earnings later."
  },
  {
   "id": "fsa-t210",
   "m": 10,
   "g": "cons",
   "term": "Revenue timing and conservatism",
   "def": "Most aggressive: all revenue at the start. Middle: as costs are incurred. Most conservative: only on completion."
  },
  {
   "id": "fsa-t158",
   "m": 11,
   "g": "dup",
   "term": "DuPont analysis",
   "def": "Splits ROE to show whether it comes from profitability, efficiency or borrowing."
  },
  {
   "id": "fsa-t160",
   "m": 11,
   "g": "dup",
   "term": "Tax burden",
   "def": "NI / EBT = 1 − effective tax rate. A lower tax rate means a higher ratio, so higher ROE."
  },
  {
   "id": "fsa-t211",
   "m": 11,
   "g": "dup",
   "term": "Interest burden",
   "def": "EBT / EBIT. Falls when interest expense rises."
  },
  {
   "id": "fsa-t212",
   "m": 11,
   "g": "dup",
   "term": "Lower DSO and ROE",
   "def": "Smaller receivables mean higher asset turnover and higher ROE."
  },
  {
   "id": "fsa-t159",
   "m": 11,
   "g": "dup",
   "term": "Sustainable growth rate",
   "def": "How fast a company can grow using only retained earnings, without changing its capital structure."
  },
  {
   "id": "fsa-t213",
   "m": 11,
   "g": "solv",
   "term": "Solvency",
   "def": "The ability to meet long-term obligations."
  },
  {
   "id": "fsa-t155",
   "m": 11,
   "g": "solv",
   "term": "Leverage ratios",
   "def": "Come from the balance sheet: how much is financed with debt. Higher debt-based leverage means more financial risk and weaker solvency."
  },
  {
   "id": "fsa-t156",
   "m": 11,
   "g": "solv",
   "term": "Coverage ratios",
   "def": "Come from the income statement and cash flow statement: whether the company can pay its debt costs."
  },
  {
   "id": "fsa-t165",
   "m": 12,
   "g": "rev12",
   "term": "Organic growth",
   "def": "Revenue growth from the existing business: volume plus price/mix, together."
  },
  {
   "id": "fsa-t166",
   "m": 12,
   "g": "rev12",
   "term": "Scope changes",
   "def": "Growth from acquisitions or losses from divestitures, shown separately from organic growth."
  },
  {
   "id": "fsa-t214",
   "m": 12,
   "g": "rev12",
   "term": "FX impact",
   "def": "Revenue change from currency moves, shown separately from organic growth."
  },
  {
   "id": "fsa-t162",
   "m": 12,
   "g": "mod",
   "term": "Sales-based pro forma model",
   "def": "Projects revenue first, then each expense and balance sheet item as a percentage of revenue, using historical percentages unless there's a reason to change."
  },
  {
   "id": "fsa-t215",
   "m": 12,
   "g": "mod",
   "term": "Net working capital (NWC) in a model",
   "def": "Often forecast as a percentage of sales. When revenue grows, NWC grows with it, and that increase uses cash."
  }
 ],
 "formulas": [
  {
   "id": "fsa-f72",
   "m": 2,
   "g": "eps",
   "name": "WASO",
   "formula": "shares at start + new shares × (months outstanding / 12)"
  },
  {
   "id": "fsa-f1",
   "m": 2,
   "g": "eps",
   "name": "Basic EPS",
   "formula": "(net income − preferred dividends) / WASO"
  },
  {
   "id": "fsa-f3",
   "m": 2,
   "g": "eps",
   "name": "After-tax interest on convertible debt",
   "formula": "face value × coupon rate × (1 − tax rate)"
  },
  {
   "id": "fsa-f2",
   "m": 2,
   "g": "eps",
   "name": "Diluted EPS",
   "formula": "(net income − preferred dividends + after-tax interest on convertible debt) / (WASO + shares from conversion)"
  },
  {
   "id": "fsa-f5",
   "m": 2,
   "g": "rev",
   "name": "Revenue to date (input method)",
   "formula": "(cumulative costs incurred / current total estimated cost) × contract price"
  },
  {
   "id": "fsa-f6",
   "m": 2,
   "g": "rev",
   "name": "This year's contract revenue",
   "formula": "revenue to date − revenue recognized in prior years"
  },
  {
   "id": "fsa-f7",
   "m": 3,
   "g": "re",
   "name": "Ending retained earnings",
   "formula": "beginning RE + net income − dividends declared"
  },
  {
   "id": "fsa-f8",
   "m": 3,
   "g": "re",
   "name": "Goodwill",
   "formula": "purchase price − fair value of identifiable net assets"
  },
  {
   "id": "fsa-f9",
   "m": 3,
   "g": "liq",
   "name": "Current ratio",
   "formula": "current assets / current liabilities"
  },
  {
   "id": "fsa-f10",
   "m": 3,
   "g": "liq",
   "name": "Quick ratio",
   "formula": "(cash + short-term investments + receivables) / current liabilities"
  },
  {
   "id": "fsa-f14",
   "m": 3,
   "g": "liq",
   "name": "Financial leverage",
   "formula": "total assets / total equity"
  },
  {
   "id": "fsa-f16",
   "m": 4,
   "g": "cash",
   "name": "Purchases",
   "formula": "COGS + ending inventory − beginning inventory"
  },
  {
   "id": "fsa-f17",
   "m": 4,
   "g": "cash",
   "name": "Cash paid to suppliers",
   "formula": "purchases − increase in accounts payable"
  },
  {
   "id": "fsa-f20",
   "m": 5,
   "g": "fcf",
   "name": "FCFF",
   "formula": "net income + non-cash charges + interest × (1 − tax rate) − fixed capital investment − working capital investment"
  },
  {
   "id": "fsa-f49",
   "m": 6,
   "g": "act",
   "name": "Inventory turnover",
   "formula": "COGS / average inventory"
  },
  {
   "id": "fsa-f50",
   "m": 6,
   "g": "act",
   "name": "Days of inventory on hand (DOH)",
   "formula": "365 / inventory turnover"
  },
  {
   "id": "fsa-f56",
   "m": 6,
   "g": "act",
   "name": "Cash conversion cycle",
   "formula": "days of inventory + days of receivables − days of payables"
  },
  {
   "id": "fsa-f73",
   "m": 7,
   "g": "imp",
   "name": "Recoverable amount",
   "formula": "max(fair value − costs to sell, value in use)"
  },
  {
   "id": "fsa-f39",
   "m": 7,
   "g": "imp",
   "name": "IFRS impairment loss",
   "formula": "carrying amount − recoverable amount"
  },
  {
   "id": "fsa-f45",
   "m": 9,
   "g": "tax",
   "name": "Deferred tax",
   "formula": "(carrying amount − tax base) × tax rate (for an asset, positive = DTL, negative = DTA)"
  },
  {
   "id": "fsa-f62",
   "m": 11,
   "g": "prof",
   "name": "ROA",
   "formula": "net income / average total assets"
  },
  {
   "id": "fsa-f63",
   "m": 11,
   "g": "prof",
   "name": "ROE",
   "formula": "net income / average total equity"
  },
  {
   "id": "fsa-f74",
   "m": 11,
   "g": "prof",
   "name": "Net profit margin",
   "formula": "net income / revenue"
  },
  {
   "id": "fsa-f55",
   "m": 11,
   "g": "prof",
   "name": "Total asset turnover",
   "formula": "revenue / average total assets"
  },
  {
   "id": "fsa-f75",
   "m": 11,
   "g": "prof",
   "name": "Financial leverage (DuPont)",
   "formula": "average total assets / average total equity"
  },
  {
   "id": "fsa-f65",
   "m": 11,
   "g": "dup",
   "name": "3-part DuPont",
   "formula": "ROE = net profit margin × total asset turnover × financial leverage"
  },
  {
   "id": "fsa-f66",
   "m": 11,
   "g": "dup",
   "name": "ROE from ROA",
   "formula": "ROE = ROA × financial leverage"
  },
  {
   "id": "fsa-f67",
   "m": 11,
   "g": "dup",
   "name": "5-part DuPont",
   "formula": "ROE = (NI / EBT) × (EBT / EBIT) × (EBIT / revenue) × (revenue / average assets) × (average assets / average equity)"
  },
  {
   "id": "fsa-f48",
   "m": 11,
   "g": "act11",
   "name": "Days of sales outstanding (DSO)",
   "formula": "average receivables / (revenue / 365)"
  },
  {
   "id": "fsa-f76",
   "m": 11,
   "g": "act11",
   "name": "Total debt ratio",
   "formula": "total debt / total assets"
  },
  {
   "id": "fsa-f68",
   "m": 11,
   "g": "grow",
   "name": "Retention rate (b)",
   "formula": "1 − dividend payout ratio"
  },
  {
   "id": "fsa-f69",
   "m": 11,
   "g": "grow",
   "name": "Sustainable growth (g)",
   "formula": "retention rate × ROE"
  },
  {
   "id": "fsa-f70",
   "m": 12,
   "g": "m12",
   "name": "Forecast line item",
   "formula": "forecast revenue × that item's historical % of revenue"
  },
  {
   "id": "fsa-f71",
   "m": 12,
   "g": "m12",
   "name": "Pro forma CFO",
   "formula": "net income + depreciation − increase in net working capital"
  }
 ],
 "traps": [
  {
   "m": 1,
   "text": "Who requires the SOX internal control report: the SEC. FASB is the tempting wrong answer because it sounds like the US accounting authority, but it only writes standards."
  },
  {
   "m": 1,
   "text": "\"Certain exceptions to the accounting principles\" points to qualified, not adverse. Adverse means the statements as a whole are unreliable."
  },
  {
   "m": 2,
   "text": "Reporting a diluted EPS that is above basic. In the official mock, basic was $1.60 and the if-converted figure $1.61, so the answer is $1.60."
  },
  {
   "m": 2,
   "text": "Subtracting the interest instead of adding it back, or adding the interest before tax."
  },
  {
   "m": 2,
   "text": "Using year-end share count instead of WASO, or forgetting to time-weight a mid-year issue."
  },
  {
   "m": 2,
   "text": "Applying this year's percentage to the full contract instead of using the cumulative percentage and subtracting prior revenue."
  },
  {
   "m": 2,
   "text": "\"Both policy and estimate changes are applied retrospectively\" is false. Only policy changes are."
  },
  {
   "m": 2,
   "text": "Recognizing revenue when the cash arrives. Cash in advance is a liability."
  },
  {
   "m": 3,
   "text": "In the retained earnings question, adding dividends instead of subtracting them gives 100; ignoring them gives 500. The answer is 900."
  },
  {
   "m": 3,
   "text": "Recording goodwill as a gain in P&L or OCI. It's an asset."
  },
  {
   "m": 3,
   "text": "\"Include goodwill impairment losses on the income statement\" is the wrong analyst adjustment. Analysts exclude them."
  },
  {
   "m": 3,
   "text": "A higher current ratio than peers does not mean better liquidity if the quick ratio is far lower. Meldrum's balance sheet had a current ratio of 1.99 but a quick ratio of 0.13: almost all inventory."
  },
  {
   "m": 3,
   "text": "A financial leverage ratio above the industry average means a riskier, not safer, capital structure."
  },
  {
   "m": 4,
   "text": "In the cash-to-suppliers question, adding the inventory decrease (950) or adding both the inventory decrease and the payables increase (1,150). The answer is 800 − 250 − 100 = 450."
  },
  {
   "m": 4,
   "text": "Picking \"inventory decreased\" to explain a CFO collapse. A falling inventory would push CFO up."
  },
  {
   "m": 4,
   "text": "\"Investing activity under both US GAAP and IFRS\" for taxes on an investment sale. US GAAP keeps all taxes in operating."
  },
  {
   "m": 5,
   "text": "Adding back pre-tax interest (that gives 80.50 in the Meldrum question). The add-back is 22.5 × 0.8 = 18, so FCFF = 110 + 24 + 18 − 48 − 28 = 76.0."
  },
  {
   "m": 5,
   "text": "Revenue (500) is a distractor in the question. FCFF starts from net income."
  },
  {
   "m": 6,
   "text": "Weighted average vs FIFO in rising prices: weighted average has a lower gross margin and higher turnover, so a shorter cash conversion cycle. \"Higher gross margin than FIFO\" is the trap."
  },
  {
   "m": 6,
   "text": "LIFO vs weighted average: LIFO has a higher debt-to-assets ratio (smaller asset base). \"Lower debt-to-assets\" is the trap."
  },
  {
   "m": 6,
   "text": "\"Both IFRS and US GAAP allow write-down reversals\" is false. US GAAP doesn't."
  },
  {
   "m": 6,
   "text": "After a write-down, only activity ratios improve. Liquidity and solvency get worse."
  },
  {
   "m": 6,
   "text": "When a LIFO company's units drop sharply and then get replaced, the missing disclosure is the LIFO liquidation. There is nothing to disclose about write-down reversals under US GAAP."
  },
  {
   "m": 7,
   "text": "\"Cost model only\" is the US GAAP answer. The IFRS answer is cost or revaluation."
  },
  {
   "m": 7,
   "text": "In the impairment question: ignoring costs to sell gives 2 (50 − 48); taking the lower of the two amounts gives 5 (50 − 45). The answer is 50 − max(45, 46) = 4."
  },
  {
   "m": 7,
   "text": "Classifying a spin-off as held for sale, or stopping depreciation."
  },
  {
   "m": 7,
   "text": "To minimize goodwill, revise useful life and salvage value upward, not downward."
  },
  {
   "m": 7,
   "text": "The company that expenses all R&D has lower EBITDA, so it trades at the higher EBITDA multiple."
  },
  {
   "m": 8,
   "text": "Under IFRS, service cost and net interest go to P&L; only remeasurements go to OCI."
  },
  {
   "m": 8,
   "text": "An actuarial loss from longer life expectancy belongs in OCI, not operating expenses."
  },
  {
   "m": 8,
   "text": "A plan amendment that helps employees is a past service cost reported in P&L under IFRS. That statement is correct, not the \"least accurate\" one."
  },
  {
   "m": 8,
   "text": "\"Leases are costly and need large down payments\" and \"leases are more restrictive\" are both false."
  },
  {
   "m": 9,
   "text": "\"The tax base of equipment is greater than its carrying value\" creates a DTA, not a DTL."
  },
  {
   "m": 9,
   "text": "\"Tax authorities do not allow an expense item\" is a permanent difference, so no DTL or DTA."
  },
  {
   "m": 9,
   "text": "An asset expensed at once for tax but capitalized for the books creates a DTL, not a DTA or a valuation allowance."
  },
  {
   "m": 9,
   "text": "Non-deductible key person insurance premiums create neither a DTA nor a DTL."
  },
  {
   "m": 9,
   "text": "The revaluation question: 8.5m − 5.8m = 2.7m × 30% = 0.81m DTA, not a DTL and not a direct charge to equity."
  },
  {
   "m": 10,
   "text": "\"Decrease reported performance now, may increase it later\" is conservative, not aggressive and not \"unsustainable.\""
  },
  {
   "m": 10,
   "text": "The most conservative revenue approach is recognizing only on completion, not recognizing in proportion to costs."
  },
  {
   "m": 11,
   "text": "Financial leverage from assets 600, liabilities 120, equity 480, debt 60 is 600 / 480 = 1.25. Liabilities / equity (0.25) and debt / assets (0.10) are the traps."
  },
  {
   "m": 11,
   "text": "Back-solving from margin 4%, ROA 8%, ROE 16%, revenue 2.5m: NI = 100,000; equity = 100,000 / 16% = 625,000; assets = 1,250,000; turnover = 2; leverage = 2. \"Turnover is 4\" and \"leverage is 4\" are traps."
  },
  {
   "m": 11,
   "text": "A lower tax rate and a lower DSO both raise ROE. Only lower leverage lowers it."
  },
  {
   "m": 11,
   "text": "Sustainable growth uses retention (0.45), not payout (0.55), and the answer is g (5.88%), not ROE (13.06%)."
  },
  {
   "m": 11,
   "text": "Purchases = COGS + ending − beginning inventory. Flipping the signs is the trap."
  },
  {
   "m": 11,
   "text": "\"Higher debt-based leverage ratios mean stronger solvency\" is false."
  },
  {
   "m": 12,
   "text": "\"Volume only\" or \"price/mix only\" for organic growth. It's both."
  },
  {
   "m": 12,
   "text": "In the AZ Manufacturing question, NWC goes from 20 to 24 (20% of 120), so subtract 4. Subtracting the full 24 gives 4.8; adding it gives 28.8. The answer is 16.8 + 12.0 − 4 = 24.8."
  }
 ],
 "questions": [
  {
   "id": "fsa-q1",
   "m": 1,
   "src": "Official Q36",
   "q": "Which of the following requires management to report on the effectiveness of the company's internal control over financial reporting in accordance with the Sarbanes–Oxley Act?",
   "table": [],
   "o": [
    "Securities and Exchange Commission",
    "Financial Accounting Standards Board",
    "International Accounting Standards Board"
   ],
   "a": 0,
   "why": "The SEC carries out SOX and requires management's internal control report. FASB only writes US GAAP."
  },
  {
   "id": "fsa-q2",
   "m": 1,
   "src": "Meldrum Q76",
   "q": "While conducting an audit, the auditor observes that certain exceptions to the accounting principles have been made in the preparation of financial statements. Upon completion of the audit, the auditor's most appropriate opinion is a(n):",
   "table": [],
   "o": [
    "adverse opinion.",
    "qualified opinion.",
    "unqualified opinion."
   ],
   "a": 1,
   "why": "Exceptions to accounting principles call for a qualified opinion. Adverse means not fairly presented overall."
  },
  {
   "id": "fsa-q3",
   "m": 2,
   "src": "Official Q28",
   "q": "A company receives a subscription payment for a publication to be delivered next fiscal year. Ignoring income taxes, the company would recognize in the current fiscal year an increase in:",
   "table": [],
   "o": [
    "assets and revenue.",
    "assets and liabilities.",
    "liabilities and revenue."
   ],
   "a": 1,
   "why": "Cash (asset) and unearned revenue (liability) rise. No revenue until delivery."
  },
  {
   "id": "fsa-q4",
   "m": 2,
   "src": "Official Q44",
   "q": "Unless it is impractical to do so, which of the following is reported through retrospective application?",
   "table": [],
   "o": [
    "Changes in accounting policies only",
    "Changes in accounting estimates only",
    "Both changes in accounting policies and accounting estimates"
   ],
   "a": 0,
   "why": "Policy changes are retrospective. Estimate changes are prospective."
  },
  {
   "id": "fsa-q5",
   "m": 2,
   "src": "Official Q54",
   "q": "Selected year-end financial data for a company is as follows:\n\nGiven this information, the diluted EPS of the company is closest to:",
   "table": [
    [
     "Item",
     "Value"
    ],
    [
     "Net income",
     "$200,000"
    ],
    [
     "Tax rate",
     "15%"
    ],
    [
     "Weighted average number of common shares outstanding",
     "125,000"
    ],
    [
     "12% bond convertible into 3,000 common shares (potentially dilutive)",
     "$60,000"
    ]
   ],
   "o": [
    "$1.51.",
    "$1.60.",
    "$1.61."
   ],
   "a": 1,
   "why": "Basic = 200,000 / 125,000 = 1.60. If-converted = (200,000 + 6,120) / 128,000 = 1.61, above basic, so the bond is antidilutive. Report 1.60."
  },
  {
   "id": "fsa-q6",
   "m": 2,
   "src": "Meldrum Q38",
   "q": "An analyst gathered the following information regarding a company for one fiscal year:\n\nThe company's tax rate is 30%. If each bond is convertible to 150 shares of common stock, the company's diluted EPS for the year should be closest to:",
   "table": [
    [
     "Item",
     "Value"
    ],
    [
     "Net Income (in CAD)",
     "1,475,000"
    ],
    [
     "Dividends Paid to Preferred Shareholders (in CAD)",
     "160,000"
    ],
    [
     "Shares of Common Stock Outstanding at 1 January",
     "925,000"
    ],
    [
     "New Shares of Common Stock Issued on 1 July",
     "105,000"
    ],
    [
     "Non-Convertible Preferred Stock",
     "110,000"
    ],
    [
     "CAD 1,000 par, 6% Convertible Bonds Outstanding",
     "750"
    ]
   ],
   "o": [
    "CAD 1.24",
    "CAD 1.34",
    "CAD 1.38"
   ],
   "a": 0,
   "why": "WASO = 925,000 + 105,000 × 6/12 = 977,500. (1,475,000 − 160,000 + 31,500) / (977,500 + 112,500) = 1.235."
  },
  {
   "id": "fsa-q7",
   "m": 2,
   "src": "Meldrum Q58",
   "q": "Ace Construction was selected by the city of Londrina to build a pedestrian bridge over a busy intersection in the city center. Ace signed a $3 million contract with the city to be paid in three equal installments over the next three years. Ace plans to complete the project at the end of the third year and estimates a total cost of $2.2 million for the entire project. During the first year, Ace incurred $700,000 in costs. At the start of year 2, Ace revised its total cost estimate to $2.5 million. In year 2, Ace incurred $900,000 in costs. Under progress towards completion and using the input method of costs incurred relative to estimated total costs, what is the revenue that Ace should recognize in year 2?",
   "table": [],
   "o": [
    "$954,545",
    "$965,455",
    "$1,000,000"
   ],
   "a": 1,
   "why": "Year 1: 700/2,200 × 3.0m = 954,545. Cumulative: 1,600/2,500 = 64% × 3.0m = 1,920,000. Year 2 = 965,455."
  },
  {
   "id": "fsa-q8",
   "m": 3,
   "src": "Official Q42",
   "q": "An analyst gathers the following information (in € thousands) about a company:\n\nIf there are no other items affecting shareholders' equity, net income (in € thousands) is:",
   "table": [
    [
     "Item",
     "Value"
    ],
    [
     "Beginning retained earnings",
     "1,500"
    ],
    [
     "Ending retained earnings",
     "2,000"
    ],
    [
     "Dividends declared and paid",
     "400"
    ]
   ],
   "o": [
    "100.",
    "500.",
    "900."
   ],
   "a": 2,
   "why": "2,000 = 1,500 + NI − 400, so NI = 900."
  },
  {
   "id": "fsa-q9",
   "m": 3,
   "src": "Official Q72",
   "q": "Under the acquisition method, if the purchase price of an acquired company exceeds the sum of the fair value amounts that can be allocated to individual identifiable assets and liabilities, the acquiring company should record the excess as:",
   "table": [],
   "o": [
    "goodwill.",
    "a gain reflected in profit and loss.",
    "a gain reflected in other comprehensive income."
   ],
   "a": 0,
   "why": "The excess of price over fair value of identifiable net assets is goodwill, an asset."
  },
  {
   "id": "fsa-q10",
   "m": 3,
   "src": "Meldrum Q45",
   "q": "Outer Limits Sporting Goods' (OLSG's) 2018 balance sheet is (USD thousands):\n\nIn OLSG's industry, the average current ratio is 1.65, the average quick ratio is 0.57 and the average financial leverage ratio is 1.73, all using similar accounting methods to OLSG's. Compared to the industry average, OLSG most likely:",
   "table": [
    [
     "Assets",
     "",
     "Liabilities and equity",
     ""
    ],
    [
     "Cash",
     "270,000",
     "Accounts payable",
     "7,600,000"
    ],
    [
     "Short-term investments",
     "380,000",
     "Accrued expenses",
     "6,400,000"
    ],
    [
     "Accounts receivable",
     "1,300,000",
     "Taxes payable",
     "1,065,000"
    ],
    [
     "Inventory",
     "28,100,000",
     "Bonds payable",
     "6,100,000"
    ],
    [
     "Prepaid expenses",
     "850,000",
     "Mortgage payable",
     "2,900,000"
    ],
    [
     "Long-term investments",
     "620,000",
     "Total liabilities",
     "24,065,000"
    ],
    [
     "Land",
     "220,000",
     "Common stock",
     "3,650,000"
    ],
    [
     "PP&E, gross",
     "8,850,000",
     "Retained earnings",
     "11,675,000"
    ],
    [
     "Less: accumulated depreciation",
     "−1,550,000",
     "Total equity",
     "15,325,000"
    ],
    [
     "PP&E, net",
     "7,300,000",
     "",
     ""
    ],
    [
     "Intangibles",
     "350,000",
     "",
     ""
    ],
    [
     "Total assets",
     "39,390,000",
     "Total liabilities + equity",
     "39,390,000"
    ]
   ],
   "o": [
    "has a less risky capital structure.",
    "has less inventory compared to its current liabilities.",
    "faces a greater liquidity problem if sales decline markedly."
   ],
   "a": 2,
   "why": "Current 1.99 vs 1.65 but quick 0.13 vs 0.57: almost all current assets are inventory, so a sales slump leaves little liquidity. Leverage 2.57 vs 1.73 is riskier, ruling out A."
  },
  {
   "id": "fsa-q11",
   "m": 3,
   "src": "Meldrum Q81",
   "q": "Nacho Odriozola is trying to make sense of the way that asset values are determined for balance sheets. He looks at available-for-sale securities, patents, and inventory (which uses a LIFO cost estimation method). He considers three schemes for determining their values under US GAAP:\n\nThe approach that Odriozola should use is most likely:",
   "table": [
    [
     "",
     "Available-for-sale securities",
     "Patents",
     "Inventory"
    ],
    [
     "Scheme 1",
     "Amortized cost",
     "Historical cost",
     "Lower of cost or market"
    ],
    [
     "Scheme 2",
     "Fair value",
     "Amortized cost",
     "Lower of cost or market"
    ],
    [
     "Scheme 3",
     "Fair value",
     "Historical cost",
     "Historical cost"
    ]
   ],
   "o": [
    "Scheme 1.",
    "Scheme 2.",
    "Scheme 3."
   ],
   "a": 1,
   "why": "US GAAP: AFS at fair value, finite-life patents at amortized cost, LIFO inventory at lower of cost or market."
  },
  {
   "id": "fsa-q12",
   "m": 3,
   "src": "Meldrum Q82",
   "q": "Shane Mathews is a financial analyst at Stonebridge Capital. He is analyzing EZ Net, a payments processing firm that has grown significantly over the last few years, primarily through acquisitions. Each acquisition created goodwill and EZ Net reports the aggregate amount of goodwill on its balance sheet. EZ Net also provides a footnote disclosure that shows the calculation of its goodwill and if any impairments have been taken. So far, EZ Net has partially impaired the goodwill associated with one of its recent acquisitions. Shane is trying to compare EZ Net to other payments processing firms using financial ratio analysis. However, Shane is concerned about the impact of goodwill on EZ Net's financial statements and how this will impact its comparability. Which of the following statements least accurately describes adjustments Shane should make to EZ Net's financial statements when comparing EZ Net to other firms in the industry?",
   "table": [],
   "o": [
    "Exclude goodwill from the assets section of EZ Net's balance sheet.",
    "Include goodwill impairment losses on EZ Net's income statement.",
    "Exclude the value of goodwill from the shareholders' equity section of EZ Net's balance sheet."
   ],
   "a": 1,
   "why": "Analysts remove goodwill from assets and equity and exclude impairment losses from the income statement. Including them is the wrong adjustment."
  },
  {
   "id": "fsa-q13",
   "m": 4,
   "src": "Official Q62",
   "q": "The following information is available about a company ($ millions):\n\nDuring Year 2, the company most likely experienced a significant decrease in:",
   "table": [
    [
     "Year ended 31 December",
     "Year 2",
     "Year 1"
    ],
    [
     "Sales",
     "322.8",
     "320.1"
    ],
    [
     "Net income",
     "27.2",
     "26.8"
    ],
    [
     "Cash flow from operations",
     "15.3",
     "38.1"
    ]
   ],
   "o": [
    "inventory.",
    "the proportion of sales made on a cash basis.",
    "the proportion of interest-bearing debt relative to trade accounts payable."
   ],
   "a": 1,
   "why": "Same sales and NI, CFO down sharply: more credit sales, receivables up. Lower inventory or higher payables would raise CFO."
  },
  {
   "id": "fsa-q14",
   "m": 4,
   "src": "Official Q68",
   "q": "An analyst gathers the following information (in € millions) about a company:\n\nCash paid to suppliers (in € millions) is:",
   "table": [
    [
     "Item",
     "Value"
    ],
    [
     "Cost of sales",
     "800"
    ],
    [
     "Decrease in inventory",
     "250"
    ],
    [
     "Increase in accounts payable",
     "100"
    ]
   ],
   "o": [
    "450.",
    "950.",
    "1,150."
   ],
   "a": 0,
   "why": "Purchases = 800 − 250 = 550. Cash paid = 550 − 100 = 450."
  },
  {
   "id": "fsa-q15",
   "m": 4,
   "src": "Meldrum Q84",
   "q": "A company sold real estate held for investment for USD 65 million and paid taxes on the sale of USD 13 million. On the cash flow statement, the most appropriate classification of the taxes paid is as an:",
   "table": [],
   "o": [
    "investing activity under both US GAAP and IFRS.",
    "operating activity under both US GAAP and IFRS.",
    "operating activity under US GAAP and as an investing activity under IFRS."
   ],
   "a": 2,
   "why": "US GAAP puts all taxes in operating. IFRS can classify tax tied to an investing transaction as investing."
  },
  {
   "id": "fsa-q16",
   "m": 5,
   "src": "Meldrum Q48",
   "q": "A firm reported earnings of AUD 110 million on revenues of AUD 500 million. The working capital of the company increased by AUD 28 million during the year, net capital expenditure was AUD 48 million and depreciation charge was AUD 24 million. The company's interest expense was AUD 22.5 million. Given a marginal tax rate of 20%, the firm's FCFF (in AUD millions) is closest to:",
   "table": [],
   "o": [
    "76.00",
    "78.75",
    "80.50"
   ],
   "a": 0,
   "why": "110 + 24 + 22.5 × 0.8 − 48 − 28 = 76.0."
  },
  {
   "id": "fsa-q17",
   "m": 6,
   "src": "Official Q45",
   "q": "Which of the following statements regarding inventory valuation is most accurate?",
   "table": [],
   "o": [
    "IFRS defines market value as net realizable value less a normal profit margin.",
    "Both IFRS and US GAAP allow the reversal of write-downs back to the original cost.",
    "Both IFRS and US GAAP allow agricultural inventories to be valued at net realizable value."
   ],
   "a": 2,
   "why": "Both allow agricultural inventory at NRV. US GAAP bans write-down reversals; NRV is selling price less costs to complete and sell."
  },
  {
   "id": "fsa-q18",
   "m": 6,
   "src": "Official Q66",
   "q": "Which of the following types of financial ratios is most likely to be positively affected by an inventory write-down compared to if the write-down had not occurred?",
   "table": [],
   "o": [
    "Activity ratios",
    "Liquidity ratios",
    "Solvency ratios"
   ],
   "a": 0,
   "why": "A smaller inventory denominator raises turnover. Liquidity and solvency ratios get worse."
  },
  {
   "id": "fsa-q19",
   "m": 6,
   "src": "Official Q84",
   "q": "All else being equal, during periods of rising prices and constant inventory quantities, a company using the weighted average cost inventory valuation method most likely reports a:",
   "table": [],
   "o": [
    "higher gross profit margin than if using FIFO.",
    "lower inventory turnover ratio than if using FIFO.",
    "shorter cash conversion cycle than if using FIFO."
   ],
   "a": 2,
   "why": "Weighted average has higher COGS and lower inventory than FIFO, so higher turnover, lower DOH and a shorter cash conversion cycle."
  },
  {
   "id": "fsa-q20",
   "m": 6,
   "src": "Meldrum Q39",
   "q": "In a period of increasing inventory costs and increasing inventory levels, compared to using weighted average cost, the most likely result of using LIFO will be a:",
   "table": [],
   "o": [
    "lower current ratio.",
    "lower debt-to-assets ratio.",
    "lower working capital turnover."
   ],
   "a": 0,
   "why": "LIFO gives lower inventory, so lower current assets and current ratio. Debt-to-assets is higher and working capital turnover is higher."
  },
  {
   "id": "fsa-q21",
   "m": 6,
   "src": "Meldrum Q43",
   "q": "Bassett Hydraulics (BH) prepares its financial statements according to US GAAP. BH has had inventory levels that have increased every year for this last 10 years, except in 2018, in which the number of units in its ending inventory fell to 25% of the number in 2017; BH replaced those units in early 2019. In its financial statements, BH has these disclosures concerning inventory:\n- The inventory costing method used is periodic LIFO\n- The value of the inventory on 12/31/18 was USD 215,107,665\n- The value of the LIFO reserve on 12/31/18 was USD 35,229,021\n- No inventory was carried at fair value less costs to sell in 2018\n- 2018 COGS was USD 832,904,117\n- No inventory was written down in 2018\n- No inventory was pledged as collateral for any liabilities in 2018\n\nBH's inventory disclosures are most likely:",
   "table": [],
   "o": [
    "adequate.",
    "inadequate because they do not mention LIFO liquidation.",
    "inadequate because they do not mention reversal of prior years' inventory write-downs."
   ],
   "a": 1,
   "why": "Units fell 75% then were replaced: a LIFO liquidation, which US GAAP requires to be disclosed. US GAAP has no reversals to disclose."
  },
  {
   "id": "fsa-q22",
   "m": 7,
   "src": "Official Q30",
   "q": "Intangible assets are reported using the:",
   "table": [],
   "o": [
    "cost model only.",
    "cost model or fair value model.",
    "cost model or revaluation model."
   ],
   "a": 2,
   "why": "IFRS allows cost or revaluation. \"Cost only\" is the US GAAP answer."
  },
  {
   "id": "fsa-q23",
   "m": 7,
   "src": "Official Q78",
   "q": "A company has announced that it is going to distribute a group of long-lived assets to its owners in a spin-off. The most appropriate way to account for the assets until the distribution occurs is to classify them as:",
   "table": [],
   "o": [
    "held for sale with no depreciation taken.",
    "held for use until disposal with no depreciation taken.",
    "held for use until disposal with depreciation continuing to be taken."
   ],
   "a": 2,
   "why": "Disposal other than by sale (spin-off) stays held for use and keeps being depreciated."
  },
  {
   "id": "fsa-q24",
   "m": 7,
   "src": "Official Q88",
   "q": "An analyst gathers the following information (in € thousands) about a machine:\n\nImpairment loss (in € thousands) is:",
   "table": [
    [
     "Item",
     "Value"
    ],
    [
     "Carrying amount prior to impairment",
     "50"
    ],
    [
     "Present value of expected future cash flows",
     "46"
    ],
    [
     "Fair value",
     "48"
    ],
    [
     "Costs to sell",
     "3"
    ]
   ],
   "o": [
    "2.",
    "4.",
    "5."
   ],
   "a": 1,
   "why": "Recoverable = max(48 − 3, 46) = 46. Loss = 50 − 46 = 4."
  },
  {
   "id": "fsa-q25",
   "m": 7,
   "src": "Meldrum Q57",
   "q": "Company ABC will be buying Company XYZ on December 31, 2020. It is currently November 1, 2020. Company ABC would like to record the lowest amount of Goodwill possible. Assessments of fair value are conducted by external consultants using an income model (discounted cash flow). In assessing the fair value of tangible and intangible assets, ABC will most likely prefer estimates of useful life and salvage value to be revised:",
   "table": [
    [
     "",
     "Useful life",
     "Salvage value"
    ],
    [
     "a.",
     "Upwards",
     "Upwards"
    ],
    [
     "b.",
     "Upwards",
     "Downwards"
    ],
    [
     "c.",
     "Downwards",
     "Downwards"
    ]
   ],
   "o": [
    "Upwards and Upwards",
    "Upwards and Downwards",
    "Downwards and Downwards"
   ],
   "a": 0,
   "why": "Longer life and higher salvage raise the DCF fair value of the assets acquired, shrinking goodwill."
  },
  {
   "id": "fsa-q26",
   "m": 7,
   "src": "Meldrum Q78",
   "q": "Two drug companies have the same gross margin. Company A expenses all R&D costs but Company B capitalizes development costs (and expenses research costs). Both companies have the same equity market cap (# shares × share price). Which company trades at a higher multiple of EBITDA if they both have the same P/S multiple?",
   "table": [],
   "o": [
    "Company A.",
    "Company B.",
    "Both will trade at the same EBITDA multiple."
   ],
   "a": 0,
   "why": "Expensing all R&D lowers EBITDA. Same market cap and lower EBITDA means a higher EBITDA multiple."
  },
  {
   "id": "fsa-q27",
   "m": 8,
   "src": "Official Q73",
   "q": "Under IFRS, which component of the change in the net pension asset or liability each period is recognized in other comprehensive income?",
   "table": [],
   "o": [
    "Employees' service costs",
    "Actuarial gains and losses and other remeasurements",
    "The net interest expense or income accrued on the beginning net pension plan asset or liability"
   ],
   "a": 1,
   "why": "Remeasurements go to OCI. Service cost and net interest go to P&L."
  },
  {
   "id": "fsa-q28",
   "m": 8,
   "src": "Meldrum Q35",
   "q": "Alan Monteiro works in the accounting department of Active Wear Online (AWO), an e-commerce retailer of active wear and related accessories. AWO is based in Australia and uses IFRS when preparing its financial statements. AWO has a defined benefit pension plan that allows employees vested in the plan to accrue benefits that they will receive during their retirement. Alan is organizing the financial reporting for AWO's defined benefit plan. During this process, Alan prepares the following statements that he will present to his supervisor.\n- Statement 1: AWO changed the formula used to calculate the benefit payments to future retirees. This change was favorable to the employees and resulted in a past service cost reported on the income statement.\n- Statement 2: The actual return on plan assets was greater than the expected return included in net interest income/expense. This difference resulted in a remeasurement gain taken to other comprehensive income.\n- Statement 3: AWO reported an actuarial loss for the most recent year due to an increase in the life expectancy of its ex-employees during retirement. This loss should be reported on the income statement as part of AWO's operating expenses.\n\nWhich of Alan's statements regarding the accounting treatment of a defined benefit pension plan under IFRS is the least accurate?",
   "table": [],
   "o": [
    "Statement 1",
    "Statement 2",
    "Statement 3"
   ],
   "a": 2,
   "why": "Actuarial losses are remeasurements and go to OCI, not operating expense. Statements 1 and 2 are correct."
  },
  {
   "id": "fsa-q29",
   "m": 8,
   "src": "Meldrum Q68",
   "q": "A credit analyst makes the following statements regarding leasing assets:\n- Statement 1: Leases provide costly financing; they usually require large down payments and often are at higher fixed interest rates.\n- Statement 2: The lease contract often contains more restrictive provisions than other forms of borrowing.\n\nConcerning these statements, it is most likely that:",
   "table": [],
   "o": [
    "both statements are accurate.",
    "both statements are inaccurate.",
    "Statement 1 is accurate and Statement 2 is inaccurate."
   ],
   "a": 1,
   "why": "Leases often provide cheaper financing with little down payment and less restrictive terms. Both statements are false."
  },
  {
   "id": "fsa-q30",
   "m": 9,
   "src": "Official Q51",
   "q": "Deferred tax liabilities could arise when:",
   "table": [],
   "o": [
    "accounting profit is greater than taxable income.",
    "the tax base of equipment is greater than its carrying value.",
    "tax authorities do not allow an expense item for tax purposes."
   ],
   "a": 0,
   "why": "Accounting profit above taxable income means less tax now, more later: a DTL. B creates a DTA; C is permanent."
  },
  {
   "id": "fsa-q31",
   "m": 9,
   "src": "Meldrum Q50",
   "q": "A company operates in a tax regime that requires an intangible asset to be expensed in a single year, but the accounting standards require it to be capitalized and amortized over a period of 5 years. In the first year, the company will most likely record a:",
   "table": [],
   "o": [
    "deferred tax asset.",
    "deferred tax liability.",
    "valuation allowance."
   ],
   "a": 1,
   "why": "Tax base zero, carrying amount positive: a temporary difference creating a DTL."
  },
  {
   "id": "fsa-q32",
   "m": 9,
   "src": "Meldrum Q63",
   "q": "Solfan Industries pays for key person life insurance for its chief executive, financial, and operating officers (CEO, CFO, and COO, respectively). The premia for these life insurance policies are not deductible for income tax purposes, but, should one of the covered individuals pass away, the proceeds from the policy would not be taxable. Solfan deducts the premia on its income statement (as part of SG&A). This difference in treatment will most likely create:",
   "table": [],
   "o": [
    "a deferred tax asset.",
    "a deferred tax liability.",
    "neither a deferred tax asset or a deferred tax liability."
   ],
   "a": 2,
   "why": "Non-deductible premiums are a permanent difference. No deferred tax."
  },
  {
   "id": "fsa-q33",
   "m": 9,
   "src": "Meldrum Q66",
   "q": "On 2 January 2015, PK Automotive purchases machinery valued at EUR 12.5 million. The machinery has a ten-year life with a salvage value of EUR 2.5 million, and PK uses straight-line depreciation for both financial reporting and taxes. On 31 December 2018, the carrying value of the machinery is EUR 8.5 million, but the fair value of the machinery has decreased to EUR 5.8 million. PK has chosen to use the revaluation model on this machinery, and their marginal tax rate is 30%. In addition to recording the revaluation, PK will most likely also record a:",
   "table": [],
   "o": [
    "deferred tax asset of EUR 810,000.",
    "deferred tax liability of EUR 810,000.",
    "direct-to-equity charge (debit) of EUR 810,000."
   ],
   "a": 0,
   "why": "Carrying amount falls 2.7m below the tax base. 2.7m × 30% = 0.81m DTA, matching the P&L treatment of the decrease."
  },
  {
   "id": "fsa-q34",
   "m": 10,
   "src": "Official Q47",
   "q": "Accounting choices within US GAAP that decrease reported performance in the current period and may increase performance in later periods are most likely examples of:",
   "table": [],
   "o": [
    "aggressive accounting.",
    "conservative accounting.",
    "earnings that are not sustainable."
   ],
   "a": 1,
   "why": "Lower now, possibly higher later is conservative. It does not by itself create unsustainable earnings."
  },
  {
   "id": "fsa-q35",
   "m": 10,
   "src": "Meldrum Q74",
   "q": "Modena Engineering (ME) has a contract to build a bridge in Verona, Italy. ME anticipates that the project will fall into three of its fiscal years. ME is considering three approaches for recognizing the revenue for this project:\n- Approach 1: Recognize the full revenue at the inception of the contract.\n- Approach 2: Recognize the revenue only upon completion of the bridge.\n- Approach 3: Recognize the revenue in proportion to the costs that it incurs.\n\nOf the three approaches that ME could choose, the most conservative is:",
   "table": [],
   "o": [
    "Approach 1.",
    "Approach 2.",
    "Approach 3."
   ],
   "a": 1,
   "why": "Recognizing revenue only at completion gives the lowest current income."
  },
  {
   "id": "fsa-q36",
   "m": 11,
   "src": "Official Q38",
   "q": "A company's purchases can be estimated as cost of sales plus:",
   "table": [],
   "o": [
    "ending inventory less beginning inventory.",
    "beginning inventory less ending inventory.",
    "the average level of inventory for the period."
   ],
   "a": 0,
   "why": "Purchases = COGS + ending inventory − beginning inventory."
  },
  {
   "id": "fsa-q37",
   "m": 11,
   "src": "Official Q48",
   "q": "All else being equal, a decrease in which of the following financial metrics would most likely result in a lower return on equity (ROE)?",
   "table": [],
   "o": [
    "Leverage",
    "The tax rate",
    "Days of sales outstanding"
   ],
   "a": 0,
   "why": "Leverage is a DuPont factor, so lower leverage lowers ROE. A lower tax rate or lower DSO raises ROE."
  },
  {
   "id": "fsa-q38",
   "m": 11,
   "src": "Official Q60",
   "q": "An analyst collects the following information about a company:\n\nThe company's:",
   "table": [
    [
     "Item",
     "Value"
    ],
    [
     "Net profit margin",
     "4%"
    ],
    [
     "Return on average assets",
     "8%"
    ],
    [
     "Return on average equity",
     "16%"
    ],
    [
     "Revenue",
     "€2,500,000"
    ]
   ],
   "o": [
    "total asset turnover is 4.",
    "financial leverage ratio is 4.",
    "average shareholders' equity is €625,000."
   ],
   "a": 2,
   "why": "NI = 2.5m × 4% = 100,000. Equity = 100,000 / 16% = 625,000. Turnover = 2, leverage = 2."
  },
  {
   "id": "fsa-q39",
   "m": 11,
   "src": "Official Q89",
   "q": "An analyst gathers the following information (in £ millions) about a company:\n\nBased only on this information, the financial leverage ratio is:",
   "table": [
    [
     "Item",
     "Value"
    ],
    [
     "Total assets",
     "600"
    ],
    [
     "Total liabilities",
     "120"
    ],
    [
     "Total equity",
     "480"
    ],
    [
     "Total debt",
     "60"
    ]
   ],
   "o": [
    "0.10.",
    "0.25.",
    "1.25."
   ],
   "a": 2,
   "why": "Financial leverage = assets / equity = 600 / 480 = 1.25."
  },
  {
   "id": "fsa-q40",
   "m": 11,
   "src": "Meldrum Q67",
   "q": "An analyst gathers the following data for a company:\n\nBased on this information, if the company's average tax rate is 35%, the company's sustainable growth rate is closest to:",
   "table": [
    [
     "Item",
     "Value"
    ],
    [
     "Operating margin",
     "9%"
    ],
    [
     "Asset turnover",
     "1.60"
    ],
    [
     "Interest burden",
     "0.90"
    ],
    [
     "Current ratio",
     "1.38"
    ],
    [
     "Financial leverage",
     "1.55"
    ],
    [
     "Dividend payout ratio",
     "0.55"
    ]
   ],
   "o": [
    "5.88%.",
    "7.18%.",
    "13.06%."
   ],
   "a": 0,
   "why": "ROE = 0.65 × 0.90 × 0.09 × 1.60 × 1.55 = 13.06%. g = 0.45 × 13.06% = 5.88%."
  },
  {
   "id": "fsa-q41",
   "m": 11,
   "src": "Meldrum Q72",
   "q": "Consider the following two statements:\n- Statement 1: The higher the leverage ratios with Total Debt in the numerator, the stronger the company's solvency.\n- Statement 2: Leverage ratios focus on the balance sheet while coverage ratios focus on the income statement and cash flow statement.\n\nWhich statement(s) is/are correct?",
   "table": [],
   "o": [
    "Statement 1 only.",
    "Statement 2 only.",
    "Neither Statement 1 nor Statement 2 are correct."
   ],
   "a": 1,
   "why": "Higher debt-based leverage means weaker solvency, so Statement 1 is false. Statement 2 is true."
  },
  {
   "id": "fsa-q42",
   "m": 12,
   "src": "Official Q50",
   "q": "Organic growth represents changes in revenue due to the impact of changes in:",
   "table": [],
   "o": [
    "volume only.",
    "price/mix only.",
    "both volume and price/mix."
   ],
   "a": 2,
   "why": "Organic growth is volume plus price/mix, shown separately from acquisitions, divestitures and FX."
  },
  {
   "id": "fsa-q43",
   "m": 12,
   "src": "Meldrum Q77",
   "q": "Kelly Williams is a financial analyst at Stonebridge Capital. She is building a financial statement model for AZ Manufacturing to project its financial performance for the next year. In the most recent year of 2023, AZ reported the following results (in millions of $):\n\nKelly projects that AZ will grow its revenue by 20% in 2024. She projects the same percentages of revenue in 2024 for each expense item, compared to the percentages of revenue realized in 2023. Kelly also projects that net working capital investment on the balance sheet at the end of 2024 will be the same percentage of sales in 2024 as it was in 2023. What is the projected cash flow from operations in 2024 based on Kelly's forecasts?\n\n---",
   "table": [
    [
     "",
     "2023"
    ],
    [
     "Revenue",
     "100.0"
    ],
    [
     "COGS",
     "(40.0)"
    ],
    [
     "SG&A, excluding depreciation",
     "(30.0)"
    ],
    [
     "Depreciation expense",
     "(10.0)"
    ],
    [
     "Pretax income",
     "20.0"
    ],
    [
     "Tax expense",
     "(6.0)"
    ],
    [
     "Net income",
     "14.0"
    ],
    [
     "Year-end net working capital investment",
     "20.0"
    ]
   ],
   "o": [
    "$4.8 million",
    "$24.8 million",
    "$28.8 million"
   ],
   "a": 1,
   "why": "NI = 14% × 120 = 16.8. Depreciation = 12.0. NWC rises from 20 to 24, so subtract 4. CFO = 24.8."
  }
 ],
 "decoyTerms": [],
 "decoyFormulas": [
  {
   "for": "fsa-f72",
   "formula": "shares at start + new shares",
   "mistake": "forgetting to time-weight a mid-year issue"
  },
  {
   "for": "fsa-f1",
   "formula": "(net income − preferred dividends) / year-end shares",
   "mistake": "year-end count instead of WASO"
  },
  {
   "for": "fsa-f3",
   "formula": "face value × coupon rate",
   "mistake": "adding the interest before tax"
  },
  {
   "for": "fsa-f6",
   "formula": "(this year's costs / total estimated cost) × contract price",
   "mistake": "this year's percentage on the full contract"
  },
  {
   "for": "fsa-f7",
   "formula": "beginning RE + net income + dividends declared",
   "mistake": "adding dividends"
  },
  {
   "for": "fsa-f16",
   "formula": "COGS + beginning inventory − ending inventory",
   "mistake": "flipping the signs"
  },
  {
   "for": "fsa-f17",
   "formula": "purchases + increase in accounts payable",
   "mistake": "adding the payables increase"
  },
  {
   "for": "fsa-f20",
   "formula": "net income + non-cash charges + interest − fixed capital investment − working capital investment",
   "mistake": "adding back pre-tax interest"
  },
  {
   "for": "fsa-f39",
   "formula": "carrying amount − min(fair value − costs to sell, value in use)",
   "mistake": "taking the lower amount"
  },
  {
   "for": "fsa-f73",
   "formula": "max(fair value, value in use)",
   "mistake": "ignoring costs to sell"
  },
  {
   "for": "fsa-f14",
   "formula": "total liabilities / total equity",
   "mistake": "liabilities / equity"
  },
  {
   "for": "fsa-f14",
   "formula": "total debt / total assets",
   "mistake": "debt / assets"
  },
  {
   "for": "fsa-f69",
   "formula": "dividend payout ratio × ROE",
   "mistake": "payout instead of retention"
  },
  {
   "for": "fsa-f71",
   "formula": "net income + depreciation − net working capital",
   "mistake": "subtracting the NWC balance, not its increase"
  },
  {
   "for": "fsa-f71",
   "formula": "net income + depreciation + increase in net working capital",
   "mistake": "adding the increase"
  }
 ]
};
