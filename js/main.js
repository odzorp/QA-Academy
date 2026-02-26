/**
 * Philip Odzor Portfolio - Main JavaScript
 * Interactive functionality for the portfolio website
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===============================
    // THEME TOGGLE FUNCTIONALITY
    // ===============================
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    if (themeToggle) {
        // Update button icon based on current theme
        updateThemeIcon(savedTheme);
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
    
    function updateThemeIcon(theme) {
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'light' ? '🌙' : '☀️';
            themeToggle.setAttribute('title', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
        }
    }
    
    // ===============================
    // MOBILE NAVIGATION TOGGLE
    // ===============================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // ===============================
    // HEADER SCROLL EFFECT
    // ===============================
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // ===============================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ===============================
    // FADE-IN ANIMATION ON SCROLL
    // DISABLED - Causing content to disappear
    // ===============================
    /*
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe cards and sections with animation
    document.querySelectorAll('.card, .tutorial-card, .section, .concept-card, .feature-card, .resource-card, .skill-group').forEach(el => {
        // Skip quiz elements from animation
        if (el.closest('.quiz-wrapper') || el.closest('#quiz-container') || el.id === 'quiz-container') {
            return;
        }
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    */
    
    // ===============================
    // CODE COPY BUTTON FUNCTIONALITY
    // ===============================
    // Handle pre/code blocks
    document.querySelectorAll('pre').forEach(pre => {
        createCopyButton(pre);
    });
    
    // Handle .code-block elements
    document.querySelectorAll('.code-block').forEach(block => {
        createCopyButton(block);
    });
    
    function createCopyButton(container) {
        // Check if button already exists
        if (container.querySelector('.copy-btn')) return;
        
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.innerHTML = '📋 Copy';
        
        container.style.position = 'relative';
        container.appendChild(button);
        
        // Show button on hover
        container.addEventListener('mouseenter', () => {
            button.style.opacity = '1';
        });
        
        container.addEventListener('mouseleave', () => {
            button.style.opacity = '0.7';
        });
        
        // Copy functionality
        button.addEventListener('click', () => {
            let textToCopy = '';
            
            // Try to get code content
            const code = container.querySelector('code');
            if (code) {
                textToCopy = code.textContent;
            } else {
                textToCopy = container.textContent;
            }
            
            // Remove button text from copy
            textToCopy = textToCopy.replace('📋 Copy', '').replace('✓ Copied!', '').trim();
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                button.innerHTML = '✓ Copied!';
                button.classList.add('copied');
                
                setTimeout(() => {
                    button.innerHTML = '📋 Copy';
                    button.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                button.innerHTML = '✗ Error';
            });
        });
    }
    
    // ===============================
    // FORM VALIDATION
    // ===============================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Thank you for subscribing! You\'ll receive updates on new tutorials.');
                this.reset();
            }
        });
    }
    
    // ===============================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ===============================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // ===============================
    // CONSOLE GREETING
    // ===============================
    console.log('%c👋 Hi! Thanks for checking out my portfolio.', 'color: #3b82f6; font-size: 14px; font-weight: bold;');
    console.log('%c📚 Learn more about LoadMagic.AI at the tutorials page!', 'color: #64748b; font-size: 12px;');
});

// ===============================
// MODAL SYSTEM
// ===============================
let modalTimeout;

function showModal(title, message, type = 'info') {
    const overlay = document.getElementById('modalOverlay');
    const container = document.getElementById('modalContainer');
    const titleEl = document.getElementById('modalTitle');
    const messageEl = document.getElementById('modalMessage');
    const timerBar = document.getElementById('modalTimerBar');
    
    if (!overlay || !container) return;
    
    // Set content
    titleEl.textContent = title;
    messageEl.textContent = message;
    
    // Set type class
    container.className = 'modal-container modal-' + type;
    
    // Show modal
    overlay.classList.add('active');
    
    // Reset timer animation
    timerBar.style.transition = 'none';
    timerBar.style.width = '100%';
    
    // Force reflow
    void timerBar.offsetWidth;
    
    // Start timer animation
    timerBar.style.transition = 'width 5s linear';
    timerBar.style.width = '0%';
    
    // Auto-close after 5 seconds
    clearTimeout(modalTimeout);
    modalTimeout = setTimeout(closeModal, 5000);
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
    clearTimeout(modalTimeout);
}

// Close modal on overlay click
document.addEventListener('click', function(e) {
    const overlay = document.getElementById('modalOverlay');
    if (e.target === overlay) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Override alert for quiz-engine
window.originalAlert = window.alert;
window.alert = function(message, title = 'QA Academy') {
    showModal(title, message, 'info');
};
