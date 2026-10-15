/* =========================================================
   PRABHANJAN P KATTI — PORTFOLIO SCRIPT
   Vanilla JS (ES6), zero runtime dependencies.

   Sections:
   1. Central Project Data
   2. Utilities
   3. Loading screen
   4. Custom cursor (desktop only)
   5. Scroll progress bar
   6. Navbar (scroll state, mobile menu, active link)
   7. Typing effect
   8. Scroll reveal animations
   9. Animated counters
   10. Project filtering
   11. Project details modal & deep linking
   12. Back to top
   13. Contact form (FormSubmit.co unlimited async + accessible validation)
   14. Hero RTLS network canvas
   15. Footer year
   ========================================================= */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================================================
     CONTACT ENDPOINT CONFIGURATION (Web3Forms — free, no ads, no activation)
     Messages are forwarded directly to prabhanjank6080@gmail.com.
     Access key is public by design (safe to commit).
     ========================================================= */
  const CONTACT_EMAIL    = "prabhanjank6080@gmail.com";
  const WEB3FORMS_KEY    = "73f93a41-176c-4e05-986a-eb6eaee6d146";

  /* =========================================================
     1. CENTRAL PROJECT DATA
     Maintains metadata, architecture, contributions, status,
     and verified URLs in one authoritative place.
     ========================================================= */
  const projectsData = [
    {
      id: "project-churn",
      title: "Customer Churn Prediction",
      category: "data",
      categoryLabel: "Data & ML",
      badge: "Completed",
      badgeType: "completed",
      problem: "Subscription-based services experience preventable revenue loss due to unseen churn indicators and a lack of early customer risk segmentation.",
      description: "End-to-end data analytics workflow analyzing customer tenure, contract types, monthly charges, and service subscriptions to identify churn indicators and visualize customer segments.",
      technologies: ["Python", "MySQL", "Tableau", "Pandas", "Data Cleaning"],
      contribution: "Extracted and transformed customer records using MySQL; performed exploratory statistical analysis in Python with Pandas; built interactive Tableau dashboards to visualize churn drivers for business stakeholders.",
      architecture: "Relational Customer Dataset (MySQL) → Python ETL & Trend Analysis (Pandas) → Feature Evaluation → Interactive Multi-View Tableau Dashboard.",
      challenges: "Handling class distribution imbalance across churned accounts and structuring complex multi-variable service data into clean, actionable visual metrics.",
      outcomes: "Identified month-to-month contracts and short-tenure accounts as primary risk drivers; built dashboards providing immediate visibility into retention opportunities.",
      status: "Completed project with open-source code repository and documented dashboard insights.",
      repoUrl: "https://github.com/Prabhanjan3247/Customer-Churn-Prediction",
      demoUrl: null,
      isResearch: false
    },
    {
      id: "project-quiz",
      title: "Quiz App",
      category: "mobile",
      categoryLabel: "Mobile",
      badge: "Completed",
      badgeType: "completed",
      problem: "Developing an intuitive, responsive mobile quiz application with instant user feedback, structured question categories, and dynamic score calculation.",
      description: "Cross-platform mobile quiz application built using Flutter and Dart, featuring modular widget hierarchies, state-driven quizzes, dynamic score calculation, and smooth transitions.",
      technologies: ["Flutter", "Dart", "Mobile UI Design", "State Management"],
      contribution: "Designed custom UI screens and modular widgets, implemented structured question data models, built state management for quiz progressions, and engineered score evaluation logic.",
      architecture: "Flutter Component Tree → Stateful Quiz Controller → Modular Question Model Repository → Results Evaluation Screen.",
      challenges: "Managing clean state transitions and ensuring responsive layouts across varying mobile screen ratios.",
      outcomes: "Delivered a responsive mobile application with fluid transitions, clean Dart code structure, and zero frame drops on test devices.",
      status: "Completed mobile codebase.",
      repoUrl: null, // Hidden: No public repository URL currently available
      demoUrl: null,
      isResearch: false
    },
    {
      id: "project-rtls",
      title: "Industrial Asset Tracking Research",
      category: "research",
      categoryLabel: "Research & RTLS",
      badge: "Active Research",
      badgeType: "research",
      problem: "Maintaining continuous real-time visibility over semi-finished and finished goods across multi-tier (G+7) warehouse racking while analyzing Material Handling Equipment (MHE) routes in an active manufacturing plant.",
      description: "Researched and evaluated Real-Time Location System (RTLS) tracking technologies during the Cummins India internship. Focused on locating Semi-Finished and Finished Goods and tracking Very Narrow Aisle (VNA) truck movement patterns.",
      technologies: ["UWB", "BLE", "RFID", "RTLS", "Industrial IoT", "Material Handling"],
      contribution: "Conducted technical feasibility studies comparing UWB, BLE, and passive/active RFID; evaluated RF line-of-sight and metallic multipath interference on factory floors; studied VNA truck routes to analyze idle time; integrated workplace safety considerations into recommendations.",
      architecture: "Plant Floor Asset Tagging → Fixed Anchor / Gateway Network (Trilateration & Time-of-Flight evaluation) → Local Processing & Analytics → Plant Inventory & Safety Dashboard.",
      challenges: "Evaluating wireless propagation in heavy metallic racking environments (G+7 racks) with severe signal occlusion and balancing high location precision against infrastructure deployment costs.",
      outcomes: "Delivered comprehensive technical research reports and technology comparison matrices to guide engineering stakeholders on tracking accuracy, battery life, and safety constraints.",
      status: "Industrial research and engineering evaluation conducted during Cummins India internship (not a commercial software product).",
      repoUrl: null, // Internal company research - no public repository
      demoUrl: null,
      isResearch: true
    }
  ];

  /* ---------- 2. Utilities ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const lerp = (a, b, t) => a + (b - a) * t;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    initThemeToggle();
    initLoadingScreen();
    initCustomCursor();
    initProgressBar();
    initNavbar();
    initTypingEffect();
    initScrollReveal();
    initCounters();
    initProjectFilters();
    initProjectModal();
    initBackToTop();
    initCopyEmail();
    initContactForm();
    initHeroCanvas();
    initFooterYear();
  }

  /* ---------- 2.5 Theme toggle (dark / light mode) ---------- */
  function initThemeToggle() {
    const toggle = $("#themeToggle");
    if (!toggle) return;

    const storageKey = "portfolio-theme";
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    function applyTheme(theme) {
      if (theme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        toggle.setAttribute("aria-label", "Switch to dark mode");
        toggle.setAttribute("title", "Switch to dark mode");
      } else {
        document.documentElement.removeAttribute("data-theme");
        toggle.setAttribute("aria-label", "Switch to light mode");
        toggle.setAttribute("title", "Switch to light mode");
      }
    }

    // Determine initial theme: saved preference -> dark default
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      applyTheme(saved);
    } else if (!prefersDark.matches) {
      // Default dark, but honor system light if preferred
      applyTheme("dark");
    }

    toggle.addEventListener("click", () => {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const nextTheme = isLight ? "dark" : "light";
      applyTheme(nextTheme);
      try {
        localStorage.setItem(storageKey, nextTheme);
      } catch (e) {}
    });

    try {
      prefersDark.addEventListener("change", (e) => {
        if (!localStorage.getItem(storageKey)) {
          applyTheme(e.matches ? "dark" : "light");
        }
      });
    } catch (e) {}
  }

  /* ---------- 3. Loading screen ---------- */
  function initLoadingScreen() {
    const screen = $("#loadingScreen");
    if (!screen) return;

    const minDelay = prefersReducedMotion ? 0 : 400;
    const start = Date.now();

    function hide() {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, minDelay - elapsed);
      setTimeout(() => {
        screen.classList.add("is-hidden");
        screen.addEventListener("transitionend", () => screen.remove(), { once: true });
      }, wait);
    }

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide);
    }
    setTimeout(() => screen.classList.add("is-hidden"), 3000);
  }

  /* ---------- 4. Custom cursor (desktop, fine pointer, motion allowed) ---------- */
  function initCustomCursor() {
    const canUseCursor = window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion;
    if (!canUseCursor) return;

    document.documentElement.classList.add("has-custom-cursor");
    const dot = $("#cursorDot");
    const outline = $("#cursorOutline");
    if (!dot || !outline) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    function animateOutline() {
      outlineX = lerp(outlineX, mouseX, 0.18);
      outlineY = lerp(outlineY, mouseY, 0.18);
      outline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateOutline);
    }
    requestAnimationFrame(animateOutline);

    const hoverTargets = "a, button, input, textarea, .filter-btn, .chip";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverTargets)) outline.classList.add("is-active");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverTargets)) outline.classList.remove("is-active");
    });
  }

  /* ---------- 5. Scroll progress bar ---------- */
  function initProgressBar() {
    const bar = $("#progressBar");
    if (!bar) return;

    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${clamp(pct, 0, 100)}%`;
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- 6. Navbar ---------- */
  function initNavbar() {
    const nav = $("#nav");
    const toggle = $("#navToggle");
    const links = $("#navLinks");
    if (!nav) return;

    function onScroll() {
      nav.classList.toggle("is-scrolled", window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    function closeMenu() {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation menu");
      toggle.innerHTML = '<svg class="icon"><use href="#icon-menu"></use></svg>';
    }

    function openMenu() {
      links.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close navigation menu");
      toggle.innerHTML = '<svg class="icon"><use href="#icon-close"></use></svg>';
    }

    if (toggle && links) {
      toggle.addEventListener("click", () => {
        const isOpen = links.classList.contains("is-open");
        if (isOpen) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      $$("[data-nav]", links).forEach((link) => link.addEventListener("click", closeMenu));

      // Keyboard accessibility: Escape closes mobile menu and returns focus
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && links.classList.contains("is-open")) {
          closeMenu();
          toggle.focus();
        }
      });

      // Close when clicking outside of navbar
      document.addEventListener("click", (e) => {
        if (links.classList.contains("is-open") && !nav.contains(e.target)) {
          closeMenu();
        }
      });

      // Auto-close if screen is resized back to desktop
      window.addEventListener("resize", () => {
        if (window.innerWidth >= 1024 && links.classList.contains("is-open")) {
          closeMenu();
        }
      });
    }

    // Highlight the nav link for whichever section is currently in view
    const sections = $$("main section[id]");
    const navLinks = $$("[data-nav]");
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
  }

  /* ---------- 7. Typing effect ---------- */
  function initTypingEffect() {
    const el = $("#typedText");
    if (!el) return;

    const phrases = [
      "Embedded Systems",
      "Industrial IoT & RTLS",
      "Digital Design & VLSI",
      "Data Analytics & AI",
      "Software Engineering"
    ];

    if (prefersReducedMotion) {
      el.textContent = phrases[0];
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function tick() {
      const current = phrases[phraseIndex];
      charIndex += isDeleting ? -1 : 1;
      el.textContent = current.slice(0, charIndex);

      let delay = isDeleting ? 38 : 75;

      if (!isDeleting && charIndex === current.length) {
        delay = 1500;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
      }

      setTimeout(tick, delay);
    }
    tick();
  }

  /* ---------- 8. Scroll reveal ---------- */
  function initScrollReveal() {
    const items = $$("[data-reveal]");
    if (!items.length) return;

    if (prefersReducedMotion) {
      items.forEach((item) => item.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );
    items.forEach((item) => observer.observe(item));
  }

  /* ---------- 9. Animated counters ---------- */
  function initCounters() {
    const counters = $$("[data-count-to]");
    if (!counters.length) return;

    function animateCounter(el) {
      const raw = el.getAttribute("data-count-to");
      const isFloat = raw && raw.includes(".");
      const target = isFloat ? parseFloat(raw) : parseInt(raw, 10) || 0;
      const decimals = isFloat ? (raw.split(".")[1] || "").length : 0;
      const suffix = el.getAttribute("data-suffix") || "";

      if (prefersReducedMotion) {
        el.textContent = (isFloat ? target.toFixed(decimals) : target) + suffix;
        return;
      }

      const duration = 1200;
      const start = performance.now();

      function frame(now) {
        const progress = clamp((now - start) / duration, 0, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = isFloat ? (eased * target).toFixed(decimals) : Math.round(eased * target);
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((counter) => observer.observe(counter));
  }

  /* ---------- 10. Project filtering ---------- */
  function initProjectFilters() {
    const buttons = $$(".filter-btn");
    const cards = $$(".project-card");
    if (!buttons.length || !cards.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => {
          b.classList.remove("is-active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-pressed", "true");

        const filter = btn.getAttribute("data-filter");
        cards.forEach((card) => {
          const match = filter === "all" || card.getAttribute("data-category") === filter;
          card.classList.toggle("is-hidden", !match);
        });
      });
    });
  }

  /* ---------- 11. Project Details Modal ---------- */
  function initProjectModal() {
    const modal = $("#projectModal");
    const backdrop = $("#modalBackdrop");
    const closeBtn = $("#modalClose");
    const content = $("#modalContent");
    if (!modal || !content) return;

    let previousActiveElement = null;

    function openModal(projectId) {
      const project = projectsData.find((p) => p.id === projectId);
      if (!project) return;

      previousActiveElement = document.activeElement;

      content.innerHTML = `
        <div class="modal-header">
          <div class="modal-meta">
            <span class="modal-tag">${project.categoryLabel}</span>
            <span class="project-status project-status--${project.badgeType}">${project.badge}</span>
          </div>
          <h2 class="modal-title" id="modalTitle">${project.title}</h2>
        </div>

        <div class="modal-problem">
          <strong>Problem Statement</strong>
          ${project.problem}
        </div>

        <div class="modal-section">
          <h3 class="modal-section__title"><svg class="icon icon--sm"><use href="#icon-file"></use></svg> Project Overview</h3>
          <p>${project.description}</p>
        </div>

        <div class="modal-section">
          <h3 class="modal-section__title"><svg class="icon icon--sm"><use href="#icon-users"></use></svg> Key Contribution</h3>
          <p>${project.contribution}</p>
        </div>

        <div class="modal-section">
          <h3 class="modal-section__title"><svg class="icon icon--sm"><use href="#icon-cpu"></use></svg> Architecture &amp; Implementation</h3>
          <p>${project.architecture}</p>
        </div>

        <div class="modal-section">
          <h3 class="modal-section__title"><svg class="icon icon--sm"><use href="#icon-trophy"></use></svg> Challenges &amp; Outcomes</h3>
          <p>${project.outcomes}</p>
        </div>

        <div class="modal-section">
          <h3 class="modal-section__title"><svg class="icon icon--sm"><use href="#icon-code"></use></svg> Technologies Used</h3>
          <div class="chip-row">
            ${project.technologies.map(t => `<span class="chip chip--sm">${t}</span>`).join("")}
          </div>
        </div>

        <div class="modal-actions">
          ${project.repoUrl ? `
            <a href="${project.repoUrl}" class="btn btn--sm btn--primary" target="_blank" rel="noopener noreferrer">
              <svg class="icon icon--sm"><use href="#icon-code"></use></svg> View Source Code
            </a>
          ` : ""}
          ${project.demoUrl ? `
            <a href="${project.demoUrl}" class="btn btn--sm btn--secondary" target="_blank" rel="noopener noreferrer">
              <svg class="icon icon--sm"><use href="#icon-external"></use></svg> Live Demo
            </a>
          ` : ""}
          <button type="button" class="btn btn--sm btn--ghost" id="modalCloseAction">Close</button>
        </div>
      `;

      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      const innerClose = $("#modalCloseAction", content);
      if (innerClose) innerClose.addEventListener("click", closeModal);

      if (closeBtn) closeBtn.focus();

      history.replaceState(null, "", `#${project.id}`);
    }

    function closeModal() {
      if (!modal.classList.contains("is-open")) return;
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";

      if (previousActiveElement && typeof previousActiveElement.focus === "function") {
        previousActiveElement.focus();
      }

      if (window.location.hash.startsWith("#project-")) {
        history.replaceState(null, "", "#projects");
      }
    }

    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-project-id]");
      if (btn) {
        e.preventDefault();
        openModal(btn.getAttribute("data-project-id"));
      }
    });

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (backdrop) backdrop.addEventListener("click", closeModal);

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });

    if (window.location.hash && window.location.hash.startsWith("#project-")) {
      const targetId = window.location.hash.slice(1);
      if (projectsData.some((p) => p.id === targetId)) {
        setTimeout(() => openModal(targetId), 250);
      }
    }
  }

  /* ---------- 12. Back to top ---------- */
  function initBackToTop() {
    const btn = $("#backToTop");
    if (!btn) return;

    window.addEventListener("scroll", () => btn.classList.toggle("is-visible", window.scrollY > 480), {
      passive: true,
    });

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }


  /* ---------- 13. Copy-to-clipboard email button ---------- */
  function initCopyEmail() {
    const btn = $("#copyEmailBtn");
    if (!btn) return;

    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const email = btn.dataset.copy || "";
      const iconCopy  = $(".copy-badge__icon-copy",  btn);
      const iconCheck = $(".copy-badge__icon-check", btn);
      const feedback  = $("#copyFeedback", btn);

      try {
        await navigator.clipboard.writeText(email);
      } catch {
        // Fallback for older browsers
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.style.cssText = "position:fixed;opacity:0;pointer-events:none";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }

      // Show success state
      btn.classList.add("is-copied");
      if (iconCopy)  iconCopy.style.display  = "none";
      if (iconCheck) iconCheck.style.display = "";
      if (feedback)  feedback.textContent   = "Copied!";
      btn.setAttribute("aria-label", "Email copied to clipboard!");

      // Reset after 2 s
      setTimeout(() => {
        btn.classList.remove("is-copied");
        if (iconCopy)  iconCopy.style.display  = "";
        if (iconCheck) iconCheck.style.display = "none";
        if (feedback)  feedback.textContent   = "Copy";
        btn.setAttribute("aria-label", "Copy email address to clipboard");
      }, 2000);
    });
  }

  /* ---------- 14. Contact form (Web3Forms async — free, no ads, no activation) ---------- */
  function initContactForm() {
    const form      = $("#contactForm");
    const status    = $("#formStatus");
    if (!form || !status) return;

    const submitBtn      = $(".contact-form__submit", form);
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : "Send Message";

    function showStatus(message, type = "info") {
      status.className  = `contact-form__status is-visible is-${type}`;
      status.innerHTML  = message;
      status.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      $$("input, textarea", form).forEach((el) => el.classList.remove("is-invalid"));

      // Honeypot spam protection
      const honeypot = form.querySelector('[name="_honey"]')?.value;
      if (honeypot) return;

      const nameInput    = $("#name",    form);
      const emailInput   = $("#email",   form);
      const subjectInput = $("#subject", form);
      const messageInput = $("#message", form);

      const name    = nameInput.value.trim();
      const email   = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let hasError = false;

      if (!name)                             { nameInput.classList.add("is-invalid");    hasError = true; }
      if (!email || !emailRegex.test(email)) { emailInput.classList.add("is-invalid");   hasError = true; }
      if (!subject)                          { subjectInput.classList.add("is-invalid"); hasError = true; }
      if (!message)                          { messageInput.classList.add("is-invalid"); hasError = true; }

      if (hasError) {
        showStatus("Please complete all highlighted fields with valid information.", "error");
        $(".is-invalid", form)?.focus();
        return;
      }

      // Loading state
      if (submitBtn) {
        submitBtn.disabled  = true;
        submitBtn.innerHTML = `Sending\u2026 <span class="pulse-dot"></span>`;
      }

      try {
        const payload = new FormData();
        payload.append("access_key", WEB3FORMS_KEY);
        payload.append("name",    name);
        payload.append("email",   email);
        payload.append("subject", `Portfolio Contact: ${subject}`);
        payload.append("message", `From: ${name} (${email})\n\n${message}`);
        payload.append("botcheck", "");       // honeypot field for Web3Forms
        payload.append("from_name", "Portfolio Website");

        const res  = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body:   payload,
        });
        const data = await res.json();

        if (data.success) {
          showStatus(
            "\u2713 Message sent! Thank you, " + name + ". I\u2019ll get back to you shortly.",
            "success"
          );
          form.reset();
        } else {
          const fallback = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
          showStatus(
            `Something went wrong (${data.message || "unknown error"}). <a href="${fallback}" class="contact-form__fallback-link">Email me directly \u2192</a>`,
            "error"
          );
        }
      } catch {
        const fallback = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
        showStatus(
          `Network error. <a href="${fallback}" class="contact-form__fallback-link">Click here to email me directly \u2192</a>`,
          "error"
        );
      } finally {
        if (submitBtn) {
          submitBtn.disabled  = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  }

  /* ---------- 14. Hero RTLS network canvas ----------
     A lightweight animated node network — anchors linked by signal
     range, with a tag trilaterated by its three nearest anchors —
     echoing the Real-Time Location System work this portfolio is
     about. Pauses off-screen and respects prefers-reduced-motion. */
  function initHeroCanvas() {
    const canvas = $("#rtlsCanvas");
    const hero = $(".hero");
    if (!canvas || !hero || !canvas.getContext) return;
    const ctx = canvas.getContext("2d");

    const ACCENT = "59, 130, 246";
    const ACCENT_2 = "139, 92, 246";

    let width, height, dpr;
    let anchors = [];
    let tagAngle = 0;
    let isVisible = true;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = hero.clientWidth;
      height = hero.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildAnchors();
    }

    function buildAnchors() {
      const count = width < 640 ? 5 : width < 1024 ? 7 : 9;
      anchors = [];
      for (let i = 0; i < count; i++) {
        anchors.push({
          x: Math.random() * width,
          y: Math.random() * height,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw(time) {
      ctx.clearRect(0, 0, width, height);

      // Faint connective mesh between anchors within signal range
      const maxDist = width < 640 ? 220 : 320;
      for (let i = 0; i < anchors.length; i++) {
        for (let j = i + 1; j < anchors.length; j++) {
          const a = anchors[i];
          const b = anchors[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < maxDist) {
            ctx.strokeStyle = `rgba(${ACCENT}, ${(1 - dist / maxDist) * 0.18})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Anchors, each with a slow pulsing signal ring
      anchors.forEach((a) => {
        const pulse = (Math.sin(time / 900 + a.phase) + 1) / 2;

        ctx.beginPath();
        ctx.arc(a.x, a.y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT}, 0.9)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(a.x, a.y, 6 + pulse * 16, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ACCENT}, ${0.22 * (1 - pulse)})`;
        ctx.stroke();
      });

      // A moving tag, trilaterated by its three nearest anchors
      if (anchors.length >= 3) {
        tagAngle += 0.0022;
        const cx = width * 0.55;
        const cy = height * 0.45;
        const rx = width * 0.32;
        const ry = height * 0.28;
        const tx = cx + Math.cos(tagAngle) * rx;
        const ty = cy + Math.sin(tagAngle * 1.3) * ry;

        const nearest = [...anchors]
          .sort((a, b) => Math.hypot(a.x - tx, a.y - ty) - Math.hypot(b.x - tx, b.y - ty))
          .slice(0, 3);

        ctx.setLineDash([3, 5]);
        nearest.forEach((a) => {
          ctx.strokeStyle = `rgba(${ACCENT_2}, 0.3)`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(tx, ty);
          ctx.stroke();
        });
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.arc(tx, ty, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT_2}, 1)`;
        ctx.shadowColor = `rgba(${ACCENT_2}, 0.9)`;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function loop(time) {
      if (isVisible) draw(time);
      requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener("resize", resize);

    if (prefersReducedMotion) {
      draw(0);
      return;
    }

    new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }).observe(hero);

    requestAnimationFrame(loop);
  }

  /* ---------- 15. Footer year ---------- */
  function initFooterYear() {
    const el = $("#year");
    if (el) el.textContent = new Date().getFullYear();
  }
})();
