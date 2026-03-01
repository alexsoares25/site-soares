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

/**
 * Handles EAD course selection and prepares WhatsApp message
 */
function solicitarOrcamento() {
    const selectedCourses = [];
    const checkboxes = document.querySelectorAll('.course-list input[type="checkbox"]:checked');

    checkboxes.forEach(cb => {
        selectedCourses.push(cb.value);
    });

    if (selectedCourses.length === 0) {
        alert('Por favor, selecione pelo menos um curso para o orçamento.');
        return;
    }

    const message = `Olá, gostaria de um orçamento especial para os seguintes cursos em EAD:\n\n- ${selectedCourses.join('\n- ')}\n\nAguardo retorno.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5562982736369?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}
