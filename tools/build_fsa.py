# Builds js/content-fsa.js from CFA-L1-FSA-Master-Reference.md (tested-concepts version).
# Questions and traps are parsed from the file (tools/parse_fsa.py output); terms and formulas are
# transcribed from its Key terms and Formulas sections.
# IDs are permanent because progress is saved against them: a concept that existed in the
# previous version keeps its old ID (matched by name, or by the old name given as a 5th field).
import json, re, sys
src = json.load(open(sys.argv[1]))
OLD = sys.argv[2]           # previous js/content-fsa.js
OUT = sys.argv[3]
old = json.loads(open(OLD).read().split("window.TOPIC_CONTENT.fsa = ", 1)[1].rstrip().rstrip(";"))
old_t = {x["term"]: x["id"] for x in old["terms"]}
old_f = {x["name"]: x["id"] for x in old["formulas"]}
next_t = max(int(x["id"].split("t")[-1]) for x in old["terms"]) + 1
next_f = max(int(x["id"].split("f")[-1]) for x in old["formulas"]) + 1

SHORT = {1: "Intro", 2: "Income Stmt", 3: "Balance Sheet", 4: "Cash Flow I", 5: "Cash Flow II", 6: "Inventories",
         7: "LT Assets", 8: "LT Liabilities", 9: "Income Taxes", 10: "Reporting Quality", 11: "Analysis Tools", 12: "Modeling"}

