# Spec: City 2 Indian Wedding Invitation Website

## Objective
Replicate 100% of the visual aesthetic, layout, typography, animations, sound design, and interactions of the Missing Piece Invites 'City 2' wedding invitation website (https://www.missingpieceinvites.com/demos/city-2).

## Tech Stack
- Pure HTML5 semantic markup
- Vanilla CSS3 with Custom Properties, CSS Grid, Flexbox, Keyframes, Media Queries
- Vanilla ES6+ JavaScript (zero external runtime dependencies)
- High-resolution local image assets and original audio soundtrack

## Local Commands
- Dev / Preview: `python3 -m http.server 8000 --directory card`
- Test: `python3 tests/verify_assets_and_markup.py`

## Project Structure
```
card/
├── assets/
│   ├── audio/wedding_soundtrack.mp3
│   └── images/ (hero, cards, breakers, gallery, icons, footer)
├── css/
│   ├── typography.css
│   ├── style.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── music-player.js
│   ├── photo-carousel.js
│   ├── countdown.js
│   └── appear-animations.js
├── index.html
└── SPEC.md
```

## Boundaries
- **Always**: Ensure offline resilience by hosting assets locally, maintain exact typography and responsive breakpoints (<810px, 810-1200px, ≥1200px).
- **Never**: Include tracking pixels, telemetry, or Framer store purchase banners.
