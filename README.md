# Prabhanjan P Katti — Portfolio

A premium, dark-themed personal portfolio built with plain HTML5, CSS3 and
vanilla JavaScript — no frameworks, no build step.

## Structure

```
portfolio/
├── index.html          All markup, in section order (nav → hero → … → footer)
├── style.css            Design tokens (:root) + one section per component
├── script.js             One init function per feature, see the file header
└── assets/
    ├── images/          profile.jpg is here; add project screenshots too
    ├── icons/            favicon.svg (placeholder monogram)
    ├── certificates/     Add certificate images/PDFs here
    └── resume/           Add resume.pdf here
```

## Already filled in from your resume

- **Resume PDF** at `assets/resume/resume.pdf` — the View/Download buttons
  and the footer's "Resume" link all point to it.
- **Phone, email and LinkedIn** in the Contact section, footer, hero social
  pills, and the contact form's `mailto:` target.
- **Photo** — your headshot is at `assets/images/profile.jpg`, cropped and
  shown as a circular avatar in the About section.
- **GitHub** — github.com/Prabhanjan3247, linked from the hero, footer,
  Contact section, and the Projects "Visit GitHub" button.
- **Location** — Electronic City, Bangalore, shown in the Contact section.
- **Education** — both degrees (with CGPA) and both schools (with dates and
  percentages).
- **Experience, Skills and Certifications** content, matched to your resume.

## Still to replace

- **Certification dates & links:** your resume doesn't include issue dates,
  so each cert card says "Add issue date" — and the "View Credential"
  buttons are still `href="#"` until you have real links.
- **Project links:** each project card's "Code" / "Live Demo" buttons are
  `href="#"` until you add real repository and deployment URLs.
- **Achievements section:** still empty-state placeholders (hackathons,
  awards, etc.) — nothing on your resume to fill these yet.
- **Contact form:** has no backend. Submitting opens the visitor's email
  client via a `mailto:` link (see `initContactForm` in `script.js`). For a
  real inbox, wire it to [Formspree](https://formspree.io),
  [EmailJS](https://www.emailjs.com/) or your host's forms feature (e.g.
  Netlify Forms) instead.

## Running locally

No build step — just serve the folder, e.g.:

```
npx serve .
```

or open `index.html` directly in a browser.

## Deploying

Works as-is on **GitHub Pages**, **Vercel**, or **Netlify** — push the
`portfolio/` folder to a repo and point any of the three at it (no build
command needed, output directory is the repo root).

## Notes on the code

- Colors, fonts, spacing and easing all live as CSS custom properties at
  the top of `style.css` — change them once, they cascade everywhere.
- The hero background canvas (`initHeroCanvas` in `script.js`) draws a
  small anchor/tag network — a nod to the RTLS work described in the
  Experience section — and pauses automatically off-screen.
- All animation respects `prefers-reduced-motion`.
- Icons are a single inline `<svg><symbol>` sprite near the top of
  `index.html`, reused via `<use href="#icon-name">` — add new ones there.
