/**
 * SOARES SERVIÇOS — js/script.js
 * ============================================================
 * Comportamentos compartilhados por todas as páginas:
 * menu mobile, animação de entrada (.reveal), rolagem suave
 * e link ativo do menu.
 *
 * Inclua antes do </body>:
 * <script src="js/script.js" defer></script>
 * ============================================================
 */

(function () {
  'use strict';

  /* 1. ANIMAÇÃO DE ENTRADA — elementos com a classe .reveal */
  function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
  }

  /* 2. MENU MOBILE — botão hambúrguer */
  function initMobileMenu() {
    const toggle   = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (!toggle || !navLinks) return;

    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'nav-links');

    function setOpen(open) {
      navLinks.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      toggle.textContent = open ? '✕' : '☰';
    }

    toggle.addEventListener('click', () => {
      setOpen(!navLinks.classList.contains('nav-open'));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('nav-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* 3. ROLAGEM SUAVE para links internos (#ancora) */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href').slice(1);
        const target = targetId && document.getElementById(targetId);
        if (!target) return;

        e.preventDefault();
        const navHeight = document.querySelector('nav')?.offsetHeight || 80;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      });
    });
  }

  /* 4. MENU ATIVO — marca o link da página atual */
  function initActiveNav() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach((link) => {
      const href = (link.getAttribute('href') || '').split('#')[0];
      if (href === current && !link.getAttribute('href').includes('#')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  function init() {
    initReveal();
    initMobileMenu();
    initSmoothScroll();
    initActiveNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
