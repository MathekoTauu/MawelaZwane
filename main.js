/* ==========================================================================
   Mawela Zwane Attorneys — main.js
   Stripped to essentials: scroll reveal + smooth nav state
   ========================================================================== */

(function () {
  'use strict';

  // ── Scroll Reveal ──────────────────────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));


  // ── Nav scroll state ───────────────────────────────────────────────────────
  const nav = document.getElementById('nav');

  if (nav) {
    const onScroll = () => {
      nav.style.background = window.scrollY > 60
        ? 'rgba(43, 43, 43, 0.97)'
        : 'rgba(43, 43, 43, 0.92)';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }


  // ── Smooth anchor scrolling with nav offset ────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '72',
        10
      );
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  // ── Form submission (stub) ─────────────────────────────────────────────────
  const form = document.querySelector('.cform');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const orig = btn.textContent;
      btn.textContent = 'Enquiry sent.';
      btn.disabled = true;
      btn.style.opacity = '0.65';
      setTimeout(() => {
        btn.textContent = orig;
        btn.disabled = false;
        btn.style.opacity = '';
        form.reset();
      }, 4000);
    });
  }

})();