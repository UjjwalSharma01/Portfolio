/* ========================================
   ALL CERTIFICATES PAGE JAVASCRIPT
   Dynamic functionality for comprehensive certificate showcase
   ======================================== */

class AllCertificatesManager {
    constructor() {
        this.certificates = [];
        this.init();
    }

    async init() {
        try {
            await this.loadCertificates();
            this.renderCertificates();
            this.updateStats();
            this.generateTimeline();
            this.generateSkillsAnalysis();
            this.hideLoading();
            
            // Setup scroll animations after content is loaded
            setTimeout(() => {
                this.setupScrollAnimations();
            }, 500);
        } catch (error) {
            console.error('Error initializing All Certificates:', error);
            this.showError();
        }
    }

    async loadCertificates() {
        try {
            const response = await fetch('Certifications/certifications.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.certificates = await response.json();
            
            // Ensure we have data
            if (!this.certificates || this.certificates.length === 0) {
                throw new Error('No certificates data found');
            }
            
            console.log(`Loaded ${this.certificates.length} certificates successfully`);
        } catch (error) {
            console.error('Error loading certificates:', error);
            // Fallback: try to get data from the global scope if it exists
            if (window.certificatesData) {
                this.certificates = window.certificatesData;
                console.log('Using fallback certificates data');
            } else {
                throw error;
            }
        }
    }

    renderCertificates() {
        const grid = document.getElementById('certificates-grid');
        const emptyState = document.getElementById('empty-state');
        
        if (this.certificates.length === 0) {
            if (grid) grid.style.display = 'none';
            if (emptyState) emptyState.style.display = 'block';
            return;
        }

        if (grid) grid.style.display = 'grid';
        if (emptyState) emptyState.style.display = 'none';

        if (grid) {
            grid.innerHTML = this.certificates.map((cert, index) => {
                const skills = cert.skills || [];
                const shortDesc = cert.desc.length > 150 ? 
                    cert.desc.substring(0, 150) + '...' : cert.desc;

                return `
                    <div class="certificate-card">
                        <div class="cert-image">
                            <img src="Certifications/images/${cert.image}.png" alt="${cert.name}" loading="lazy">
                            <div class="cert-badge">
                                <span class="level-badge ${cert.level?.toLowerCase() || 'professional'}">${cert.level || 'Professional'}</span>
                                ${cert.achievement ? `<span class="achievement-badge">${cert.achievement}</span>` : ''}
                            </div>
                        </div>
                        
                        <div class="cert-content">
                            <div class="cert-header">
                                <h3 class="cert-title">${cert.name}</h3>
                                <div class="cert-provider">${cert.provider || 'Professional Institution'}</div>
                                <span class="cert-category">${cert.category || 'Technology'}</span>
                            </div>
                            
                            <p class="cert-description">${shortDesc}</p>
                            
                            <div class="cert-meta">
                                <div class="meta-item">
                                    <i class="fas fa-clock"></i>
                                    <span>${cert.duration || 'Self-paced'}</span>
                                </div>
                                <div class="meta-item">
                                    <i class="fas fa-award"></i>
                                    <span>${cert.badge || cert.level || 'Certified'}</span>
                                </div>
                            </div>
                            
                            ${skills.length > 0 ? `
                            <div class="cert-skills">
                                <div class="skills-title">Key Skills:</div>
                                <div class="skills-tags">
                                    ${skills.slice(0, 5).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                                    ${skills.length > 5 ? `<span class="skill-tag">+${skills.length - 5} more</span>` : ''}
                                </div>
                            </div>` : ''}
                            
                            <div class="cert-actions">
                                <a href="${cert.link}" class="cert-btn primary" target="_blank" rel="noopener noreferrer">
                                    <i class="fas fa-eye"></i>
                                    View Certificate
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            // Add staggered animation after a short delay
            setTimeout(() => {
                this.animateCards();
            }, 100);
        }
    }

    animateCards() {
        const cards = document.querySelectorAll('.certificate-card');
        cards.forEach((card, index) => {
            // Ensure cards are visible first
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            
            // Add subtle entrance animation
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.classList.add('animate-in');
            }, index * 50);
        });
    }

    updateStats() {
        const totalCerts = this.certificates.length;
        const categories = new Set(this.certificates.map(cert => cert.category)).size;
        const totalHours = this.certificates.reduce((sum, cert) => {
            const hours = parseInt(cert.duration?.match(/\d+/)?.[0]) || 0;
            return sum + hours;
        }, 0);
        const expertLevel = this.certificates.filter(cert => 
            cert.level?.toLowerCase() === 'expert' || cert.level?.toLowerCase() === 'executive'
        ).length;

        // Animate counters
        this.animateCounter('total-certs', totalCerts);
        this.animateCounter('total-categories', categories);
        this.animateCounter('total-hours', totalHours, '+');
        this.animateCounter('expert-level', expertLevel);
    }

    animateCounter(elementId, target, suffix = '') {
        const element = document.getElementById(elementId);
        if (!element) return;

        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 30);
    }

    generateTimeline() {
        const timeline = document.getElementById('achievement-timeline');
        if (!timeline) {
            console.warn('Timeline element not found');
            return;
        }

        // Group certificates by year (you might want to add date fields to your JSON)
        // For now, we'll create a sample timeline based on categories
        const timelineData = [
            { year: '2024', certs: this.certificates.filter(c => c.category === 'Security' || c.category === 'Blockchain').slice(0, 2) },
            { year: '2023', certs: this.certificates.filter(c => c.category === 'AI/ML' || c.category === 'Marketing').slice(0, 2) },
            { year: '2022', certs: this.certificates.filter(c => c.category === 'Leadership').slice(0, 2) }
        ].filter(item => item.certs.length > 0);

        if (timelineData.length === 0) {
            timeline.innerHTML = '<p>Timeline data will be available soon.</p>';
            return;
        }

        timeline.innerHTML = timelineData.map((item, index) => `
            <div class="timeline-item" data-index="${index}">
                <div class="timeline-content">
                    <div class="timeline-year">${item.year}</div>
                    ${item.certs.map(cert => `
                        <div class="timeline-cert">${cert.name}</div>
                        <div class="timeline-provider">${cert.provider}</div>
                    `).join('')}
                </div>
                <div class="timeline-dot"></div>
            </div>
        `).join('');

        // Ensure timeline items are visible
        setTimeout(() => {
            document.querySelectorAll('.timeline-item').forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            });
        }, 100);
    }

    generateSkillsAnalysis() {
        const skillsData = {
            security: [],
            blockchain: [],
            ai: [],
            marketing: [],
            leadership: []
        };

        // Collect skills by category
        this.certificates.forEach(cert => {
            const category = cert.category?.toLowerCase();
            const skills = cert.skills || [];
            
            switch (category) {
                case 'security':
                    skillsData.security.push(...skills);
                    break;
                case 'blockchain':
                    skillsData.blockchain.push(...skills);
                    break;
                case 'ai/ml':
                    skillsData.ai.push(...skills);
                    break;
                case 'marketing':
                    skillsData.marketing.push(...skills);
                    break;
                case 'leadership':
                    skillsData.leadership.push(...skills);
                    break;
            }
        });

        // Remove duplicates and render
        Object.keys(skillsData).forEach(category => {
            const uniqueSkills = [...new Set(skillsData[category])];
            const container = document.getElementById(`${category}-skills`);
            if (container) {
                if (uniqueSkills.length > 0) {
                    container.innerHTML = uniqueSkills.map(skill => 
                        `<span class="skill-tag">${skill}</span>`
                    ).join('');
                } else {
                    container.innerHTML = '<span class="skill-tag">Skills will be populated based on certifications</span>';
                }
                
                // Ensure container is visible
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
            } else {
                console.warn(`Skills container not found: ${category}-skills`);
            }
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Set up timeline items with initial visibility
        setTimeout(() => {
            document.querySelectorAll('.timeline-item').forEach((item, index) => {
                // Make items visible by default but add entrance animation
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                item.style.transition = 'all 0.8s ease';
                
                // Add subtle animation after a delay
                setTimeout(() => {
                    item.classList.add('animate-in');
                }, index * 200);
            });
        }, 500);

        // Set up skills categories with initial visibility
        setTimeout(() => {
            document.querySelectorAll('.skills-category').forEach((item, index) => {
                // Make items visible by default but add entrance animation
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                item.style.transition = 'all 0.8s ease';
                
                // Add subtle animation after a delay
                setTimeout(() => {
                    item.classList.add('animate-in');
                }, index * 150);
            });
        }, 800);
    }

    hideLoading() {
        const loadingState = document.getElementById('loading-state');
        if (loadingState) {
            loadingState.style.display = 'none';
        }
    }

    showError() {
        const loadingState = document.getElementById('loading-state');
        const grid = document.getElementById('certificates-grid');
        
        if (loadingState) {
            loadingState.style.display = 'block';
            loadingState.innerHTML = `
                <div class="error-state">
                    <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: #ef4444; margin-bottom: 2rem;"></i>
                    <h3>Unable to Load Certificates</h3>
                    <p>Please check your connection and try again.</p>
                    <button onclick="location.reload()" class="cert-btn primary" style="margin-top: 2rem; padding: 1rem 2rem; background: linear-gradient(135deg, #10b981, #047857); color: white; border: none; border-radius: 1rem; cursor: pointer;">
                        <i class="fas fa-refresh"></i> Retry
                    </button>
                </div>
            `;
        }
        
        // Hide the grid and show a fallback message
        if (grid) {
            grid.style.display = 'none';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AllCertificatesManager();
});

// Add smooth scrolling for anchor links
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

// Add parallax effect for floating certificates in header
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-cert');
    const speed = 0.5;

    parallax.forEach((element, index) => {
        const yPos = -(scrolled * speed * (index + 1) * 0.1);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
});

// Add search functionality (you can expand this)
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search certificates...';
    searchInput.className = 'search-input';
    
    const filterSection = document.querySelector('.filter-controls');
    if (filterSection) {
        filterSection.appendChild(searchInput);
        
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.certificate-card');
            
            cards.forEach(card => {
                const title = card.querySelector('.cert-title').textContent.toLowerCase();
                const provider = card.querySelector('.cert-provider').textContent.toLowerCase();
                const description = card.querySelector('.cert-description').textContent.toLowerCase();
                
                const matches = title.includes(searchTerm) || 
                               provider.includes(searchTerm) || 
                               description.includes(searchTerm);
                
                card.style.display = matches ? 'block' : 'none';
            });
        });
    }
}

// Initialize search functionality
// addSearchFunctionality();
