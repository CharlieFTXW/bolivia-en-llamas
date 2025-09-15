// ===================================
// BOLIVIA EN LLAMAS - JAVASCRIPT
// ===================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    initScrollAnimations();
    initSmoothScroll();
    initAlertPulse();
});

// ===================================
// SLIDER CON ANIMACIONES
// ===================================

function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    let currentSlide = 0;

    // Crear puntos de navegación
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Función para mostrar una diapositiva
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Ir a una diapositiva específica
    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }

    // Diapositiva anterior
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Diapositiva siguiente
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Eventos de botones
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto-play cada 5 segundos
    setInterval(nextSlide, 5000);

    // Mostrar la primera diapositiva
    showSlide(currentSlide);
}

// ===================================
// ANIMACIONES AL HACER SCROLL
// ===================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.impact-card, .cause-card, .awareness-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===================================
// SCROLL SUAVE AL HACER CLICK
// ===================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// ANIMACIÓN DE BARRA DE ALERTA
// ===================================

function initAlertPulse() {
    const alertBar = document.querySelector('.alert-bar');
    if (alertBar) {
        setInterval(() => {
            alertBar.style.opacity = '0.7';
            setTimeout(() => {
                alertBar.style.opacity = '1';
            }, 500);
        }, 2000);
    }
}

// ===================================
// EFECTO DE HUMO SUAVE (OPCIONAL VISUAL)
// ===================================

function createSmokeEffect() {
    const smokeContainer = document.createElement('div');
    smokeContainer.style.position = 'fixed';
    smokeContainer.style.top = '0';
    smokeContainer.style.left = '0';
    smokeContainer.style.width = '100%';
    smokeContainer.style.height = '100%';
    smokeContainer.style.pointerEvents = 'none';
    smokeContainer.style.zIndex = '0';
    smokeContainer.style.overflow = 'hidden';
    document.body.appendChild(smokeContainer);

    for (let i = 0; i < 15; i++) {
        const smoke = document.createElement('div');
        smoke.style.position = 'absolute';
        smoke.style.width = `${Math.random() * 100 + 50}px`;
        smoke.style.height = smoke.style.width;
        smoke.style.background = 'radial-gradient(circle, rgba(128,128,128,0.2), transparent)';
        smoke.style.borderRadius = '50%';
        smoke.style.bottom = '-150px';
        smoke.style.left = `${Math.random() * 100}%`;
        smoke.style.animation = `smokeRise ${Math.random() * 10 + 10}s linear infinite`;
        smokeContainer.appendChild(smoke);
    }

    // Agregar animación de humo
    const style = document.createElement('style');
    style.textContent = `
        @keyframes smokeRise {
            0% {
                transform: translateY(0) scale(1);
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100vh) scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Llamar al efecto de humo (opcional)
createSmokeEffect();

// ===================================
// PREVENIR CIERRE ACCIDENTAL CON ALERTA
// ===================================

window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = '¿Estás seguro de que quieres salir? La emergencia ambiental en Bolivia continúa.';
});