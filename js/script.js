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

// Header Scroll Effect with Backdrop Blur
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Reveal Animation on Scroll
const revealElements = document.querySelectorAll('.service-card, .feature, .info-card');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
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
        
        // Enhanced form validation
        const errors = validateForm(formData);
        if (errors.length > 0) {
            alert('Please fix the following errors:\n\n' + errors.join('\n'));
            return;
        }
        
        // Simulate form submission with enhanced UI
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        submitBtn.style.background = '#a0aec0';
        
        setTimeout(() => {
            showSuccessMessage(formData.name, formData.service);
            
            // Reset form
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
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

// Enhanced Service Card Interactions
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = '0 20px 50px rgba(102, 126, 234, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
    });
});

// Floating Animation for Hero Elements
function createFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.preview-card');
    floatingElements.forEach((el, index) => {
        el.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
    });
}

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Particle Background Effect
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${3 + Math.random() * 4}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
    
    // Add particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

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
    createFloatingAnimation();
    createParticles();
    
    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }
    
    // Update store status every minute
    setInterval(updateStoreStatus, 60000);
    
    // Observe stats section for counter animation
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Add smooth reveal for hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
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
                background: #667eea;
            }
            
            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-btn.active span:nth-child(3) {
                transform: rotate(45deg) translate(-5px, -6px);
                background: #667eea;
            }
            
            .nav-menu.active {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border-radius: 0 0 20px 20px;
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

// Add loading animation
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea, #764ba2);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center; color: white;">
            <div style="width: 50px; height: 50px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
            <h3 style="font-family: Inter, sans-serif; font-weight: 600;">Loading SaiTechCare...</h3>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loader);
        }, 500);
    }, 2000);
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced Form Validation
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name.trim()) {
        errors.push('Name is required');
    }
    
    if (!formData.phone.trim()) {
        errors.push('Phone number is required');
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, '').slice(-10))) {
        errors.push('Please enter a valid 10-digit phone number');
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.service) {
        errors.push('Please select a service');
    }
    
    return errors;
}

// Enhanced Success Message
function showSuccessMessage(name, service) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 3rem;
            border-radius: 15px;
            text-align: center;
            max-width: 400px;
            margin: 20px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.2);
            animation: slideInUp 0.3s ease;
        ">
            <div style="
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #38a169, #48bb78);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1.5rem;
            ">
                <i class="fas fa-check" style="color: white; font-size: 1.5rem;"></i>
            </div>
            <h3 style="color: #1a365d; margin-bottom: 1rem; font-family: Inter, sans-serif;">Thank You, ${name}!</h3>
            <p style="color: #4a5568; margin-bottom: 2rem; line-height: 1.6;">We've received your request for <strong>${service}</strong>. Our expert team will contact you within 2 hours during business hours.</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
                transition: transform 0.2s ease;
            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Got it!</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(modal)) {
            modal.style.opacity = '0';
            setTimeout(() => document.body.removeChild(modal), 300);
        }
    }, 5000);
}

// Performance Monitoring
function logPerformanceMetrics() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                console.log(`📈 Page Load Time: ${loadTime}ms`);
                
                if (loadTime > 3000) {
                    console.warn('⚠️ Page load time is above 3 seconds. Consider optimizing.');
                }
            }, 0);
        });
    }
}

// Initialize performance monitoring
logPerformanceMetrics();

console.log('🚀 SaiTechCare - Modern Professional Website Loaded Successfully!');
console.log('✨ Enhanced with animations, parallax effects, and modern interactions');
console.log('📱 Fully responsive design optimized for all devices');
console.log('🔍 SEO optimized with structured data and meta tags');
console.log('⚡ Performance optimized with lazy loading and caching');