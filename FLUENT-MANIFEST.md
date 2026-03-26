# Fluent — Vision Brief
### The most considered LMS ever built.

---

## What this is

Fluent is a learning management system for enterprise organizations. It handles course delivery, progress tracking, compliance requirements, and content administration. On paper, that's the same thing every LMS does.

In practice, Fluent is a rejection of everything every LMS has become.

Docebo, Cornerstone, Litmos, Absorb — they are all the same product with different logos. Dashboard-first. Metric-heavy. Designed for the administrator, not the learner. They feel like filing systems dressed up as products. Nobody opens them because they want to. Nobody finishes a course because the experience inspired them to.

Fluent is built on a different premise: **learning is atmospheric.** The environment you're in while you learn shapes how you learn. A great lecture hall, a well-made book, a film that absorbs you completely — these things work not just because of their content but because of how they feel to inhabit. Fluent is the first LMS that takes that seriously.

---

## The influences

These are not mood board references. They are specific things Fluent should feel like it belongs to.

**Perplexity's editorial blog** — parchment surfaces, warm neutrals, Playfair Display used with confidence. The sense that typography is doing real work, not decoration. Information presented as if it matters.

**The Criterion Collection** — restraint as a form of respect. Careful curation. The feeling that whoever made this cared deeply about what they were presenting. Nothing extraneous. Everything intentional.

**A well-made university press book** — justified type, running heads, margin notes, the numerals sitting properly on the baseline. The physical grammar of serious publishing translated into a digital interface.

**Variant-AI's LMS explorations** — specifically: the expedition metaphor executed with conviction, the landscape hero image as a window into the curriculum, "territory covered" instead of "38% complete." The insight that progress through knowledge can feel like moving through terrain. We're not using the metaphor language, but we're keeping the spatial ambition.

**Linear's product aesthetic** — not the dark mode or the developer-cool affect, but the discipline. Every pixel accountable. Nothing wobbling. The sense that every decision was made, not defaulted.

**Old cartography and scientific illustration** — fig. 1, coordinate notations, the slate tag in the hero corner. The language of documentation and discovery. Learning as expedition, without saying expedition.

---

## Design system in one paragraph

Parchment surfaces — never white. Three color families: parchment (all surfaces), ink (all type), verdigris (the only chromatic presence — progress, active states, completion moments). Playfair Display for all display text, headlines, card titles, and the verb half of every button. Inter for everything functional. No border-radius anywhere — ever. No box shadows — elevation through background differentiation. The split button (Playfair italic verb / Inter caps context, separated by a 1px rule) is the only button type in the system. The grid texture (24px, 6% opacity) runs under everything.

---

## The learner experience

### The landing page is the experience

There is no dashboard. There is no sidebar nav with a list of your courses. You land and you are already inside it.

The hero is a full-bleed atmospheric surface — a dark, cinematic image for your active course. It rotates between three states depending on context: **Resume** (pick up where you left off), **Featured** (editorially curated by L&D), **Recommended** (personalized to your role and history). The course title runs at 46px in Playfair. The floating stat — percentage complete, module count, cohort completion rate — sits free in the top right corner with no box around it. The progress track is 1.5px. Nothing shouts.

Below the hero: a horizontal scroll row of course cards. Dark atmospheric images, each course category mapped to a distinct color field. Cards bleed off the right edge. No scrollbar. The curriculum is a thing you move through, not a list you read.

Below that: required courses this quarter. Three cards, parchment surface, color-coded by urgency at the top border. Large ghost numerals behind each one.

### Inside a course

The lesson player is not a video player with a sidebar. It is a full reading/viewing surface. The nav collapses. The content expands. Between lessons, there is a moment — a transition screen with the next lesson title, large, in Playfair, on the dark hero image. Like a chapter title page. Like the film is about to start.

Progress is communicated as a thread through the course, not a bar at the top of a page. You always know where you are. You don't always have the percentage shoved in your face.

Quizzes and assessments are inline. They interrupt the content naturally, like a question in the margin of a book. They don't redirect you to a new page. They don't feel like a test.

Completion is a moment. The verdigris surface. Large Playfair. "Well done, [name]." A certificate that looks like it was designed by someone who cares.

### The emotional register

Calm. Considered. Inviting. The feeling of settling into something good.

Not gamified. Not streaked. Not "🔥 You're on a 5-day learning streak!" Not XP. Not badges that look like they came from a Roblox game.

Not corporate. Not "Welcome back to your learning journey, valued employee." Not dashboard-speak. Not metrics-first.

The copy is terse and present-tense. It tells you where you are and what's next. It doesn't explain itself. It doesn't celebrate you for opening the app.

