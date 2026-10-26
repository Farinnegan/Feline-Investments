// Equity content (tested concepts only). Built by tools/build_equity.py from CFA-L1-Equity-Master-Reference.md.
// IDs are permanent: progress is saved against them.
window.CONTENT = {
 "topic": "equity",
 "modules": [
  {
   "id": 1,
   "name": "Market Organization and Structure",
   "short": "Markets"
  },
  {
   "id": 2,
   "name": "Security Market Indexes",
   "short": "Indexes"
  },
  {
   "id": 3,
   "name": "Market Efficiency",
   "short": "Efficiency"
  },
  {
   "id": 4,
   "name": "Overview of Equity Securities",
   "short": "Securities"
  },
  {
   "id": 5,
   "name": "Company Analysis: Past and Present",
   "short": "Company"
  },
  {
   "id": 6,
   "name": "Industry and Competitive Analysis",
   "short": "Industry"
  },
  {
   "id": 8,
   "name": "Equity Valuation: Concepts and Basic Tools",
   "short": "Valuation"
  }
 ],
 "terms": [
  {
   "id": "t2",
   "m": 1,
   "g": "quote",
   "term": "Bid",
   "def": "The highest price a buyer will pay."
  },
  {
   "id": "t3",
   "m": 1,
   "g": "quote",
   "term": "Offer / ask",
   "def": "The lowest price a seller will accept."
  },
  {
   "id": "t4",
   "m": 1,
   "g": "quote",
   "term": "Spread",
   "def": "Offer minus bid. A narrow spread means the stock is liquid."
  },
  {
   "id": "t5",
   "m": 1,
   "g": "order",
   "term": "Takes the market",
   "def": "An order priced to execute immediately against the best quote."
  },
  {
   "id": "t6",
   "m": 1,
   "g": "order",
   "term": "Makes a new market",
   "def": "An order posted inside the spread that becomes the new best bid or offer."
  },
  {
   "id": "t7",
   "m": 1,
   "g": "order",
   "term": "Makes the market",
   "def": "An order at the existing best quote."
  },
  {
   "id": "t8",
   "m": 1,
   "g": "order",
   "term": "Behind the market",
   "def": "An order priced worse than the best quote; it waits."
  },
  {
   "id": "t9",
   "m": 1,
   "g": "structure",
   "term": "Quote-driven (dealer) market",
   "def": "Investors trade against dealer inventory."
  },
  {
   "id": "t10",
   "m": 1,
   "g": "structure",
   "term": "Order-driven market",
   "def": "Orders are matched by rules."
  },
  {
   "id": "t11",
   "m": 1,
   "g": "structure",
   "term": "Brokered market",
   "def": "A broker finds a counterparty for large, illiquid or unique positions."
  },
  {
   "id": "t12",
   "m": 1,
   "g": "intermediary",
   "term": "Broker",
   "def": "An agent who finds a counterparty and earns a commission."
  },
  {
   "id": "t13",
   "m": 1,
   "g": "intermediary",
   "term": "Dealer",
   "def": "A principal who supplies liquidity from inventory and earns the spread."
  },
  {
   "id": "t14",
   "m": 1,
   "g": "intermediary",
   "term": "Investment bank",
   "def": "Helps issue new securities."
  },
  {
   "id": "t15",
   "m": 1,
   "g": "intermediary",
   "term": "Securitizer",
   "def": "Pools assets and issues claims backed by the pool."
  },
  {
   "id": "t16",
   "m": 1,
   "g": "position",
   "term": "Long position",
   "def": "Owns the asset; loss capped at the purchase price, upside unlimited."
  },
  {
   "id": "t17",
   "m": 1,
   "g": "position",
   "term": "Short position",
   "def": "Borrows and sells the security, later buys it back to return it; maximum gain capped, maximum loss theoretically unlimited."
  },
  {
   "id": "t18",
   "m": 1,
   "g": "margin",
   "term": "Margin / leverage",
   "def": "Buying with borrowed money."
  },
  {
   "id": "t19",
   "m": 1,
   "g": "margin",
   "term": "Initial margin",
   "def": "The equity percentage put up to open a position."
  },
  {
   "id": "t20",
   "m": 1,
   "g": "margin",
   "term": "Maintenance margin",
   "def": "The minimum equity percentage that must be kept; falling below it triggers a margin call."
  },
  {
   "id": "t30",
   "m": 2,
   "g": "index",
   "term": "Security market index",
   "def": "A number representing a market, segment or asset class; built as a portfolio of constituent securities and valued regularly from their prices."
  },
  {
   "id": "t31",
   "m": 2,
   "g": "return",
   "term": "Price return index",
   "def": "Counts only prices. Equal to the total return version at inception."
  },
  {
   "id": "t32",
   "m": 2,
   "g": "return",
   "term": "Total return index",
   "def": "Counts prices plus reinvested income (dividends and interest). Higher than the price return version after income is paid."
  },
  {
   "id": "t34",
   "m": 2,
   "g": "weight",
   "term": "Price-weighted index",
   "def": "Weighted like the Dow; tilts toward high-priced stocks."
  },
  {
   "id": "t35",
   "m": 2,
   "g": "weight",
   "term": "Equal-weighted index",
   "def": "Every constituent gets the same weight; tilts toward small companies and needs frequent rebalancing."
  },
  {
   "id": "t36",
   "m": 2,
   "g": "weight",
   "term": "Market-cap weighted index",
   "def": "Weighted like the S&P 500; tilts toward large companies."
  },
  {
   "id": "t37",
   "m": 2,
   "g": "weight",
   "term": "Float-adjusted market-cap weighted index",
   "def": "The real S&P method; counts only publicly tradable shares."
  },
  {
   "id": "t38",
   "m": 2,
   "g": "maint",
   "term": "Rebalancing",
   "def": "Resetting weights back to target; mainly needed for equal-weighted indexes. Cap-weighted indexes are largely self-adjusting."
  },
  {
   "id": "t39",
   "m": 2,
   "g": "maint",
   "term": "Reconstitution",
   "def": "Changing the index membership; triggers a rebalance and keeps the index representative."
  },
  {
   "id": "t40",
   "m": 2,
   "g": "itype",
   "term": "Multi-market index",
   "def": "An equity index covering multiple countries."
  },
  {
   "id": "t41",
   "m": 2,
   "g": "itype",
   "term": "Sector index",
   "def": "An equity index sliced by industry."
  },
  {
   "id": "t42",
   "m": 2,
   "g": "itype",
   "term": "Style index",
   "def": "An equity index built on size and value/growth."
  },
  {
   "id": "t50",
   "m": 3,
   "g": "eff",
   "term": "Informationally efficient market",
   "def": "Prices reflect information quickly and rationally. Efficiency is a continuum, not all-or-nothing."
  },
  {
   "id": "t51",
   "m": 3,
   "g": "eff",
   "term": "Market inefficiency",
   "def": "The gap between market value and intrinsic value; only that gap can be profited from."
  },
  {
   "id": "t52",
   "m": 3,
   "g": "form",
   "term": "Weak form efficiency",
   "def": "Prices reflect all past price and volume data, so technical analysis cannot earn abnormal returns."
  },
  {
   "id": "t53",
   "m": 3,
   "g": "form",
   "term": "Semi-strong form efficiency",
   "def": "Prices reflect all public information, so public-information fundamental analysis cannot earn abnormal returns without a comparative advantage."
  },
  {
   "id": "t54",
   "m": 3,
   "g": "form",
   "term": "Strong form efficiency",
   "def": "Prices reflect public and private information, so even insiders cannot profit. Markets generally aren't strong-form efficient (insider-trading laws are the proof)."
  },
  {
   "id": "t144",
   "m": 3,
   "g": "factor",
   "term": "Factors that raise efficiency",
   "def": "More market participants and analysts, cheaper and wider information, and easier, cheaper trading."
  },
  {
   "id": "t145",
   "m": 3,
   "g": "factor",
   "term": "Factors that lower efficiency",
   "def": "Short-sale restrictions, transaction costs and limits to arbitrage."
  },
  {
   "id": "t55",
   "m": 3,
   "g": "effect",
   "term": "Size effect",
   "def": "Small-cap shares outperform on a risk-adjusted basis."
  },
  {
   "id": "t56",
   "m": 3,
   "g": "effect",
   "term": "Value effect",
   "def": "Low P/E, low P/B and high-yield shares outperform."
  },
  {
   "id": "t57",
   "m": 3,
   "g": "factor",
   "term": "Data mining / snooping",
   "def": "Testing many strategies guarantees some look profitable by chance; a discovered pattern is a candidate anomaly needing validation."
  },
  {
   "id": "t70",
   "m": 4,
   "g": "claim",
   "term": "Debt",
   "def": "A contractual obligation."
  },
  {
   "id": "t71",
   "m": 4,
   "g": "claim",
   "term": "Equity",
   "def": "A residual claim with no obligation to pay dividends."
  },
  {
   "id": "t72",
   "m": 4,
   "g": "claim",
   "term": "Common shares",
   "def": "Ownership with voting rights, a residual claim and discretionary dividends."
  },
  {
   "id": "t76",
   "m": 4,
   "g": "claim",
   "term": "Preference shares",
   "def": "Rank above common for dividends and liquidation, usually no vote, fixed dividend that is not a contractual obligation."
  },
  {
   "id": "t77",
   "m": 4,
   "g": "pref",
   "term": "Cumulative preference share",
   "def": "Skipped dividends accrue and must be settled before common dividends resume."
  },
  {
   "id": "t78",
   "m": 4,
   "g": "pref",
   "term": "Non-cumulative preference share",
   "def": "Skipped dividends are forfeited."
  },
  {
   "id": "t79",
   "m": 4,
   "g": "pref",
   "term": "Participating preference share",
   "def": "Shares in extra profits or liquidation proceeds; common for small, risky firms."
  },
  {
   "id": "t80",
   "m": 4,
   "g": "pref",
   "term": "Convertible preference share",
   "def": "Can be converted into common shares; popular in VC/PE for risky, unseasoned firms."
  },
  {
   "id": "t81",
   "m": 4,
   "g": "pref",
   "term": "Callable preference share",
   "def": "The issuer can redeem it, which makes it riskier to the investor."
  },
  {
   "id": "t82",
   "m": 4,
   "g": "pref",
   "term": "Putable preference share",
   "def": "The investor can sell it back, which makes it less risky to the investor."
  },
  {
   "id": "t100",
   "m": 5,
   "g": "start",
   "term": "Operating company analysis",
   "def": "Begins with the business model and revenue drivers."
  },
  {
   "id": "t101",
   "m": 5,
   "g": "start",
   "term": "The bank exception",
   "def": "A bank's analysis begins with the balance sheet, because it holds the core earning assets, funding, liquidity and risk exposures."
  },
  {
   "id": "t110",
   "m": 6,
   "g": "class",
   "term": "Commercial classification systems",
   "def": "GICS, ICB and Refinitiv: global, product/service based, updated regularly."
  },
  {
   "id": "t111",
   "m": 6,
   "g": "class",
   "term": "Government classification systems",
   "def": "SIC, NAICS and ISIC: production based, country specific, updated infrequently."
  },
  {
   "id": "t112",
   "m": 6,
   "g": "class",
   "term": "Limitation of hierarchical schemes",
   "def": "A diversified company is assigned to a single principal group even when it operates in several industries."
  },
  {
   "id": "t130",
   "m": 8,
   "g": "iv",
   "term": "Undervalued",
   "def": "Intrinsic value is above market price (buy)."
  },
  {
   "id": "t131",
   "m": 8,
   "g": "iv",
   "term": "Overvalued",
   "def": "Intrinsic value is below market price."
  },
  {
   "id": "t132",
   "m": 8,
   "g": "iv",
   "term": "Fairly valued",
   "def": "Intrinsic value is approximately equal to market price."
  },
  {
   "id": "t133",
   "m": 8,
   "g": "model",
   "term": "Present value (DCF) models",
   "def": "Dividend discount and free-cash-flow-to-equity models; most rigorous but input-sensitive."
  },
  {
   "id": "t134",
   "m": 8,
   "g": "model",
   "term": "Multiples (market) models",
   "def": "Relative valuation; simple, but comparability is the weakness."
  },
  {
   "id": "t135",
   "m": 8,
   "g": "model",
   "term": "Asset-based models",
   "def": "Assets minus liabilities; good for asset-heavy firms and liquidation, weak for intangible-heavy going concerns."
  },
  {
   "id": "t143",
   "m": 8,
   "g": "model",
   "term": "Model selection",
   "def": "The tested skill: match the model to the cash flows the question gives."
  },
  {
   "id": "t136",
   "m": 8,
   "g": "dist",
   "term": "Stock dividend / stock split",
   "def": "Leaves total value and proportional ownership unchanged."
  },
  {
   "id": "t137",
   "m": 8,
   "g": "dist",
   "term": "Share repurchase",
   "def": "Reduces shares outstanding."
  },
  {
   "id": "t141",
   "m": 8,
   "g": "mult",
   "term": "P/E ratio",
   "def": "The most common price multiple; comes in trailing and forward versions."
  },
  {
   "id": "t139",
   "m": 8,
   "g": "mult",
   "term": "P/S ratio",
   "def": "A price multiple useful when earnings are negative."
  },
  {
   "id": "t140",
   "m": 8,
   "g": "mult",
   "term": "P/CF ratio",
   "def": "A price multiple that is harder to manipulate than earnings."
  }
 ],
 "decoyTerms": [
  {
   "m": 3,
   "g": "effect",
   "term": "January effect"
  }
 ],
 "decoyFormulas": [
  {
   "for": "f2",
   "formula": "Best offer + spread"
  },
  {
   "for": "f4",
   "formula": "1 / (1 − minimum margin requirement)"
  },
  {
   "for": "f23",
   "formula": "D₀ / (r − g)"
  },
  {
   "for": "f25",
   "formula": "payout × ROE"
  },
  {
   "for": "f25",
   "formula": "(1 − payout) × ROA"
  },
  {
   "for": "f21",
   "formula": "D / r"
  }
 ],
 "formulas": [
  {
   "id": "f1",
   "m": 1,
   "g": "quote",
   "name": "Spread",
   "formula": "Best offer − best bid"
  },
  {
   "id": "f2",
   "m": 1,
   "g": "quote",
   "name": "Best bid (given offer and spread)",
   "formula": "Best offer − spread"
  },
  {
   "id": "f3",
   "m": 1,
   "g": "lev",
   "name": "Leverage ratio",
   "formula": "Position value / equity"
  },
  {
   "id": "f4",
   "m": 1,
   "g": "lev",
   "name": "Maximum leverage",
   "formula": "1 / minimum margin requirement"
  },
  {
   "id": "f6",
   "m": 1,
   "g": "call",
   "name": "Margin call price (long)",
   "formula": "P0 × (1 − initial margin) / (1 − maintenance margin)"
  },
  {
   "id": "f10",
   "m": 2,
   "g": "ret",
   "name": "Price return index value",
   "formula": "Σ(nᵢ × Pᵢ) / Divisor"
  },
  {
   "id": "f11",
   "m": 2,
   "g": "ret",
   "name": "Single-period price return",
   "formula": "(V₁ − V₀) / V₀"
  },
  {
   "id": "f12",
   "m": 2,
   "g": "ret",
   "name": "Single-period total return",
   "formula": "(V₁ − V₀ + income) / V₀"
  },
  {
   "id": "f13",
   "m": 2,
   "g": "ret",
   "name": "Multi-period index value",
   "formula": "V₀ × (1 + r₁)(1 + r₂)…(1 + r_T)"
  },
  {
   "id": "f14",
   "m": 2,
   "g": "w",
   "name": "Price weight",
   "formula": "Pᵢ / ΣP"
  },
  {
   "id": "f15",
   "m": 2,
   "g": "w",
   "name": "Equal weight",
   "formula": "1 / N"
  },
  {
   "id": "f16",
   "m": 2,
   "g": "w",
   "name": "Market-cap weight",
   "formula": "QᵢPᵢ / ΣQⱼPⱼ"
  },
  {
   "id": "f17",
   "m": 2,
   "g": "w",
   "name": "Float-adjusted weight",
   "formula": "fᵢQᵢPᵢ / ΣfⱼQⱼPⱼ"
  },
  {
   "id": "f20",
   "m": 8,
   "g": "pref",
   "name": "Perpetual preferred value",
   "formula": "D / r"
  },
  {
   "id": "f21",
   "m": 8,
   "g": "pref",
   "name": "Term / retractable preferred value",
   "formula": "PV of dividends to the date + PV of redemption price"
  },
  {
   "id": "f22",
   "m": 8,
   "g": "ddm",
   "name": "Finite-horizon DDM",
   "formula": "Σ Dₜ/(1 + r)ᵗ + P_N/(1 + r)^N"
  },
  {
   "id": "f23",
   "m": 8,
   "g": "ddm",
   "name": "Gordon growth model",
   "formula": "D₁ / (r − g), where D₁ = D₀(1 + g)"
  },
  {
   "id": "f25",
   "m": 8,
   "g": "g",
   "name": "Sustainable growth",
   "formula": "(1 − payout) × ROE"
  },
  {
   "id": "f26",
   "m": 8,
   "g": "g",
   "name": "ROE (for sustainable growth)",
   "formula": "ROA × leverage"
  },
  {
   "id": "f27",
   "m": 8,
   "g": "pe",
   "name": "Justified forward P/E",
   "formula": "payout / (r − g)"
  }
 ],
 "traps": [
  {
   "m": 1,
   "text": "Given the offer and the spread, the bid is offer minus spread. Never add the spread to the offer."
  },
  {
   "m": 1,
   "text": "Read order aggressiveness from the side of the order: for a sell, a lower price is more aggressive; for a buy, a higher price is more aggressive."
  },
  {
   "m": 1,
   "text": "Initial margin sets starting equity; maintenance margin sets the trigger ratio. The initial equity amount is not the margin call price."
  },
  {
   "m": 1,
   "text": "Max leverage divides by the equity fraction, never the borrowed fraction."
  },
  {
   "m": 1,
   "text": "A short is defined by borrowing then selling, not merely by selling."
  },
  {
   "m": 2,
   "text": "\"At inception\" overrides the later relationship: equal at launch, total return higher only after dividends."
  },
  {
   "m": 2,
   "text": "Keep the three tilts straight: price-weighted tilts to high-priced stocks, cap-weighted tilts to large companies, equal-weighted tilts to small companies."
  },
  {
   "m": 2,
   "text": "Equal-weighted indexes need frequent rebalancing; cap-weighted do not."
  },
  {
   "m": 3,
   "text": "An observed anomaly is not automatic proof of an exploitable inefficiency (model error, data mining, transaction costs, disappearing effects)."
  },
  {
   "m": 3,
   "text": "Fundamental analysis still matters in a semi-strong market; abnormal returns require a comparative advantage, such as a better earnings-surprise forecast."
  },
  {
   "m": 3,
   "text": "Fama–French three-factor model makes the value \"anomaly\" disappear, suggesting it is risk compensation."
  },
  {
   "m": 4,
   "text": "A question may give two valid reasons a company issues equity and make \"both\" the answer; do not stop at the first true statement."
  },
  {
   "m": 4,
   "text": "Keep preference-share features in their lanes; convertible = exchangeable into common, cumulative = unpaid dividends accrue, putable = investor's sell-back option."
  },
  {
   "m": 5,
   "text": "Do not apply the ordinary \"revenue first\" sequence to a bank."
  },
  {
   "m": 6,
   "text": "Industry classification systems are developed by both government agencies and commercial entities."
  },
  {
   "m": 6,
   "text": "The hierarchical limitation is the one-group assignment, not lack of coverage or updating."
  },
  {
   "m": 8,
   "text": "The mock tests model selection as much as arithmetic; most wrong answers apply a familiar model that does not fit the cash flows."
  },
  {
   "m": 8,
   "text": "Gordon uses next year's dividend D₁, not this year's D₀; do not use Gordon when an explicit terminal sale price is supplied."
  },
  {
   "m": 8,
   "text": "A retractable/term preferred valued as a perpetuity ignores the redemption payment and undervalues it."
  },
  {
   "m": 8,
   "text": "Sustainable growth uses retention (not payout); convert ROA to ROE with leverage."
  },
  {
   "m": 8,
   "text": "Required return sits in the denominator of justified P/E, so a higher required return lowers the multiple."
  },
  {
   "m": 8,
   "text": "A low multiple is not proof of undervaluation unless the benchmark and fundamentals are comparable."
  }
 ],
 "questions": [
  {
   "id": "q1",
   "m": 1,
   "q": "A stock is quoted with a best offer of $41.80 and a bid offer spread of $0.30. The best bid is closest to:",
   "o": [
    "$41.50",
    "$41.80",
    "$42.10"
   ],
   "a": 0,
   "why": "Bid = 41.80 − 0.30 = 41.50"
  },
  {
   "id": "q2",
   "m": 1,
   "q": "A stock is quoted at $26.10 bid and $26.30 offered. A new sell limit order at $26.20 most likely:",
   "o": [
    "takes the market",
    "makes a new market",
    "sits behind the market"
   ],
   "a": 1,
   "why": "Sell at 26.20 beats the 26.30 offer, inside the spread → new market"
  },
  {
   "id": "q3",
   "m": 1,
   "q": "A stock is quoted at $73.40 bid and $73.60 offered. A new buy limit order at $73.20 most likely:",
   "o": [
    "takes the market",
    "makes the market",
    "sits behind the market"
   ],
   "a": 2,
   "why": "Buy at 73.20 is below the 73.40 bid → behind the market"
  },
  {
   "id": "q4",
   "m": 1,
   "q": "A client wants to sell an unusually large block of a thinly traded company's shares without forcing a dealer to hold the position. The trade is most appropriately arranged in a:",
   "o": [
    "brokered market",
    "continuous order driven market",
    "quote driven market"
   ],
   "a": 0,
   "why": "Large illiquid block a dealer won't inventory → brokered market"
  },
  {
   "id": "q5",
   "m": 1,
   "q": "The service most directly supplied by a securities dealer is:",
   "o": [
    "liquidity",
    "credit rating",
    "security issuance advice"
   ],
   "a": 0,
   "why": "Dealers supply liquidity/immediacy from inventory"
  },
  {
   "id": "q6",
   "m": 1,
   "q": "An intermediary purchases a portfolio of loans, places them in a pool, and sells claims backed by the pool. The intermediary is acting as a:",
   "o": [
    "broker",
    "dealer",
    "securitizer"
   ],
   "a": 2,
   "why": "Pooling assets and issuing claims = securitization"
  },
  {
   "id": "q7",
   "m": 1,
   "q": "An investor creates a short position in listed shares by:",
   "o": [
    "borrowing and then selling the shares",
    "selling shares already owned",
    "buying the shares with borrowed cash"
   ],
   "a": 0,
   "why": "Short = borrow then sell"
  },
  {
   "id": "q8",
   "m": 1,
   "q": "For an unhedged short sale of a common share, the investor's maximum potential loss is:",
   "o": [
    "limited to the initial margin",
    "limited to the sale proceeds",
    "theoretically unlimited"
   ],
   "a": 2,
   "why": "Price can rise without bound → unlimited loss"
  },
  {
   "id": "q9",
   "m": 1,
   "q": "If a position is financed with a minimum margin requirement of 40 percent, its maximum leverage ratio is closest to:",
   "o": [
    "1.40",
    "1.67",
    "2.50"
   ],
   "a": 2,
   "why": "1 / 0.40 = 2.50"
  },
  {
   "id": "q10",
   "m": 1,
   "q": "An investor purchases a stock at $50 using a 60 percent initial margin. If the maintenance margin is 25 percent, a margin call begins when the stock price falls below:",
   "o": [
    "$20.00",
    "$26.67",
    "$30.00"
   ],
   "a": 1,
   "why": "50 × (1−0.60)/(1−0.25) = 26.67"
  },
  {
   "id": "q11",
   "m": 2,
   "q": "At the date an index provider launches matching price return and total return indexes, their values are most likely:",
   "o": [
    "equal",
    "lower for the price return version",
    "higher for the price return version"
   ],
   "a": 0,
   "why": "Price and total return versions are equal at inception"
  },
  {
   "id": "q12",
   "m": 2,
   "q": "One year after inception, an index's constituent prices are unchanged but the constituents paid positive dividends. Compared with the price return index, the total return index is most likely:",
   "o": [
    "lower",
    "equal",
    "higher"
   ],
   "a": 2,
   "why": "Flat prices, dividends paid → total return higher"
  },
  {
   "id": "q13",
   "m": 2,
   "q": "An equal weighted equity index most likely has a structural tilt toward:",
   "o": [
    "smaller capitalization companies",
    "higher priced shares",
    "larger capitalization companies"
   ],
   "a": 0,
   "why": "Equal weight overweights small caps"
  },
  {
   "id": "q14",
   "m": 2,
   "q": "Maintaining an equal weighted index generally requires:",
   "o": [
    "frequent rebalancing",
    "no rebalancing because weights adjust automatically",
    "rebalancing only when a stock splits"
   ],
   "a": 0,
   "why": "Equal weight drifts, needs frequent rebalancing"
  },
  {
   "id": "q15",
   "m": 2,
   "q": "An index containing large and small companies from twenty developed countries and ten emerging countries is best described as a:",
   "o": [
    "global sector index",
    "multi market equity index",
    "single market broad index"
   ],
   "a": 1,
   "why": "Many countries → multi-market index"
  },
  {
   "id": "q16",
   "m": 2,
   "q": "An index containing only global health care companies is best described as a:",
   "o": [
    "sector equity index",
    "multi market equity index only",
    "broad market equity index"
   ],
   "a": 0,
   "why": "Sliced by industry → sector index (\"global\" doesn't change that)"
  },
  {
   "id": "q17",
   "m": 3,
   "q": "A market in which prices reflect all publicly available information is described as:",
   "o": [
    "weak form efficient",
    "semi strong form efficient",
    "strong form efficient only"
   ],
   "a": 1,
   "why": "All public information = semi-strong form"
  },
  {
   "id": "q18",
   "m": 3,
   "q": "In a semi strong efficient market, a fundamental analyst is most likely to earn abnormal returns by:",
   "o": [
    "applying a widely known price to earnings screen",
    "forecasting an earnings surprise more accurately than competitors",
    "extrapolating last year's sales growth"
   ],
   "a": 1,
   "why": "Abnormal returns need a comparative advantage (better surprise forecast)"
  },
  {
   "id": "q19",
   "m": 3,
   "q": "Which change most likely improves market efficiency?",
   "o": [
    "more analysts covering each issuer",
    "greater restrictions on short sales",
    "longer delays between order entry and execution"
   ],
   "a": 0,
   "why": "More analysts speed information into prices"
  },
  {
   "id": "q20",
   "m": 3,
   "q": "The size effect refers to the historical tendency for:",
   "o": [
    "small capitalization shares to outperform on a risk adjusted basis",
    "low price to earnings shares to outperform",
    "recent winners to continue outperforming"
   ],
   "a": 0,
   "why": "Size effect = small-caps outperform risk-adjusted"
  },
  {
   "id": "q21",
   "m": 3,
   "q": "A strategy that buys shares with low price to earnings ratios is designed to capture the:",
   "o": [
    "size effect",
    "value effect",
    "January effect"
   ],
   "a": 1,
   "why": "Low P/E targets the value effect"
  },
  {
   "id": "q22",
   "m": 3,
   "q": "A researcher finds abnormal returns in a historical sample after testing hundreds of strategies. The finding is best interpreted initially as:",
   "o": [
    "a guaranteed future profit",
    "conclusive proof of market inefficiency",
    "a possible anomaly requiring further validation"
   ],
   "a": 2,
   "why": "Data mining → candidate anomaly needing validation"
  },
  {
   "id": "q23",
   "m": 4,
   "q": "A company may issue equity to:",
   "o": [
    "finance an acquisition only",
    "improve compliance with a debt covenant only",
    "both finance an acquisition and improve covenant compliance"
   ],
   "a": 2,
   "why": "Equity funds an acquisition and helps covenants; both true"
  },
  {
   "id": "q24",
   "m": 4,
   "q": "Preference shares exchangeable into a stated number of common shares are:",
   "o": [
    "convertible",
    "cumulative",
    "participating"
   ],
   "a": 0,
   "why": "Exchangeable into common = convertible"
  },
  {
   "id": "q25",
   "m": 4,
   "q": "A preference share whose unpaid dividends must be settled before common dividends can resume is:",
   "o": [
    "convertible",
    "cumulative",
    "participating"
   ],
   "a": 1,
   "why": "Unpaid dividends accrue = cumulative"
  },
  {
   "id": "q26",
   "m": 4,
   "q": "A putable preference share is generally less risky to the investor because it:",
   "o": [
    "allows the investor to sell the share back on stated terms",
    "allows the issuer to redeem the share",
    "guarantees common share participation"
   ],
   "a": 0,
   "why": "Putable = investor's sell-back option, lowers risk"
  },
  {
   "id": "q27",
   "m": 5,
   "q": "Compared with analysis of most industrial companies, analysis of a bank most appropriately begins with the:",
   "o": [
    "balance sheet",
    "revenue growth rate",
    "cash flow statement"
   ],
   "a": 0,
   "why": "Bank analysis begins with the balance sheet"
  },
  {
   "id": "q28",
   "m": 5,
   "q": "For a non bank operating company, an analyst's initial historical analysis most commonly begins by understanding:",
   "o": [
    "revenue and its drivers",
    "the retraction value of preferred shares",
    "the bid offer spread"
   ],
   "a": 0,
   "why": "Operating company begins with revenue and its drivers"
  },
  {
   "id": "q29",
   "m": 6,
   "q": "Industry classification systems are developed by:",
   "o": [
    "government agencies only",
    "commercial entities only",
    "both government agencies and commercial entities"
   ],
   "a": 2,
   "why": "Both government and commercial entities build them"
  },
  {
   "id": "q30",
   "m": 6,
   "q": "A primary limitation of a strictly hierarchical commercial industry classification is that it:",
   "o": [
    "cannot include public companies",
    "assigns a diversified company to one principal group",
    "is never updated"
   ],
   "a": 1,
   "why": "Hierarchical schemes force a diversified firm into one group"
  },
  {
   "id": "q31",
   "m": 8,
   "q": "An analyst estimates a share's intrinsic value at $46 when its market price is $41. The share appears:",
   "o": [
    "undervalued",
    "fairly valued",
    "overvalued"
   ],
   "a": 0,
   "why": "Intrinsic 46 > price 41 → undervalued"
  },
  {
   "id": "q32",
   "m": 8,
   "q": "To determine whether a traded common share is fairly valued, its market price is most directly compared with its:",
   "o": [
    "par value",
    "book value",
    "intrinsic value"
   ],
   "a": 2,
   "why": "Compare market price to intrinsic value"
  },
  {
   "id": "q33",
   "m": 8,
   "q": "A major disadvantage of price multiples is that:",
   "o": [
    "they cannot support cross sectional comparison",
    "they are difficult to calculate",
    "accounting differences can reduce comparability"
   ],
   "a": 2,
   "why": "Accounting differences reduce comparability"
  },
  {
   "id": "q34",
   "m": 8,
   "q": "A stock dividend most likely:",
   "o": [
    "creates value because the investor owns more shares",
    "leaves total value and proportional ownership unchanged",
    "reduces the number of shares outstanding"
   ],
   "a": 1,
   "why": "Stock dividend leaves total value and ownership unchanged"
  },
  {
   "id": "q35",
   "m": 8,
   "q": "A company performs a two for one stock split. Immediately after the split and ignoring market effects, each shareholder's proportional ownership most likely:",
   "o": [
    "increases",
    "decreases",
    "remains unchanged"
   ],
   "a": 2,
   "why": "A split leaves proportional ownership unchanged"
  },
  {
   "id": "q36",
   "m": 8,
   "q": "An investor expects dividends of $1.20 and $1.30 over the next two years and an end of Year 2 stock price of $24. If the required return is 10 percent, intrinsic value is closest to:",
   "o": [
    "$20.91",
    "$22.00",
    "$24.00"
   ],
   "a": 1,
   "why": "1.20/1.1 + (1.30+24)/1.21 ≈ 22.00"
  },
  {
   "id": "q37",
   "m": 8,
   "q": "A company paid a $2 dividend. Dividends are forecast to grow 7 percent for three years, and the end of Year 3 share price is given. The first dividend used in the valuation should be:",
   "o": [
    "$2.00",
    "$2.07",
    "$2.14"
   ],
   "a": 2,
   "why": "First dividend = 2.00 × 1.07 = 2.14 (D₁, not D₀)"
  },
  {
   "id": "q38",
   "m": 8,
   "q": "When a finite horizon dividend problem supplies an expected sale price at the end of the horizon, the analyst should most likely:",
   "o": [
    "ignore the sale price and use only dividends",
    "discount the dividends and sale price",
    "apply the Gordon model to the current dividend"
   ],
   "a": 1,
   "why": "Discount the dividends and the sale price (not Gordon)"
  },
  {
   "id": "q39",
   "m": 8,
   "q": "A perpetual preferred share pays an annual dividend of $5 and has a required return of 8 percent. If it is non callable and non convertible, intrinsic value is closest to:",
   "o": [
    "$40.00",
    "$62.50",
    "$67.50"
   ],
   "a": 1,
   "why": "5 / 0.08 = 62.50"
  },
  {
   "id": "q40",
   "m": 8,
   "q": "A preferred share is retractable at $50 in three years and currently trades far below $50. If retraction is likely, its value is best estimated as the present value of:",
   "o": [
    "dividends only as a perpetuity",
    "dividends through Year 3 plus $50",
    "$50 only"
   ],
   "a": 1,
   "why": "PV of dividends through Year 3 plus the $50 retraction"
  },
  {
   "id": "q41",
   "m": 8,
   "q": "A preferred share pays quarterly dividends and is retractable after five years. To value it consistently, the analyst should use:",
   "o": [
    "five periods and the annual required return",
    "twenty periods and the quarterly required return",
    "twenty periods and the annual required return"
   ],
   "a": 1,
   "why": "20 quarterly periods and the quarterly required return"
  },
  {
   "id": "q42",
   "m": 8,
   "q": "A company has a dividend payout ratio of 30 percent and return on equity of 12 percent. Its sustainable growth rate is closest to:",
   "o": [
    "3.6 percent",
    "8.4 percent",
    "12.0 percent"
   ],
   "a": 1,
   "why": "(1 − 0.30) × 12% = 8.4%"
  },
  {
   "id": "q43",
   "m": 8,
   "q": "A company has return on assets of 9 percent, leverage of 1.5, and a payout ratio of 40 percent. Sustainable growth is closest to:",
   "o": [
    "5.4 percent",
    "8.1 percent",
    "13.5 percent"
   ],
   "a": 1,
   "why": "ROE = 9% × 1.5 = 13.5%; × (1 − 0.40) = 8.1%"
  },
  {
   "id": "q44",
   "m": 8,
   "q": "Holding payout and required return constant, an increase in sustainable growth causes the justified forward price to earnings multiple to:",
   "o": [
    "decrease",
    "remain unchanged",
    "increase"
   ],
   "a": 2,
   "why": "Higher growth raises the justified multiple"
  },
  {
   "id": "q45",
   "m": 8,
   "q": "Holding payout and growth constant, an increase in required return causes the justified forward price to earnings multiple to:",
   "o": [
    "decrease",
    "remain unchanged",
    "increase"
   ],
   "a": 0,
   "why": "Higher required return (in the denominator) lowers the multiple"
  },
  {
   "id": "q46",
   "m": 8,
   "q": "A company has a payout ratio of 48 percent, a required return of 11 percent, and sustainable growth of 5 percent. Its justified forward price to earnings multiple is closest to:",
   "o": [
    "4.4",
    "8.0",
    "10.5"
   ],
   "a": 1,
   "why": "0.48 / (0.11 − 0.05) = 8.0"
  }
 ]
};
