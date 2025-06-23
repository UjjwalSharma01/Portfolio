// mouse followe code starts here
$(window).mousemove(function (e) {
  $(".ring").css(
    "transform",
    `translateX(calc(${e.clientX}px - 1.25rem)) translateY(calc(${e.clientY}px - 1.25rem))`
  );
});

$('[data-animate="true"]').each(function (i) {
  console.log("$(this)", $(this));
  var element = $(this)[0];
  observer.add(element, (isIntersecting) => {
    if (isIntersecting) {
      $(this).addClass("animate-slide-down");
    } else {
      $(this).removeClass("animate-slide-down");
    }
  });
});
// mouse followe code ends here


$(document).ready(function () {

    // Enhanced Mobile Menu Toggle for Premium Navbar
    $('#menu').click(function () {
        $(this).toggleClass('active');
        $('.navbar').toggleClass('nav-toggle');
        $('.premium-navbar').toggleClass('mobile-menu-open');
        
        // Prevent body scroll when mobile menu is open
        if ($(this).hasClass('active')) {
            $('body').addClass('mobile-menu-active');
        } else {
            $('body').removeClass('mobile-menu-active');
        }
    });

    // Enhanced Scroll Handler for Premium Navbar
    $(window).on('scroll load', function () {
        // Close mobile menu on scroll
        $('#menu').removeClass('active');
        $('.navbar').removeClass('nav-toggle');
        $('.premium-navbar').removeClass('mobile-menu-open');
        $('body').removeClass('mobile-menu-active');

        // Premium navbar scroll effect
        if (window.scrollY > 50) {
            $('.premium-navbar').addClass('scrolled');
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            $('.premium-navbar').removeClass('scrolled');
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // Enhanced scroll spy for premium navbar
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.nav-menu .nav-link').removeClass('active');
                $('.nav-menu').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });


    // Enhanced smooth scrolling for premium navbar
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        $('#menu').removeClass('active');
        $('.navbar').removeClass('nav-toggle');
        $('.premium-navbar').removeClass('mobile-menu-open');
        $('body').removeClass('mobile-menu-active');
        
        // Smooth scroll with offset for fixed navbar
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100, // Offset for fixed navbar
            }, 800, 'easeInOutQuart');
        }
    });

    // Premium Navbar Enhancements
    initPremiumNavbar();

});

// Premium Navbar Enhancement Functions
function initPremiumNavbar() {
    // Logo animation on page load
    setTimeout(() => {
        $('.logo-icon').addClass('animate-in');
        $('.logo-text').addClass('animate-in');
    }, 500);

    // Add hover effects to navigation items
    $('.nav-link').on('mouseenter', function() {
        $(this).addClass('hover-effect');
    }).on('mouseleave', function() {
        $(this).removeClass('hover-effect');
    });

    // CTA button enhancement
    $('.cta-button').on('mouseenter', function() {
        $(this).addClass('shimmer-effect');
        setTimeout(() => {
            $(this).removeClass('shimmer-effect');
        }, 600);
    });

    // Availability indicator animation
    setInterval(() => {
        $('.status-dot').addClass('pulse');
        setTimeout(() => {
            $('.status-dot').removeClass('pulse');
        }, 1000);
    }, 3000);

    // Intersection Observer for navbar reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const navbarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $('.premium-navbar').addClass('reveal');
            }
        });
    }, observerOptions);

    // Observe the hero section for navbar animation
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        navbarObserver.observe(heroSection);
    }
}

// Keyboard navigation support for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        $('#menu').removeClass('active');
        $('.navbar').removeClass('nav-toggle');
        $('.premium-navbar').removeClass('mobile-menu-open');
        $('body').removeClass('mobile-menu-active');
    }
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Ujjwal Sharma | Portfolio ";
        }
        else {
            document.title = "Ujjwal Sharma ";
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: [
        "web applications", 
        "software solutions", 
        "backend systems", 
        "user interfaces",
        "scalable products"
    ],
    loop: true,
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    showCursor: true,
    cursorChar: '|',
    smartBackspace: true
});
// <!-- typed js effect ends -->

// async function fetchData() - for fetching data from json file with enhanced error handling

