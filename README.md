# Equity Firm Story

A tiny Kairosoft-style office game for studying CFA Level I Equity. You run an investment firm: clients bring deals, each deal is a concept from your study file, and answering right grows the firm from a home office to a skyscraper.

## How it works

- **Content** lives in `js/content.js` and comes only from `CFA-L1-Equity-Master-Reference.md` (97 terms, 25 formulas, 21 exam traps, 46 questions).
- **Spaced repetition**: each concept moves through boxes with reviews after 1, 3, 7, 14 and 30 days. A miss sends it back to today.
- **Staff** each own one module. If a module has overdue concepts, that analyst gets sleepy and earns half fees. Three right in a row puts them on fire.
- **Economy**: fees (cash) pay for hires and office moves; AUM unlocks bigger offices.
- Progress saves in the browser (localStorage) on each device.

## Run it

It's a static site. Open `index.html` through any web server, or use the GitHub Pages link.

## Files

- `index.html`, `css/style.css` — layout and Game Dev Story-style windows
- `js/content.js` — Equity study content
- `content/<topic>-cards.md` — card files (terms, rules, formulas) written to the card spec; build with `python3 tools/build_cards.py content/fsa-cards.md js/content-fsa.js fsa fsa2`
- `js/content-fsa.js` — FSA content, built from `content/fsa-cards.md`
- `js/game.js` — game logic, spaced repetition, windows
- `js/scene.js` — office scene, camera, client visits, effects
- `js/sprites.js` — art layer (real sprites from `js/assets.js`, placeholder pixels otherwise)
- `js/audio.js` — synthesized sounds

## Art credits

- *Pixel Life: Office Essentials* by Chris Perich — CC BY 4.0
- *Pixel Office* by 2dPig — CC0
