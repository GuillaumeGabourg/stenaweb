---
name: Stenaweb
description: Dark creative-agency site for a studio selling custom showcase websites to small businesses in Mayenne and Sarthe.
colors:
  ink: "#0a0a0a"
  ink-2: "#121311"
  ink-3: "#1b1c19"
  bone: "#f2f1ea"
  bone-dim: "#a9a89f"
  lime: "#c5ff33"
  lime-deep: "#9bd400"
  line: "rgb(242 241 234 / 0.12)"
typography:
  display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(2.6rem, min(9.4vw, 15.5svh), 11rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.03em"
  section:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(3rem, 9vw, 8.5rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.9vw, 4rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.375
    letterSpacing: "normal"
  data:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.025em"
rounded:
  card: "16px"
  frame: "14px"
  pill: "9999px"
spacing:
  gutter-mobile: "20px"
  gutter-desktop: "32px"
  section: "160px"
  section-mobile: "112px"
components:
  button-primary:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 32px"
    height: "64px"
  button-primary-hover:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.pill}"
    padding: "0 32px"
    height: "64px"
  button-ghost-hover:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
  card-surface:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.bone}"
    rounded: "{rounded.card}"
    padding: "40px"
  card-featured:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "40px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.bone-dim}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
---

# Design System: Stenaweb

## Overview

**Creative North Star: "The page is the demo"**

Stenaweb sells custom websites to artisans and independents who have usually only seen templates. The site is the proof of the offer, so it plays the creative-agency canon straight, at full craft: near-black ground, enormous condensed display type, one acid lime that takes over whole regions, and motion that rewards scrolling. The user chose this canon deliberately over metaphor-driven directions. The quality bar is basement.studio, locomotive.ca, lusion.co and dogstudio.co.

Every effect serves trust and conversion. The offer, the three real client sites, the prices and the quote form can always be found within seconds. With motion turned off, the page is still complete.

**Key Characteristics:**
- Ink ground (#0a0a0a). Lime is never a sprinkle: it fills a CTA band, a featured card, the final service panel, the footer wordmark.
- Archivo variable, uppercase, extra-bold, set condensed (width axis 84). The width axis breathes with scroll velocity.
- A cursor-reactive WebGL field (domain-warped noise, lime crests on moss) in the hero only.
- Real client screenshots in browser and phone frames are the main imagery.
- Motion grammar: masked line reveals with expo-out, Lenis smoothing, pinned scenes, scrubbed transforms.

## Colors

### Primary
- **Acid Lime** (`#c5ff33`): primary actions, featured offer, contact section, footer wordmark, selection, focus ring. When lime appears, it owns a whole region.

### Neutral
- **Ink** (`#0a0a0a`): page ground.
- **Ink 2** (`#121311`) and **Ink 3** (`#1b1c19`): raised surfaces (service panels, offer cards, browser chrome).
- **Bone** (`#f2f1ea`): primary text on ink; warm, never pure white.
- **Bone Dim** (`#a9a89f`): secondary text on ink.
- **Line** (bone at 12%): every hairline rule and border.

### Named Rules
**The Region Rule.** Lime fills regions or stays out. Never use it as thin decorative accents scattered over the ink.
**The Client Colour Rule.** Case studies switch their accent (`--accent`) to the client's own brand colour for the live-site button, the solution numerals and the result band. Stenaweb's lime stays on global chrome only.

## Typography

**Display Font:** Archivo variable (width axis 62–125, used at 84 at rest), weight 800, uppercase.
**Body Font:** Geist.
**Data Font:** Geist Mono, only for measured or meta data (browser URLs, timeline dates, legal footer).

### Hierarchy
- **Display** (800, clamp up to 11rem, line-height 0.86): hero headline, footer wordmark, case-study titles.
- **Section** (800, clamp up to 8.5rem, line-height 0.86): one heading per section, always broken deliberately into 2–3 lines.
- **Lead** (500, clamp to 4rem, line-height 1.08): the manifesto paragraph.
- **Body** (400, 18px, line-height 1.375): copy, max ~65ch.
- **Data** (mono 12px, uppercase, 0.025em): URLs, dates, footer meta.

### Named Rules
**The Breathing Width Rule.** Display type reads `font-variation-settings: "wdth" var(--wdth)`. Lenis velocity drives `--wdth` from 84 up to ~96. Size headings in narrow columns with that headroom.
**No Eyebrows.** No small label above a heading, ever. Put meta information after the heading.

## Layout

A 12-column grid with 20px (mobile) and 32px (desktop) gutters. Sections breathe at 112–160px vertical padding. Headings sit in 7–8 columns, with a short dim aside right-aligned in the remaining 4. Hairline rules (`line`) separate heading groups from their content.

## Elevation & Depth

Depth comes from tonal surfaces (ink → ink-2 → ink-3) and from motion (stacking, scale, brightness), not from shadows. Only the device frames carry one soft drop shadow: `0 30px 80px -20px rgba(0,0,0,0.7)`.

### Named Rules
**The Recede Rule.** A stacked panel recedes by scaling to 0.9 and dimming with `brightness(0.35)`. It never drops opacity, so the panels underneath never show through.

## Shapes

Cards use 16px radii, device frames 14px, the contact section a 28px top radius. Every control is a full pill.

## Components

### Buttons
The pill CTA has a lime ground with ink text. On hover the label slides up and its twin rises from below, the arrow rotates −45°, and the ground turns to bone. Buttons are magnetic: they pull toward the pointer with an elastic spring. A ghost variant (bone 25% border) and an ink variant (on lime regions) exist.

### Chips
Pill outline chips for services and project tags. On the lime contact form, they work as radio choices: once selected, the chip turns ink with lime text.

### Cards / Containers
Service panels are sticky stacked surfaces. Offer cards have a pointer-following radial light on both the surface and the 1px border. The featured offer is a lime card that breaks the row vertically.

### Inputs / Fields
Underline fields on lime with floating labels (label rises to 12px on focus or when filled), an ink 25% rule that turns solid ink on focus.

### Navigation
The wordmark sits on the left (mix-blend difference) and the lime "Demander un devis" button on the right. On desktop, a centred glass-free pill of links sits between them. The bar hides on scroll-down and comes back on scroll-up. On mobile, a full-screen ink menu opens with a clip-path, its links in huge display type revealed with a mask.

### Signature: Pinned work track
On desktop, the work section pins and the three client sites travel horizontally in browser frames. Each frame un-rotates and scales up as it crosses the viewport, and its phone frame parallaxes. A lime progress hairline runs along the bottom. Under reduced motion, it becomes a vertical list.

## Do's and Don'ts

### Do:
- **Do** let lime own whole regions: contact, featured offer, last service panel, footer wordmark.
- **Do** show real client screenshots in frames; they are the proof.
- **Do** give every animation a static, fully readable reduced-motion state.
- **Do** theme browser surfaces: selection, scrollbar, focus ring.

### Don't:
- **Don't** add eyebrows or kickers above headings, or section counters that carry no information.
- **Don't** use gradient text, glassmorphism as decoration, or hard offset shadows.
- **Don't** fade stacked panels with opacity; dim them with brightness.
- **Don't** present placeholder prices, delays or testimonials as final: they live in `content/offer.ts` and must be replaced before launch.