T = []
def t(m, g, term, d, was=None): T.append((m, g, term, d, was))
# Module 1
t(1,"body","IASB","Standard setter that writes IFRS, used in most of the world including Saudi Arabia. Decides how things are recorded but cannot force any company to follow the rules.")
t(1,"body","FASB","Standard setter that writes US GAAP. Writes the rulebook only; it has no power to enforce it.")
t(1,"body","SEC","US regulator that requires listed companies to follow the standards and file reports. Carries out SOX and oversees the PCAOB, so it is the body that requires the internal control report.")
t(1,"body","Sarbanes-Oxley (2002)","US law passed after Enron and WorldCom. Created the PCAOB to oversee auditors and requires management to report on whether its internal control over financial reporting works, with the auditor confirming it.")
t(1,"body","PCAOB","Public Company Accounting Oversight Board: oversees auditors. Created by Sarbanes-Oxley.")
t(1,"audit","Internal controls","The company's own processes for making sure transactions are recorded correctly (approvals, reconciliations, segregation of duties). Management is responsible for them, not the auditor.")
t(1,"audit","Audit opinion","An independent accounting firm's opinion on whether the statements are fairly presented under the accounting standards.")
t(1,"opinion","Unqualified opinion","Clean (unmodified): the statements are fairly presented with no material errors.")
t(1,"opinion","Qualified opinion","Fairly presented except for specific exceptions to the accounting principles, which the auditor explains. The problem is real but contained.")
t(1,"opinion","Adverse opinion","The statements are not fairly presented; they materially depart from the standards. A severe red flag.")
t(1,"opinion","Disclaimer of opinion","The auditor can't form an opinion at all, usually because it couldn't get enough evidence (a scope limitation).")
# Module 2
t(2,"rev","Accrual accounting","Revenue is recorded when earned and expenses when incurred, not when cash moves.")
t(2,"rev","Unearned (deferred) revenue","Cash received before delivery. Recorded as a liability, not revenue: cash (asset) up, unearned revenue (liability) up. Revenue is recognized later, as delivered.")
t(2,"rev","Input method (revenue over time)","For long contracts, measures progress by costs incurred so far versus total estimated costs. Spent 40% of expected cost, recognize 40% of contract revenue.", "Input methods")
t(2,"rev","Revised cost estimate on an over-time contract","Recompute the cumulative percentage complete with the new estimate, find total revenue earned to date, and subtract what earlier years already recognized. Earlier years are not restated.")
t(2,"change","Change in accounting policy","Switching between allowed methods. Applied retrospectively: all prior periods shown are restated, unless impractical.")
t(2,"change","Change in accounting estimate","Revising a judgment within the same method (useful life, salvage value, bad debt rate). Applied prospectively: current and future periods only.")
t(2,"eps","Earnings per share (EPS)","Net income available to common shareholders divided by the number of common shares.")
t(2,"eps","Weighted average shares outstanding (WASO)","Shares weighted by how long they were outstanding during the year.")
t(2,"eps","Diluted EPS","What EPS would be if every security that could become common stock did so. Shows the worst-case dilution for current shareholders.")
t(2,"eps","If-converted method (convertible debt)","Assume the bonds converted at the start of the year: add back the bond interest after tax to the numerator, and add the conversion shares to the denominator.")
t(2,"eps","Antidilutive security","A security whose conversion would increase EPS. Left out: diluted EPS can never be higher than basic EPS.")
# Module 3
t(3,"acq","Retained earnings","Cumulative profits kept rather than paid out as dividends. Grows by net income, shrinks by dividends declared.")
t(3,"acq","Acquisition method","The buyer records each identifiable asset and liability of the target at fair value on the purchase date.")
t(3,"acq","Identifiable assets","Assets that can be separated or arise from legal rights (property, patents, licenses, brands, customer lists). Recorded individually.")
t(3,"acq","Goodwill","The part of the purchase price left after allocating fair value to identifiable assets and liabilities. An asset, not amortized, tested for impairment at least yearly. Never a gain.")
t(3,"acq","Goodwill analyst adjustment","Remove goodwill from total assets, remove the same amount from equity, and exclude goodwill impairment losses from the income statement.")
t(3,"meas","Available-for-sale securities","US GAAP: debt securities the company might sell before maturity. Carried at fair value, with unrealized gains and losses in OCI.")
t(3,"meas","Held-to-maturity securities","US GAAP: debt the company intends to hold to maturity. Carried at amortized cost.")
t(3,"meas","Patents and other finite-life intangibles","Carried at amortized cost: historical cost minus accumulated amortization. Plain historical cost is wrong.")
t(3,"meas","LIFO inventory (US GAAP measurement)","Carried at the lower of cost or market, so it gets written down if its value falls.")
t(3,"liq","Gap between current and quick ratios","The bigger the gap, the more of current assets is inventory. If sales fall sharply, bills must be paid from quick assets alone.")
# Module 4
t(4,"cfo","Cash flow from operations (CFO)","Cash generated by the core business. Under the indirect method it starts from net income and adjusts for non-cash items and working capital changes.", "Operating cash flow (CFO)")
t(4,"cfo","Working capital effects on CFO","Operating current asset up, CFO down (receivables or inventory up). Operating current liability up, CFO up (payables up).", "Indirect method working capital rules")
t(4,"cfo","More credit sales, same total sales","Receivables pile up and CFO falls even though net income doesn't change. A big CFO drop with flat sales and net income is the classic sign.")
t(4,"cfo","Shifting from trade payables to bank debt","Means paying suppliers sooner, which lowers CFO. Moving toward more trade payables raises CFO.")
t(4,"cfo","Taxes paid (classification)","US GAAP: all income taxes paid are operating. IFRS: operating by default, but tax tied to an investing or financing transaction can be classified there.")
# Module 5
t(5,"fcff","Free cash flow to the firm (FCFF)","Cash left over for all providers of capital, debt and equity, after operating costs and needed investments.")
t(5,"fcff","Non-cash charges","Expenses that reduce net income without using cash, mainly depreciation and amortization. Added back.")
t(5,"fcff","After-tax interest add-back","Interest goes to debt holders, so FCFF adds it back, after tax, because the interest expense had saved taxes.")
t(5,"fcff","Fixed capital investment (FCInv)","Net capital expenditure on long-term assets. Subtracted.")
t(5,"fcff","Working capital investment (WCInv)","The increase in working capital during the year. Subtracted.")
# Module 6
t(6,"flow","Cost flow methods","FIFO sends the oldest costs to COGS, LIFO the newest, weighted average the average. LIFO is allowed only under US GAAP.")
t(6,"flow","LIFO under rising prices","Highest COGS, lowest gross margin, lowest ending inventory, lowest taxes.")
t(6,"flow","FIFO under rising prices","Lowest COGS, highest gross margin, highest ending inventory.")
t(6,"flow","Weighted average under rising prices","Sits in the middle on everything.")
t(6,"flow","Ratio effects of lower inventory","Lower current ratio and working capital; higher inventory turnover; fewer days of inventory and a shorter cash conversion cycle; higher debt-to-assets; higher working capital turnover.")
t(6,"meas","Net realizable value (NRV)","Estimated selling price minus the costs to complete and sell.")
t(6,"meas","IFRS inventory measurement","Lower of cost and NRV. A write-down can be reversed if value recovers, up to original cost.")
t(6,"meas","US GAAP inventory measurement (FIFO, weighted average)","Lower of cost and NRV. Write-downs cannot be reversed.")
t(6,"meas","Lower of cost or market (US GAAP LIFO and retail)","Market = replacement cost, capped at NRV and floored at NRV minus a normal profit margin. That floor is US GAAP's, not an IFRS definition.")
t(6,"wd","Reversing a write-down","IFRS allows it if value recovers, up to original cost. US GAAP does not allow reversals.")
t(6,"wd","Agricultural inventory","Both IFRS and US GAAP allow it at NRV or fair value less costs to sell, even above cost.", "Agricultural and commodity inventories")
t(6,"wd","Effect of a write-down on ratios","Profitability, liquidity and solvency ratios get worse, but activity ratios improve because their denominators shrink.", "Inventory write-down")
t(6,"lifo","LIFO reserve","FIFO inventory minus LIFO inventory. US LIFO companies must disclose it.")
t(6,"lifo","LIFO liquidation","Selling more units than bought dips into old, cheap layers, so margins and profit jump for a year. Not sustainable; US GAAP requires disclosure. A sharp fall in units is the signal.")
# Module 7
t(7,"model","Cost model","Historical cost minus accumulated depreciation (or amortization) and impairment.")
t(7,"model","Revaluation model","Fair value at the revaluation date minus later depreciation and impairment. IFRS allows it or the cost model for PP&E and intangibles; US GAAP allows only the cost model.")
t(7,"model","Fair value model","IFRS model for investment property, with all changes in profit or loss. Not the model for intangibles.", "Investment property, fair value model")
t(7,"disp","Held for sale","Assets planned to be sold soon. Depreciation stops; carried at the lower of carrying amount and fair value less costs to sell.")
t(7,"disp","Disposed of other than by sale","Spin-off, abandonment or swap. Stays held for use until it leaves, and depreciation continues.")
t(7,"imp","Impairment","A write-down when an asset's carrying amount is more than it can recover.")
t(7,"imp","Recoverable amount","The higher of fair value less costs to sell and value in use.")
t(7,"imp","Fair value less costs to sell","What you'd get by selling the asset, net of selling costs.")
t(7,"imp","Value in use","The present value of the cash flows from keeping and using the asset.")
t(7,"imp","IFRS impairment","Loss = carrying amount minus recoverable amount, in the income statement. Reversals allowed if value recovers.")
t(7,"fv","Fair value through an income approach","Discounts expected cash flows. A longer useful life and a higher salvage value both raise fair value.")
t(7,"fv","Fair value and goodwill","Higher fair values for identifiable assets leave less goodwill. A buyer wanting minimal goodwill prefers assumptions that raise asset values.")
t(7,"rd","Research","The search for new knowledge. Always expensed.")
t(7,"rd","Development","Applying knowledge to a specific product. IFRS capitalizes it once criteria are met; US GAAP generally expenses it.")
t(7,"rd","Capitalizing development and EBITDA","Capitalized costs become amortization, which EBITDA excludes, so the capitalizer has higher EBITDA than an identical company that expenses.")
t(7,"rd","EBITDA multiple","Value divided by EBITDA. Same market value and lower EBITDA means a higher multiple.")
# Module 8
t(8,"pen","Defined benefit (DB) pension plan","The employer promises a specific retirement benefit and bears the risk that the plan's investments fall short.")
t(8,"pen","Net pension liability (asset)","PV of the defined benefit obligation minus the fair value of plan assets. Underfunded means a liability.")
t(8,"pen","Service cost (IFRS pension)","PV of the extra benefit earned by another year of work, including past service cost. Goes to P&L.")
t(8,"pen","Past service cost","Arises when a plan amendment changes benefits for service already given. Reported in P&L under IFRS.")
t(8,"pen","Net interest (IFRS pension)","The discount rate applied to the net pension liability or asset at the start of the year. Goes to P&L.")
t(8,"pen","Remeasurements (IFRS pension)","Actuarial gains and losses plus actual return on plan assets minus the return in net interest. Go to OCI, never recycled.")
t(8,"pen","Actuarial gains and losses","Come from changing assumptions such as life expectancy, turnover, retirement age or salary growth. Longer life expectancy is an actuarial loss in OCI.")
t(8,"lease","Lessee advantages of leasing","Often less costly financing (little or no down payment, often lower fixed rates), less restrictive provisions, less exposure to obsolescence.")
# Module 9
t(9,"inc","Accounting profit (pretax income)","Profit on the income statement, under accounting rules.", "Pretax income")
t(9,"inc","Taxable income","Profit on the tax return, under tax rules.")
t(9,"base","Carrying amount","An asset's or liability's value on the balance sheet.")
t(9,"base","Tax base","The value the tax authority assigns: the amount still deductible for tax in future.")
t(9,"diff","Temporary difference","A carrying amount vs tax base difference that will reverse over time. Creates deferred tax.")
t(9,"diff","Permanent difference","Never reverses (fines, non-deductible premiums, untaxed income). Creates no deferred tax; only makes the effective rate differ from the statutory rate.")
t(9,"dt","Deferred tax liability (DTL)","Accounting profit above taxable income now: less tax today, more later. For an asset, carrying amount above tax base.")
t(9,"dt","Deferred tax asset (DTA)","Taxable income above accounting profit now: more tax today, less later. For an asset, carrying amount below tax base.")
t(9,"dt","Valuation allowance","US GAAP reduction to a DTA when it's more likely than not the company won't earn enough future taxable income to use it.", "Valuation allowance (US GAAP)")
t(9,"dt","Deferred tax follows the item","Deferred tax is recorded wherever the underlying change was recorded.")
t(9,"dt","Revaluation down and deferred tax","Books revalued down, tax base unchanged: carrying amount below tax base creates a DTA = decrease × tax rate.")
# Module 10
t(10,"cons","Conservative accounting","Choices that lower current reported earnings and position, and may raise them later (later revenue, bigger provisions, faster depreciation).")
t(10,"cons","Aggressive accounting","Choices that raise current earnings or position, and may lower them later (early revenue, capitalizing costs, longer useful lives).")
t(10,"cons","Sustainable earnings","Earnings expected to continue. One-time gains aren't sustainable; conservative accounting alone only moves earnings later.")
t(10,"cons","Revenue timing and conservatism","Most aggressive: all revenue at the start. Middle: as costs are incurred. Most conservative: only on completion.")
# Module 11
t(11,"dup","DuPont analysis","Splits ROE to show whether it comes from profitability, efficiency or borrowing.")
t(11,"dup","Tax burden","NI / EBT = 1 − effective tax rate. A lower tax rate means a higher ratio, so higher ROE.")
t(11,"dup","Interest burden","EBT / EBIT. Falls when interest expense rises.")
t(11,"dup","Lower DSO and ROE","Smaller receivables mean higher asset turnover and higher ROE.")
t(11,"dup","Sustainable growth rate","How fast a company can grow using only retained earnings, without changing its capital structure.")
t(11,"solv","Solvency","The ability to meet long-term obligations.")
t(11,"solv","Leverage ratios","Come from the balance sheet: how much is financed with debt. Higher debt-based leverage means more financial risk and weaker solvency.")
t(11,"solv","Coverage ratios","Come from the income statement and cash flow statement: whether the company can pay its debt costs.")
# Module 12
t(12,"rev12","Organic growth","Revenue growth from the existing business: volume plus price/mix, together.")
t(12,"rev12","Scope changes","Growth from acquisitions or losses from divestitures, shown separately from organic growth.")
t(12,"rev12","FX impact","Revenue change from currency moves, shown separately from organic growth.")
t(12,"mod","Sales-based pro forma model","Projects revenue first, then each expense and balance sheet item as a percentage of revenue, using historical percentages unless there's a reason to change.")
t(12,"mod","Net working capital (NWC) in a model","Often forecast as a percentage of sales. When revenue grows, NWC grows with it, and that increase uses cash.")

