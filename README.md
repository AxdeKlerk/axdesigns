# `/*axdesigns*/` — Static Website

This repository contains the source code for the `/*axdesigns*/` website.

It is a static, fixed-scope marketing site built with plain HTML, CSS, and a small amount of JavaScript, designed to be fast, accessible, and easy to maintain without a framework or build pipeline.

The site is intentionally simple and deliberately opinionated.

---

## Overview

- **Type:** Static website
- **Stack:** HTML5, CSS3, Bootstrap 5.3.8, vanilla JavaScript
- **Hosting:** Cloudflare Pages
- **Forms:** Formspree
- **Design approach:** Fixed layout, no dynamic rendering, no CMS

This site is not intended to be extended into an application.

---

## Key Features

- Responsive layout (mobile-first)
- Fixed navigation with modal contact form
- Accessible markup and contrast
- SEO-friendly static pages
- Lightweight JavaScript for navbar behaviour only
- No tracking, no cookies by default

---

## Project Structure
```text
/
├── index.html
├── order.html
├── thank-you.html
├── privacy.html
├── terms.html
├── disclaimer.html
├── contract.html
│
├── assets/
│ ├── images/
│ │ ├── hero images
│ │ ├── background textures
│ │ └── brand assets
│ ├── style/
│ │ └── style-v2.css
│ └── js/
│ └── main.js
│ └──templates
│ └──README.md
```

---

## Images & Placeholders

All images in this repository are **project-specific** and should be treated as placeholders unless explicitly licensed.

When reusing or adapting this site:

- Replace all images in `/assets/images/`
- Maintain image dimensions where possible to avoid layout shifts
- Optimise images before deployment (WebP preferred where supported)

Image filenames are descriptive but not semantically meaningful outside this project.

---

## Styling Notes

- All custom styles live in `style-v2.css`
- Bootstrap is used **as-is** (no recompilation)
- Gradients and overlays are intentional and should not be simplified for tooling scores
- Lighthouse scores were treated as diagnostics, not targets

Do not refactor CSS unless you fully understand the visual and layout consequences.

---

## JavaScript Behaviour

JavaScript is intentionally minimal.

`main.js` handles:
- Closing the mobile navbar after link clicks
- Preserving expected behaviour for dropdowns and same-page anchors

There is no client-side routing and no state management.

---

## Forms & Submissions

- Contact and order forms submit via **Formspree**
- No form data is stored in this repository
- Redirects are handled via Formspree configuration

If replacing Formspree, ensure equivalent spam protection and redirect handling.

---

## Accessibility & SEO

- Semantic HTML is used throughout
- Colour contrast has been manually verified
- Pages include appropriate meta descriptions
- Legal and confirmation pages are set to `noindex`

Accessibility and SEO were prioritised over framework usage or animations.

---

## Terms & Conditions

This repository and its contents are provided **as-is**.

- Code may be reused for personal or educational purposes
- Branding, copy, and legal text are **not licensed for reuse**
- This project includes UK-specific legal language and should not be reused without review

No warranty is provided.

---

## Maintenance Philosophy

This site is considered **feature-complete**.

Future changes should be limited to:
- Content updates
- Image replacements
- Minor copy adjustments

Structural changes, redesigns, or framework migrations are explicitly out of scope.

---

## Status

✅ Complete  
✅ Deployed  
✅ No further changes planned

