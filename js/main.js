/**
 * AIGRID Ventures — Main JavaScript
 *
 * Modules:
 *  1. Header scroll behavior
 *  2. Mobile navigation
 *  3. Active nav link on scroll
 *  4. Scroll-reveal animations
 *  5. Smooth scroll for anchor links
 *  6. Contact form handler
 *  7. Counter animation
 */

'use strict';

/* ============================================================
   Utility: Run callback after DOM is ready
   ============================================================ */
function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

/* ============================================================
   1. Header scroll behavior
   ============================================================ */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const SCROLL_THRESHOLD = 10;

  function updateHeader() {
    const scrolled = window.scrollY > SCROLL_THRESHOLD;
    header.classList.toggle('scrolled', scrolled);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader(); // run once on init
}

/* ============================================================
   2. Mobile Navigation
   ============================================================ */
function initMobileNav() {
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.nav__mobile');
  if (!toggle || !mobileMenu) return;

  toggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  mobileMenu.querySelectorAll('.nav__mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (event) => {
    if (
      mobileMenu.classList.contains('open') &&
      !toggle.contains(event.target) &&
      !mobileMenu.contains(event.target)
    ) {
      mobileMenu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ============================================================
   3. Active nav link on scroll (Intersection Observer)
   ============================================================ */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    {
      rootMargin: '-40% 0px -50% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ============================================================
   4. Scroll-reveal animations (Intersection Observer)
   ============================================================ */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once only
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -48px 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ============================================================
   5. Smooth scroll for anchor links
   ============================================================ */
function initSmoothScroll() {
  document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    event.preventDefault();

    const navHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
      10
    ) || 72;

    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
}

/* ============================================================
   6. Contact form handler
   ============================================================ */
function initContactForm() {
  const form = document.querySelector('.contact__form-el');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn ? btn.textContent : '';

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Sending…';
    }

    // Simulate async submission (replace with real endpoint)
    setTimeout(() => {
      if (btn) {
        btn.textContent = 'Message Sent ✓';
        btn.style.background = 'linear-gradient(135deg, #00c853, #00e676)';
      }

      // Reset after 3 seconds
      setTimeout(() => {
        form.reset();
        if (btn) {
          btn.disabled = false;
          btn.textContent = originalText;
          btn.style.background = '';
        }
      }, 3000);
    }, 1200);
  });
}

/* ============================================================
   7. Animated number counter on scroll
   ============================================================ */
function animateCounter(element, target, duration = 1600) {
  const start = performance.now();
  const isDecimal = String(target).includes('.');
  const suffix = element.dataset.suffix || '';

  function step(timestamp) {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = eased * target;

    element.textContent = isDecimal
      ? value.toFixed(1) + suffix
      : Math.floor(value) + suffix;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = target + suffix;
    }
  }

  requestAnimationFrame(step);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.counter);
          animateCounter(el, target);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* ============================================================
   Boot
   ============================================================ */
ready(() => {
  initHeader();
  initMobileNav();
  initActiveNav();
  initScrollReveal();
  initSmoothScroll();
  initContactForm();
  initCounters();
});
