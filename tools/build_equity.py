# Builds js/content.js (Equity) from CFA-L1-Equity-Master-Reference.md (tested-concepts version).
# Terms and formulas are transcribed from its Key terms / Formulas sections; traps are parsed from it.
# The question bank is unchanged from the previous version, so questions are carried over as they were.
# IDs are permanent: a concept that survives keeps its old ID (matched by name, or by the old name as a 5th field).
import json, re, sys
md = open(sys.argv[1], encoding="utf-8").read()
old = json.load(open(sys.argv[2]))
OUT = sys.argv[3]
old_t = {x["term"]: x["id"] for x in old["terms"]}
old_f = {x["name"]: x["id"] for x in old["formulas"]}
next_t = max(int(x["id"][1:]) for x in old["terms"]) + 1
next_f = max(int(x["id"][1:]) for x in old["formulas"]) + 1

MODS = [(1, "Market Organization and Structure", "Markets"), (2, "Security Market Indexes", "Indexes"), (3, "Market Efficiency", "Efficiency"),
        (4, "Overview of Equity Securities", "Securities"), (5, "Company Analysis: Past and Present", "Company"),
        (6, "Industry and Competitive Analysis", "Industry"), (8, "Equity Valuation: Concepts and Basic Tools", "Valuation")]

T = []
def t(m, g, term, d, was=None): T.append((m, g, term, d, was))
t(1,"quote","Bid","The highest price a buyer will pay.")
t(1,"quote","Offer / ask","The lowest price a seller will accept.")
t(1,"quote","Spread","Offer minus bid. A narrow spread means the stock is liquid.")
t(1,"order","Takes the market","An order priced to execute immediately against the best quote.")
t(1,"order","Makes a new market","An order posted inside the spread that becomes the new best bid or offer.")
t(1,"order","Makes the market","An order at the existing best quote.")
t(1,"order","Behind the market","An order priced worse than the best quote; it waits.")
t(1,"structure","Quote-driven (dealer) market","Investors trade against dealer inventory.")
t(1,"structure","Order-driven market","Orders are matched by rules.")
t(1,"structure","Brokered market","A broker finds a counterparty for large, illiquid or unique positions.")
t(1,"intermediary","Broker","An agent who finds a counterparty and earns a commission.")
t(1,"intermediary","Dealer","A principal who supplies liquidity from inventory and earns the spread.")
t(1,"intermediary","Investment bank","Helps issue new securities.")
t(1,"intermediary","Securitizer","Pools assets and issues claims backed by the pool.")
t(1,"position","Long position","Owns the asset; loss capped at the purchase price, upside unlimited.")
t(1,"position","Short position","Borrows and sells the security, later buys it back to return it; maximum gain capped, maximum loss theoretically unlimited.")
t(1,"margin","Margin / leverage","Buying with borrowed money.")
t(1,"margin","Initial margin","The equity percentage put up to open a position.")
t(1,"margin","Maintenance margin","The minimum equity percentage that must be kept; falling below it triggers a margin call.")
t(2,"index","Security market index","A number representing a market, segment or asset class; built as a portfolio of constituent securities and valued regularly from their prices.")
t(2,"return","Price return index","Counts only prices. Equal to the total return version at inception.")
t(2,"return","Total return index","Counts prices plus reinvested income (dividends and interest). Higher than the price return version after income is paid.")
t(2,"weight","Price-weighted index","Weighted like the Dow; tilts toward high-priced stocks.")
t(2,"weight","Equal-weighted index","Every constituent gets the same weight; tilts toward small companies and needs frequent rebalancing.")
t(2,"weight","Market-cap weighted index","Weighted like the S&P 500; tilts toward large companies.")
t(2,"weight","Float-adjusted market-cap weighted index","The real S&P method; counts only publicly tradable shares.")
t(2,"maint","Rebalancing","Resetting weights back to target; mainly needed for equal-weighted indexes. Cap-weighted indexes are largely self-adjusting.")
t(2,"maint","Reconstitution","Changing the index membership; triggers a rebalance and keeps the index representative.")
t(2,"itype","Multi-market index","An equity index covering multiple countries.")
t(2,"itype","Sector index","An equity index sliced by industry.")
t(2,"itype","Style index","An equity index built on size and value/growth.")
t(3,"eff","Informationally efficient market","Prices reflect information quickly and rationally. Efficiency is a continuum, not all-or-nothing.")
t(3,"eff","Market inefficiency","The gap between market value and intrinsic value; only that gap can be profited from.")
t(3,"form","Weak form efficiency","Prices reflect all past price and volume data, so technical analysis cannot earn abnormal returns.")
t(3,"form","Semi-strong form efficiency","Prices reflect all public information, so public-information fundamental analysis cannot earn abnormal returns without a comparative advantage.")
t(3,"form","Strong form efficiency","Prices reflect public and private information, so even insiders cannot profit. Markets generally aren't strong-form efficient (insider-trading laws are the proof).")
t(3,"factor","Factors that raise efficiency","More market participants and analysts, cheaper and wider information, and easier, cheaper trading.")
t(3,"factor","Factors that lower efficiency","Short-sale restrictions, transaction costs and limits to arbitrage.")
t(3,"effect","Size effect","Small-cap shares outperform on a risk-adjusted basis.")
t(3,"effect","Value effect","Low P/E, low P/B and high-yield shares outperform.")
t(3,"factor","Data mining / snooping","Testing many strategies guarantees some look profitable by chance; a discovered pattern is a candidate anomaly needing validation.")
t(4,"claim","Debt","A contractual obligation.")
t(4,"claim","Equity","A residual claim with no obligation to pay dividends.")
t(4,"claim","Common shares","Ownership with voting rights, a residual claim and discretionary dividends.")
t(4,"claim","Preference shares","Rank above common for dividends and liquidation, usually no vote, fixed dividend that is not a contractual obligation.")
t(4,"pref","Cumulative preference share","Skipped dividends accrue and must be settled before common dividends resume.")
t(4,"pref","Non-cumulative preference share","Skipped dividends are forfeited.")
t(4,"pref","Participating preference share","Shares in extra profits or liquidation proceeds; common for small, risky firms.")
t(4,"pref","Convertible preference share","Can be converted into common shares; popular in VC/PE for risky, unseasoned firms.")
t(4,"pref","Callable preference share","The issuer can redeem it, which makes it riskier to the investor.")
t(4,"pref","Putable preference share","The investor can sell it back, which makes it less risky to the investor.")
t(5,"start","Operating company analysis","Begins with the business model and revenue drivers.")
t(5,"start","The bank exception","A bank's analysis begins with the balance sheet, because it holds the core earning assets, funding, liquidity and risk exposures.")
t(6,"class","Commercial classification systems","GICS, ICB and Refinitiv: global, product/service based, updated regularly.")
t(6,"class","Government classification systems","SIC, NAICS and ISIC: production based, country specific, updated infrequently.")
t(6,"class","Limitation of hierarchical schemes","A diversified company is assigned to a single principal group even when it operates in several industries.")
t(8,"iv","Undervalued","Intrinsic value is above market price (buy).")
t(8,"iv","Overvalued","Intrinsic value is below market price.")
t(8,"iv","Fairly valued","Intrinsic value is approximately equal to market price.")
t(8,"model","Present value (DCF) models","Dividend discount and free-cash-flow-to-equity models; most rigorous but input-sensitive.")
t(8,"model","Multiples (market) models","Relative valuation; simple, but comparability is the weakness.")
t(8,"model","Asset-based models","Assets minus liabilities; good for asset-heavy firms and liquidation, weak for intangible-heavy going concerns.")
t(8,"model","Model selection","The tested skill: match the model to the cash flows the question gives.")
t(8,"dist","Stock dividend / stock split","Leaves total value and proportional ownership unchanged.")
t(8,"dist","Share repurchase","Reduces shares outstanding.")
t(8,"mult","P/E ratio","The most common price multiple; comes in trailing and forward versions.")
t(8,"mult","P/S ratio","A price multiple useful when earnings are negative.")
t(8,"mult","P/CF ratio","A price multiple that is harder to manipulate than earnings.")

