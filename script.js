/* =========================================================
   PRABHANJAN P KATTI — PORTFOLIO SCRIPT
   Vanilla JS (ES6), no dependencies.

   Sections:
   1. Utilities
   2. Loading screen
   3. Custom cursor (desktop only)
   4. Scroll progress bar
   5. Navbar (scroll state, mobile menu, active link)
   6. Typing effect
   7. Scroll reveal animations
   8. Animated counters
   9. Project filtering
   10. Back to top
   11. Contact form
   12. Hero RTLS network canvas
   13. Footer year
   ========================================================= */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Utilities ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const lerp = (a, b, t) => a + (b - a) * t;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    initLoadingScreen();
    initCustomCursor();
    initProgressBar();
    initNavbar();
    initTypingEffect();
    initScrollReveal();
    initCounters();
    initProjectFilters();
    initBackToTop();
    initContactForm();
    initHeroCanvas();
    initFooterYear();
  }

  /* ---------- 2. Loading screen ---------- */
  function initLoadingScreen() {
    const screen = $("#loadingScreen");
    if (!screen) return;

    const minDelay = prefersReducedMotion ? 0 : 500;
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
    // Safety net so the loading screen never blocks the page indefinitely.
    setTimeout(() => screen.classList.add("is-hidden"), 4000);
  }

  /* ---------- 3. Custom cursor (desktop, fine pointer, motion allowed) ---------- */
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

    const hoverTargets = "a, button, input, textarea, .filter-btn";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverTargets)) outline.classList.add("is-active");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverTargets)) outline.classList.remove("is-active");
    });
  }

  /* ---------- 4. Scroll progress bar ---------- */
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

  /* ---------- 5. Navbar ---------- */
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
      toggle.innerHTML = '<svg class="icon"><use href="#icon-menu"></use></svg>';
    }

    if (toggle && links) {
      toggle.addEventListener("click", () => {
        const isOpen = links.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.innerHTML = isOpen
          ? '<svg class="icon"><use href="#icon-close"></use></svg>'
          : '<svg class="icon"><use href="#icon-menu"></use></svg>';
      });

      $$("[data-nav]", links).forEach((link) => link.addEventListener("click", closeMenu));
    }

    // Highlight the nav link for whichever section is currently in view.
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

  /* ---------- 6. Typing effect ---------- */
  function initTypingEffect() {
    const el = $("#typedText");
    if (!el) return;

    const phrases = ["Embedded Systems", "Industrial IoT", "Software Development", "AI", "Problem Solving"];

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

      let delay = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === current.length) {
        delay = 1400;
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

  /* ---------- 7. Scroll reveal ---------- */
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
      { threshold: 0.14, rootMargin: "0px 0px -60px 0px" }
    );
    items.forEach((item) => observer.observe(item));
  }

  /* ---------- 8. Animated counters ---------- */
  function initCounters() {
    const counters = $$("[data-count-to]");
    if (!counters.length) return;

    function animateCounter(el) {
      const target = parseInt(el.getAttribute("data-count-to"), 10) || 0;
      const suffix = el.getAttribute("data-suffix") || "";

      if (prefersReducedMotion) {
        el.textContent = target + suffix;
        return;
      }

      const duration = 1200;
      const start = performance.now();

      function frame(now) {
        const progress = clamp((now - start) / duration, 0, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
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

  /* ---------- 9. Project filtering ---------- */
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

  /* ---------- 10. Back to top ---------- */
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

  /* ---------- 11. Contact form ---------- */
  function initContactForm() {
    const form = $("#contactForm");
    const status = $("#formStatus");
    if (!form || !status) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = $("#name", form).value.trim();
      const email = $("#email", form).value.trim();
      const subject = $("#subject", form).value.trim();
      const message = $("#message", form).value.trim();

      if (!name || !email || !subject || !message) {
        status.textContent = "Please fill in every field before sending.";
        status.className = "contact-form__status is-error";
        return;
      }

      // This is a static site with no backend, so submitting opens the
      // visitor's email client with the message pre-filled. For production,
      // wire this form up to a service like Formspree, EmailJS, or Netlify
      // Forms instead, and swap this block out for a fetch() call.
      const mailto =
        "mailto:prabhanjank6080@gmail.com" +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;

      window.location.href = mailto;
      status.textContent = "Opening your email client to send this message…";
      status.className = "contact-form__status is-success";
      form.reset();
    });
  }

  /* ---------- 12. Hero RTLS network canvas ----------
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

      // Faint connective mesh between anchors within signal range.
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

      // Anchors, each with a slow pulsing signal ring.
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

      // A moving tag, trilaterated by its three nearest anchors.
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
      draw(0); // Single static frame — no continuous animation loop.
      return;
    }

    new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }).observe(hero);

    requestAnimationFrame(loop);
  }

  /* ---------- 13. Footer year ---------- */
  function initFooterYear() {
    const el = $("#year");
    if (el) el.textContent = new Date().getFullYear();
  }
})();
