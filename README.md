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
   - Accessible **Project Details Modal** (`role="dialog"`, ESC key close, URL hash deep linking like `#project-churn`, `#project-quiz`, `#project-rtls`, `#project-riscv`, `#project-antenna`).
   - **Capstone Project**: Added *"Design of Blade Antenna for UAV Applications"* (In Progress) at PES University — covering wideband (20 MHz–1300 MHz) bi-blade dipole antenna modeling, gain improvement analysis, adaptive convergence meshing in Ansys HFSS, and matching circuit design in Keysight ADS.
   - **Hardware & VLSI**: *"RISC-V 32-Bit Processor Subsystem"* (In Progress) SystemVerilog RTL design verified in Xilinx Vivado.
   - **Research & RTLS**: Industrial asset tracking research conducted during Cummins India internship with clear `RTLS` status classification.
   - Verified Code repository link for **Customer Churn Prediction** (`github.com/Prabhanjan3247/Customer-Churn-Prediction`).

3. **Production-Ready Web3Forms Contact Form**:
   - Direct integration with **Web3Forms** using a dedicated access key.
   - Asynchronous `fetch` submission with button loading states, anti-spam honeypot protection (`botcheck`), and instant real-time field validation.
   - Graceful status notifications for success, validation errors, and network/server failure with automatic `mailto:` direct email fallback.
   - Clean, ad-free message delivery straight to `prabhanjank6080@gmail.com`.

4. **Reorganized Technical Skills & Electronics Simulation**:
   - Categorized into 6 clean, verified groups:
     1. *Embedded Systems & Digital Design*
     2. *Electronics & Simulation* (including **Ansys HFSS**, **Keysight ADS**, MATLAB, Simulink, Cadence Virtuoso, and Xilinx Vivado)
     3. *Programming Languages*
     4. *Software & Data Analytics*
     5. *Cloud & AI Tools*
     6. *Professional Skills*

5. **Cleaned Certifications & Activities**:
   - Removed all placeholder dates and empty cards.
   - Credential verification tags and direct PDF viewing links for verified credentials (including AWS Cloud Quest, Simulink Onramp, and Smart Farming Guest Talk certificate of participation).
   - 10 recognized certifications & credentials accurately documented.

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
