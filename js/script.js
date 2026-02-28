/* Soares Serviços - Global Logic */
document.addEventListener('DOMContentLoaded', () => {
    /* ── SCROLL REVEAL ── */
    const revealElements = document.querySelectorAll('.fade-up');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ── NAVBAR EFFECT ── */
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = '0.5rem 6%';
            nav.style.background = 'rgba(7, 29, 71, 0.95)';
            nav.style.height = '70px';
        } else {
            nav.style.padding = '0 6%';
            nav.style.background = 'rgba(7, 29, 71, 0.85)';
            nav.style.height = '80px';
        }
    });

    console.log('Premium Logic Activated - Soares Serviços');
});
