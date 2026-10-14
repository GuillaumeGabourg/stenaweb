---
name: Stenaweb
description: Calm, readable dark site for a studio selling custom showcase websites to small businesses in Mayenne and Sarthe.
colors:
  bg: "#161619"
  surface: "#1e1f23"
  surface-2: "#27292e"
  text: "#edece8"
  muted: "#a7a6a1"
  line: "rgb(237 236 232 / 0.1)"
  accent: "#efb45f"
  accent-soft: "rgb(239 180 95 / 0.12)"
  accent-ink: "#1d1508"
typography:
  hero:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(2.3rem, 4.6vw, 3.9rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.02em"
  section:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(1.85rem, 3.2vw, 2.6rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  card-title:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  small:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  caption:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  fine:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  control: "8px"
  button: "12px"
  card: "16px"
  phone: "34px"
spacing:
  gutter-mobile: "20px"
  gutter-desktop: "32px"
  section-mobile: "64px"
  section: "96px"
  container: "1152px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.button}"
    padding: "0 20px"
    height: "44px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.button}"
    padding: "0 20px"
    height: "44px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.card}"
    padding: "28px"
  input:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
---

# Design System: Stenaweb

## Overview

**North Star: "Clair comme un bon artisan"**

The visitor is a craftsman or shop owner, often on a phone, often not web-savvy. The site has to read at a glance: normal-sized headings in sentence case, short paragraphs, obvious buttons, real client sites shown early. It stays dark, but a soft warm charcoal rather than black, with one amber accent instead of a neon. Motion is light and never tied to the scroll position: content fades in once, a word rotates in the hero, a light travels around the recommended offer.

This replaces the earlier dark/neon "creative agency" canon (huge condensed uppercase type, scroll-scrubbed scenes, preloader, WebGL). The user rejected it as unreadable and impractical for artisans.

**Key Characteristics:**
- Warm charcoal ground, raised surfaces in two steps, warm off-white text.
- One amber accent for actions, checks, the hidden-price stars and focus.
- Instrument Serif titles (one weight, italic for the emphasised word and the wordmark), Geist text and card titles.
- A 1152px centred container; sections alternate between the ground and a faint surface band.
- Real client screenshots in browser and phone frames are the only imagery.

## Colors

- **Amber** (`#efb45f`): primary buttons, check marks, icons, links in copy, focus ring, selection. Amber text on the ground passes AA. Soft amber (12%) backs icon tiles, badges and selected chips.
- **Ground** (`#161619`), **Surface** (`#1e1f23`), **Surface 2** (`#27292e`): page, cards and bands, frames.
- **Text** (`#edece8`) and **Muted** (`#a7a6a1`): primary and secondary copy.
- **Line** (text at 10%): every border and divider.

**Client colour rule.** Case studies expose `--client` (the client's brand colour) for one element: the "Voir le site en ligne" button.

## Light theme

A labelled switch in the nav ("Sombre" / "Clair", moon and sun icons, sliding amber highlight) changes theme; the choice is saved in localStorage and applied before first paint. The new theme spreads from the button in a circle (View Transitions). Light tokens: ground #f5f3ee, surface #ffffff, surface-2 #ebe8e1, text #1d1c1a, muted #5d5b56, accent #9a5a0a (deeper amber so accent text keeps 4.5:1), accent-ink #ffffff. In light mode the dot grid is replaced by soft undulating horizontal lines (38px apart, about 7% opacity) that swell into amber rings around the pointer: same motion family, readable on a light ground. Glows and the dot field read their colours from `--glow` / `--dot` RGB triplets, so every effect follows the theme. Never hard-code a dark-only colour in a component.

## Typography

- **Hero** up to 3.9rem, **Section** up to 2.6rem, **Card title** 1.25rem, all Bricolage Grotesque 600, tracking -0.02em, balanced.
- **Lead** 20px, **Body** 17px, **Small** 15px, **Caption** 14px, **Fine** 13px in Geist.
- No uppercase display, no eyebrows above headings, no section numbers.

## Layout

Max width 1152px with 20/32px gutters, sections at 64px (mobile) and 96px (desktop) vertical padding. Text-heavy sections (services, FAQ, contact) use a narrow sticky heading column next to the content. Every multi-column grid starts as `grid-cols-1` so long unbreakable content (browser URLs) can never widen the mobile page.

## Elevation & Depth

Tonal steps and 1px borders do the work. Only device frames carry a soft shadow (`0 24px 60px -24px rgba(0,0,0,0.6)`).

## Shapes

Inputs and chips 8px, buttons 12px, cards 16px, phone frame 34px. No pills.

## Components

- **Buttons:** primary amber with a white shine sweeping across on hover; secondary surface with a border. Both carry an arrow that nudges right on hover.
- **Project cards:** screenshot on top (gentle zoom on hover), name, sector, summary, "Voir le projet" and an external "Site en ligne" link. The whole card is clickable.
- **Offer cards:** a pointer-following soft amber light; the recommended card adds a travelling border light (border beam) and a "Recommandé" badge. Prices not set yet show three small amber stars, then "Sur devis · tarif bientôt disponible".
- **FAQ:** a single bordered list; chevron rotates, the answer opens with a grid-rows transition.
- **Form:** labels above fields, optional fields marked "(facultatif)", chips as radio choices. Required fields validate on blur and on submit, with the message under the field (aria-invalid + aria-describedby) and focus moved to the first invalid field.
- **Nav:** wordmark, four links, theme switch, primary button; transparent at the top, solid with a border once scrolled. The link of the section under the header is highlighted by a sliding surface pill with an amber underline. On mobile, a simple dropdown list, plus a sticky "Demander un devis gratuit" bar at the bottom once the hero has scrolled away (hidden near the form and footer).

## Motion

Effects are rich but stay at reading size; nothing is scrubbed to the scroll position.

- **Hero background:** two slow warm glows plus an interactive dot grid (canvas): a wave of light drifts on its own, dots near the mouse turn amber and lean away.
- **Hero showcase:** the three client sites take turns (5s) in a browser and a phone that tilt toward the mouse in 3D, with floating badges and a progress bar per site (clickable).
- **Word reveal:** the h1 and every section title rise word by word out of a blur (h1 on load, titles on entry).
- **Fade through:** the hero cycles the audience word (artisans, commerçants…).
- **Trades band:** a slow infinite marquee of trades under the hero, 15px, pauses on hover.
- **Project cards:** tilt toward the mouse with a light on the surface and border; on hover the full home page scrolls inside the frame (auto-scrolls on touch screens).
- **Service illustrations:** a looping mini-scene per service (colour schemes being tried, code typing, "your business" climbing to the top of a local search, tasks ticked on a live site).
- **Blur fade:** blocks rise 14px from a 6px blur once, when they enter the viewport.
- **Border beam** on the recommended offer and the contact form, **shine** on primary buttons, a faint **cursor glow** over the page background.
- Reduced motion: every entrance resolves instantly, loops stop.

## Do's and Don'ts

- **Do** keep headings at the sizes above; readability beats spectacle here.
- **Do** show the client sites before explaining services.
- **Don't** reintroduce scroll-linked animation, preloaders, custom cursors, oversized type or neon colours.
- **Don't** show reviews until they are real; prices stay hidden (stars) until they are set.
