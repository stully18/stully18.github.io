document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('nav-links');
    const overlay = document.getElementById('nav-overlay');
    const navLinkItems = navLinks.querySelectorAll('.nav-link');

    function toggleMenu() {
        const isOpen = navLinks.classList.contains('active');
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
        overlay.classList.toggle('active');
        burger.setAttribute('aria-expanded', !isOpen);
        document.body.style.overflow = isOpen ? '' : 'hidden';
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
        overlay.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    burger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);
    navLinkItems.forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });

    // 2. Navbar Scroll Shadow
    const navbar = document.querySelector('.navbar');

    function updateNavbar() {
        navbar.classList.toggle('navbar--scrolled', window.scrollY > 30);
    }

    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

    // 3. Active Nav Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    const allNavLinks = document.querySelectorAll('.nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                allNavLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0
    });

    sections.forEach(section => navObserver.observe(section));

    // 4. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 5. Scroll Reveal Animations
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    animateElements.forEach(el => scrollObserver.observe(el));
});