F = []
def f(m, g, name, fx, was=None): F.append((m, g, name, fx, was))
f(1,"quote","Spread","Best offer − best bid")
f(1,"quote","Best bid (given offer and spread)","Best offer − spread")
f(1,"lev","Leverage ratio","Position value / equity")
f(1,"lev","Maximum leverage","1 / minimum margin requirement")
f(1,"call","Margin call price (long)","P0 × (1 − initial margin) / (1 − maintenance margin)")
f(2,"ret","Price return index value","Σ(nᵢ × Pᵢ) / Divisor")
f(2,"ret","Single-period price return","(V₁ − V₀) / V₀")
f(2,"ret","Single-period total return","(V₁ − V₀ + income) / V₀")
f(2,"ret","Multi-period index value","V₀ × (1 + r₁)(1 + r₂)…(1 + r_T)")
f(2,"w","Price weight","Pᵢ / ΣP")
f(2,"w","Equal weight","1 / N")
f(2,"w","Market-cap weight","QᵢPᵢ / ΣQⱼPⱼ")
f(2,"w","Float-adjusted weight","fᵢQᵢPᵢ / ΣfⱼQⱼPⱼ")
f(8,"pref","Perpetual preferred value","D / r")
f(8,"pref","Term / retractable preferred value","PV of dividends to the date + PV of redemption price")
f(8,"ddm","Finite-horizon DDM","Σ Dₜ/(1 + r)ᵗ + P_N/(1 + r)^N")
f(8,"ddm","Gordon growth model","D₁ / (r − g), where D₁ = D₀(1 + g)")
f(8,"g","Sustainable growth","(1 − payout) × ROE")
f(8,"g","ROE (for sustainable growth)","ROA × leverage")
f(8,"pe","Justified forward P/E","payout / (r − g)")

