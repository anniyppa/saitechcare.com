// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 3000);
});

// Custom Cursor
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;
});

// Cursor hover effects
document.querySelectorAll('button, a, .service-card, .showcase-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'scale(2)';
        cursorOutline.style.transform = 'scale(2)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'scale(1)';
        cursorOutline.style.transform = 'scale(1)';
    });
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
}));

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle?.addEventListener('click', () => {
    body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    const icon = themeToggle.querySelector('i');
    icon.className = body.dataset.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
});

// Typing Animation
const typingTexts = ['Tech Partner', 'Solution Hub', 'Service Center', 'Tech Store'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeText, typeSpeed);
}

// Start typing animation
setTimeout(typeText, 1000);

// Counter Animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Counter animation
            if (entry.target.hasAttribute('data-count')) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
            
            // AOS-like animations
            if (entry.target.hasAttribute('data-aos')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Service Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all tabs
        document.querySelectorAll('.tab-btn').forEach(tab => tab.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-tab');
        const cards = document.querySelectorAll('.service-card');
        
        cards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Multi-step Form
let currentStep = 1;
const totalSteps = 3;
let selectedService = null;
let estimatedPrice = 0;

function showStep(step) {
    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.step-dot').forEach(dot => dot.classList.remove('active'));
    
    document.querySelector(`[data-step="${step}"]`).classList.add('active');
    document.querySelector(`.step-dot[data-step="${step}"]`).classList.add('active');
    
    // Update navigation buttons
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const submitBtn = document.querySelector('.submit-btn');
    
    prevBtn.style.display = step === 1 ? 'none' : 'flex';
    nextBtn.style.display = step === totalSteps ? 'none' : 'flex';
    submitBtn.style.display = step === totalSteps ? 'flex' : 'none';
}

function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
        
        if (currentStep === 3) {
            updateQuote();
        }
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

// Service Selection
document.querySelectorAll('.service-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.service-option').forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        selectedService = option.getAttribute('data-service');
        updateQuote();
    });
});

function updateQuote() {
    const prices = {
        'toner': 35,
        'repair': 75,
        'sales': 25000
    };
    
    estimatedPrice = prices[selectedService] || 0;
    document.getElementById('quoteAmount').textContent = `₹${estimatedPrice.toLocaleString()}`;
}

// Form Submission
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: selectedService,
        message: document.getElementById('message').value,
        estimatedPrice: estimatedPrice
    };
    
    // Simulate form submission
    alert(`Thank you ${formData.name}! Your quote request for ${selectedService} service (₹${estimatedPrice.toLocaleString()}) has been submitted. We'll contact you within 24 hours.`);
    
    // Reset form
    document.getElementById('contactForm').reset();
    currentStep = 1;
    showStep(1);
    selectedService = null;
    estimatedPrice = 0;
    document.querySelectorAll('.service-option').forEach(opt => opt.classList.remove('selected'));
});

// Smooth Scrolling
function scrollToSection(sectionId) {
    document.getElementById(sectionId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop?.classList.add('visible');
    } else {
        backToTop?.classList.remove('visible');
    }
});

backToTop?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Store Status
function updateStoreStatus() {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const statusElement = document.getElementById('store-status');
    const statusDot = document.querySelector('.status-dot');
    
    if (!statusElement || !statusDot) return;
    
    let isOpen = false;
    
    if (day === 0) { // Sunday
        isOpen = hour >= 10 && hour < 18;
    } else if (day >= 1 && day <= 6) { // Monday to Saturday
        isOpen = hour >= 9 && hour < 20;
    }
    
    if (isOpen) {
        statusElement.textContent = 'Open Now';
        statusDot.style.background = '#00ff88';
    } else {
        statusElement.textContent = 'Closed';
        statusDot.style.background = '#ff6b6b';
    }
}

// Interactive Showcase Items
document.querySelectorAll('.showcase-item').forEach(item => {
    item.addEventListener('click', () => {
        const service = item.getAttribute('data-service');
        scrollToSection('services');
        
        // Highlight corresponding service card
        setTimeout(() => {
            const serviceCard = document.querySelector(`[data-category*="${service}"]`);
            if (serviceCard) {
                serviceCard.style.transform = 'scale(1.05)';
                serviceCard.style.boxShadow = '0 25px 50px -12px rgba(102, 126, 234, 0.25)';
                setTimeout(() => {
                    serviceCard.style.transform = '';
                    serviceCard.style.boxShadow = '';
                }, 2000);
            }
        }, 1000);
    });
});

// Utility Functions
function openMaps() {
    const address = encodeURIComponent('#60, 2nd Main Road, 3rd Cross, Thimmareddy Layout, Hormavu Main Road, Bangalore - 560043');
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
}

function makeCall() {
    window.open('tel:+919880663100');
}

