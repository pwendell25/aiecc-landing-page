# Landing Page Redesign Plan

Source: meeting with Randall, Oct 8, 2026 (Gemini notes + transcript), Randall's Lovable draft
(pixel-perfect-display-3978.lovable.app), and the testimonial.to wall.

Scope: homepage only (`app/page.tsx`). Keep our current design system; borrow copy, not design,
from the Lovable draft. Not in scope: `/randall-re` portfolio, Slack follow-up automation,
promo pricing (lives in the after-discovery email + leave-behind PDF, not the page).

## Confirmed facts

| Item | Value |
| --- | --- |
| Deon's result | $110K → $180K (+63.6%, +$70K), 100% of his job criteria met |
| Success rate | 95% (replaces the "100%" stat) |
| Video channel | Featured speaker on 7 Eagle |
| Videos (first three only, fourth held for legal review) | `tEpW11YcWZU`, `_wbU9w-YrKA`, `LdZB5yJpFyw` |
| Audience | Defense & GovCon, manager to director level, without pushing away non-GovCon visitors |
| Logo wording | "coached & mentored professionals at…" (not "landed roles at") |

## Tone rules

- Frame Randall as the one being chosen. Assertive, dry humor, no begging, no profanity.
- Short bullets over paragraphs.
- Results in *problem → what we did → result* format, kept to a line each.
- Every number traceable to a real client statement.

## New section order

| # | Section | Component | Status |
| --- | --- | --- | --- |
| 1 | Hero (hook) | `HeroSection` | Rewrite |
| 2 | The problem | `ProblemSection` | New |
| 3 | Rehook (Deon) | `RehookSection` | New |
| 4 | Who I work with / who I don't | `FitSection` | New |
| 5 | About Randall | `AboutSection` | Rewrite |
| 6 | Logos | `LogosSection` | Retitle |
| 7 | Program: 6 steps / 90 days (absorbs package deliverables) | `ProcessSection` | Edit |
| 8 | Featured speaker on 7 Eagle | `VideoSection` | New |
| 9 | Results cards | `TestimonialSection` | Rewrite |
| 10 | FAQ | `FaqSection` | New |
| 11 | CTA: Message Randall on LinkedIn | `CtaSection` | Rewrite |
| 12 | Full testimonial wall | `TestimonialWall` | New |

### 1. Hero
- Eyebrow: "For defense & GovCon leaders · manager to director"
- Headline (from Lovable): "You have the record. The market just cannot see it yet."
- Sub: 90-days-or-less career breakthrough. Remove "land the competitive offer".
- Proof row: US Veteran · LinkedIn Top Voice (top 1%) · 8,000+ followers · 95% success rate
- Secondary link: "Review my A+ testimonials ↓" (anchors to the wall)
- Floating outcome cards stay; fix Deon's card to "$110K → $180K".

### 2. The problem
- "Being overlooked is not a talent problem. It is a positioning problem."
- Pain points: resume into a black hole against 2,000+ applicants; ghosted / nobody reaching out;
  stalled at the same level; advice built for the wrong market.

### 3. Rehook
- "Getting interviews isn't the same as winning." The 20 applications / 1 interview / 0 offers example,
  phrased without naming anyone.
- Deon card: didn't know his value, about to take the first offer → helped him see his worth and
  negotiate → $110K to $180K, 100% of his job criteria met.

### 4. Who I work with / who I don't
- "This is a two-way street. I'm interviewing you as much as you're interviewing me."
- "I take a limited number of clients each month."
- Works with: people who treat their career as one of the biggest investments of their life,
  know what they're doing isn't working, and want professional help.
- Doesn't work with: collectors of free resources. The analogy: the patient who keeps eating the
  food that makes them sick and expects a different result.
- **Randall approves this copy before it goes live.**

### 5. About Randall
- Real headshot (`public/assets/randall-headshot/`).
- Bullets: US veteran · 20+ years of defense & GovCon leadership · hiring manager, both sides of
  the table · ran 13 roles' worth of work with AI and automation, saving ~$1.2M a year in salary ·
  LinkedIn Top Voice, top 1%.

### 8. Videos
- Three lazy-loaded YouTube embeds (thumbnail first, iframe on click, to keep the page fast).
- The fourth video gets added after Randall's KBR review.

### 9 + 12. Testimonials
- Results cards: the existing `testimonials` data rewritten as problem / what we did / result.
  Remove consulting rates from Connie's card; show her move to her own GovCon consulting business.
- Full wall at the bottom: copy text from testimonial.to into `constants/data.ts` (no embed).
  Show first name + last initial and title. Keep "Prior client" entries anonymous. Light trims only.
  Collapsed to a few rows with a "Show all" button.
- Remove the testimonial.to link.

### 10. FAQ
Questions from the Lovable draft, rewritten in our voice:
- What does one-to-one coaching cover?
- How do I start?
- Is this right for me if I'm still employed?
- Do I need to be transitioning from active duty?
- What if I'm not ready yet? ("Next year, two years, or three?")

## Images
- No AI-generated images.
- Randall's real headshot in About.
- Diversity shot (two genders, two ages, two skin tones): 3–4 licensed stock options
  (Unsplash / Pexels) for Randall to pick, or a real photo of Randall with a client / at an event.

## Data changes (`constants/data.ts`)
- `stats`: 100% → 95%.
- `heroOutcomes` + `testimonials`: Deon to $110K → $180K.
- New: `problems`, `fitFor`, `fitNotFor`, `aboutBullets`, `videos`, `faqs`, `testimonialWall`.
- Navbar / Footer anchors updated for the new sections.

## Decisions
- **Primary CTA:** "Message Randall on LinkedIn" (`LINKEDIN_URL`). Randall qualifies people in DMs
  before sending the call link. No on-site form.
- **Package section removed.** Its deliverables are folded into the 6 program steps:
  AI market briefing → step 1, resume / LinkedIn / cover letter + ATS → step 3,
  hidden job market + inbound + positioning before the posting → step 4.
  Delete `PackageSection.tsx` and `packageItems`.

## Build order
1. Data + types (`constants/data.ts`, `types/index.ts`)
2. Hero, Problem, Rehook
3. Fit, About, Logos retitle
4. Process (fold in package, delete PackageSection), Videos
5. Results cards, FAQ, CTA, Testimonial wall
6. Navbar/Footer anchors, mobile pass, Lighthouse check
7. Randall review of copy (Fit section especially) → images swapped in → deploy