F = []
def f(m, g, name, formula, was=None): F.append((m, g, name, formula, was))
f(2,"eps","WASO","shares at start + new shares × (months outstanding / 12)")
f(2,"eps","Basic EPS","(net income − preferred dividends) / WASO")
f(2,"eps","After-tax interest on convertible debt","face value × coupon rate × (1 − tax rate)")
f(2,"eps","Diluted EPS","(net income − preferred dividends + after-tax interest on convertible debt) / (WASO + shares from conversion)")
f(2,"rev","Revenue to date (input method)","(cumulative costs incurred / current total estimated cost) × contract price")
f(2,"rev","This year's contract revenue","revenue to date − revenue recognized in prior years", "This period's long-term contract revenue")
f(3,"re","Ending retained earnings","beginning RE + net income − dividends declared")
f(3,"re","Goodwill","purchase price − fair value of identifiable net assets")
f(3,"liq","Current ratio","current assets / current liabilities")
f(3,"liq","Quick ratio","(cash + short-term investments + receivables) / current liabilities")
f(3,"liq","Financial leverage","total assets / total equity")
f(4,"cash","Purchases","COGS + ending inventory − beginning inventory")
f(4,"cash","Cash paid to suppliers","purchases − increase in accounts payable")
f(5,"fcf","FCFF","net income + non-cash charges + interest × (1 − tax rate) − fixed capital investment − working capital investment", "FCFF (from net income)")
f(6,"act","Inventory turnover","COGS / average inventory")
f(6,"act","Days of inventory on hand (DOH)","365 / inventory turnover")
f(6,"act","Cash conversion cycle","days of inventory + days of receivables − days of payables")
f(7,"imp","Recoverable amount","max(fair value − costs to sell, value in use)")
f(7,"imp","IFRS impairment loss","carrying amount − recoverable amount")
f(9,"tax","Deferred tax","(carrying amount − tax base) × tax rate (for an asset, positive = DTL, negative = DTA)", "Deferred tax (DTL or DTA)")
f(11,"prof","ROA","net income / average total assets")
f(11,"prof","ROE","net income / average total equity")
f(11,"prof","Net profit margin","net income / revenue")
f(11,"prof","Total asset turnover","revenue / average total assets")
f(11,"prof","Financial leverage (DuPont)","average total assets / average total equity")
f(11,"dup","3-part DuPont","ROE = net profit margin × total asset turnover × financial leverage")
f(11,"dup","ROE from ROA","ROE = ROA × financial leverage")
f(11,"dup","5-part DuPont","ROE = (NI / EBT) × (EBT / EBIT) × (EBIT / revenue) × (revenue / average assets) × (average assets / average equity)")
f(11,"act11","Days of sales outstanding (DSO)","average receivables / (revenue / 365)")
f(11,"act11","Total debt ratio","total debt / total assets")
f(11,"grow","Retention rate (b)","1 − dividend payout ratio")
f(11,"grow","Sustainable growth (g)","retention rate × ROE")
f(12,"m12","Forecast line item","forecast revenue × that item's historical % of revenue", "Projected line item")
f(12,"m12","Pro forma CFO","net income + depreciation − increase in net working capital")

