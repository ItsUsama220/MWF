---
name: glassmorphism
description: Source-of-truth MWF glass system skill for recreating the exact current landing-page glass language: layered translucent fills, reflective rim highlights, restrained blur, premium shadow stacks, dark navy atmosphere, and hero-button-derived interaction styling.
license: MIT
metadata:
  author: typeui.sh
  adapted_for: Marketing With a Flair
---

# Marketing With a Flair Glass System Skill

## Mission
Use this skill when building or refining any frosted, translucent, reflective, or premium layered surface in the Marketing With a Flair site.

This skill is not a generic frosted-glass guide.
It is the exact MWF glass system based on the current landing page.

Use it together with [../mwf-ui/SKILL.md](../mwf-ui/SKILL.md). The `mwf-ui` skill defines the overall page language; this skill defines how glass surfaces within that language must behave and look.

## Source Of Truth
Before inventing any new glass treatment, inspect these files:

- [../styles.css](../styles.css)
- [../services/service-section.css](../services/service-section.css)
- [../index.html](../index.html)

The current homepage is the glass source of truth.

## Non-Negotiable Glass Direction
- Glass must feel premium, dark, layered, and restrained.
- Glass must sit naturally inside the navy atmospheric background system.
- Glass must look intentional and structural, not decorative noise.
- Glass should support readability first and visual polish second.
- Hero buttons define the highest-fidelity glass treatment on the site.
- Cards, panels, nav shells, and other frosted components should feel like scale adaptations of that button language.

## Core Glass Tokens
Use these exact tokens first:

- `--mwf-glass-fill`
- `--mwf-glass-fill-hover`
- `--mwf-glass-border`
- `--mwf-glass-shadow`
- `--mwf-glass-shadow-hover`
- `--mwf-glass-highlight`

### Token Meanings
- `--mwf-glass-fill`: primary layered translucent fill
- `--mwf-glass-fill-hover`: slightly brighter, more luminous hover state
- `--mwf-glass-border`: soft cool edge border
- `--mwf-glass-shadow`: default premium depth and ambient lift
- `--mwf-glass-shadow-hover`: hover state with added gold/blue presence
- `--mwf-glass-highlight`: reflective rim and top-edge highlight layer

## MWF Glass Formula
Every premium glass component should usually combine:

1. dark translucent layered fill
2. one soft border edge
3. one reflective highlight strategy
4. controlled blur and saturation
5. a premium shadow stack

That means a typical MWF glass component should have:
- `background: var(--mwf-glass-fill);`
- `border: var(--mwf-glass-border);`
- `box-shadow: var(--mwf-glass-shadow);`
- `backdrop-filter: blur(20px) saturate(132%);`
- `-webkit-backdrop-filter: blur(20px) saturate(132%);`
- a `::before` highlight layer using `--mwf-glass-highlight`

## Hero Button Glass Is The Canonical Standard
The hero CTA button treatment is the top-level reference for all premium glass styling in the project.

If a new CTA, pill, nav action, modal button, or featured badge is added, it should inherit from the hero button treatment unless the user explicitly requests a different system.

### Hero Button Traits To Preserve
- pill silhouette
- layered translucent fill
- reflective rim via masked highlight
- subtle internal glow
- premium shadow depth
- responsive hover glow
- soft lift and restrained scale increase
- pointer-reactive light field when JS interaction is appropriate

Do not replace this with generic white translucent pills or flat gradient buttons.

## Glass Surface Families

### 1. Header Shell Glass
Reference:
- `.mwf-header-shell__inner` in [../styles.css](../styles.css)

Traits:
- wide capsule / shell silhouette
- more blur than most cards
- heavier atmospheric shadow
- stronger overall polish
- still readable and calm

Use this for:
- floating headers
- top-level nav shells
- premium floating command bars

### 2. Hero Button Glass
Reference:
- `.mwf-hero-ionyx__button .wp-block-button__link` in [../styles.css](../styles.css)

Traits:
- most refined interaction surface
- strongest hover response
- premium reflective rim
- cursor-reactive glow

Use this for:
- primary CTAs
- secondary glass CTAs
- prominent interactive pills

### 3. Card / Panel Glass
Reference:
- `.mwf-glass-card`
- `.mwf-glass-panel`
- services cards in [../services/service-section.css](../services/service-section.css)

Traits:
- same family as hero buttons, but calmer
- large radius
- readable content-first interior
- blur and saturation balanced for text legibility

Use this for:
- content cards
- split-layout panels
- summaries
- review cards
- contact rows
- info blocks

