# JELLY — The Design Lab

A visually immersive, animation-heavy single-page website built for a creative design studio. Developed as part of my frontend development internship to demonstrate production-level UI/UX implementation using modern animation techniques.

**Live Preview:** https://jelly-the-desgin-lab.vercel.app/

---

## Overview

JELLY is a creative design studio website built entirely from scratch — no templates, no CSS frameworks. The project was undertaken to practice and demonstrate real-world frontend skills including scroll-driven animations, custom interaction design, and performance-conscious GSAP implementation.

The visual identity of the site communicates creativity through motion itself — every interaction, scroll event, and transition is intentional and branded.

---

## Key Contributions

- Architected the full project structure from scratch (HTML/CSS/JS — no frameworks)
- Implemented a custom animated loader for brand intro before page reveal
- Built a magnetic cursor system with DOM-tracked mouse interactions
- Developed a smart navbar that hides on scroll-down and bounces back with elastic easing on scroll-up
- Integrated Locomotive Scroll v4.1.4 with GSAP ScrollTrigger, including the double-refresh sync fix
- Created staggered text reveal animations (letter/word-by-word entrance)
- Used `gsap.set()` + `onEnter` callbacks instead of `gsap.from()` to prevent stuck `opacity: 0` elements — a common GSAP pitfall
- Ensured full responsiveness across desktop and mobile viewports

---

## Tech Stack

| Technology | Role |
|---|---|
| HTML5 | Semantic structure |
| CSS3 | Custom styling (no frameworks) |
| JavaScript (Vanilla) | All logic and interactions |
| GSAP 3.12.5 | Animation timelines |
| ScrollTrigger | Scroll-based animation control |
| Locomotive Scroll v4.1.4 | Smooth scroll engine |

> All libraries loaded via CDN — no build tools or bundlers required.

---

## Project Structure

```
JELLY/
│
├── index.html        # Markup and structure
├── style.css         # All custom styles
└── script.js         # GSAP animations, Locomotive Scroll, interactions
```

---

## Notable Technical Decisions

**Animation Safety**
Used `gsap.set()` combined with ScrollTrigger `onEnter` callbacks rather than `gsap.from()`. This prevents elements from getting permanently stuck at `opacity: 0` when ScrollTrigger misfires on resize or fast scroll — a production-level consideration.

**Scroll Engine Sync**
Applied the Locomotive Scroll + ScrollTrigger double-refresh pattern to keep scroll positions and animation triggers accurately in sync across all viewport sizes.

**Typography & Color**
Poppins used as the primary typeface with `<em>` tags for italic accents. Direct hex values used throughout for color (no CSS variables) to keep the stylesheet fast and straightforward.

**Easing**
`elastic.out` easing applied consistently to match the JELLY brand's playful, bouncy personality.

---

## Local Setup

```bash
git clone https://github.com/codewithfaseeh59/Jelly-TheDesginLab.git
cd Jelly-TheDesginLab
# Open index.html in any browser — no install step needed
```

---

## What I Learned

- Handling the Locomotive Scroll + GSAP ScrollTrigger integration in a production context
- Building performant scroll-driven animations without layout thrashing
- Designing and implementing a custom cursor with magnetic pull behavior
- Structuring animation code cleanly across a vanilla JS project without a framework

---

## Developer

**Faseeh Ur Rahman** — Frontend Developer
Specializing in animated, immersive web experiences.

Instagram: [@codewithfaseeh](https://www.instagram.com/codewithfaseeh)

---

## License

Built for internship/portfolio purposes. Not for resale or redistribution.