# wrong formulas built from the file's exam traps
DF = [
 ("WASO", "shares at start + new shares", "forgetting to time-weight a mid-year issue"),
 ("Basic EPS", "(net income − preferred dividends) / year-end shares", "year-end count instead of WASO"),
 ("After-tax interest on convertible debt", "face value × coupon rate", "adding the interest before tax"),
 ("This year's contract revenue", "(this year's costs / total estimated cost) × contract price", "this year's percentage on the full contract"),
 ("Ending retained earnings", "beginning RE + net income + dividends declared", "adding dividends"),
 ("Purchases", "COGS + beginning inventory − ending inventory", "flipping the signs"),
 ("Cash paid to suppliers", "purchases + increase in accounts payable", "adding the payables increase"),
 ("FCFF", "net income + non-cash charges + interest − fixed capital investment − working capital investment", "adding back pre-tax interest"),
 ("IFRS impairment loss", "carrying amount − min(fair value − costs to sell, value in use)", "taking the lower amount"),
 ("Recoverable amount", "max(fair value, value in use)", "ignoring costs to sell"),
 ("Financial leverage", "total liabilities / total equity", "liabilities / equity"),
 ("Financial leverage", "total debt / total assets", "debt / assets"),
 ("Sustainable growth (g)", "dividend payout ratio × ROE", "payout instead of retention"),
 ("Pro forma CFO", "net income + depreciation − net working capital", "subtracting the NWC balance, not its increase"),
 ("Pro forma CFO", "net income + depreciation + increase in net working capital", "adding the increase"),
]

