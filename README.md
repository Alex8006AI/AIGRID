# AIGRID Ventures — Corporate Website

> Powering the Future of AI Infrastructure

A static corporate website for **AIGRID Ventures LLC**, built with semantic HTML5, vanilla CSS (custom properties), and vanilla JavaScript. No build tools or frameworks required — open `index.html` directly in any modern browser.

---

## Project Structure

```
aigrid-website/
├── index.html          # Main entry point
├── css/
│   └── main.css        # All styles (design tokens → components → responsive)
├── js/
│   └── main.js         # Scroll behavior, nav, animations, form handler
├── assets/             # Place images, icons, logos here
└── README.md
```

---

## Getting Started

```bash
# Clone or download the repo, then simply open the file:
open index.html

# Or serve locally (recommended for font loading):
npx serve .
# → http://localhost:3000
```

No dependencies to install. No build step.

---

## Page Sections

| Section | ID | Description |
|---|---|---|
| Hero | `#home` | Headline, CTA, animated stats |
| About | `#about` | Company overview, mission, values |
| Services | `#services` | Six core service cards |
| Solutions | `#solutions` | Eight solution offerings |
| Process | `#process` | Six-phase project delivery timeline |
| Partners | `#partners` | Technology partner grid |
| Investment | `#investment` | Partnership models & CTA |
| Contact | `#contact` | Contact channels + inquiry form |

---

## Design System

All design tokens live in `:root` CSS custom properties inside `css/main.css`:

- **Colors** — `--color-bg`, `--color-primary`, `--color-accent`, …
- **Typography** — `--text-xs` … `--text-7xl`, `--font-weight-*`
- **Spacing** — `--space-1` … `--space-24` (8 px base grid)
- **Radii / Shadows / Transitions** — consistent across all components

To retheme, edit only the `:root` block.

---

## JavaScript Modules (`js/main.js`)

| Module | Description |
|---|---|
| `initHeader` | Adds `.scrolled` class to header on scroll |
| `initMobileNav` | Hamburger toggle + outside-click close |
| `initActiveNav` | Highlights active nav link via `IntersectionObserver` |
| `initScrollReveal` | Fade-in-up on scroll for `.reveal` elements |
| `initSmoothScroll` | Native smooth scroll with nav-height offset |
| `initContactForm` | Async-simulated form submit with loading/success states |
| `initCounters` | Animated number counters triggered on scroll |

---

## Coding Conventions

- **HTML** — semantic elements (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`), ARIA labels, `role` attributes
- **CSS** — BEM-ish class naming (`block__element--modifier`), no `!important`, mobile-first media queries
- **JS** — ES2020, `'use strict'`, no global state, each feature in its own named function, passive event listeners

---

## Customisation Checklist

- [ ] Replace placeholder emails with real addresses
- [ ] Add real logo / favicon in `assets/`
- [ ] Connect contact form to a backend endpoint (e.g. Formspree, SendGrid)
- [ ] Add `og:image` meta tag once a hero image is ready
- [ ] Update partner logos once licensing is confirmed

---

## Browser Support

All modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+). Uses `IntersectionObserver`, CSS custom properties and `clamp()` — no polyfills needed for the target audience.

---

## License

Copyright © AIGRID Ventures LLC. All rights reserved.
