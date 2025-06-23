/* ========================================
   PREMIUM CONTACT SECTION JAVASCRIPT
   Enhanced functionality for professional contact experience
   ======================================== */

class PremiumContactManager {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupEnhancements();
            });
        } else {
            this.setupEnhancements();
        }
    }

    setupEnhancements() {
        this.setupFormEnhancements();
        this.setupAdvancedValidation();
        this.setupSmoothAnimations();
        this.setupProgressiveEnhancement();
        this.setupAnalytics();
    }

    // Enhanced form functionality
    setupFormEnhancements() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        // Add form enhancement features
        this.addFormProgress();
        this.addAutoSave();
        this.addSmartSuggestions();
        this.setupRealTimeValidation();
    }

    // Add form progress indicator
    addFormProgress() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const progressHTML = `
            <div class="form-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%"></div>
                </div>
                <span class="progress-text">0% Complete</span>
            </div>
        `;

        form.insertAdjacentHTML('afterbegin', progressHTML);
        this.updateFormProgress();

        // Listen for form changes
        form.addEventListener('input', () => {
            this.updateFormProgress();
        });
    }

    // Update form completion progress
    updateFormProgress() {
        const form = document.getElementById('contactForm');
        const progressFill = form.querySelector('.progress-fill');
        const progressText = form.querySelector('.progress-text');
        
        if (!progressFill || !progressText) return;

        const fields = form.querySelectorAll('input[required], textarea[required]');
        let completedFields = 0;

        fields.forEach(field => {
            if (field.value.trim() !== '') {
                completedFields++;
            }
        });

        const percentage = Math.round((completedFields / fields.length) * 100);
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}% Complete`;

        // Add visual feedback
        if (percentage === 100) {
            progressFill.style.background = 'linear-gradient(90deg, #10b981, #059669)';
            progressText.style.color = '#10b981';
        } else {
            progressFill.style.background = 'linear-gradient(90deg, #3b82f6, #1d4ed8)';
            progressText.style.color = '#cbd5e1';
        }
    }

    // Auto-save form data to localStorage
    addAutoSave() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        // Load saved data
        this.loadSavedFormData();

        // Save data on input
        form.addEventListener('input', (e) => {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            localStorage.setItem('contactFormData', JSON.stringify(data));
        });

        // Clear saved data on successful submission
        form.addEventListener('submit', () => {
            localStorage.removeItem('contactFormData');
        });
    }

    // Load previously saved form data
    loadSavedFormData() {
        const savedData = localStorage.getItem('contactFormData');
        if (!savedData) return;

        try {
            const data = JSON.parse(savedData);
            Object.entries(data).forEach(([key, value]) => {
                const field = document.querySelector(`[name="${key}"]`);
                if (field && value) {
                    field.value = value;
                }
            });
            this.updateFormProgress();
        } catch (error) {
            console.error('Error loading saved form data:', error);
        }
    }

    // Add smart subject suggestions
    addSmartSuggestions() {
        const topicField = document.getElementById('topic');
        if (!topicField) return;

        const suggestions = [
            'Job Opportunity - Full Stack Developer',
            'Job Opportunity - Frontend Developer', 
            'Job Opportunity - Backend Developer',
            'Freelance Project Collaboration',
            'Technical Partnership',
            'Internship Opportunity',
            'Code Review & Consultation',
            'Speaking Engagement',
            'Technical Writing',
            'Open Source Collaboration'
        ];

        // Create suggestions dropdown
        const suggestionsHTML = `
            <div class="suggestions-dropdown" style="display: none;">
                ${suggestions.map(suggestion => 
                    `<div class="suggestion-item" data-suggestion="${suggestion}">${suggestion}</div>`
                ).join('')}
            </div>
        `;

        topicField.parentElement.parentElement.insertAdjacentHTML('afterend', suggestionsHTML);
        
        const dropdown = topicField.parentElement.parentElement.nextElementSibling;

        // Show/hide suggestions
        topicField.addEventListener('focus', () => {
            dropdown.style.display = 'block';
        });

        topicField.addEventListener('blur', (e) => {
            // Delay hiding to allow clicking on suggestions
            setTimeout(() => {
                if (!dropdown.contains(document.activeElement)) {
                    dropdown.style.display = 'none';
                }
            }, 200);
        });

        // Handle suggestion clicks
        dropdown.addEventListener('click', (e) => {
            if (e.target.classList.contains('suggestion-item')) {
                topicField.value = e.target.dataset.suggestion;
                dropdown.style.display = 'none';
                this.updateFormProgress();
                
                // Trigger validation
                topicField.dispatchEvent(new Event('input'));
            }
        });
    }

    // Real-time validation with enhanced feedback
    setupRealTimeValidation() {
        const fields = {
            name: {
                element: document.getElementById('name'),
                rules: [
                    { test: (val) => val.length >= 2, message: 'Name must be at least 2 characters' },
                    { test: (val) => /^[a-zA-Z\s]+$/.test(val), message: 'Name can only contain letters and spaces' }
                ]
            },
            email: {
                element: document.getElementById('email'),
                rules: [
                    { test: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), message: 'Please enter a valid email address' },
                    { test: (val) => val.length <= 100, message: 'Email must be less than 100 characters' }
                ]
            },
            topic: {
                element: document.getElementById('topic'),
                rules: [
                    { test: (val) => val.length >= 5, message: 'Subject must be at least 5 characters' },
                    { test: (val) => val.length <= 100, message: 'Subject must be less than 100 characters' }
                ]
            },
            message: {
                element: document.getElementById('message'),
                rules: [
                    { test: (val) => val.length >= 20, message: 'Message must be at least 20 characters' },
                    { test: (val) => val.length <= 1000, message: 'Message must be less than 1000 characters' }
                ]
            }
        };

        Object.entries(fields).forEach(([fieldName, config]) => {
            if (!config.element) return;

            const errorElement = document.getElementById(`${fieldName}Error`);
            
            config.element.addEventListener('input', () => {
                this.validateField(config.element, config.rules, errorElement);
            });

            config.element.addEventListener('blur', () => {
                this.validateField(config.element, config.rules, errorElement);
            });
        });
    }

    // Enhanced field validation
    validateField(element, rules, errorElement) {
        const value = element.value.trim();
        let isValid = true;
        let errorMessage = '';

        for (const rule of rules) {
            if (!rule.test(value)) {
                isValid = false;
                errorMessage = rule.message;
                break;
            }
        }

        // Update UI based on validation
        if (isValid) {
            element.parentElement.classList.remove('error');
            element.parentElement.classList.add('valid');
            if (errorElement) errorElement.textContent = '';
        } else {
            element.parentElement.classList.remove('valid');
            element.parentElement.classList.add('error');
            if (errorElement) errorElement.textContent = errorMessage;
        }

        return isValid;
    }

    // Advanced validation setup
    setupAdvancedValidation() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        // Add enhanced validation styles
        const validationStyles = `
            <style>
                .contact .field.valid {
                    border-color: #10b981 !important;
                    box-shadow: 0 0 20px rgba(16, 185, 129, 0.3) !important;
                }
                
                .contact .field.error {
                    border-color: #ef4444 !important;
                    box-shadow: 0 0 20px rgba(239, 68, 68, 0.3) !important;
                }
                
                .contact .field.valid i {
                    color: #10b981 !important;
                }
                
                .contact .field.error i {
                    color: #ef4444 !important;
                }
                
                .form-progress {
                    margin-bottom: 2rem;
                    text-align: center;
                }
                
                .progress-bar {
                    width: 100%;
                    height: 8px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                    overflow: hidden;
                    margin-bottom: 0.5rem;
                }
                
                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #3b82f6, #1d4ed8);
                    border-radius: 4px;
                    transition: width 0.3s ease;
                }
                
                .progress-text {
                    font-size: 1.2rem;
                    color: #cbd5e1;
                    font-weight: 500;
                }
                
                .suggestions-dropdown {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 1rem;
                    max-height: 200px;
                    overflow-y: auto;
                    z-index: 1000;
                    margin-top: 0.5rem;
                }
                
                .suggestion-item {
                    padding: 1rem 1.5rem;
                    color: #ffffff;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .suggestion-item:hover {
                    background: rgba(16, 185, 129, 0.2);
                    color: #10b981;
                }
                
                .suggestion-item:last-child {
                    border-bottom: none;
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', validationStyles);
    }

    // Smooth animations and transitions
    setupSmoothAnimations() {
        const contactSection = document.querySelector('.contact');
        if (!contactSection) return;

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe contact elements
        const elementsToAnimate = contactSection.querySelectorAll('.field, .contact-item, .social-link');
        elementsToAnimate.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(element);
        });

        // Add animation styles
        const animationStyles = `
            <style>
                .contact .animate-in {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', animationStyles);
    }

    // Progressive enhancement features
    setupProgressiveEnhancement() {
        // Add typing animation to placeholder text
        this.addTypingAnimation();
        
        // Add character counter for message field
        this.addCharacterCounter();
        
        // Add send button enhancement
        this.enhanceSendButton();
    }

    // Typing animation for message placeholder
    addTypingAnimation() {
        const messageField = document.getElementById('message');
        if (!messageField) return;

        const messages = [
            "Tell me about the opportunity or project you'd like to discuss...",
            "I'm excited to hear about potential collaborations...",
            "Share details about the role or project requirements...",
            "Let's discuss how I can contribute to your team..."
        ];

        let currentMessage = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeMessage = () => {
            const current = messages[currentMessage];
            
            if (isDeleting) {
                messageField.placeholder = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                messageField.placeholder = current.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === current.length) {
                setTimeout(() => { isDeleting = true; }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentMessage = (currentMessage + 1) % messages.length;
            }

            setTimeout(typeMessage, isDeleting ? 50 : 100);
        };

        // Only start animation if field is empty and not focused
        if (!messageField.value && document.activeElement !== messageField) {
            setTimeout(typeMessage, 1000);
        }

        // Stop animation when field is focused
        messageField.addEventListener('focus', () => {
            messageField.placeholder = "Your message...";
        });
    }

    // Character counter for message field
    addCharacterCounter() {
        const messageField = document.getElementById('message');
        if (!messageField) return;

        const counterHTML = `
            <div class="character-counter">
                <span class="count">0</span>/1000 characters
            </div>
        `;

        messageField.parentElement.parentElement.insertAdjacentHTML('afterend', counterHTML);
        
        const counter = messageField.parentElement.parentElement.nextElementSibling.querySelector('.count');

        messageField.addEventListener('input', () => {
            const length = messageField.value.length;
            counter.textContent = length;
            
            // Change color based on length
            if (length > 900) {
                counter.style.color = '#ef4444';
            } else if (length > 700) {
                counter.style.color = '#f59e0b';
            } else {
                counter.style.color = '#10b981';
            }
        });

        // Add counter styles
        const counterStyles = `
            <style>
                .character-counter {
                    text-align: right;
                    font-size: 1.2rem;
                    color: #cbd5e1;
                    margin-top: 0.5rem;
                    margin-right: 1rem;
                }
                
                .character-counter .count {
                    font-weight: 600;
                    color: #10b981;
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', counterStyles);
    }

    // Enhanced send button functionality
    enhanceSendButton() {
        const sendButton = document.querySelector('.contact .button-area button');
        if (!sendButton) return;

        sendButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add loading state
            const originalText = sendButton.innerHTML;
            sendButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            sendButton.disabled = true;

            // Simulate form processing delay
            setTimeout(() => {
                sendButton.innerHTML = originalText;
                sendButton.disabled = false;
                
                // Call original sendMail function
                if (typeof sendMail === 'function') {
                    sendMail();
                }
            }, 1000);
        });
    }

    // Analytics tracking
    setupAnalytics() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        // Track form interactions
        form.addEventListener('focusin', (e) => {
            this.trackEvent('form_field_focus', {
                field: e.target.name || e.target.id
            });
        });

        form.addEventListener('submit', () => {
            this.trackEvent('form_submission', {
                timestamp: new Date().toISOString()
            });
        });

        // Track time spent on form
        let formStartTime = null;
        
        form.addEventListener('focusin', () => {
            if (!formStartTime) {
                formStartTime = Date.now();
            }
        }, { once: true });

        form.addEventListener('submit', () => {
            if (formStartTime) {
                const timeSpent = Date.now() - formStartTime;
                this.trackEvent('form_completion_time', {
                    duration: Math.round(timeSpent / 1000)
                });
            }
        });
    }

    // Simple analytics tracking
    trackEvent(eventName, data = {}) {
        // In a real implementation, this would send to your analytics service
        console.log('📊 Contact Form Analytics:', {
            event: eventName,
            data: data,
            timestamp: new Date().toISOString()
        });
    }

    // Cleanup function
    destroy() {
        // Remove event listeners and cleanup
        localStorage.removeItem('contactFormData');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PremiumContactManager();
});

// Export for potential external use
window.PremiumContactManager = PremiumContactManager;