def strip_md(s):
    s = re.sub(r"\s*\*\*\[(tested: [^\]]+|[OM]\d+)\]\*\*", "", s)
    s = re.sub(r"\*\*(.+?)\*\*", r"\1", s)
    s = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])", r"\1", s)
    return s.strip()

terms, formulas, kept_t, kept_f = [], [], 0, 0
for (m, g, term, d, was) in T:
    oid = old_t.get(was or term)
    if oid: kept_t += 1
    else: oid = f"fsa-t{next_t}"; next_t += 1
    terms.append({"id": oid, "m": m, "g": g, "term": term, "def": d})
for (m, g, name, fx, was) in F:
    oid = old_f.get(was or name)
    if oid: kept_f += 1
    else: oid = f"fsa-f{next_f}"; next_f += 1
    formulas.append({"id": oid, "m": m, "g": g, "name": name, "formula": fx})
byname = {x["name"]: x["id"] for x in formulas}
decoyF = [{"for": byname[n], "formula": fx, "mistake": why} for n, fx, why in DF]
mods = [{"id": m["id"], "name": re.sub(r"\s*\(\d+ questions?\)$", "", m["name"]), "short": SHORT[m["id"]]} for m in src["modules"]]
traps = [{"m": x["m"], "text": strip_md(x["text"])} for x in src["traps"]]
qs = [{"id": f"fsa-q{q['n']}", "m": q["m"], "src": q["src"], "q": strip_md(q["q"]), "table": q["table"], "o": [strip_md(o) for o in q["o"]], "a": q["a"], "why": strip_md(q["why"])} for q in src["questions"]]

for k in ("term", "def", "id"): assert len({x[k] for x in terms}) == len(terms), "duplicate " + k
for k in ("name", "formula", "id"): assert len({x[k] for x in formulas}) == len(formulas), "duplicate formula " + k
data = {"topic": "fsa", "modules": mods, "terms": terms, "formulas": formulas, "traps": traps, "questions": qs, "decoyTerms": [], "decoyFormulas": decoyF}
open(OUT, "w").write("// Financial Statement Analysis content (tested concepts only). Built by tools/build_fsa.py from CFA-L1-FSA-Master-Reference.md.\n// IDs are permanent: progress is saved against them.\nwindow.TOPIC_CONTENT = window.TOPIC_CONTENT || {};\nwindow.TOPIC_CONTENT.fsa = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n")
print(f"{len(terms)} terms ({kept_t} kept IDs), {len(formulas)} formulas ({kept_f} kept IDs), {len(traps)} traps, {len(qs)} questions, {len(decoyF)} decoy formulas")
retired = sorted(set(old_t.values()) - {x["id"] for x in terms}) + sorted(set(old_f.values()) - {x["id"] for x in formulas})
print("retired:", len(retired))
