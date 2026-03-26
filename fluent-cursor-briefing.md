# Fluent — Cursor Briefing
**alternate.universe / F**
LMS for enterprise learners and managers. Elegant, editorial, atmospheric. Nothing like Docebo.

---

## Stack assumptions
React + TypeScript. Tailwind for layout utilities only — all color, typography, and component styles via CSS custom properties defined in `tokens.css`. Google Fonts via `<link>` tag (not @import — known loading issue).

---

## Fonts
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@300;400;500&display=swap">
```

- **Playfair Display** — all display text, headlines, card titles, pull quotes, button serif label. Never below 14px.
- **Inter** — everything functional: body, labels, metadata, nav, button sans label.
- Mixed use: buttons use Playfair italic for the verb, Inter caps for the context label.

---

## Design tokens (`tokens.css`)

```css
:root {
  /* Parchment — all surfaces, no pure white anywhere */
  --p0: #fcfaf6;
  --p1: #f7f3ec;  /* primary surface */
  --p2: #efe9de;  /* secondary surface, sidebar, cards */
  --p3: #e5ddd0;  /* active/hover states */
  --p4: #d8cfc0;  /* borders, dividers, avatar bg */

  /* Ink — all type */
  --i0: #0f0e0c;  /* primary text, button fills */
  --i1: #33302a;
  --i2: #524e45;  /* body text */
  --i3: #857f72;  /* secondary labels, nav */
  --i4: #b8b2a5;  /* muted, captions, placeholders */

  /* Verdigris — the only chromatic color */
  --v0: #eaf3ee;  /* tint fills, tag backgrounds */
  --v1: #bbddc8;  /* borders on tint */
  --v2: #78b595;  /* on-dark accent text, eyebrows */
  --v3: #47906a;  /* progress fills */
  --v4: #2b6448;  /* primary verdigris, CTAs, active borders */
  --v5: #1a4030;  /* deep verdigris, hover on v4 */

  /* Typography */
  --f-play: 'Playfair Display', Georgia, serif;
  --f-sans: 'Inter', sans-serif;

  /* Spacing scale */
  --sp-1: 4px;
  --sp-2: 8px;
  --sp-3: 12px;
  --sp-4: 16px;
  --sp-5: 24px;
  --sp-6: 32px;
  --sp-7: 48px;
  --sp-8: 64px;

  /* Layout */
  --page-padding: 36px;
  --nav-height: 48px;
  --hero-height: 440px;
  --grid-size: 24px;
}
```

---

## Page background texture
Applied to the root page wrapper. Subtle grid, not decorative:
```css
.page {
  background-color: var(--p1);
  background-image:
    linear-gradient(rgba(80,75,65,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(80,75,65,0.06) 1px, transparent 1px);
  background-size: var(--grid-size) var(--grid-size);
}
```

---

## Typography scale

```css
/* Display — Playfair, hero headlines */
.text-display {
  font-family: var(--f-play);
  font-size: 46px;
  font-weight: 400;
  line-height: 1.0;
  letter-spacing: -0.01em;
}

/* Headline — Playfair, section/card titles */
.text-headline {
  font-family: var(--f-play);
  font-size: 20px;
  font-weight: 400;
  line-height: 1.2;
}

/* Subhead — Playfair italic */
.text-subhead {
  font-family: var(--f-play);
  font-size: 15px;
  font-style: italic;
  font-weight: 400;
  line-height: 1.5;
}

/* Card title */
.text-card-title {
  font-family: var(--f-play);
  font-size: 18px;
  font-weight: 400;
  line-height: 1.15;
}

/* Body */
.text-body {
  font-family: var(--f-sans);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.7;
}

/* Body light */
.text-body-light {
  font-family: var(--f-sans);
  font-size: 12px;
  font-weight: 300;
  line-height: 1.7;
}

/* Label — all caps, wide tracking */
.text-label {
  font-family: var(--f-sans);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

/* Caption */
.text-caption {
  font-family: var(--f-sans);
  font-size: 10px;
  font-weight: 300;
  color: var(--i3);
}

/* Numerals — always use lining figures */
.text-numeral {
  font-family: var(--f-play);
  font-variant-numeric: lining-nums tabular-nums;
}
```

**Important:** Always apply `font-variant-numeric: lining-nums tabular-nums` to any element displaying numbers in Playfair. Default oldstyle figures have inconsistent baselines.

---

## Border radius
**None. Zero. border-radius: 0 everywhere.** This is load-bearing to the aesthetic. Apply `border-radius: 0 !important` globally if needed to override browser/component defaults.

---

## Elevation model
No box shadows. Elevation is communicated through background color differentiation:
- `--p0` sits on top of `--p1`
- `--p1` is the default page surface
- `--p2` for sidebar, secondary panels
- `--p3` for active/hover states
- Dark surfaces (`--i0`) for hero bands and overlays

Borders (0.5px, `rgba(80,75,65,0.15–0.25)`) are used only for separation, never for elevation.

---

## Button system
The split button is the only button type. Playfair italic verb on the left, Inter caps context label on the right, separated by a 1px internal rule.

**No border-radius. Ever.**

```tsx
// Button component signature
interface ButtonProps {
  verb: string;       // Playfair italic — "Continue", "Start", "Download"
  context: string;    // Inter caps — "Lesson 04", "Module 01", "Certificate"
  variant: 'ink' | 'verd' | 'verd-deep' | 'ghost' | 'ghost-light' | 'parch';
  size?: 'default' | 'lg' | 'sm';
}
```

```css
/* Base */
.btn {
  display: inline-flex;
  align-items: stretch;
  border: none;
  border-radius: 0;
  cursor: pointer;
  padding: 0;
}

.btn-serif {
  font-family: var(--f-play);
  font-style: italic;
  font-weight: 400;
  font-size: 14px;
  padding: 12px 14px 12px 17px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  line-height: 1;
}

.btn-rule {
  width: 1px;
  align-self: stretch;
  flex-shrink: 0;
}

.btn-sans {
  font-family: var(--f-sans);
  font-weight: 500;
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 12px 15px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  line-height: 1;
}

/* Sizes */
.btn-lg .btn-serif { font-size: 17px; padding: 15px 16px 15px 20px; }
.btn-lg .btn-sans  { font-size: 10px; padding: 15px 18px; }
.btn-sm .btn-serif { font-size: 12px; padding: 9px 11px 9px 13px; }
.btn-sm .btn-sans  { font-size: 8px;  padding: 9px 11px; }

/* Variants */
.btn-ink           { background-color: var(--i0); }
.btn-ink .btn-serif { color: var(--p1); }
.btn-ink .btn-rule  { background-color: rgba(247,243,236,0.2); }
.btn-ink .btn-sans  { color: rgba(247,243,236,0.5); }

.btn-verd           { background-color: var(--v4); }
.btn-verd .btn-serif { color: var(--p0); }
.btn-verd .btn-rule  { background-color: rgba(234,243,238,0.22); }
.btn-verd .btn-sans  { color: rgba(234,243,238,0.55); }

.btn-verd-deep           { background-color: var(--v5); }
.btn-verd-deep .btn-serif { color: var(--p0); }
.btn-verd-deep .btn-rule  { background-color: rgba(234,243,238,0.18); }
.btn-verd-deep .btn-sans  { color: rgba(234,243,238,0.45); }

.btn-ghost           { background-color: transparent; box-shadow: inset 0 0 0 1.5px var(--i0); }
.btn-ghost .btn-serif { color: var(--i0); }
.btn-ghost .btn-rule  { background-color: rgba(15,14,12,0.18); }
.btn-ghost .btn-sans  { color: var(--i3); }

.btn-ghost-light           { background-color: transparent; box-shadow: inset 0 0 0 1px rgba(247,243,236,0.3); }
.btn-ghost-light .btn-serif { color: rgba(247,243,236,0.72); }
.btn-ghost-light .btn-rule  { background-color: rgba(247,243,236,0.15); }
.btn-ghost-light .btn-sans  { color: rgba(247,243,236,0.35); }

.btn-parch           { background-color: var(--p1); }
.btn-parch .btn-serif { color: var(--i0); }
.btn-parch .btn-rule  { background-color: rgba(15,14,12,0.12); }
.btn-parch .btn-sans  { color: var(--i3); }
```

**Variant usage rules:**
- `ink` — primary action on parchment surfaces
- `verd` / `verd-deep` — progress actions, start course, mark complete
- `ghost` — secondary action on parchment surfaces
- `ghost-light` — any action on dark (ink hero) or verdigris surfaces
- `parch` — primary action on dark (ink hero) or verdigris surfaces

---

## Learner landing page — layout spec

### Structure
```
[Nav — 48px]
[Hero state switcher — 40px, sits above hero]
[Hero — 440px, padded 12px sides, floats on page grid]
[Curriculum scroll row — horizontal overflow]
[Required this quarter — 3-column card grid]
```

### Nav
- Background: `rgba(247,243,236,0.9)` with backdrop-filter blur
- Wordmark: Playfair italic, 16px, `var(--i0)` — the period is `var(--v4)`
- Nav links: Inter 500, 10px, 0.1em tracking, uppercase, `var(--i3)` / active `var(--i0)`
- Avatar: 26×26, `var(--p4)` fill, 0.5px border

### Hero
The hero is a full-bleed atmospheric image surface. In production, each course supplies a hero image. For the prototype, use deep atmospheric gradients per course. The hero rotates between three states:

**State 1 — Resume** (user has something in progress)
- Eyebrow: `var(--v2)`, "Pick up where you left off"
- Floating stat top-right: percentage complete, Playfair lining-nums, free-floating, no box
- Progress track: 1.5px, `var(--v3)` fill
- Primary button: `btn-parch`
- Secondary button: `btn-ghost-light sm`

**State 2 — Featured** (editorially curated)
- Eyebrow: `#c9a96e` (warm gold), "Featured course"
- Floating stat: module count in warm gold
- No progress track
- Primary button: `btn-parch`

**State 3 — Recommended** (personalized)
- Eyebrow: `#7ab0d4` (blue-grey), "Recommended for you"
- Floating stat: cohort completion rate in blue-grey
- No progress track
- Primary button: `btn-parch`

Top-left slate tag (always): module/category metadata in `rgba(247,243,236,0.4)` on a `rgba(15,14,12,0.45)` backdrop-blur panel.

Hero grain overlay: `feTurbulence` SVG filter, `opacity: 0.4–0.5`.

### Curriculum scroll row
- Horizontal flex, `overflow-x: auto`, scrollbar hidden
- Cards: `260px × 220px`, dark atmospheric image fill per course
- Wide variant: `320px` — use to vary rhythm, not uniform
- Card bleeds off right edge — `margin-right: -36px; padding-right: 36px` on container
- Progress track: 1.5px on each card, `var(--v3)`
- Badge (top-left, z-index above image): due dates in `#7a2020` fill, "New" in `var(--i0)`

### Required this quarter
- 3-column grid, `gap: 2px`
- Each card: `var(--p2)` fill, `border-top: 2px solid` color-coded:
  - Urgent (< 2 weeks): `#7a2020`
  - Pending: `var(--i4)`
  - Complete: `var(--v4)`
- Ghost large numeral (01, 02, 03) behind content: Playfair, 80px, `rgba(80,75,65,0.06)`
- Button on each card: `btn-ink sm` for incomplete, `btn-ghost-dk sm` for complete

---

## Hero image approach for prototype
No real photography yet. Each course gets an atmospheric gradient — map course categories to color families:
- People / Leadership → deep green (`#1a3a2a → #0d2318`)
- Compliance → deep amber-brown (`#3d2010 → #2a1a08`)
- Security → deep navy (`#1e3a5f → #0d2040`)
- Analytics → deep slate (`#0d1a2a → #1a2e40`)
- Strategy → deep purple-brown (`#2a1a3a → #1a0d28`)

All gradients: `linear-gradient(to bottom, rgba(15,14,12,0.1) 0%, rgba(15,14,12,0.78) 100%)` overlay on top of the color base, so the bottom reads dark enough for white text.

When real imagery is supplied, swap the gradient for `background-image: url(...)` with the same overlay.

---

## Component checklist for v1
- [ ] `<Button verb context variant size />` 
- [ ] `<Nav />` 
- [ ] `<Hero state />` with three state variants
- [ ] `<CourseCard />` with image, badge, progress track
- [ ] `<RequiredCard />` with urgency variant
- [ ] `<ProgressTrack pct />` — reusable, use lining-nums on label
- [ ] `<PageTexture />` or apply to root layout wrapper
- [ ] `<SlateBadge />` — the top-left hero metadata tag

## Not in v1
- Lesson player / content viewer
- Manager dashboard
- Form elements
- Empty states
- Mobile layout

---

## Voice / copy notes
- Eyebrows and labels: terse, factual — "Currently in progress", "Due Apr 1", "3 of 8 lessons"
- Hero body copy: one sentence, present tense, tells you where you are and what's next
- Course titles: Playfair italic on the key noun — "Communication *Fundamentals*", "Data *Literacy*"
- No gamification language — no streaks, no XP, no "Great job!"
- No dashboard-speak — not "your learning journey metrics", just the thing itself
