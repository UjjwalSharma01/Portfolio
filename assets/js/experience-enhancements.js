// Premium Experience Section Enhancements
// Designed to create engaging interactions for hiring managers

document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for Timeline Animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const experienceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `slideInUp 0.8s ease-out forwards`;
                entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}ms`;
            }
        });
    }, observerOptions);

    // Observe all experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach((item, index) => {
        item.dataset.delay = index * 200;
        item.style.opacity = '0';
        experienceObserver.observe(item);
    });

    // Add hover effect enhancements
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle scale and glow effect
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Animate skill tags
            const skillTags = this.querySelectorAll('.skill-tag');
            skillTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-2px)';
                    tag.style.boxShadow = '0 5px 15px rgba(59, 130, 246, 0.3)';
                }, index * 50);
            });
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Reset skill tags
            const skillTags = this.querySelectorAll('.skill-tag');
            skillTags.forEach(tag => {
                tag.style.transform = 'translateY(0)';
                tag.style.boxShadow = 'none';
            });
        });
    });

    // Add progressive disclosure for achievements
    const achievementItems = document.querySelectorAll('.achievement-item');
    achievementItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        // Animate when parent card comes into view
        const parentCard = item.closest('.experience-card');
        if (parentCard) {
            const cardObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            item.style.transition = 'all 0.5s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, index * 150);
                    }
                });
            }, { threshold: 0.5 });
            
            cardObserver.observe(parentCard);
        }
    });

    // Add smooth scroll behavior for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
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

        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add dynamic typing effect for the CTA heading (subtle and professional)
    const ctaHeading = document.querySelector('.experience-cta h3');
    if (ctaHeading) {
        const text = ctaHeading.textContent;
        ctaHeading.textContent = '';
        
        const ctaObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let index = 0;
                    const typeInterval = setInterval(() => {
                        ctaHeading.textContent = text.slice(0, index + 1);
                        index++;
                        if (index >= text.length) {
                            clearInterval(typeInterval);
                        }
                    }, 50);
                    ctaObserver.disconnect();
                }
            });
        }, { threshold: 0.5 });
        
        ctaObserver.observe(ctaHeading);
    }

    // Add performance analytics (for your own tracking)
    function trackExperienceEngagement() {
        const startTime = Date.now();
        let maxScroll = 0;
        
        window.addEventListener('scroll', function() {
            const experienceSection = document.getElementById('experience');
            if (experienceSection) {
                const rect = experienceSection.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                
                if (rect.top < viewportHeight && rect.bottom > 0) {
                    const scrolled = Math.max(0, Math.min(1, (viewportHeight - rect.top) / rect.height));
                    maxScroll = Math.max(maxScroll, scrolled);
                }
            }
        });
        
        // Track when user leaves the page
        window.addEventListener('beforeunload', function() {
            const timeSpent = (Date.now() - startTime) / 1000;
            console.log(`Experience section engagement: ${maxScroll.toFixed(2)} scroll, ${timeSpent.toFixed(1)}s`);
            // You can send this data to analytics service
        });
    }
    
    trackExperienceEngagement();
});

// CSS animations added dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .experience-card {
        transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
    }
    
    .skill-tag {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);