### 4. Specialty Glass
Reference:
- marquee items
- footer social buttons
- service deck cards

Traits:
- derived from the same token system
- scaled to the component’s role
- never off in a separate visual direction

Use this when the component is smaller, more decorative, or more motion-driven.

## Glass Construction Rules

### Fill
- Fills should stay dark and layered.
- Do not use flat semi-transparent white as the main fill.
- Avoid muddy gray fills that kill contrast.

### Border
- Prefer one restrained border strategy.
- The visible border should be subtle and cool-toned.
- Additional shine should come from the highlight layer, not from extra border rings.

### Highlight Layer
- Use one `::before` highlight layer when a premium reflective edge is needed.
- Keep it soft and masked.
- The highlight should feel like a rim light, not a thick stroke.

### Blur
- Standard glass surfaces generally live around `blur(20px) saturate(132%)`.
- Header shell may be a little stronger.
- Some specialty surfaces can drop slightly.
- Do not crank blur so high that text loses crispness.

### Shadow
- Shadows should feel airy and premium, not muddy and heavy.
- Use layered shadows with at least:
  - one depth shadow
  - one ambient cool glow
  - one subtle inset edge light

### Hover State
- Hover should brighten slightly and gain a touch more presence.
- Use `--mwf-glass-fill-hover` and `--mwf-glass-shadow-hover` when appropriate.
- Hover must feel elegant, not loud.

## Color Integration Rules
- Glass sits inside the MWF dark navy world.
- Cool blue highlights and restrained warm gold/red accents are allowed in the shadow/glow system.
- Red should be detail-level emphasis, not a dominant glass fill.
- White should be primarily used for text, highlight edges, and soft internal reflections.

## Responsive Rules For Glass
- Glass must remain readable on mobile.
- Blur, shadows, and radius should scale gracefully with the component.
- Do not let small-screen glass become oversized, hazy, or visually heavy.
- Mobile nav drawers and hero glass surfaces should still feel premium, not like simplified fallback blocks.
- On smaller screens, maintain the same family resemblance even if spacing and scale tighten.
- In split desktop layouts, adjacent glass columns should stretch to the same overall height based on the taller column.
- If two images or media cards sit side by side in the same row, they should share a deliberate common aspect ratio or matched rendered height.
- Heading-to-copy rhythm should stay consistent inside glass panels. Do not let large titles become cramped with overly tight line-height or let supporting copy sit too close beneath them.

## Motion And Glass
- MWF glass often pairs with GSAP motion.
- Motion should enhance the glass, not compete with it.
- Good pairings:
  - gentle entrance fade + translate + blur reduction
  - hover lift
  - glow tracking
  - soft shell drift

### Motion Restrictions
- Do not use hyperactive shimmer loops on every glass component.
- Do not make glass constantly pulse unless there is a very specific reason.
- Use motion to reinforce hierarchy and interaction, not to create visual noise.

## Accessibility Rules
- Glass must never reduce text readability below acceptable contrast.
- Keep focus-visible states strong and clear.
- Do not rely on transparency alone to define boundaries.
- Ensure text over glass remains crisp against dark atmospheric backgrounds.

## Anti-Patterns
- generic frosted-white SaaS glass
- thick milky fills with weak contrast
- double or triple visible borders
- random colorful neon glows outside the MWF navy/blue/red family
- glass surfaces that look detached from the page background
- flat cards pretending to be glass with no blur, no rim light, and no depth
- hover states that explode into bright glare
- introducing a second glass style unrelated to the homepage
- decorative hero lines or beams that read as stray artifacts in open space
- side-by-side glass cards with mismatched heights that make the row feel broken

## Build Rules
When creating any new glass component:

1. Check whether an existing MWF glass family already solves it
2. Start from the existing token system
3. Match the closest homepage reference surface
4. Keep the component readable first, atmospheric second
5. Verify desktop, tablet, and mobile
6. Make sure the result still looks like MWF, not generic glassmorphism

## QA Checklist
- Does the component clearly belong to the same glass family as the homepage?
- Does it use the MWF glass tokens instead of ad hoc values?
- Is the border/highlight strategy restrained and coherent?
- Is the fill layered and dark enough?
- Is the blur level polished without harming readability?
- Does the hover state feel premium instead of noisy?
- Does the component still look correct on mobile and tablet?
- If placed next to existing homepage glass surfaces, would it feel native?
- If the panel contains a heading and supporting text, is the line-height and vertical spacing consistent with the rest of the site?
