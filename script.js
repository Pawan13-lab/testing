// Loader animation
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader-wrapper');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
    
    // Initialize animations after page load
    initAnimations();
});

// Initialize various animations and features
function initAnimations() {
    // Initialize Typed.js
    if (document.getElementById('typed-text')) {
        const typed = new Typed('#typed-text', {
            strings: ['Web Developer', 'UI/UX Designer', 'Problem Solver', 'Creative Thinker'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            loop: true
        });
    }
    
    // Start counter animation for about section
    startCounterAnimation();
    
    // Initialize skill bars with 0 width
    document.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.width = '0';
    });
    
    // Fade in animation for elements with fade-in class
    animateFadeIn();
    
    // Start the testimonial slider
    initTestimonialSlider();
    
    // Initialize lazy loading
    initLazyLoading();
}

// Scroll progress indicator
window.onscroll = function() {
    // Calculate scroll progress
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("scroll-progress").style.width = scrolled + "%";
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Check elements in viewport
    checkElementsInViewport();
};

// Check if elements are in viewport to trigger animations
function checkElementsInViewport() {
    // Animate skill bars when in viewport
    animateSkillBars();
    
    // Animate counters when in viewport
    animateCounters();
    
    // Animate timeline items when in viewport
    animateTimeline();
    
    // Animate fade in elements when in viewport
    animateFadeIn();
}

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the target section
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Scroll to target with smooth behavior
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Offset for navbar
                behavior: 'smooth'
            });
        }
    });
});

// Project filter functionality with animations
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get the filter value
        const filter = btn.getAttribute('data-filter');
        
        // Apply filter with animation
        projectCards.forEach(project => {
            // First add fade-out class
            project.classList.add('fade-out');
            
            setTimeout(() => {
                // Then show only the filtered ones
                if (filter === 'all' || project.getAttribute('data-category') === filter) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.classList.remove('fade-out');
                    }, 50);
                } else {
                    project.style.display = 'none';
                }
            }, 300);
        });
    });
});

// Animate skill bars when they come into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const position = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (position < screenPosition) {
            const percentage = bar.getAttribute('data-percentage');
            bar.style.width = percentage;
        }
    });
}

// Counter animation
function startCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        // Start with zero
        counter.textContent = '0';
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Speed of counting
    
    counters.forEach(counter => {
        const position = counter.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (position < screenPosition) {
            const target = parseInt(counter.getAttribute('data-target'));
            const count = parseInt(counter.innerText);
            
            if (count < target) {
                // Increment at intervals
                const inc = Math.ceil(target / speed);
                
                // Update counter if not reached target
                if (count + inc < target) {
                    counter.innerText = count + inc;
                    // Call function every ms
                    setTimeout(() => animateCounters(), 10);
                } else {
                    counter.innerText = target;
                }
            }
        }
    });
}

// Timeline animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const position = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (position < screenPosition) {
            item.classList.add('active');
        }
    });
}

// Fade in animations
function animateFadeIn() {
    const fadeElements = document.querySelectorAll('.fade-in:not(.fade-in-visible)');
    
    fadeElements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.1;
        
        if (position < screenPosition) {
            element.classList.add('fade-in-visible');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Parallax scrolling effect
window.addEventListener('scroll', function() {
    const parallaxElements = document.querySelectorAll('.parallax');
    let scrollPosition = window.pageYOffset;
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
});

// Testimonial slider functionality
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;
    
    // Show the first slide
    showSlide(0);
    
    // Start auto sliding
    startSlideInterval();
    
    // Previous button click
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
            resetSlideInterval();
        });
    }
    
    // Next button click
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
            resetSlideInterval();
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetSlideInterval();
        });
    });
    
    function showSlide(n) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Calculate the correct slide index
        currentSlide = (n + slides.length) % slides.length;
        
        // Show the current slide
        slides[currentSlide].classList.add('active');
        
        // Mark the current dot as active
        dots[currentSlide].classList.add('active');
    }
    
    function startSlideInterval() {
        // Auto advance slides every 5 seconds
        slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }
    
    function resetSlideInterval() {
        // Reset the interval timer
        clearInterval(slideInterval);
        startSlideInterval();
    }
}

