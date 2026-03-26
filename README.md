# Fluent — setup

```bash
npx create-react-app fluent --template typescript
cd fluent
# Replace src/ with the files in this folder
npm start
```

Runs on localhost:3000. No additional dependencies needed — pure React + CSS custom properties.

## File map

```
src/
  App.tsx                    ← entry point, imports tokens + global CSS
  styles/
    tokens.css               ← all CSS custom properties, font import, border-radius reset
    global.css               ← body reset, .page grid texture
  components/
    Button.tsx / .css        ← split serif/sans button, all variants + sizes
    Nav.tsx / .css           ← sticky topbar, wordmark, links, avatar
    Hero.tsx / .css          ← 440px course hero, 3 switchable states
    CourseCard.tsx / .css    ← dark atmospheric card for scroll row
    RequiredCard.tsx / .css  ← parchment card with urgency color coding
    LearnerHome.tsx / .css   ← page composition: Nav + Hero + scroll row + required grid
```

## What to do first on localhost

1. Get it rendering — `npm start`, confirm fonts load (Playfair italic + Inter)
2. Check button rendering — sharp corners, correct fills, split layout visible
3. Check hero — all 3 state switcher tabs work, stat floats freely without a box
4. Check scroll row — cards overflow to right, no scrollbar visible
5. Swap gradient backgrounds for real course photography when available

## Key rules Cursor must not break

- `border-radius: 0 !important` everywhere — no rounded corners, ever
- Playfair numerals always get `font-variant-numeric: lining-nums tabular-nums`
- Fonts loaded via `<link>` tag in index.html, NOT @import in CSS
- No box shadows — elevation via background color differentiation only
- No white — lightest surface is `--p0: #fcfaf6`
- Verdigris (`--v3/v4`) is the only chromatic color in the system
