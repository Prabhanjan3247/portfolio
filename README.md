# Prabhanjan P Katti — Portfolio

A high-performance, accessible, dark-themed personal portfolio built with plain HTML5, CSS3, and vanilla JavaScript (ES6) — no build step or node runtime dependencies required. Designed specifically for static hosting on **GitHub Pages**, **Vercel**, or **Netlify**.

## Project Structure

```
portfolio/
├── index.html          Semantic markup and SVG icon system
├── style.css            Design tokens (:root), responsive layout & component styles
├── script.js             Central project data, modal, Formspree async form & canvas
└── assets/
    ├── images/          profile.jpg (headshot)
    ├── icons/            favicon.svg
    ├── certificates/     Optional certificate images or PDFs
    └── resume/           resume.pdf (verified resume file)
```

## Features & Upgrades

1. **Recruiter-Focused Identity**:
   - Headline: *"Building intelligent systems at the intersection of electronics, VLSI and software."*
   - Clear distinction between B.Tech ECE (Major) and Computer Science & Engineering (Academic Minor) at PES University.
   - Grounded metrics without misleading counts or fake claims.

2. **Project Detail Views & Central Data**:
   - Central `projectsData` array in `script.js` maintaining problem statements, architecture, contributions, status, and verified URLs.
   - Accessible **Project Details Modal** (`role="dialog"`, ESC key close, URL hash deep linking like `#project-churn`, `#project-quiz`, `#project-rtls`).
   - Verified Code button for **Customer Churn Prediction** (`github.com/Prabhanjan3247/Customer-Churn-Prediction`).
   - Missing repository buttons are hidden cleanly—no broken `#` links or fabricated URLs.
   - Distinct classification of the RTLS work as **industrial research & technology evaluation** during the Cummins India internship.

3. **Production-Ready FormSubmit.co Contact Form (Unlimited Free Submissions)**:
   - Asynchronous `fetch` submission with loading state, anti-duplicate prevention, honeypot spam protection (`_gotcha`), and client-side validation.
   - Clean success, failure, and first-time activation status notifications.
   - 100% unlimited free messages delivered straight to `prabhanjank6080@gmail.com` with no monthly caps and no account needed.

4. **Reorganized Technical Skills**:
   - Categorized into 6 clean, verified groups:
     1. *Embedded Systems & Digital Design*
     2. *Electronics & Simulation*
     3. *Programming Languages*
     4. *Software & Data Analytics*
     5. *Cloud & AI Tools*
     6. *Professional Skills*

5. **Cleaned Certifications & Activities**:
   - Removed all `"Add issue date"` placeholders.
   - Credential verification tags for all 9 recognized certifications.
   - Removed empty achievement card placeholders.

## Contact Form Activation (30 Seconds — One Time Only)

The contact form is already pre-configured to send messages directly to `prabhanjank6080@gmail.com` with **unlimited submissions** via FormSubmit.co:

1. Open your portfolio website and submit a quick test message through the Contact section.
2. Check your `prabhanjank6080@gmail.com` inbox for an email from FormSubmit titled *"Please confirm your email"*.
3. Click the **"Activate Form"** button inside that email.
4. That's it! From then on, every message submitted on your portfolio arrives directly in your Gmail inbox with zero limits, and you can reply to visitors normally with the standard "Reply" button.

## Running Locally

Open `index.html` directly in any web browser, or serve it locally using any static HTTP server:

```bash
# Using python:
python -m http.server 8000

# Or using npx:
npx serve .
```

Then visit `http://localhost:8000` (or the printed port).

## Deploying to GitHub Pages

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Upgrade portfolio with project detail modals and Formspree"
   git push origin main
   ```
2. In your repository on GitHub, go to **Settings** → **Pages**.
3. Under **Branch**, select `main` and set the folder to `/` (or `/portfolio` if hosted in a subfolder).
4. Click **Save**. Within 1–2 minutes, your portfolio will be live at:
   `https://<your-username>.github.io/<repo-name>/`