async function fetchData(type = "skills") {
    try {
        let response;
        if(type === "skills"){
            response = await fetch("./skills.json")
        } else if(type === "projects"){
            response = await fetch("./projects/projects.json")
        } else if(type === "certifications"){
            response = await fetch("./Certifications/certifications.json")
        }
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching ${type} data:`, error);
        return [];
    }
}

// function showSkills(skills) - Updated for new skills section structure
function showSkills(skills) {
    // Check if the new skills section exists
    const skillsSection = document.querySelector('#skills');
    if (!skillsSection) {
        console.log('New skills section not found, skipping skills display');
        return;
    }
    
    // The new skills section uses a different structure with predefined skills
    // This function is now optional since skills are already in HTML
    console.log('Skills section found with new structure - skills are predefined in HTML');
    
    // Add any dynamic enhancements here if needed
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        // Add staggered animation delays
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}





    // function to show certificates in education section

    // acessing data from json function starts
    // Corrected path to certifications.json
    fetch('Certifications/certifications.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }
        return response.json();
      })
      .then(certifications => showCertifications(certifications))
      .catch(error => console.error('Error:', error));

function showCertifications(certifications) {
    let certificationsContainer = document.querySelector("#certifications .box-container");
    let certificationHTML = "";
    certifications.forEach((certification, index) => {
        // Ensure consistent category mapping
        const category = certification.category?.toLowerCase() || 'technology';
        const provider = certification.provider || 'Professional Institution';
        const skills = certification.skills || [];
        
        certificationHTML += `
        <div class="box" style="animation-delay: ${index * 0.15}s;" data-category="${category}">
            <img draggable="false" src="Certifications/images/${certification.image}.png" alt="${certification.name}" />
            <div class="content">
                <div class="tag">
                    <h3>${certification.name}</h3>
                </div>
                <div class="desc">
                    <div class="category">${certification.category || 'Technology'}</div>
                    <div class="provider">${provider}</div>
                    <p>${certification.desc}</p>
                    ${skills.length > 0 ? `
                    <div class="skills-tags">
                        ${skills.slice(0, 3).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>` : ''}
                    <div class="btns">
                        <a href="${certification.link}" class="btn" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-eye"></i> View Certificate
                        </a>
                    </div>
                </div>
            </div>
        </div>`
    });
    certificationsContainer.innerHTML = certificationHTML;
    

      // certification function ends here


      // <!-- tilt js effect starts -->
      VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
      });
      // <!-- tilt js effect ends -->

      /* ===== SCROLL REVEAL ANIMATION ===== */
      const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 100,
        reset: true
      });
      // Add ScrollReveal animations as needed
    }


//   }

// Updated data fetching for new portfolio structure
fetchData().then(data => {
    if (data && data.length > 0) {
        showSkills(data);
    } else {
        console.log('No skills data found or using static skills from HTML');
        // Initialize the skills section with static content
        showSkills([]);
    }
}).catch(error => {
    console.log('Skills data fetch failed, using static content:', error);
    showSkills([]);
});



// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->






/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: false // might make it true, im confused right now let's see
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 150 });

/* SCROLL PROJECTS */
// Legacy projects scroll animation disabled - using premium projects module

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 100 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });
/* SCROLL CERTIFICATIONS */
srtop.reveal('.certi', {interval: 150});





// for mail
//for mail
function sendMail() {
    var email = document.getElementById("email").value;
    var name = document.getElementById("name").value;
    var topic = document.getElementById("topic").value;
    var message = document.getElementById("message").value;
  
    // Simple validation for the email field
    var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
      document.getElementById("emailError").innerText = "Please enter a valid email address.";
      document.getElementById("emailError").style.display = "block";
    } else {
      document.getElementById("emailError").style.display = "none";
    }
  
    // Check if other fields are empty
    if (name == "") {
      document.getElementById("nameError").innerText = "Please enter your name.";
      document.getElementById("nameError").style.display = "block";
    } else {
      document.getElementById("nameError").style.display = "none";
    }
  
    if (topic == "") {
      document.getElementById("topicError").innerText = "Please enter a subject.";
      document.getElementById("topicError").style.display = "block";
    } else {
      document.getElementById("topicError").style.display = "none";
    }
  
    if (message == "") {
      document.getElementById("messageError").innerText = "Please enter a message.";
      document.getElementById("messageError").style.display = "block";
    } else {
      document.getElementById("messageError").style.display = "none";
    }
  
    // If all fields are valid, send the email
    if (email.match(emailPattern) && name != "" && topic != "" && message != "") {
      // Your existing sendMail code...
      if (!(document.getElementById("topic").value == "")) {
        if (!(document.getElementById("name").value == "")) {
          if (!(document.getElementById("message").value == "")) {
            if (!(document.getElementById("email").value == "")) {
              emailjs.init("RpY5hfDUPrW7ca_lN");
              var mails = {
                subject: document.getElementById("topic").value,
                from_name: document.getElementById("name").value,
                message: document.getElementById("message").value,
                from_email: document.getElementById("email").value,
              };
    
              emailjs.send("service_z576dhq", "template_jn01anr", mails)
                .then(function (re) {
                  document.getElementById('alert').style.display = 'block';
                  confetti();
                  document.getElementById("alert").style.visibility = "visible";
                  document.getElementById("topic").value = "";
                  document.getElementById("name").value = "";
                  document.getElementById("message").value = "";
                  document.getElementById("email").value = "";
                });
            }
          }
        }
      }
    }
}

function closeAlert() {
    // used to check if the function is called or not because it is not working
    // console.log('closeAlert function called'); 
    document.getElementById('alert').style.display = 'none';
  }



  // preloader function starts here
window.addEventListener('DOMContentLoaded', function() {
  var preloader = document.querySelector('.preloader-wrapper');
  document.body.classList.add('loading');
  setTimeout(function() {
    document.body.classList.remove('loading');
    // Wait for the transition to finish before hiding the preloader
    preloader.addEventListener('transitionend', function() {
      preloader.style.display = 'none';
    });
  }, 3000); // 3000 milliseconds = 3 seconds
});
// preloader function ends here

// Enhanced user experience improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add loading states for better UX
    addLoadingStates();
    
    // Add smooth page transitions
    addPageTransitions();
    
    // Add enhanced form validation feedback
    enhanceFormValidation();
    
    // Add intersection observer for enhanced animations
    addIntersectionAnimations();
});

function addLoadingStates() {
    // Add loading state to contact form submission
    const originalSendMail = window.sendMail;
    window.sendMail = function() {
        const button = document.querySelector('.contact .button-area button');
        const originalText = button.innerHTML;
        
        // Show loading state
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        button.disabled = true;
        
        // Call original function with enhanced feedback
        const result = originalSendMail();
        
        // Reset button after delay
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
        
        return result;
    };
}

function addPageTransitions() {
    // Add smooth fade-in effect for sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
    });
    
    // Trigger animations when scrolling
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => observer.observe(section));
}

function enhanceFormValidation() {
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    
    inputs.forEach(input => {
        // Add real-time validation feedback
        input.addEventListener('input', function() {
            const field = this.closest('.field') || this.closest('.message');
            if (this.value.trim()) {
                field.classList.add('valid');
                field.classList.remove('invalid');
            } else {
                field.classList.remove('valid');
            }
        });
        
        input.addEventListener('blur', function() {
            const field = this.closest('.field') || this.closest('.message');
            if (!this.value.trim()) {
                field.classList.add('invalid');
            }
        });
    });
}

function addIntersectionAnimations() {
    // Add stagger animation for skill cards
    const skillCards = document.querySelectorAll('.skills .bar');
    const projectCards = document.querySelectorAll('.work .box');
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    [...skillCards, ...projectCards].forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        staggerObserver.observe(card);
    });
}

// Enhanced scroll behavior for navigation
function enhanceNavigation() {
    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Add smooth scroll with offset for header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Add active state animation
                this.classList.add('clicked');
                setTimeout(() => this.classList.remove('clicked'), 300);
            }
        });
    });
}

// Initialize enhanced navigation
enhanceNavigation();

// Add floating particles animation
function addFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(102, 126, 234, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            animation: float ${5 + Math.random() * 5}s infinite linear;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
        `;
        particleContainer.appendChild(particle);
    }
}

