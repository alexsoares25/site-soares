/**
 * SOARES SERVIÇOS — melhorias.js v1.0
 * ============================================================
 * Animações de scroll, efeito de navbar e micro-interações.
 *
 * COMO USAR:
 * Adicione antes do </body> em cada página HTML:
 * <script src="js/melhorias.js" defer></script>
 * ============================================================
 */

(function () {
  'use strict';

  /* –––––––––––––––––––––––––––––
     1. NAVBAR — Efeito de scroll (adiciona classe .scrolled)
  ––––––––––––––––––––––––––––– */
  function initNavbarScroll() {
    const nav = document.querySelector('nav, header, .navbar, #navbar');
    if (!nav) return;

    function onScroll() {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* –––––––––––––––––––––––––––––
     2. ANIMAÇÕES DE ENTRADA — IntersectionObserver
  ––––––––––––––––––––––––––––– */
  function initScrollAnimations() {
    const animatableSelectors = [
      'section h2',
      'section h3',
      'section > p',
      '.card',
      '.service-card',
      '.area-card',
      '.process-step',
      '.step',
      '.historico .card',
      '.atuacao .card',
      'footer > div > *',
    ].join(', ');

    const elements = document.querySelectorAll(animatableSelectors);
    if (!elements.length) return;

    const sections = new Map();

    elements.forEach((el) => {
      const section = el.closest('section') || el.closest('footer') || document.body;
      if (!sections.has(section)) sections.set(section, []);
      sections.get(section).push(el);
    });

    sections.forEach((els) => {
      els.forEach((el, index) => {
        if (el.matches('h2, h3, p, section > p')) {
          el.classList.add('animate-fade-up');
          if (index < 6) el.classList.add(`animate-delay-${index + 1}`);
        } else if (el.matches('.card, .service-card, .area-card, .process-step, .step')) {
          el.classList.add('animate-scale-in');
          const delay = Math.min(index + 1, 6);
          el.classList.add(`animate-delay-${delay}`);
        } else {
          el.classList.add('animate-fade-in');
        }
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
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

  /* –––––––––––––––––––––––––––––
     3. HOVER SHIMMER — efeito de brilho nos cards
  ––––––––––––––––––––––––––––– */
  function initCardShimmer() {
    const cards = document.querySelectorAll('.card, .service-card, .area-card');

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        card.style.setProperty('--shimmer-x', `${x}%`);
        card.style.setProperty('--shimmer-y', `${y}%`);
        card.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, rgba(232,153,28,0.04) 0%, transparent 60%)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.backgroundImage = '';
      });
    });
  }

  /* –––––––––––––––––––––––––––––
     4. SMOOTH SCROLL para links internos
  ––––––––––––––––––––––––––––– */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (!target) return;

        e.preventDefault();
        const navHeight = document.querySelector('nav, header, .navbar')?.offsetHeight || 80;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      });
    });
  }

  /* –––––––––––––––––––––––––––––
     5. BOTÕES — Efeito ripple no clique
  ––––––––––––––––––––––––––––– */
  function initRippleEffect() {
    const buttons = document.querySelectorAll(
      '.btn, .button, a.btn, a.button, a[href*="wa.me"]'
    );

    buttons.forEach((btn) => {
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';

      btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        Object.assign(ripple.style, {
          position: 'absolute',
          width: size + 'px',
          height: size + 'px',
          left: x + 'px',
          top: y + 'px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.25)',
          transform: 'scale(0)',
          animation: 'ss-ripple 0.55s linear',
          pointerEvents: 'none',
        });

        btn.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });

    if (!document.getElementById('ss-ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ss-ripple-style';
      style.textContent = `
        @keyframes ss-ripple {
          to { transform: scale(3); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /* –––––––––––––––––––––––––––––
     6. COUNTER — Animação de números (se houver stats)
  ––––––––––––––––––––––––––––– */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count], .counter, .stat-number');
    if (!counters.length) return;

    const observerCounter = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const target = parseInt(el.dataset.count || el.textContent, 10);
          if (isNaN(target)) return;

          let current = 0;
          const duration = 1800;
          const step = target / (duration / 16);

          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = Math.floor(current).toLocaleString('pt-BR');
            if (current >= target) clearInterval(timer);
          }, 16);

          observerCounter.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => observerCounter.observe(el));
  }

  /* –––––––––––––––––––––––––––––
     INIT — Aguarda DOM carregado
  ––––––––––––––––––––––––––––– */
  function init() {
    initNavbarScroll();
    initScrollAnimations();
    initCardShimmer();
    initSmoothScroll();
    initRippleEffect();
    initCounters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
