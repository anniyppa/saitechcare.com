// Mobile Navigation
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Smooth Scrolling
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
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Form Handling
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Basic validation
        if (!formData.name || !formData.phone || !formData.service) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Phone number validation
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(formData.phone.replace(/\D/g, '').slice(-10))) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert(`Thank you ${formData.name}! We've received your request for ${formData.service}. Our team will contact you within 2 hours.`);
            
            // Reset form
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Store Status
function updateStoreStatus() {
    const statusElement = document.querySelector('.status span:last-child');
    const statusDot = document.querySelector('.status-dot');
    
    if (!statusElement || !statusDot) return;
    
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    
    let isOpen = false;
    
    if (day === 0) { // Sunday
        isOpen = hour >= 10 && hour < 18;
    } else if (day >= 1 && day <= 6) { // Monday to Saturday
        isOpen = hour >= 9 && hour < 20;
    }
    
    if (isOpen) {
        statusElement.textContent = 'Open Now';
        statusDot.style.background = '#38a169';
    } else {
        statusElement.textContent = 'Closed';
        statusDot.style.background = '#e53e3e';
    }
}

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        let current = 0;
        const increment = target / 100;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (counter.textContent.includes('%')) {
                    counter.textContent = Math.ceil(current) + '%';
                } else if (counter.textContent.includes('+')) {
                    counter.textContent = Math.ceil(current).toLocaleString() + '+';
                } else {
                    counter.textContent = Math.ceil(current).toLocaleString();
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (counter.textContent.includes('%')) {
                    counter.textContent = target + '%';
                } else if (target >= 1000) {
                    counter.textContent = target.toLocaleString() + '+';
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('about-stats')) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Service Card Hover Effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Preview Card Interactions
document.querySelectorAll('.preview-card').forEach(card => {
    card.addEventListener('click', () => {
        document.getElementById('services').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateStoreStatus();
    
    // Update store status every minute
    setInterval(updateStoreStatus, 60000);
    
    // Observe stats section for counter animation
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-menu.active {
                display: flex;
                position: fixed;
                top: 80px;
                left: 0;
                width: 100%;
                background: white;
                flex-direction: column;
                padding: 2rem;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                z-index: 999;
            }
            
            .nav-menu.active a {
                padding: 1rem 0;
                border-bottom: 1px solid #e2e8f0;
            }
            
            .mobile-menu-btn.active span:nth-child(1) {
                transform: rotate(-45deg) translate(-5px, 6px);
            }
            
            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-btn.active span:nth-child(3) {
                transform: rotate(45deg) translate(-5px, -6px);
            }
        }
    `;
    document.head.appendChild(style);
});

// Utility Functions
function scrollToServices() {
    document.getElementById('services').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function scrollToContact() {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add click handlers for CTA buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    if (btn.getAttribute('href') === '#contact') {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToContact();
        });
    } else if (btn.getAttribute('href') === '#services') {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToServices();
        });
    }
});

console.log('SaiTechCare - Professional website loaded successfully!');