// Lazy loading images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imgOptions = {
        threshold: 0,
        rootMargin: "0px 0px 300px 0px"
    };
    
    const imgObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imgObserver.unobserve(img);
        });
    }, imgOptions);
    
    images.forEach(image => {
        imgObserver.observe(image);
    });
}

// Lightbox for project images
const projectImages = document.querySelectorAll('.project-img');
const lightboxContainer = document.getElementById('lightbox-container');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeLightbox = document.querySelector('.close-lightbox');

projectImages.forEach(image => {
    image.addEventListener('click', () => {
        const img = image.querySelector('img');
        if (img && lightboxContainer) {
            lightboxImg.src = img.src;
            
            // Try to get caption from project title
            const projectTitle = image.closest('.project-card').querySelector('h3');
            if (projectTitle) {
                lightboxCaption.textContent = projectTitle.textContent;
            }
            
            // Show lightbox
            lightboxContainer.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
        }
    });
});

// Close lightbox when clicking on X button or outside the image
if (closeLightbox) {
    closeLightbox.addEventListener('click', closeLightboxFn);
}

if (lightboxContainer) {
    lightboxContainer.addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightboxFn();
        }
    });
}

function closeLightboxFn() {
    if (lightboxContainer) {
        lightboxContainer.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

// Form submission handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would normally send data to a server
        console.log('Form submitted:', { name, email, subject, message });
        
        // Reset the form
        contactForm.reset();
        
        // Show success message
        alert('Thank you for your message. I will get back to you soon!');
    });
}

// Resume download tracking
const resumeButton = document.getElementById('download-resume');
const downloadNotification = document.getElementById('download-notification');

if (resumeButton) {
    resumeButton.addEventListener('click', () => {
        // Track download event (could connect to Google Analytics)
        trackEvent('resume_download');
        
        // Show notification
        if (downloadNotification) {
            downloadNotification.classList.add('show');
            
            // Hide after 3 seconds
            setTimeout(() => {
                downloadNotification.classList.remove('show');
            }, 3000);
        }
    });
}

function trackEvent(eventName) {
    // Connect to your analytics platform
    console.log(`Event tracked: ${eventName}`);
}

// Theme switcher functionality
const themeButtons = document.querySelectorAll('.theme-btn');
const root = document.documentElement;

const themes = {
    default: {
        primary: '#6c63ff',
        secondary: '#f50057',
        dark: '#2d2d2d',
        light: '#f8f9fa',
        bgColor: '#ffffff',
        textColor: '#333333',
        cardBg: '#ffffff'
    },
    blue: {
        primary: '#2196f3',
        secondary: '#ff4081',
        dark: '#333333',
        light: '#f5f8fa',
        bgColor: '#ffffff',
        textColor: '#333333',
        cardBg: '#ffffff'
    },
    green: {
        primary: '#4caf50',
        secondary: '#ff9800',
        dark: '#2c3e50',
        light: '#f9f9f9',
        bgColor: '#ffffff',
        textColor: '#333333',
        cardBg: '#ffffff'
    },
    purple: {
        primary: '#9c27b0',
        secondary: '#ffab00',
        dark: '#34495e',
        light: '#f8f9fa',
        bgColor: '#ffffff',
        textColor: '#333333',
        cardBg: '#ffffff'
    }
};

themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.getAttribute('data-theme');
        
        if (themes[theme]) {
            for (const [key, value] of Object.entries(themes[theme])) {
                root.style.setProperty(`--${key}`, value);
            }
            
            localStorage.setItem('selectedTheme', theme);
            
            // Remove active class from all buttons
            themeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
        }
    });
});

// Dark mode toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Change icon
        const icon = darkModeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        
        // Save preference
        localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    });
}

// Check for saved theme preferences on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme && themes[savedTheme]) {
        const themeBtn = document.querySelector(`.theme-btn[data-theme="${savedTheme}"]`);
        if (themeBtn) themeBtn.click();
    }
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
        const icon = document.querySelector('.dark-mode-toggle i');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
});