---

## The admin experience

The admin side of Fluent is where L&D teams and content managers live. It is not an afterthought bolted onto the learner experience. It is a separate, considered environment with its own visual register — slightly more utilitarian than the learner side, but still unmistakably Fluent.

### SCORM intake

Fluent accepts SCORM 1.2 and SCORM 2004 packages. The intake flow is:

1. **Upload** — drag a .zip onto a clean upload surface. No form with seventeen fields. Just the file.
2. **Parse** — Fluent reads the imsmanifest.xml, extracts the course title, description, SCO structure, and sequencing rules. It presents what it found in a readable summary before the admin commits.
3. **Configure** — the admin sets the course title (pre-filled from manifest), the category, the cover image (cropped to the card aspect ratio), the due date if required, and the audience (all users, specific teams, specific roles).
4. **Publish** — one button. The course appears in the learner's curriculum.

The SCORM player is embedded inside Fluent's lesson shell — the same dark surface, the same transition moments. The SCORM content renders in a contained frame that doesn't expose the raw SCORM chrome. It looks like Fluent, not like a file playing inside a file.

### Course builder (native content)

For content that isn't SCORM, Fluent has a native builder. It is block-based but not Notion-esque. The blocks are:

- **Text** — body copy, Playfair subheadings, pull quotes
- **Video** — upload or embed, full-bleed player
- **Image** — with optional caption in the margin-note style
- **Quiz** — multiple choice, true/false, short answer. Rendered inline.
- **Divider** — a chapter break with a title, like a section page in a book

The builder is not a drag-and-drop canvas. It is a linear sequence of blocks, edited in place. Fast. Keyboard-navigable.

### Analytics

Admin analytics are not a wall of charts. The key questions L&D cares about:

- Who hasn't started the required course that's due in 7 days?
- What's the completion rate by team?
- Where are people dropping off?
- Who needs a nudge?

Fluent surfaces these as answers, not as data. The analytics view leads with the actionable — overdue learners, at-risk completion rates, drop-off points — not with a completion percentage donut chart in the center of the page.

### Team management

Admins assign courses to teams or roles, not individuals (though individual assignment is available). When a new employee joins a team, they automatically inherit that team's required curriculum. No manual enrollment.

---

## What makes this radical

Every LMS starts from the assumption that learning is a compliance problem to be managed. The interface reflects that. It's built for the person tracking completion, not the person doing the learning.

Fluent starts from the opposite assumption: **learning is something people want to do when the conditions are right.** The interface is built to create those conditions. Atmospheric, calm, considered. No friction. No performance anxiety. No feeling that you're being monitored.

The second radical thing: **typography is doing the work that photography usually does in consumer apps.** Most LMS platforms use stock photography of smiling people in meetings, or abstract geometric patterns, or gradients that mean nothing. Fluent uses type — Playfair at 46px, the right word italicized in verdigris — to create the emotional moment. The course title is the hero image.

The third: **the completion moment is treated as a cultural event.** Not a modal that says "Course Complete! You earned a badge." A full-screen moment with a designed surface, a specific color (verdigris), a specific typographic treatment, a certificate that looks like it came from a place that means it. Learning happened. That's worth acknowledging properly.

---

## Screens to build (in order)

1. **Learner landing** — hero (3 states) + curriculum scroll + required grid ✓ *in progress*
2. **Course detail** — full course page, module list, start/resume
3. **Lesson player** — content surface, progress thread, next lesson transition
4. **Completion screen** — verdigris surface, certificate moment
5. **Admin: course list** — all published courses, status, completion rates
6. **Admin: SCORM upload** — intake flow, manifest preview, configure + publish
7. **Admin: learner roster** — team view, overdue flags, completion by person
8. **Admin: analytics** — actionable summary view, not a dashboard

---

## Things Cursor must never do

- Add border-radius to anything
- Use white (`#ffffff`) as a surface color
- Add box shadows
- Use a button style other than the split serif/sans system
- Add emoji to UI copy
- Use gamification language (streaks, XP, badges, points)
- Build a sidebar navigation for the learner experience
- Make the learner landing look like a dashboard
- Use rounded pill buttons
- Add loading spinners — use skeleton states that match the surface color
- Forget `font-variant-numeric: lining-nums tabular-nums` on any number displayed in Playfair
- Import fonts via CSS @import — always via `<link>` in index.html
- Restructure LearnerHome.tsx — the page composition is final. Extend it, don't replace it.
- Change the Hero state switcher UI — the tab row above the hero is intentional, not a placeholder.
- Replace the split button system — Button.tsx is the only button component.
