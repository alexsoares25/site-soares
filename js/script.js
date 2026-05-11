/**
 * SOARES SERVICOS — Modern Interactions v2.0
 * ============================================================
 * Animacoes fluidas, efeitos de scroll e micro-interacoes
 * ============================================================
 */

(function() {
  'use strict';

  /* ============================================================
     1. NAVBAR SCROLL EFFECT
     ============================================================ */
  function initNavbar() {
    const navbar = document.querySelector('nav, #navbar');
    if (!navbar) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
          lastScrollY = window.scrollY;
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ============================================================
     2. MOBILE MENU
     ============================================================ */
  function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ============================================================
     3. REVEAL ANIMATIONS
     ============================================================ */
  function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ============================================================
     4. SMOOTH SCROLL
     ============================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').slice(1);
        if (!targetId) return;
        
        const target = document.getElementById(targetId);
        if (!target) return;

        e.preventDefault();
        const navbar = document.querySelector('nav, #navbar');
        const navHeight = navbar ? navbar.offsetHeight : 80;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      });
    });
  }

  /* ============================================================
     5. CARD HOVER EFFECTS
     ============================================================ */
  function initCardEffects() {
    const cards = document.querySelectorAll('.pillar-card, .card, .service-card, .channel-card, .resultado-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
    });
  }

  /* ============================================================
     6. BUTTON RIPPLE EFFECT
     ============================================================ */
  function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary, .btn-white, .btn-submit');

    buttons.forEach(btn => {
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';

      btn.addEventListener('click', function(e) {
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
          background: 'rgba(255, 255, 255, 0.3)',
          transform: 'scale(0)',
          animation: 'ripple 0.6s linear',
          pointerEvents: 'none',
          zIndex: '10'
        });

        btn.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });

    // Add ripple keyframes if not exists
    if (!document.getElementById('ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to { transform: scale(4); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /* ============================================================
     7. MAGNETIC BUTTONS
     ============================================================ */
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary');

    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ============================================================
     8. PARALLAX EFFECTS
     ============================================================ */
  function initParallax() {
    const parallaxElements = document.querySelectorAll('.bg-glow');
    if (!parallaxElements.length) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          parallaxElements.forEach((el, index) => {
            const speed = 0.05 * (index + 1);
            el.style.transform = `translateY(${scrollY * speed}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ============================================================
     9. COUNTER ANIMATION
     ============================================================ */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        if (isNaN(target)) return;

        let current = 0;
        const duration = 2000;
        const step = target / (duration / 16);

        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current).toLocaleString('pt-BR');
          if (current >= target) clearInterval(timer);
        }, 16);

        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  /* ============================================================
     10. FORM ENHANCEMENTS
     ============================================================ */
  function initFormEnhancements() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

    formInputs.forEach(input => {
      // Add floating label effect
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });

      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });

      // Check if already has value
      if (input.value) {
        input.parentElement.classList.add('focused');
      }
    });
  }

  /* ============================================================
     11. TYPING EFFECT
     ============================================================ */
  function initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');
    if (!typingElements.length) return;

    typingElements.forEach(el => {
      const text = el.dataset.typing;
      const speed = parseInt(el.dataset.speed, 10) || 100;
      let i = 0;

      el.textContent = '';
      el.style.borderRight = '2px solid var(--accent)';

      function type() {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        } else {
          // Remove cursor after typing
          setTimeout(() => {
            el.style.borderRight = 'none';
          }, 1000);
        }
      }

      // Start typing when element is in view
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          type();
          observer.disconnect();
        }
      }, { threshold: 0.5 });

      observer.observe(el);
    });
  }

  /* ============================================================
     12. CURSOR GLOW EFFECT
     ============================================================ */
  function initCursorGlow() {
    // Only on desktop
    if (window.matchMedia('(hover: hover)').matches === false) return;

    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(212, 167, 69, 0.08) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 0;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s ease;
      opacity: 0;
    `;
    document.body.appendChild(glow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      glow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }

    animateGlow();
  }

  /* ============================================================
     13. STAGGER ANIMATIONS
     ============================================================ */
  function initStaggerAnimations() {
    const staggerContainers = document.querySelectorAll('[data-stagger]');

    staggerContainers.forEach(container => {
      const children = container.children;
      const delay = parseFloat(container.dataset.stagger) || 0.1;

      Array.from(children).forEach((child, index) => {
        child.style.transitionDelay = `${index * delay}s`;
      });
    });
  }

  /* ============================================================
     INIT — Wait for DOM
     ============================================================ */
  function init() {
    // Initialize Lucide icons if available
    if (window.lucide) {
      lucide.createIcons();
    }

    // Initialize all modules
    initNavbar();
    initMobileMenu();
    initRevealAnimations();
    initSmoothScroll();
    initCardEffects();
    initRippleEffect();
    initMagneticButtons();
    initParallax();
    initCounters();
    initFormEnhancements();
    initTypingEffect();
    initCursorGlow();
    initStaggerAnimations();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Reinit on page visibility change (for SPA navigation)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && window.lucide) {
      lucide.createIcons();
    }
  });

})();
