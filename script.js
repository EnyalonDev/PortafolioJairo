import { translations } from './translations.js';

// --- Language Logic ---
const langToggle = document.getElementById('lang-toggle');
const langIcon = langToggle?.querySelector('.lang-icon');
const langText = langToggle?.querySelector('.lang-text');

let currentLang = localStorage.getItem('portfolio_lang') || 'es';

function updateLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    // Update Text Content
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let text = t;
        for (const k of keys) {
            if (text[k] === undefined) {
                console.warn(`Translation missing for: ${key}`);
                return;
            }
            text = text[k];
        }
        element.textContent = text;
    });

    // Update Placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(element => {
        const key = element.getAttribute('data-i18n-ph');
        const keys = key.split('.');
        let text = t;
        for (const k of keys) {
            if (text[k] === undefined) return;
            text = text[k];
        }
        element.placeholder = text;
    });

    // Update Toggle Button (Show target language)
    if (lang === 'es') {
        if (langIcon) langIcon.textContent = '🇺🇸';
        if (langText) langText.textContent = 'EN';
        document.documentElement.lang = 'es';
    } else {
        if (langIcon) langIcon.textContent = '🇪🇸';
        if (langText) langText.textContent = 'ES';
        document.documentElement.lang = 'en';
    }

    localStorage.setItem('portfolio_lang', lang);
    currentLang = lang;
}

if (langToggle) {
    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'es' ? 'en' : 'es';
        updateLanguage(newLang);
    });
}

// Initialize Language
document.addEventListener('DOMContentLoaded', () => {
    updateLanguage(currentLang);
});

// --- Existing Logic ---

// Header effect on scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Basic Form Submission
const contactForm = document.getElementById('portfolioContact');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simple alert for verified functionality
        alert(currentLang === 'es'
            ? 'Gracias por tu mensaje. Jairo se pondrá en contacto contigo pronto.'
            : 'Thank you for your message. Jairo will contact you soon.');
        contactForm.reset();
    });
}

// Simple reveal animation on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .timeline-item, .portfolio-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});
