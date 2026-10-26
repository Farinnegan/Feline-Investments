// Financial Statement Analysis content. Built by tools/build_fsa.py from CFA-L1-FSA-Master-Reference.md.
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
   "id": "fsa-t1",
   "m": 1,
   "g": "basics",
   "term": "Role of financial reporting",
   "def": "Provides information about a company's performance, financial position and changes in financial position that is useful for economic decisions."
  },
  {
   "id": "fsa-t2",
   "m": 1,
   "g": "basics",
   "term": "Financial analysis",
   "def": "Uses reported information to evaluate past, current and potential performance."
  },
  {
   "id": "fsa-t3",
   "m": 1,
   "g": "basics",
   "term": "Primary financial statements",
   "def": "Statement of financial position (balance sheet), statement of comprehensive income (income statement plus OCI), statement of changes in equity, statement of cash flows."
  },
  {
   "id": "fsa-t4",
   "m": 1,
   "g": "basics",
   "term": "Financial analysis framework",
   "def": "Define purpose, collect data, process data, analyze and interpret, communicate conclusions, follow up."
  },
  {
   "id": "fsa-t5",
   "m": 1,
   "g": "sources",
   "term": "Notes to the financial statements",
   "def": "Explain accounting methods, estimates and assumptions; part of the audited statements."
  },
  {
   "id": "fsa-t6",
   "m": 1,
   "g": "sources",
   "term": "Management commentary / MD&A",
   "def": "Management's discussion of results, trends, risks and critical accounting estimates. Not audited."
  },
  {
   "id": "fsa-t7",
   "m": 1,
   "g": "sources",
   "term": "Other information sources",
   "def": "Earnings calls, press releases, industry data, economic data."
  },
  {
   "id": "fsa-t8",
   "m": 1,
   "g": "filing",
   "term": "10-K",
   "def": "US annual regulatory filing."
  },
  {
   "id": "fsa-t9",
   "m": 1,
   "g": "filing",
   "term": "10-Q",
   "def": "US quarterly regulatory filing."
  },
  {
   "id": "fsa-t10",
   "m": 1,
   "g": "filing",
   "term": "8-K",
   "def": "US filing for material events."
  },
  {
   "id": "fsa-t11",
   "m": 1,
   "g": "filing",
   "term": "Proxy statement (DEF-14A)",
   "def": "US filing covering governance and pay."
  },
  {
   "id": "fsa-t12",
   "m": 1,
   "g": "filing",
   "term": "20-F",
   "def": "Annual filing by foreign issuers in the US."
  },
  {
   "id": "fsa-t13",
   "m": 1,
   "g": "setter",
   "term": "IASB",
   "def": "Standard setter that writes IFRS."
  },
  {
   "id": "fsa-t14",
   "m": 1,
   "g": "setter",
   "term": "FASB",
   "def": "Standard setter that writes US GAAP."
  },
  {
   "id": "fsa-t15",
   "m": 1,
   "g": "setter",
   "term": "SEC",
   "def": "US regulator that enforces the rules, carries out Sarbanes-Oxley and oversees the PCAOB."
  },
  {
   "id": "fsa-t16",
   "m": 1,
   "g": "setter",
   "term": "Sarbanes-Oxley (2002)",
   "def": "Created the PCAOB to oversee auditors and requires management to report on the effectiveness of internal control over financial reporting."
  },
  {
   "id": "fsa-t17",
   "m": 1,
   "g": "setter",
   "term": "PCAOB",
   "def": "Oversees auditors; created by Sarbanes-Oxley."
  },
  {
   "id": "fsa-t18",
   "m": 1,
   "g": "auditnote",
   "term": "Internal controls",
   "def": "The company's processes for producing accurate statements. Management is responsible for them; in the US the auditor also opines on them."
  },
  {
   "id": "fsa-t19",
   "m": 1,
   "g": "auditnote",
   "term": "Key audit matters / critical audit matters",
   "def": "The areas of greatest judgment or risk of misstatement (key audit matters internationally, critical audit matters in the US)."
  },
  {
   "id": "fsa-t20",
   "m": 1,
   "g": "auditnote",
   "term": "Going concern paragraph",
   "def": "Flags doubt that the company can continue operating."
  },
  {
   "id": "fsa-t21",
   "m": 1,
   "g": "opinion",
   "term": "Unqualified opinion",
   "def": "Unmodified, clean: statements present fairly with no material errors."
  },
  {
   "id": "fsa-t22",
   "m": 1,
   "g": "opinion",
   "term": "Qualified opinion",
   "def": "Statements make exceptions to the accounting principles; the auditor explains them."
  },
  {
   "id": "fsa-t23",
   "m": 1,
   "g": "opinion",
   "term": "Adverse opinion",
   "def": "Statements are not presented fairly or materially depart from standards."
  },
  {
   "id": "fsa-t24",
   "m": 1,
   "g": "opinion",
   "term": "Disclaimer of opinion",
   "def": "The auditor cannot express an opinion (for example, a scope limitation)."
  },
  {
   "id": "fsa-t25",
   "m": 1,
   "g": "opinion",
   "term": "Modified opinion",
   "def": "Any audit opinion other than unqualified."
  },
  {
   "id": "fsa-t26",
   "m": 2,
   "g": "rev",
   "term": "Revenue recognition five steps",
   "def": "1) Identify the contract, 2) identify the separate performance obligations, 3) determine the transaction price, 4) allocate the price to the obligations, 5) recognize revenue when (or as) each obligation is satisfied."
  },
  {
   "id": "fsa-t27",
   "m": 2,
   "g": "progress",
   "term": "Output methods",
   "def": "Measure progress on a long-term contract by units delivered or appraisals."
  },
  {
   "id": "fsa-t28",
   "m": 2,
   "g": "progress",
   "term": "Input methods",
   "def": "Measure progress on a long-term contract by costs incurred relative to total estimated costs."
  },
  {
   "id": "fsa-t29",
   "m": 2,
   "g": "rev",
   "term": "Unearned (deferred) revenue",
   "def": "Cash received before delivery: a liability, not revenue. Cash rises, liabilities rise."
  },
  {
   "id": "fsa-t30",
   "m": 2,
   "g": "principal",
   "term": "Principal (revenue reporting)",
   "def": "Controls the goods and reports revenue gross."
  },
  {
   "id": "fsa-t31",
   "m": 2,
   "g": "principal",
   "term": "Agent (revenue reporting)",
   "def": "Reports only its commission, net (consignment, marketplace)."
  },
  {
   "id": "fsa-t32",
   "m": 2,
   "g": "rev",
   "term": "Contract costs",
   "def": "Incremental costs of obtaining a contract are capitalized under the converged standard."
  },
  {
   "id": "fsa-t33",
   "m": 2,
   "g": "rev",
   "term": "Expense recognition",
   "def": "Expenses are recognized when the economic benefits are consumed or lost (matching)."
  },
  {
   "id": "fsa-t34",
   "m": 2,
   "g": "nonrec",
   "term": "Discontinued operations",
   "def": "A component disposed of or classified as held for sale. Shown separately, below continuing operations, net of tax."
  },
  {
   "id": "fsa-t35",
   "m": 2,
   "g": "nonrec",
   "term": "Unusual or infrequent items",
   "def": "Reported within continuing operations, shown separately (a fire loss is continuing operations)."
  },
  {
   "id": "fsa-t36",
   "m": 2,
   "g": "change",
   "term": "Change in accounting policy",
   "def": "Retrospective application (restate all prior periods shown) unless impractical."
  },
  {
   "id": "fsa-t37",
   "m": 2,
   "g": "change",
   "term": "Change in accounting estimate",
   "def": "Prospective, no restatement (useful life, residual value, bad debt rate)."
  },
  {
   "id": "fsa-t38",
   "m": 2,
   "g": "change",
   "term": "Correction of a prior-period error",
   "def": "Restate prior periods and disclose."
  },
  {
   "id": "fsa-t39",
   "m": 2,
   "g": "capstr",
   "term": "Simple capital structure",
   "def": "No potentially dilutive securities, so basic EPS = diluted EPS."
  },
  {
   "id": "fsa-t40",
   "m": 2,
   "g": "capstr",
   "term": "Complex capital structure",
   "def": "Has convertibles, options or warrants."
  },
  {
   "id": "fsa-t41",
   "m": 2,
   "g": "eps",
   "term": "Weighted average shares outstanding (WASO)",
   "def": "New issues and buybacks weighted by the fraction of the year outstanding; stock splits and stock dividends applied retroactively to the start of the year."
  },
  {
   "id": "fsa-t42",
   "m": 2,
   "g": "eps",
   "term": "If-converted method (convertible debt)",
   "def": "Add back after-tax interest to the numerator; add conversion shares to the denominator."
  },
  {
   "id": "fsa-t43",
   "m": 2,
   "g": "eps",
   "term": "If-converted method (convertible preferred)",
   "def": "Do not subtract the preferred dividend in the diluted numerator; add conversion shares."
  },
  {
   "id": "fsa-t44",
   "m": 2,
   "g": "eps",
   "term": "Treasury stock method",
   "def": "Assume options and warrants are exercised and the proceeds buy back shares at the average market price; only the net new shares are added. Options never change the numerator."
  },
  {
   "id": "fsa-t45",
   "m": 2,
   "g": "eps",
   "term": "Antidilutive security",
   "def": "One that would raise EPS. Exclude it: diluted EPS can never exceed basic EPS."
  },
  {
   "id": "fsa-t46",
   "m": 2,
   "g": "common",
   "term": "Common-size income statement",
   "def": "Each line as a percentage of revenue; removes size for time-series and cross-sectional comparison."
  },
  {
   "id": "fsa-t47",
   "m": 2,
   "g": "oci",
   "term": "Comprehensive income",
   "def": "Net income + OCI."
  },
  {
   "id": "fsa-t48",
   "m": 2,
   "g": "oci",
   "term": "OCI items",
   "def": "Foreign currency translation adjustments, unrealized gains and losses on FVOCI (AFS) debt securities, pension remeasurements, effective cash flow hedges, IFRS revaluation surplus."
  },
  {
   "id": "fsa-t49",
   "m": 3,
   "g": "current",
   "term": "Current assets",
   "def": "Expected to be used up or converted to cash within one year or one operating cycle."
  },
  {
   "id": "fsa-t50",
   "m": 3,
   "g": "current",
   "term": "Current liabilities",
   "def": "Due within one year or one operating cycle."
  },
  {
   "id": "fsa-t51",
   "m": 3,
   "g": "ifrsfa",
   "term": "Amortized cost (IFRS financial assets)",
   "def": "Hold to collect principal and interest."
  },
  {
   "id": "fsa-t52",
   "m": 3,
   "g": "ifrsfa",
   "term": "FVOCI (IFRS financial assets)",
   "def": "Hold to collect and sell; also an irrevocable choice for equity securities."
  },
  {
   "id": "fsa-t53",
   "m": 3,
   "g": "ifrsfa",
   "term": "FVPL (IFRS financial assets)",
   "def": "Everything else; any asset can be designated at this measure."
  },
  {
   "id": "fsa-t54",
   "m": 3,
   "g": "usfa",
   "term": "Held-to-maturity securities",
   "def": "US GAAP: measured at amortized cost."
  },
  {
   "id": "fsa-t55",
   "m": 3,
   "g": "usfa",
   "term": "Available-for-sale securities",
   "def": "US GAAP: fair value with unrealized gains and losses to OCI; debt only (equity securities cannot be in this category)."
  },
  {
   "id": "fsa-t56",
   "m": 3,
   "g": "usfa",
   "term": "Trading securities",
   "def": "US GAAP: fair value with unrealized gains and losses to P&L."
  },
  {
   "id": "fsa-t57",
   "m": 3,
   "g": "usfa",
   "term": "Financial liabilities (measurement)",
   "def": "Usually amortized cost; trading liabilities and derivatives at fair value."
  },
  {
   "id": "fsa-t58",
   "m": 3,
   "g": "intang",
   "term": "Identifiable intangible assets",
   "def": "Patents, licences, customer lists."
  },
  {
   "id": "fsa-t59",
   "m": 3,
   "g": "intang",
   "term": "Unidentifiable intangible asset",
   "def": "Goodwill."
  },
  {
   "id": "fsa-t60",
   "m": 3,
   "g": "goodwill",
   "term": "Goodwill",
   "def": "Under the acquisition method, purchase price minus the fair value of identifiable net assets acquired. An asset, not amortized, tested for impairment at least annually."
  },
  {
   "id": "fsa-t61",
   "m": 3,
   "g": "goodwill",
   "term": "Negative goodwill (bargain purchase)",
   "def": "Recognized as a gain in P&L."
  },
  {
   "id": "fsa-t62",
   "m": 3,
   "g": "goodwill",
   "term": "Goodwill analyst adjustment",
   "def": "Remove goodwill from assets and the same amount from equity, and exclude goodwill impairment losses from the income statement, to compare acquisitive and non-acquisitive companies."
  },
  {
   "id": "fsa-t63",
   "m": 3,
   "g": "equity",
   "term": "Equity components",
   "def": "Contributed capital, retained earnings, treasury shares, accumulated OCI, non-controlling interest."
  },
  {
   "id": "fsa-t64",
   "m": 3,
   "g": "common",
   "term": "Common-size balance sheet",
   "def": "Each item as a percentage of total assets."
  },
  {
   "id": "fsa-t65",
   "m": 4,
   "g": "cfs",
   "term": "Operating cash flow (CFO)",
   "def": "Cash from the core business."
  },
  {
   "id": "fsa-t66",
   "m": 4,
   "g": "cfs",
   "term": "Investing cash flow (CFI)",
   "def": "Buying and selling long-term assets and investments."
  },
  {
   "id": "fsa-t67",
   "m": 4,
   "g": "cfs",
   "term": "Financing cash flow (CFF)",
   "def": "Borrowing, repaying, issuing and buying back equity, paying dividends."
  },
  {
   "id": "fsa-t68",
   "m": 4,
   "g": "cfs",
   "term": "Non-cash investing and financing activities",
   "def": "Converting debt to equity, a finance lease, an asset swap: not in the statement, disclosed in a note."
  },
  {
   "id": "fsa-t69",
   "m": 4,
   "g": "method",
   "term": "Direct method (cash flow)",
   "def": "Lists cash receipts and payments (cash from customers, cash to suppliers)."
  },
  {
   "id": "fsa-t70",
   "m": 4,
   "g": "method",
   "term": "Indirect method (cash flow)",
   "def": "Starts with net income and adjusts for non-cash items and working capital changes. Gives the same CFO as the other method."
  },
  {
   "id": "fsa-t71",
   "m": 4,
   "g": "method",
   "term": "Indirect method working capital rules",
   "def": "An increase in an operating current asset reduces CFO; an increase in an operating current liability raises CFO. Add back depreciation, amortization, impairments and losses on sales; subtract gains."
  },
  {
   "id": "fsa-t72",
   "m": 4,
   "g": "class",
   "term": "Interest and dividends received (classification)",
   "def": "US GAAP: operating. IFRS: operating or investing."
  },
  {
   "id": "fsa-t73",
   "m": 4,
   "g": "class",
   "term": "Interest paid (classification)",
   "def": "US GAAP: operating. IFRS: operating or financing."
  },
  {
   "id": "fsa-t74",
   "m": 4,
   "g": "class",
   "term": "Dividends paid (classification)",
   "def": "US GAAP: financing. IFRS: operating or financing."
  },
  {
   "id": "fsa-t75",
   "m": 4,
   "g": "class",
   "term": "Taxes paid (classification)",
   "def": "US GAAP: operating, always. IFRS: operating, unless specifically tied to an investing or financing transaction."
  },
  {
   "id": "fsa-t76",
   "m": 4,
   "g": "class",
   "term": "Bank overdraft (classification)",
   "def": "US GAAP: financing. IFRS: can be part of cash and equivalents."
  },
  {
   "id": "fsa-t77",
   "m": 5,
   "g": "common",
   "term": "Common-size cash flow statement",
   "def": "Each item as a percentage of revenue, or each inflow as a percentage of total inflows and each outflow as a percentage of total outflows."
  },
  {
   "id": "fsa-t78",
   "m": 5,
   "g": "fcf",
   "term": "Free cash flow to the firm (FCFF)",
   "def": "Cash available to all capital providers, debt and equity."
  },
  {
   "id": "fsa-t79",
   "m": 5,
   "g": "fcf",
   "term": "Free cash flow to equity (FCFE)",
   "def": "Cash available to common shareholders after all obligations."
  },
  {
   "id": "fsa-t80",
   "m": 6,
   "g": "costflow",
   "term": "Cost flow methods",
   "def": "Specific identification, FIFO, weighted average cost, LIFO. LIFO is allowed under US GAAP only, not IFRS."
  },
  {
   "id": "fsa-t81",
   "m": 6,
   "g": "invmeas",
   "term": "IFRS inventory measurement",
   "def": "Lower of cost and net realizable value (NRV); write-downs can be reversed (up to original cost)."
  },
  {
   "id": "fsa-t82",
   "m": 6,
   "g": "invmeas",
   "term": "US GAAP inventory measurement (FIFO, weighted average)",
   "def": "Lower of cost and NRV; write-downs cannot be reversed."
  },
  {
   "id": "fsa-t83",
   "m": 6,
   "g": "invmeas",
   "term": "Lower of cost or market (US GAAP LIFO and retail)",
   "def": "Market = replacement cost, bounded by NRV above and NRV minus normal profit margin below."
  },
  {
   "id": "fsa-t84",
   "m": 6,
   "g": "invmeas",
   "term": "Net realizable value (NRV)",
   "def": "Estimated selling price minus costs to complete and sell."
  },
  {
   "id": "fsa-t85",
   "m": 6,
   "g": "invmeas",
   "term": "Agricultural and commodity inventories",
   "def": "Both IFRS and US GAAP allow them at NRV or fair value less costs to sell."
  },
  {
   "id": "fsa-t86",
   "m": 6,
   "g": "rising",
   "term": "LIFO under rising prices",
   "def": "Highest COGS and turnover; lowest margin, net income, ending inventory, current ratio and taxes; highest debt-to-assets."
  },
  {
   "id": "fsa-t87",
   "m": 6,
   "g": "rising",
   "term": "FIFO under rising prices",
   "def": "Lowest COGS and turnover; highest margin, net income, ending inventory, current ratio and taxes; longest days of inventory."
  },
  {
   "id": "fsa-t88",
   "m": 6,
   "g": "rising",
   "term": "Weighted average under rising prices",
   "def": "Sits in the middle on COGS, margins, inventory, turnover and taxes."
  },
  {
   "id": "fsa-t89",
   "m": 6,
   "g": "rising",
   "term": "Inventory closest to current values",
   "def": "FIFO inventory is closest to current value on the balance sheet; LIFO COGS is closest to current cost on the income statement."
  },
  {
   "id": "fsa-t90",
   "m": 6,
   "g": "lifo",
   "term": "LIFO reserve",
   "def": "FIFO inventory minus LIFO inventory, disclosed by US LIFO firms."
  },
  {
   "id": "fsa-t91",
   "m": 6,
   "g": "lifo",
   "term": "LIFO liquidation",
   "def": "Inventory quantities fall, so old low costs flow into COGS. Margins and taxes jump but it is not sustainable; a falling LIFO reserve is the clue."
  },
  {
   "id": "fsa-t92",
   "m": 6,
   "g": "lifo",
   "term": "Inventory write-down",
   "def": "Reduces inventory and profit; hurts profitability, liquidity and solvency ratios but improves activity ratios."
  },
  {
   "id": "fsa-t93",
   "m": 6,
   "g": "lifo",
   "term": "Inventory disclosures",
   "def": "Cost formula, carrying amounts by category, write-downs and reversals, inventory pledged as collateral, LIFO reserve (US)."
  },
  {
   "id": "fsa-t94",
   "m": 7,
   "g": "intsrc",
   "term": "Purchased intangibles",
   "def": "Recorded at cost."
  },
  {
   "id": "fsa-t95",
   "m": 7,
   "g": "intsrc",
   "term": "Internally developed intangibles",
   "def": "IFRS expenses research and capitalizes development once criteria are met; US GAAP generally expenses both (except certain software costs)."
  },
  {
   "id": "fsa-t96",
   "m": 7,
   "g": "intsrc",
   "term": "Intangibles acquired in a business combination",
   "def": "Identifiable intangibles at fair value; the excess is goodwill."
  },
  {
   "id": "fsa-t97",
   "m": 7,
   "g": "life",
   "term": "Finite-life intangibles",
   "def": "Amortized."
  },
  {
   "id": "fsa-t98",
   "m": 7,
   "g": "life",
   "term": "Indefinite-life intangibles",
   "def": "Not amortized; tested for impairment."
  },
  {
   "id": "fsa-t99",
   "m": 7,
   "g": "model",
   "term": "IFRS measurement models (long-term assets)",
   "def": "Cost model or revaluation model for PP&E and intangibles."
  },
  {
   "id": "fsa-t100",
   "m": 7,
   "g": "model",
   "term": "US GAAP measurement model (long-term assets)",
   "def": "Cost model only."
  },
  {
   "id": "fsa-t101",
   "m": 7,
   "g": "reval",
   "term": "Revaluation increase (IFRS)",
   "def": "Goes to OCI (revaluation surplus) except to the extent it reverses a previous loss in P&L."
  },
  {
   "id": "fsa-t102",
   "m": 7,
   "g": "reval",
   "term": "Revaluation decrease (IFRS)",
   "def": "Goes to P&L except to the extent it reverses a previous surplus."
  },
  {
   "id": "fsa-t103",
   "m": 7,
   "g": "reval",
   "term": "Investment property, fair value model",
   "def": "All changes go to P&L."
  },
  {
   "id": "fsa-t104",
   "m": 7,
   "g": "impair",
   "term": "IFRS impairment",
   "def": "Compare carrying amount with recoverable amount; loss = carrying amount minus recoverable amount. Reversals allowed, capped at the original loss."
  },
  {
   "id": "fsa-t105",
   "m": 7,
   "g": "impair",
   "term": "US GAAP impairment",
   "def": "Step 1: impaired if carrying amount > undiscounted future cash flows. Step 2: loss = carrying amount minus fair value. No reversal for assets held for use."
  },
  {
   "id": "fsa-t106",
   "m": 7,
   "g": "impair",
   "term": "Recoverable amount",
   "def": "Higher of fair value less costs to sell and value in use."
  },
  {
   "id": "fsa-t107",
   "m": 7,
   "g": "impair",
   "term": "Value in use",
   "def": "PV of future cash flows."
  },
  {
   "id": "fsa-t108",
   "m": 7,
   "g": "disp",
   "term": "Held for sale",
   "def": "Stop depreciating; measure at lower of carrying amount and fair value less costs to sell."
  },
  {
   "id": "fsa-t109",
   "m": 7,
   "g": "disp",
   "term": "Disposed of other than by sale",
   "def": "Spin-off, abandonment or exchange: held for use until disposal and depreciation continues."
  },
  {
   "id": "fsa-t110",
   "m": 7,
   "g": "cap",
   "term": "Capitalizing costs",
   "def": "Raises current income, assets, equity, CFO and EBITDA, and smooths earnings."
  },
  {
   "id": "fsa-t111",
   "m": 7,
   "g": "cap",
   "term": "Expensing costs",
   "def": "Lowers current income, assets, equity, CFO and EBITDA; raises ROE later."
  },
  {
   "id": "fsa-t112",
   "m": 7,
   "g": "dep",
   "term": "Depreciation methods",
   "def": "Straight-line, accelerated (declining balance), units of production."
  },
  {
   "id": "fsa-t113",
   "m": 7,
   "g": "dep",
   "term": "Longer useful life or higher residual value",
   "def": "Lowers annual depreciation and raises DCF-based fair value estimates."
  },
  {
   "id": "fsa-t114",
   "m": 8,
   "g": "lease",
   "term": "Lessee advantages of leasing",
   "def": "Lower-cost financing, little or no down payment, often lower fixed rates, less restrictive terms, less obsolescence risk."
  },
  {
   "id": "fsa-t115",
   "m": 8,
   "g": "lease",
   "term": "Finance lease criteria",
   "def": "Any one: ownership transfers; purchase option reasonably certain; term covers most of the asset's life; PV of payments at least substantially all of fair value; specialized asset with no alternative use."
  },
  {
   "id": "fsa-t116",
   "m": 8,
   "g": "lease",
   "term": "Lessee accounting under IFRS",
   "def": "One model: right-of-use asset and lease liability at PV of payments; interest expense plus amortization. Short-term and low-value leases expensed."
  },
  {
   "id": "fsa-t117",
   "m": 8,
   "g": "lease",
   "term": "US GAAP operating lease (lessee)",
   "def": "ROU asset and liability on the balance sheet, but one straight-line lease expense on the income statement."
  },
  {
   "id": "fsa-t118",
   "m": 8,
   "g": "lessor",
   "term": "Lessor finance lease",
   "def": "Remove the asset, record a lease receivable, report interest income."
  },
  {
   "id": "fsa-t119",
   "m": 8,
   "g": "lessor",
   "term": "Lessor operating lease",
   "def": "Keep the asset, depreciate it, report lease income."
  },
  {
   "id": "fsa-t120",
   "m": 8,
   "g": "pension",
   "term": "Defined contribution plan",
   "def": "Expense = the employer's contribution; no balance sheet liability once paid."
  },
  {
   "id": "fsa-t121",
   "m": 8,
   "g": "pension",
   "term": "Net pension liability (asset)",
   "def": "PV of the defined benefit obligation minus fair value of plan assets."
  },
  {
   "id": "fsa-t122",
   "m": 8,
   "g": "pension",
   "term": "Service cost (IFRS pension)",
   "def": "Includes past service cost from plan amendments; goes to P&L."
  },
  {
   "id": "fsa-t123",
   "m": 8,
   "g": "pension",
   "term": "Net interest (IFRS pension)",
   "def": "Interest on the net pension liability or asset; goes to P&L."
  },
  {
   "id": "fsa-t124",
   "m": 8,
   "g": "pension",
   "term": "Remeasurements (IFRS pension)",
   "def": "Actuarial gains and losses plus actual return on plan assets minus the return in net interest; go to OCI and are never recycled."
  },
  {
   "id": "fsa-t125",
   "m": 8,
   "g": "pension",
   "term": "Actuarial gains and losses",
   "def": "Changes in assumptions such as mortality, turnover, retirement age, salary growth."
  },
  {
   "id": "fsa-t126",
   "m": 8,
   "g": "pension",
   "term": "US GAAP pension differences",
   "def": "Interest cost and expected return shown separately; past service cost to OCI and amortized into P&L; actuarial gains and losses to OCI, may be amortized."
  },
  {
   "id": "fsa-t127",
   "m": 8,
   "g": "share",
   "term": "Share-based compensation",
   "def": "Fair value at grant date expensed over the vesting period. No cash outflow and aligns employees with shareholders, but dilutes and option payoffs can encourage excess risk-taking."
  },
  {
   "id": "fsa-t128",
   "m": 9,
   "g": "taxbasic",
   "term": "Taxable income",
   "def": "Income on the tax return."
  },
  {
   "id": "fsa-t129",
   "m": 9,
   "g": "taxbasic",
   "term": "Pretax income",
   "def": "Income on the financial statements."
  },
  {
   "id": "fsa-t130",
   "m": 9,
   "g": "taxbasic",
   "term": "Taxes payable",
   "def": "The liability from the tax return."
  },
  {
   "id": "fsa-t131",
   "m": 9,
   "g": "taxbasic",
   "term": "Income tax expense",
   "def": "The P&L charge = taxes payable + change in deferred taxes."
  },
  {
   "id": "fsa-t132",
   "m": 9,
   "g": "base",
   "term": "Carrying amount",
   "def": "Book value on the financial statements."
  },
  {
   "id": "fsa-t133",
   "m": 9,
   "g": "base",
   "term": "Tax base",
   "def": "Value the tax authority recognizes."
  },
  {
   "id": "fsa-t134",
   "m": 9,
   "g": "diff",
   "term": "Temporary difference",
   "def": "Reverses over time and creates deferred tax."
  },
  {
   "id": "fsa-t135",
   "m": 9,
   "g": "diff",
   "term": "Permanent difference",
   "def": "Never reverses (non-deductible fines or premiums, tax-exempt income); creates no DTA or DTL and explains the gap between effective and statutory rates."
  },
  {
   "id": "fsa-t136",
   "m": 9,
   "g": "dt",
   "term": "Deferred tax liability (DTL)",
   "def": "Pay less tax now, more later: accounting profit > taxable income. For an asset, carrying amount > tax base."
  },
  {
   "id": "fsa-t137",
   "m": 9,
   "g": "dt",
   "term": "Deferred tax asset (DTA)",
   "def": "Pay more tax now, less later: taxable income > accounting profit. For an asset, carrying amount < tax base."
  },
  {
   "id": "fsa-t138",
   "m": 9,
   "g": "dt",
   "term": "Valuation allowance (US GAAP)",
   "def": "Reduces a DTA when it is more likely than not that it won't be realized; increasing it raises tax expense and cuts net income."
  },
  {
   "id": "fsa-t139",
   "m": 9,
   "g": "dtrules",
   "term": "Tax rate change",
   "def": "Both DTAs and DTLs are remeasured at the new rate; the change flows through tax expense."
  },
  {
   "id": "fsa-t140",
   "m": 9,
   "g": "dtrules",
   "term": "Deferred tax follows the item",
   "def": "If the underlying change goes to P&L, so does its tax; if to OCI or equity, so does its tax."
  },
  {
   "id": "fsa-t141",
   "m": 9,
   "g": "dtrules",
   "term": "DTL not expected to reverse",
   "def": "Analysts treat it as equity (a growing company that keeps buying assets)."
  },
  {
   "id": "fsa-t142",
   "m": 9,
   "g": "rate",
   "term": "Statutory tax rate",
   "def": "The legal rate."
  },
  {
   "id": "fsa-t143",
   "m": 9,
   "g": "rate",
   "term": "Effective tax rate",
   "def": "Tax expense / pretax income; the most useful rate for forecasting."
  },
  {
   "id": "fsa-t144",
   "m": 9,
   "g": "rate",
   "term": "Cash tax rate",
   "def": "Taxes paid / pretax income."
  },
  {
   "id": "fsa-t145",
   "m": 10,
   "g": "quality",
   "term": "Financial reporting quality",
   "def": "How well the statements follow GAAP and give decision-useful information."
  },
  {
   "id": "fsa-t146",
   "m": 10,
   "g": "quality",
   "term": "Earnings quality",
   "def": "Whether reported earnings are sustainable and adequate (high enough to give investors a sufficient return)."
  },
  {
   "id": "fsa-t147",
   "m": 10,
   "g": "quality",
   "term": "Reporting quality spectrum",
   "def": "Six levels from GAAP compliant and decision useful with sustainable, adequate earnings (best) to not compliant and fictitious or fraudulent (worst)."
  },
  {
   "id": "fsa-t148",
   "m": 10,
   "g": "cons",
   "term": "Conservative accounting",
   "def": "Choices that decrease current reported earnings and financial position and may increase them later."
  },
  {
   "id": "fsa-t149",
   "m": 10,
   "g": "cons",
   "term": "Aggressive accounting",
   "def": "Choices that increase current earnings or financial position and may decrease them later."
  },
  {
   "id": "fsa-t150",
   "m": 10,
   "g": "em",
   "term": "Earnings management techniques",
   "def": "Timing of revenue (channel stuffing, bill-and-hold), cookie-jar reserves, big bath charges, capitalizing operating costs, classification games."
  },
  {
   "id": "fsa-t151",
   "m": 10,
   "g": "em",
   "term": "Fraud triangle",
   "def": "Motivation, opportunity and rationalization: the conditions for low-quality reporting."
  },
  {
   "id": "fsa-t152",
   "m": 10,
   "g": "em",
   "term": "Discipline on reporting quality",
   "def": "Regulators, auditors, private contracting (lenders' covenants, investors)."
  },
  {
   "id": "fsa-t153",
   "m": 10,
   "g": "em",
   "term": "Reporting quality warning signs",
   "def": "Receivables growing faster than revenue, inventory building up, CFO persistently below net income, frequent non-recurring charges, capitalizing costs peers expense, LIFO liquidations."
  },
  {
   "id": "fsa-t154",
   "m": 11,
   "g": "ratio",
   "term": "Ratio families",
   "def": "Activity (efficiency), liquidity, solvency, profitability, valuation."
  },
  {
   "id": "fsa-t155",
   "m": 11,
   "g": "ratio",
   "term": "Leverage ratios",
   "def": "Focus on the balance sheet: how much is financed with debt."
  },
  {
   "id": "fsa-t156",
   "m": 11,
   "g": "ratio",
   "term": "Coverage ratios",
   "def": "Focus on the income statement and cash flows: ability to service debt."
  },
  {
   "id": "fsa-t157",
   "m": 11,
   "g": "ratio",
   "term": "Higher debt-based leverage ratios",
   "def": "Higher financial risk and weaker solvency."
  },
  {
   "id": "fsa-t158",
   "m": 11,
   "g": "dupont",
   "term": "DuPont analysis",
   "def": "Breaks ROE into its drivers to show whether it comes from margin, efficiency or leverage."
  },
  {
   "id": "fsa-t159",
   "m": 11,
   "g": "dupont",
   "term": "Sustainable growth rate",
   "def": "The growth a company can fund from retained earnings without changing its capital structure."
  },
  {
   "id": "fsa-t160",
   "m": 11,
   "g": "dupont",
   "term": "Tax burden",
   "def": "NI / EBT = 1 − effective tax rate. A lower tax rate means a higher ratio and a higher ROE."
  },
  {
   "id": "fsa-t161",
   "m": 11,
   "g": "dupont",
   "term": "Cash conversion cycle",
   "def": "Days of inventory + days of receivables − days of payables. Shorter is better for liquidity."
  },
  {
   "id": "fsa-t162",
   "m": 12,
   "g": "m12",
   "term": "Sales-based pro forma model",
   "def": "Eight steps: revenue, COGS, SG&A, financing costs, income tax and cash taxes, working capital, capex/depreciation/net PP&E, pro forma cash flow statement."
  },
  {
   "id": "fsa-t163",
   "m": 12,
   "g": "rev12",
   "term": "Top-down revenue forecasting",
   "def": "From economy or market growth and market share."
  },
  {
   "id": "fsa-t164",
   "m": 12,
   "g": "rev12",
   "term": "Bottom-up revenue forecasting",
   "def": "From volume × price, segments, capacity."
  },
  {
   "id": "fsa-t165",
   "m": 12,
   "g": "rev12",
   "term": "Organic growth",
   "def": "Revenue change from volume plus price/mix, excluding acquisitions, divestitures and FX."
  },
  {
   "id": "fsa-t166",
   "m": 12,
   "g": "rev12",
   "term": "Scope changes",
   "def": "Acquisitions and divestitures, shown separately from organic growth."
  },
  {
   "id": "fsa-t167",
   "m": 12,
   "g": "cost12",
   "term": "COGS forecasting",
   "def": "Usually as a percentage of revenue (gross margin)."
  },
  {
   "id": "fsa-t168",
   "m": 12,
   "g": "cost12",
   "term": "SG&A forecasting",
   "def": "Large fixed component; often modeled with its own growth rate."
  },
  {
   "id": "fsa-t169",
   "m": 12,
   "g": "cost12",
   "term": "Working capital forecasting",
   "def": "Days ratios or a percentage of sales."
  },
  {
   "id": "fsa-t170",
   "m": 12,
   "g": "cost12",
   "term": "Capex forecasting",
   "def": "Maintenance (sustain current capacity, roughly depreciation) plus growth capex."
  },
  {
   "id": "fsa-t171",
   "m": 12,
   "g": "cost12",
   "term": "Forecast horizon",
   "def": "Long enough to capture the business cycle and the effect of any strategy change."
  },
  {
   "id": "fsa-t172",
   "m": 12,
   "g": "bias12",
   "term": "Overconfidence in forecasting",
   "def": "Intervals too narrow; fix by sharing forecasts and scenario analysis."
  },
  {
   "id": "fsa-t173",
   "m": 12,
   "g": "bias12",
   "term": "Illusion of control",
   "def": "Leads to overly complex models."
  },
  {
   "id": "fsa-t174",
   "m": 12,
   "g": "bias12",
   "term": "Conservatism / anchoring bias",
   "def": "Small adjustments to new information."
  },
  {
   "id": "fsa-t175",
   "m": 12,
   "g": "bias12",
   "term": "Representativeness bias",
   "def": "Base rates ignored."
  },
  {
   "id": "fsa-t176",
   "m": 12,
   "g": "bias12",
   "term": "Confirmation bias",
   "def": "Seeking evidence that agrees."
  }
 ],
 "formulas": [
  {
   "id": "fsa-f1",
   "m": 2,
   "g": "eps",
   "name": "Basic EPS",
   "formula": "(net income − preferred dividends) / WASO"
  },
  {
   "id": "fsa-f2",
   "m": 2,
   "g": "eps",
   "name": "Diluted EPS",
   "formula": "(NI − preferred dividends + preferred dividends on convertible preferred + after-tax interest on convertible debt) / (WASO + shares from conversion + net shares from options)"
  },
  {
   "id": "fsa-f3",
   "m": 2,
   "g": "eps",
   "name": "After-tax interest on convertible debt",
   "formula": "face × coupon × (1 − t)"
  },
  {
   "id": "fsa-f4",
   "m": 2,
   "g": "eps",
   "name": "Treasury stock method net shares",
   "formula": "options − (options × exercise price / average market price)"
  },
  {
   "id": "fsa-f5",
   "m": 2,
   "g": "rev",
   "name": "Revenue to date (input method)",
   "formula": "(cumulative costs / current total estimated costs) × contract price"
  },
  {
   "id": "fsa-f6",
   "m": 2,
   "g": "rev",
   "name": "This period's long-term contract revenue",
   "formula": "revenue to date − revenue already recognized"
  },
  {
   "id": "fsa-f7",
   "m": 3,
   "g": "equity",
   "name": "Ending retained earnings",
   "formula": "beginning RE + net income − dividends declared"
  },
  {
   "id": "fsa-f8",
   "m": 3,
   "g": "equity",
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
   "formula": "(cash + short-term marketable investments + receivables) / current liabilities"
  },
  {
   "id": "fsa-f11",
   "m": 3,
   "g": "liq",
   "name": "Cash ratio",
   "formula": "(cash + short-term marketable investments) / current liabilities"
  },
  {
   "id": "fsa-f12",
   "m": 3,
   "g": "solv",
   "name": "Debt-to-assets",
   "formula": "total debt / total assets"
  },
  {
   "id": "fsa-f13",
   "m": 3,
   "g": "solv",
   "name": "Debt-to-equity",
   "formula": "total debt / total equity"
  },
  {
   "id": "fsa-f14",
   "m": 3,
   "g": "solv",
   "name": "Financial leverage",
   "formula": "total assets / total equity"
  },
  {
   "id": "fsa-f15",
   "m": 4,
   "g": "cash",
   "name": "Cash collected from customers",
   "formula": "revenue − increase in accounts receivable (+ increase in unearned revenue)"
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
   "id": "fsa-f18",
   "m": 4,
   "g": "cash",
   "name": "Cash paid to employees",
   "formula": "salary expense − increase in salaries payable"
  },
  {
   "id": "fsa-f19",
   "m": 4,
   "g": "cash",
   "name": "CFO (indirect)",
   "formula": "net income + non-cash charges − gains + losses − increase in operating current assets + increase in operating current liabilities"
  },
  {
   "id": "fsa-f20",
   "m": 5,
   "g": "fcf",
   "name": "FCFF (from net income)",
   "formula": "NI + non-cash charges + interest × (1 − t) − fixed capital investment − working capital investment"
  },
  {
   "id": "fsa-f21",
   "m": 5,
   "g": "fcf",
   "name": "FCFF (from CFO)",
   "formula": "CFO + interest paid × (1 − t) − fixed capital investment"
  },
  {
   "id": "fsa-f22",
   "m": 5,
   "g": "fcf",
   "name": "FCFE (from CFO)",
   "formula": "CFO − fixed capital investment + net borrowing"
  },
  {
   "id": "fsa-f23",
   "m": 5,
   "g": "fcf",
   "name": "FCFE (from FCFF)",
   "formula": "FCFF − interest × (1 − t) + net borrowing"
  },
  {
   "id": "fsa-f24",
   "m": 5,
   "g": "cfr",
   "name": "Cash flow to revenue",
   "formula": "CFO / revenue"
  },
  {
   "id": "fsa-f25",
   "m": 5,
   "g": "cfr",
   "name": "Cash return on assets",
   "formula": "CFO / average total assets"
  },
  {
   "id": "fsa-f26",
   "m": 5,
   "g": "cfr",
   "name": "Cash return on equity",
   "formula": "CFO / average equity"
  },
  {
   "id": "fsa-f27",
   "m": 5,
   "g": "cfr",
   "name": "Cash to income",
   "formula": "CFO / operating income"
  },
  {
   "id": "fsa-f28",
   "m": 5,
   "g": "cfr",
   "name": "Cash flow per share",
   "formula": "(CFO − preferred dividends) / WASO"
  },
  {
   "id": "fsa-f29",
   "m": 5,
   "g": "cfc",
   "name": "Debt coverage (cash flow)",
   "formula": "CFO / total debt"
  },
  {
   "id": "fsa-f30",
   "m": 5,
   "g": "cfc",
   "name": "Interest coverage (cash flow)",
   "formula": "(CFO + interest paid + taxes paid) / interest paid"
  },
  {
   "id": "fsa-f31",
   "m": 5,
   "g": "cfc",
   "name": "Reinvestment ratio",
   "formula": "CFO / cash paid for long-term assets"
  },
  {
   "id": "fsa-f32",
   "m": 5,
   "g": "cfc",
   "name": "Debt payment ratio",
   "formula": "CFO / cash paid for long-term debt repayment"
  },
  {
   "id": "fsa-f33",
   "m": 5,
   "g": "cfc",
   "name": "Dividend payment ratio",
   "formula": "CFO / dividends paid"
  },
  {
   "id": "fsa-f34",
   "m": 5,
   "g": "cfc",
   "name": "Investing and financing ratio",
   "formula": "CFO / cash outflows for investing and financing"
  },
  {
   "id": "fsa-f35",
   "m": 6,
   "g": "lifo",
   "name": "FIFO inventory",
   "formula": "LIFO inventory + LIFO reserve"
  },
  {
   "id": "fsa-f36",
   "m": 6,
   "g": "lifo",
   "name": "FIFO COGS",
   "formula": "LIFO COGS − (ending LIFO reserve − beginning LIFO reserve)"
  },
  {
   "id": "fsa-f37",
   "m": 6,
   "g": "lifo",
   "name": "LIFO to FIFO: equity adjustment",
   "formula": "add LIFO reserve × (1 − t) to equity"
  },
  {
   "id": "fsa-f38",
   "m": 6,
   "g": "lifo",
   "name": "LIFO to FIFO: deferred tax adjustment",
   "formula": "add LIFO reserve × t to deferred tax liabilities (or taxes payable)"
  },
  {
   "id": "fsa-f39",
   "m": 7,
   "g": "imp",
   "name": "IFRS impairment loss",
   "formula": "carrying amount − max(fair value − costs to sell, value in use)"
  },
  {
   "id": "fsa-f40",
   "m": 7,
   "g": "imp",
   "name": "US GAAP impairment loss (if recoverability test fails)",
   "formula": "carrying amount − fair value"
  },
  {
   "id": "fsa-f41",
   "m": 7,
   "g": "age",
   "name": "Average age of PP&E",
   "formula": "accumulated depreciation / annual depreciation expense"
  },
  {
   "id": "fsa-f42",
   "m": 7,
   "g": "age",
   "name": "Total useful life of PP&E",
   "formula": "gross PP&E / annual depreciation expense"
  },
  {
   "id": "fsa-f43",
   "m": 7,
   "g": "age",
   "name": "Remaining useful life of PP&E",
   "formula": "net PP&E / annual depreciation expense"
  },
  {
   "id": "fsa-f44",
   "m": 9,
   "g": "tax",
   "name": "Income tax expense",
   "formula": "taxes payable + ΔDTL − ΔDTA"
  },
  {
   "id": "fsa-f45",
   "m": 9,
   "g": "tax",
   "name": "Deferred tax (DTL or DTA)",
   "formula": "(carrying amount − tax base) × tax rate (positive for an asset means DTL)"
  },
  {
   "id": "fsa-f46",
   "m": 9,
   "g": "tax",
   "name": "Effective tax rate",
   "formula": "income tax expense / pretax income"
  },
  {
   "id": "fsa-f47",
   "m": 11,
   "g": "act",
   "name": "Receivables turnover",
   "formula": "revenue / average receivables"
  },
  {
   "id": "fsa-f48",
   "m": 11,
   "g": "act",
   "name": "Days of sales outstanding (DSO)",
   "formula": "365 / receivables turnover"
  },
  {
   "id": "fsa-f49",
   "m": 11,
   "g": "act",
   "name": "Inventory turnover",
   "formula": "COGS / average inventory"
  },
  {
   "id": "fsa-f50",
   "m": 11,
   "g": "act",
   "name": "Days of inventory on hand (DOH)",
   "formula": "365 / inventory turnover"
  },
  {
   "id": "fsa-f51",
   "m": 11,
   "g": "act",
   "name": "Payables turnover",
   "formula": "purchases / average payables"
  },
  {
   "id": "fsa-f52",
   "m": 11,
   "g": "act",
   "name": "Days of payables",
   "formula": "365 / payables turnover"
  },
  {
   "id": "fsa-f53",
   "m": 11,
   "g": "act",
   "name": "Working capital turnover",
   "formula": "revenue / average working capital"
  },
  {
   "id": "fsa-f54",
   "m": 11,
   "g": "act",
   "name": "Fixed asset turnover",
   "formula": "revenue / average net fixed assets"
  },
  {
   "id": "fsa-f55",
   "m": 11,
   "g": "act",
   "name": "Total asset turnover",
   "formula": "revenue / average total assets"
  },
  {
   "id": "fsa-f56",
   "m": 11,
   "g": "act",
   "name": "Cash conversion cycle",
   "formula": "DOH + DSO − days of payables"
  },
  {
   "id": "fsa-f57",
   "m": 11,
   "g": "liq11",
   "name": "Defensive interval",
   "formula": "(cash + short-term investments + receivables) / daily cash expenditures"
  },
  {
   "id": "fsa-f58",
   "m": 11,
   "g": "solv11",
   "name": "Debt-to-capital",
   "formula": "total debt / (total debt + equity)"
  },
  {
   "id": "fsa-f59",
   "m": 11,
   "g": "solv11",
   "name": "Interest coverage",
   "formula": "EBIT / interest"
  },
  {
   "id": "fsa-f60",
   "m": 11,
   "g": "solv11",
   "name": "Fixed charge coverage",
   "formula": "(EBIT + lease payments) / (interest + lease payments)"
  },
  {
   "id": "fsa-f61",
   "m": 11,
   "g": "prof",
   "name": "Gross, operating, pretax and net margin",
   "formula": "each profit line / revenue"
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
   "id": "fsa-f64",
   "m": 11,
   "g": "prof",
   "name": "Return on total capital",
   "formula": "EBIT / (debt + equity)"
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
   "formula": "ROE = tax burden (NI/EBT) × interest burden (EBT/EBIT) × EBIT margin (EBIT/revenue) × asset turnover × leverage"
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
   "formula": "b × ROE"
  },
  {
   "id": "fsa-f70",
   "m": 12,
   "g": "m12",
   "name": "Projected line item",
   "formula": "projected revenue × historical % of revenue"
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
   "text": "SOX internal control reporting is required by the SEC, not FASB (which only writes US GAAP) and not the IASB."
  },
  {
   "m": 1,
   "text": "\"Exceptions to accounting principles\" means qualified, not adverse. Adverse is for statements that are not fairly presented overall."
  },
  {
   "m": 1,
   "text": "Management, not the auditor, is responsible for the statements and the internal controls."
  },
  {
   "m": 2,
   "text": "Reporting the if-converted figure when it is above basic (O54: computed 1.61, basic 1.60, answer 1.60)."
  },
  {
   "m": 2,
   "text": "Subtracting after-tax interest instead of adding it back; adding pre-tax interest."
  },
  {
   "m": 2,
   "text": "Using year-end shares instead of WASO; not time-weighting a mid-year issue."
  },
  {
   "m": 2,
   "text": "Long-term contracts with a revised estimate: use cumulative percent of completion and subtract revenue already booked. Do not apply this year's percentage alone."
  },
  {
   "m": 2,
   "text": "\"Both policy and estimate changes are retrospective\" is false. Estimates are prospective."
  },
  {
   "m": 2,
   "text": "Cash received in advance never creates revenue on receipt."
  },
  {
   "m": 3,
   "text": "A big gap between the current ratio and the quick ratio means inventory-heavy current assets. If sales collapse, inventory can't be turned into cash, so the quick ratio tells you the real liquidity risk."
  },
  {
   "m": 3,
   "text": "Higher financial leverage than peers means a riskier capital structure."
  },
  {
   "m": 3,
   "text": "Goodwill excess is an asset, never a gain in P&L or OCI."
  },
  {
   "m": 3,
   "text": "The analyst adjustment removes impairment losses. \"Include goodwill impairment on the income statement\" is the wrong adjustment."
  },
  {
   "m": 3,
   "text": "US GAAP patents are at amortized cost, not plain historical cost."
  },
  {
   "m": 4,
   "text": "Net income flat while CFO collapses: look for receivables rising (more credit sales, fewer cash sales). A falling inventory or rising payables would push CFO up."
  },
  {
   "m": 4,
   "text": "Cash to suppliers: a decrease in inventory is subtracted from COGS; an increase in payables is subtracted too. Adding either is the trap (O68: 800 − 250 − 100 = 450)."
  },
  {
   "m": 4,
   "text": "Taxes on selling an investment property: operating under US GAAP, investing under IFRS. \"Investing under both\" is the trap."
  },
  {
   "m": 5,
   "text": "Add back interest after tax, not before (M48: 22.5 × 0.8 = 18)."
  },
  {
   "m": 5,
   "text": "When starting from net income, subtract both capex and the working capital increase. When starting from CFO, working capital is already in there."
  },
  {
   "m": 5,
   "text": "Under IFRS, if dividends paid were put in CFO, add them back before computing FCFE."
  },
  {
   "m": 6,
   "text": "Weighted average vs FIFO under rising prices: weighted average gives lower margin and higher turnover, so a shorter cash conversion cycle. \"Higher margin under weighted average\" is the trap."
  },
  {
   "m": 6,
   "text": "LIFO vs weighted average: LIFO has higher debt-to-assets (smaller asset base), not lower."
  },
  {
   "m": 6,
   "text": "US GAAP has no write-down reversals, so there is nothing about reversals to disclose. The missing disclosure in M43 is the LIFO liquidation."
  },
  {
   "m": 6,
   "text": "A write-down is good news only for activity ratios."
  },
  {
   "m": 7,
   "text": "\"Intangibles are reported using the cost model only\" is the US GAAP answer. For IFRS, it is cost or revaluation (not \"fair value model\")."
  },
  {
   "m": 7,
   "text": "IFRS impairment: forgetting costs to sell, or taking the lower of the two amounts (O88 traps 2 and 5; answer 4)."
  },
  {
   "m": 7,
   "text": "A spin-off is not a sale, so no held-for-sale treatment."
  },
  {
   "m": 7,
   "text": "To minimize goodwill, push estimated useful life and salvage value up: that raises the fair value of identifiable assets."
  },
  {
   "m": 7,
   "text": "A company that expenses all R&D has lower EBITDA, so with the same market cap it trades at a higher EBITDA multiple."
  },
  {
   "m": 8,
   "text": "Under IFRS, an actuarial loss goes to OCI, never to operating expense."
  },
  {
   "m": 8,
   "text": "A plan amendment that raises benefits creates past service cost in P&L under IFRS (it goes to OCI under US GAAP)."
  },
  {
   "m": 8,
   "text": "Leases are often cheaper and less restrictive than other borrowing. Statements claiming the opposite are false."
  },
  {
   "m": 8,
   "text": "US GAAP operating leases still go on the balance sheet. What differs is the single lease expense."
  },
  {
   "m": 9,
   "text": "\"Tax base above carrying value\" for an asset is a DTA, not a DTL."
  },
  {
   "m": 9,
   "text": "\"An expense the tax authority never allows\" is permanent: no deferred tax at all."
  },
  {
   "m": 9,
   "text": "Expensed for tax but capitalized for books: zero tax base, positive carrying amount, so DTL."
  },
  {
   "m": 9,
   "text": "Downward revaluation of 2.7m at 30%: DTA of 0.81m, not a DTL and not an equity charge."
  },
  {
   "m": 9,
   "text": "Two-statement questions: test each one alone."
  },
  {
   "m": 10,
   "text": "\"Lower now, higher later\" = conservative, not \"unsustainable\". Conservative choices don't create a sustainability problem."
  },
  {
   "m": 10,
   "text": "Of the three bridge-revenue options (all upfront, at completion, by cost incurred), at completion is the most conservative. Percentage of cost sits in the middle."
  },
  {
   "m": 10,
   "text": "GAAP compliance alone does not mean high quality. Biased choices can be fully compliant."
  },
  {
   "m": 11,
   "text": "Financial leverage is assets / equity. Liabilities / equity (0.25) and debt / assets (0.10) are the traps in O89; answer 1.25."
  },
  {
   "m": 11,
   "text": "Back-solving (O60): NI = revenue × margin; equity = NI / ROE; assets = NI / ROA; turnover = revenue / assets; leverage = ROE / ROA. Every answer must agree with all three ratios."
  },
  {
   "m": 11,
   "text": "A lower tax rate raises ROE. A lower DSO raises asset turnover and ROE. Only lower leverage lowers ROE in O48."
  },
  {
   "m": 11,
   "text": "Sustainable growth uses retention, not payout, and the final answer is g, not ROE (M67: ROE 13.06%, g 5.88%)."
  },
  {
   "m": 11,
   "text": "Purchases = COGS + ending − beginning inventory. The sign flip is the trap."
  },
  {
   "m": 12,
   "text": "Organic growth is both volume and price/mix. Acquisitions and FX are excluded."
  },
  {
   "m": 12,
   "text": "In the pro forma CFO, subtract the change in NWC (24 − 20 = 4), not its level (24) and never add it."
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
   "for": "fsa-f17",
   "formula": "purchases + increase in accounts payable",
   "mistake": "adding the payables increase (the trap in Q14)"
  },
  {
   "for": "fsa-f16",
   "formula": "COGS + beginning inventory − ending inventory",
   "mistake": "sign flip on inventory"
  },
  {
   "for": "fsa-f14",
   "formula": "total liabilities / total equity",
   "mistake": "liabilities / equity trap (Q39)"
  },
  {
   "for": "fsa-f14",
   "formula": "total debt / total assets",
   "mistake": "debt / assets trap (Q39)"
  },
  {
   "for": "fsa-f69",
   "formula": "payout × ROE",
   "mistake": "uses payout instead of retention"
  },
  {
   "for": "fsa-f3",
   "formula": "face × coupon",
   "mistake": "adding back pre-tax interest"
  },
  {
   "for": "fsa-f39",
   "formula": "carrying amount − min(fair value − costs to sell, value in use)",
   "mistake": "taking the lower amount"
  },
  {
   "for": "fsa-f39",
   "formula": "carrying amount − max(fair value, value in use)",
   "mistake": "forgetting costs to sell"
  },
  {
   "for": "fsa-f71",
   "formula": "net income + depreciation − net working capital",
   "mistake": "subtracting the NWC level, not its change"
  },
  {
   "for": "fsa-f71",
   "formula": "net income + depreciation + increase in net working capital",
   "mistake": "adding the NWC change"
  },
  {
   "for": "fsa-f20",
   "formula": "NI + non-cash charges + interest − fixed capital investment − working capital investment",
   "mistake": "adding back interest before tax"
  }
 ]
};
