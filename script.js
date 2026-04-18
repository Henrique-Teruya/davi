/* ============================================
   DAVIZÃO — O MENINO DE OURO
   Script Principal
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- VerticalCutReveal Animation ---
  function initVerticalCutReveal() {
    const vcutElements = document.querySelectorAll('[data-vcut]');

    vcutElements.forEach(el => {
      const text = el.textContent.trim();
      const staggerFrom = el.dataset.staggerFrom || 'first';
      const baseDelay = parseFloat(el.dataset.delay) || 0;
      const staggerDuration = 0.025; // seconds between each character

      // Clear and rebuild with individual character spans
      el.textContent = '';

      const chars = text.split('');
      const charSpans = [];

      chars.forEach(char => {
        const span = document.createElement('span');
        span.classList.add('vcut-char');
        span.textContent = char === ' ' ? '\u00A0' : char;
        el.appendChild(span);
        charSpans.push(span);
      });

      // Calculate stagger delays based on direction
      const total = charSpans.length;
      charSpans.forEach((span, i) => {
        let staggerIndex;
        switch (staggerFrom) {
          case 'last':
            staggerIndex = total - 1 - i;
            break;
          case 'center':
            staggerIndex = Math.abs(i - Math.floor(total / 2));
            break;
          default: // 'first'
            staggerIndex = i;
        }
        const delay = baseDelay + (staggerIndex * staggerDuration);
        span.style.animationDelay = `${delay}s`;
      });

      // Trigger reveal after a small initial delay
      setTimeout(() => {
        charSpans.forEach(span => span.classList.add('revealed'));
      }, 100);
    });
  }

  initVerticalCutReveal();


  // --- Scroll Reveal (Intersection Observer) ---
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger siblings slightly
          const siblings = entry.target.parentElement.querySelectorAll('.reveal');
          let siblingIndex = 0;
          siblings.forEach((sib, i) => {
            if (sib === entry.target) siblingIndex = i;
          });
          entry.target.style.transitionDelay = `${siblingIndex * 0.1}s`;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  initScrollReveal();


  // --- Navbar scroll effect ---
  function initNavScroll() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 80) {
            nav.classList.add('scrolled');
          } else {
            nav.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  initNavScroll();


  // --- Mobile menu ---
  function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      hamburger.classList.toggle('active');

      // Animate hamburger to X
      const spans = hamburger.querySelectorAll('span');
      if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  initMobileMenu();


  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // --- Parallax glow on hero ---
  function initHeroParallax() {
    const glow = document.querySelector('.hero-glow');
    if (!glow) return;

    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      glow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
  }

  initHeroParallax();

});
