/* ========================================
   PREMIUM CERTIFICATES SECTION JAVASCRIPT
   Enhanced functionality for professional certificate showcase
   ======================================== */

class PremiumCertificatesManager {
    constructor() {
        this.certificates = [];
        this.currentFilter = 'all';
        this.animationObserver = null;
        this.isLoading = false;
        this.init();
    }

    async init() {
        try {
            // Wait for certificates to be loaded first
            this.waitForCertificatesLoad();
        } catch (error) {
            console.error('Error initializing Premium Certificates:', error);
        }
    }

    // Wait for certificates to be loaded by the main script
    waitForCertificatesLoad() {
        const checkCertificates = () => {
            const certificates = document.querySelectorAll('#certifications .box');
            if (certificates.length > 0) {
                // Certificates are loaded, now enhance them
                setTimeout(() => {
                    this.setupIntersectionObserver();
                    this.addStatsSection();
                    this.addFilterButtons();
                    this.addCTASection();
                    this.enhanceExistingCertificates();
                    this.addKeyboardNavigation();
                    this.addProgressiveLoading();
                }, 100);
            } else {
                // Wait a bit more and check again
                setTimeout(checkCertificates, 100);
            }
        };
        
        // Start checking after a short delay to allow main script to run
        setTimeout(checkCertificates, 300);
    }

    // Add premium statistics section
    addStatsSection() {
        const certificatesSection = document.querySelector('#certifications');
        if (!certificatesSection) return;

        const heading = certificatesSection.querySelector('.heading');
        if (!heading) return;

        // Calculate stats based on existing certificates
        const totalCerts = document.querySelectorAll('#certifications .box').length;
        const providers = new Set();
        const categories = new Set();
        
        // Extract unique providers and categories from existing certificates
        document.querySelectorAll('#certifications .box .content .provider').forEach(provider => {
            if (provider.textContent.trim()) {
                providers.add(provider.textContent.trim());
            }
        });

        document.querySelectorAll('#certifications .box .content .category').forEach(cat => {
            if (cat.textContent.trim()) {
                categories.add(cat.textContent.trim());
            }
        });

        const statsHTML = `
            <div class="stats-banner">
                <div class="stat-item">
                    <span class="stat-number" data-target="${totalCerts}">0</span>
                    <span class="stat-label">Certificates</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" data-target="${categories.size || 5}">0</span>
                    <span class="stat-label">Specializations</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" data-target="${providers.size || 4}">0</span>
                    <span class="stat-label">Elite Providers</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" data-target="95">0</span>
                    <span class="stat-label">Avg Score</span>
                </div>
            </div>
        `;

        heading.insertAdjacentHTML('afterend', statsHTML);
        this.animateCounters();
    }

    // Add Call-to-Action section
    addCTASection() {
        const certificatesSection = document.querySelector('#certifications');
        if (!certificatesSection) return;

        const ctaHTML = `
            <div class="cta-section">
                <h3>Continuous Learning Journey</h3>
                <p>Committed to staying current with industry trends and technologies through continuous professional development and certification programs.</p>
                <a href="#contact" class="cta-btn">
                    <i class="fas fa-graduation-cap"></i>
                    Let's Discuss My Skills
                </a>
            </div>
        `;

        certificatesSection.insertAdjacentHTML('beforeend', ctaHTML);
    }