// Ripple Effect for Buttons
document.querySelectorAll('.ripple-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateStoreStatus();
    setInterval(updateStoreStatus, 60000); // Update every minute
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Service Card Interactions
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Form Input Animations
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Printer Models Data (from previous version)
const printerModels = {
    hp: {
        models: ['LaserJet 1010', 'LaserJet 1012', 'LaserJet 1015', 'LaserJet 1018', 'LaserJet 1020', 'LaserJet 1022', 'LaserJet P1005', 'LaserJet P1006', 'LaserJet P1007', 'LaserJet P1008', 'LaserJet P1102', 'LaserJet P1102w', 'LaserJet P1106', 'LaserJet P1108', 'LaserJet P1505', 'LaserJet P1505n', 'LaserJet P2014', 'LaserJet P2015', 'LaserJet P2035', 'LaserJet P2055', 'LaserJet 1320', 'LaserJet 1160', 'LaserJet 3015', 'LaserJet 3020', 'LaserJet 3030', 'LaserJet 3050', 'LaserJet 3052', 'LaserJet 3055', 'LaserJet Pro M404n', 'LaserJet Pro M428fdw'],
        cartridges: {
            'LaserJet 1010': ['Q2612A (12A)'],
            'LaserJet 1012': ['Q2612A (12A)'],
            'LaserJet 1015': ['Q2612A (12A)'],
            'LaserJet 1018': ['Q2612A (12A)'],
            'LaserJet 1020': ['Q2612A (12A)'],
            'LaserJet 1022': ['Q2612A (12A)'],
            'LaserJet P1005': ['CB435A (35A)'],
            'LaserJet P1006': ['CB435A (35A)'],
            'LaserJet P1007': ['CB435A (35A)'],
            'LaserJet P1008': ['CB435A (35A)'],
            'LaserJet P1102': ['CE285A (85A)'],
            'LaserJet P1102w': ['CE285A (85A)'],
            'LaserJet P1106': ['CE285A (85A)'],
            'LaserJet P1108': ['CE285A (85A)'],
            'LaserJet P1505': ['CB436A (36A)'],
            'LaserJet P1505n': ['CB436A (36A)'],
            'LaserJet P2014': ['Q7553A (53A)'],
            'LaserJet P2015': ['Q7553A (53A)'],
            'LaserJet P2035': ['CE505A (05A)'],
            'LaserJet P2055': ['CE505A (05A)', 'CE505X (05X)'],
            'LaserJet 1320': ['Q5949A (49A)'],
            'LaserJet 1160': ['Q5949A (49A)'],
            'LaserJet 3015': ['Q2613A (13A)'],
            'LaserJet 3020': ['Q2613A (13A)'],
            'LaserJet 3030': ['Q2613A (13A)'],
            'LaserJet 3050': ['Q2613A (13A)'],
            'LaserJet 3052': ['Q2613A (13A)'],
            'LaserJet 3055': ['Q2613A (13A)'],
            'LaserJet Pro M404n': ['CF294A (94A)'],
            'LaserJet Pro M428fdw': ['CF294A (94A)']
        }
    },
    canon: {
        models: ['LBP2900', 'LBP2900B', 'LBP3010', 'LBP3010B', 'LBP3018', 'LBP3050', 'LBP3100', 'LBP3108', 'LBP3150', 'LBP3200', 'LBP6000', 'LBP6020', 'MF3010', 'MF4010', 'MF4018', 'MF4120', 'MF4150', 'MF4270', 'MF4320d', 'MF4350d', 'MF4370dn', 'MF4410', 'MF4450', 'MF4550d', 'MF4570dn', 'ImageClass MF3010', 'ImageClass LBP2900B'],
        cartridges: {
            'LBP2900': ['CRG-303'],
            'LBP2900B': ['CRG-303'],
            'LBP3010': ['CRG-703'],
            'LBP3010B': ['CRG-703'],
            'LBP3018': ['CRG-703'],
            'LBP3050': ['CRG-708'],
            'LBP3100': ['CRG-706'],
            'LBP3108': ['CRG-706'],
            'LBP3150': ['CRG-706'],
            'LBP3200': ['CRG-706'],
            'LBP6000': ['CRG-725'],
            'LBP6020': ['CRG-725'],
            'MF3010': ['CRG-725'],
            'MF4010': ['CRG-303'],
            'MF4018': ['CRG-303'],
            'MF4120': ['CRG-303'],
            'MF4150': ['CRG-303'],
            'MF4270': ['CRG-728'],
            'MF4320d': ['CRG-728'],
            'MF4350d': ['CRG-728'],
            'MF4370dn': ['CRG-728'],
            'MF4410': ['CRG-303'],
            'MF4450': ['CRG-303'],
            'MF4550d': ['CRG-728'],
            'MF4570dn': ['CRG-728'],
            'ImageClass MF3010': ['CRG-725'],
            'ImageClass LBP2900B': ['CRG-303']
        }
    }
    // Add other brands as needed
};

console.log('SaiTechCare website loaded successfully! 🚀');