// Initialize floating particles
addFloatingParticles();

// ========================================
// SKILLS SECTION TAB FUNCTIONALITY
// ========================================

// Skills tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.category-tab');
    const categoryContents = document.querySelectorAll('.category-content');
    
    // Handle tab button clicks
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            categoryContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(category).classList.add('active');
            
            // Animate skill cards in the newly active category
            const activeCards = document.querySelectorAll(`#${category} .skill-card`);
            activeCards.forEach((card, index) => {
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = `slideInUp 0.6s ease forwards ${index * 0.1}s`;
                }, 50);
            });
            
            // Animate progress bars for the active category
            setTimeout(() => {
                animateProgressBarsForCategory(category);
            }, 200);
        });
    });
    
    // Animate progress bars when skills section comes into view
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBarsForCategory('frontend'); // Animate default category
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }
    
    // Function to animate progress bars for specific category
    function animateProgressBarsForCategory(category) {
        const activeContent = document.getElementById(category);
        if (!activeContent) return;
        
        const progressBars = activeContent.querySelectorAll('.progress-fill');
        progressBars.forEach((bar, index) => {
            const targetWidth = bar.style.getPropertyValue('--progress-width') || '0%';
            bar.style.width = '0%';
            bar.style.transition = 'none';
            
            setTimeout(() => {
                bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                bar.style.width = targetWidth;
                bar.classList.add('animate');
            }, index * 100);
        });
    }
    
    // Legacy function for backward compatibility
    function animateProgressBars() {
        animateProgressBarsForCategory('frontend');
    }
});

// Add CSS animations for skill cards
const skillsAnimationCSS = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject the CSS animation
const styleSheet = document.createElement('style');
styleSheet.textContent = skillsAnimationCSS;
document.head.appendChild(styleSheet);