DT = [(3, "effect", "January effect")]   # named in the question bank, used only as a wrong option
DF = [("Best bid (given offer and spread)", "Best offer + spread"), ("Maximum leverage", "1 / (1 − minimum margin requirement)"),
      ("Gordon growth model", "D₀ / (r − g)"), ("Sustainable growth", "payout × ROE"), ("Sustainable growth", "(1 − payout) × ROA"),
      ("Term / retractable preferred value", "D / r")]

def strip_md(s):
    s = re.sub(r"\*\*(.+?)\*\*", r"\1", s)
    return re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])", r"\1", s).strip()
traps = []
for part in re.split(r"\n## Module (\d+)", md)[1:]:
    pass
chunks = re.split(r"\n## Module (\d+) ", md)
for i in range(1, len(chunks), 2):
    m, body = int(chunks[i]), chunks[i + 1]
    sec = re.search(r"### Exam traps\n(.*?)(\n---|\n## |\Z)", body, re.S)
    if sec: traps += [{"m": m, "text": strip_md(l.strip()[2:])} for l in sec.group(1).split("\n") if l.strip().startswith("- ")]

terms, formulas, kt, kf = [], [], 0, 0
for (m, g, term, d, was) in T:
    oid = old_t.get(was or term)
    if oid: kt += 1
    else: oid = f"t{next_t}"; next_t += 1
    terms.append({"id": oid, "m": m, "g": g, "term": term, "def": d})
for (m, g, name, fx, was) in F:
    oid = old_f.get(was or name)
    if oid: kf += 1
    else: oid = f"f{next_f}"; next_f += 1
    formulas.append({"id": oid, "m": m, "g": g, "name": name, "formula": fx})
byname = {x["name"]: x["id"] for x in formulas}
for k in ("term", "def", "id"): assert len({x[k] for x in terms}) == len(terms), k
for k in ("name", "formula", "id"): assert len({x[k] for x in formulas}) == len(formulas), k
data = {"topic": "equity", "modules": [{"id": i, "name": n, "short": s} for i, n, s in MODS], "terms": terms,
        "decoyTerms": [{"m": m, "g": g, "term": x} for m, g, x in DT],
        "decoyFormulas": [{"for": byname[n], "formula": fx} for n, fx in DF],
        "formulas": formulas, "traps": traps, "questions": old["questions"]}
open(OUT, "w").write("// Equity content (tested concepts only). Built by tools/build_equity.py from CFA-L1-Equity-Master-Reference.md.\n// IDs are permanent: progress is saved against them.\nwindow.CONTENT = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n")
print(f"{len(terms)} terms ({kt} kept), {len(formulas)} formulas ({kf} kept), {len(traps)} traps, {len(old['questions'])} questions")
print("retired:", sorted(set(old_t.values()) - {x['id'] for x in terms}, key=lambda s: int(s[1:])), sorted(set(old_f.values()) - {x['id'] for x in formulas}, key=lambda s: int(s[1:])))