    // Add filter functionality
    addFilterButtons() {
        const certificatesSection = document.querySelector('#certifications');
        if (!certificatesSection) return;

        const boxContainer = certificatesSection.querySelector('.box-container');
        if (!boxContainer) return;

        // Extract categories from existing certificates
        const categories = new Set(['all']);
        document.querySelectorAll('#certifications .box').forEach(box => {
            const category = box.dataset.category;
            if (category) {
                categories.add(category);
            }
        });

        if (categories.size > 2) { // Only add filters if we have multiple categories
            const filterHTML = `
                <div class="filter-controls">
                    ${Array.from(categories).map(cat => 
                        `<button class="filter-btn ${cat === 'all' ? 'active' : ''}" data-filter="${cat}">
                            ${cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>`
                    ).join('')}
                </div>
            `;
            
            boxContainer.insertAdjacentHTML('beforebegin', filterHTML);
            this.setupFilterListeners();
        }
    }

    // Setup filter event listeners
    setupFilterListeners() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.filterCertificates(filter);
                
                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    // Filter certificates
    filterCertificates(category) {
        const certificates = document.querySelectorAll('#certifications .box');
        
        certificates.forEach((cert, index) => {
            const certCategory = cert.dataset.category || '';
            
            if (category === 'all' || certCategory === category) {
                cert.style.display = 'block';
                cert.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
            } else {
                cert.style.display = 'none';
            }
        });
    }

    // Enhance existing certificates with premium features
    enhanceExistingCertificates() {
        const certificates = document.querySelectorAll('#certifications .box');
        
        certificates.forEach((cert, index) => {
            // Add loading delay for premium entrance effect
            cert.style.animationDelay = `${index * 0.15}s`;
            
            // Enhance content structure if needed
            this.enhanceCertificateContent(cert);
            
            // Add premium interactions
            this.addCertificateInteractions(cert);
        });
    }

    // Enhance individual certificate content
    enhanceCertificateContent(cert) {
        const content = cert.querySelector('.content');
        if (!content) return;

        // Ensure proper tag structure
        let tag = content.querySelector('.tag');
        if (!tag) {
            const h3 = content.querySelector('h3');
            if (h3) {
                tag = document.createElement('div');
                tag.className = 'tag';
                tag.appendChild(h3);
                content.insertBefore(tag, content.firstChild);
            }
        }

        // Ensure proper desc structure
        let desc = content.querySelector('.desc');
        if (!desc) {
            desc = document.createElement('div');
            desc.className = 'desc';
            
            // Move existing elements to desc
            const category = content.querySelector('.category');
            const btn = content.querySelector('.btn');
            const p = content.querySelector('p');
            
            if (category) desc.appendChild(category);
            if (p) desc.appendChild(p);
            if (btn) desc.appendChild(btn);
            
            content.appendChild(desc);
        }

        // Add category if missing
        if (!content.querySelector('.category')) {
            const category = document.createElement('div');
            category.className = 'category';
            category.textContent = this.inferCategoryFromTitle(cert);
            desc.insertBefore(category, desc.firstChild);
        }
    }

    // Infer category from certificate title
    inferCategoryFromTitle(cert) {
        const title = cert.querySelector('h3')?.textContent.toLowerCase() || '';
        
        if (title.includes('aws') || title.includes('cloud')) return 'Cloud';
        if (title.includes('javascript') || title.includes('react') || title.includes('node')) return 'Frontend';
        if (title.includes('python') || title.includes('django')) return 'Backend';
        if (title.includes('data') || title.includes('ml') || title.includes('ai')) return 'Data Science';
        if (title.includes('security') || title.includes('cyber')) return 'Security';
        
        return 'Technology';
    }

    // Add interactive features to certificates
    addCertificateInteractions(cert) {
        // Add click to expand functionality
        cert.addEventListener('click', (e) => {
            if (!e.target.closest('.btn')) {
                this.toggleCertificateExpanded(cert);
            }
        });

        // Add keyboard support
        cert.setAttribute('tabindex', '0');
        cert.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleCertificateExpanded(cert);
            }
        });

        // Add touch support for mobile
        cert.addEventListener('touchstart', () => {
            cert.classList.add('touch-active');
        });

        cert.addEventListener('touchend', () => {
            setTimeout(() => {
                cert.classList.remove('touch-active');
            }, 150);
        });
    }

    // Toggle certificate expanded state
    toggleCertificateExpanded(cert) {
        const isExpanded = cert.classList.contains('expanded');
        
        // Close all other expanded certificates
        document.querySelectorAll('#certifications .box.expanded').forEach(c => {
            if (c !== cert) c.classList.remove('expanded');
        });

        // Toggle current certificate
        cert.classList.toggle('expanded', !isExpanded);
    }

    // Setup intersection observer for animations
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger counter animation for stats
                    if (entry.target.classList.contains('stats-banner')) {
                        this.animateCounters();
                    }
                }
            });
        }, options);

        // Observe elements for animation
        const elementsToObserve = [
            '#certifications .stats-banner',
            '#certifications .box-container',
            '#certifications .cta-section'
        ];

        elementsToObserve.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                this.animationObserver.observe(element);
            }
        });
    }

    // Animate counter numbers
    animateCounters() {
        const counters = document.querySelectorAll('#certifications .stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }

    // Add keyboard navigation
    addKeyboardNavigation() {
        const certificates = document.querySelectorAll('#certifications .box');
        
        certificates.forEach((cert, index) => {
            cert.addEventListener('keydown', (e) => {
                switch(e.key) {
                    case 'ArrowRight':
                    case 'ArrowDown':
                        e.preventDefault();
                        const nextCert = certificates[index + 1];
                        if (nextCert) nextCert.focus();
                        break;
                        
                    case 'ArrowLeft':
                    case 'ArrowUp':
                        e.preventDefault();
                        const prevCert = certificates[index - 1];
                        if (prevCert) prevCert.focus();
                        break;
                        
                    case 'Home':
                        e.preventDefault();
                        certificates[0]?.focus();
                        break;
                        
                    case 'End':
                        e.preventDefault();
                        certificates[certificates.length - 1]?.focus();
                        break;
                }
            });
        });
    }

    // Add progressive loading effect
    addProgressiveLoading() {
        const certificates = document.querySelectorAll('#certifications .box');
        
        certificates.forEach((cert, index) => {
            // Add progressive reveal
            cert.style.opacity = '0';
            cert.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                cert.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                cert.style.opacity = '1';
                cert.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    // Add loading states for dynamic content
    showLoadingState() {
        this.isLoading = true;
        const container = document.querySelector('#certifications .box-container');
        if (container) {
            container.classList.add('loading');
        }
    }

    hideLoadingState() {
        this.isLoading = false;
        const container = document.querySelector('#certifications .box-container');
        if (container) {
            container.classList.remove('loading');
        }
    }

    // Cleanup function
    destroy() {
        if (this.animationObserver) {
            this.animationObserver.disconnect();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for any existing certificate loading to complete
    setTimeout(() => {
        new PremiumCertificatesManager();
    }, 100);
});

// Export for potential external use
window.PremiumCertificatesManager = PremiumCertificatesManager;
