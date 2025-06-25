// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-in-out',
        offset: 100
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('backToTop');
    const searchIcon = document.querySelector('.search-container i');
    const searchInput = document.querySelector('.search-container input');
    const heroContent = document.querySelector('.hero-content');
    
    // Typing effect in hero section
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const words = ['movies', 'TV shows', 'documentaries', 'originals'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;
        let deleteSpeed = 50;
        let pauseTime = 2000;
        
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // Deleting
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = deleteSpeed;
            } else {
                // Typing
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }
            
            // Check if word is complete
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = pauseTime; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                // Move to next word
                wordIndex = (wordIndex + 1) % words.length;
            }
            
            // Continue the animation
            setTimeout(type, typeSpeed);
        }
        
        // Start the typing effect
        setTimeout(type, 1000);
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTopBtn.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Back to top button
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Search toggle
    if (searchIcon && searchInput) {
        searchIcon.addEventListener('click', function() {
            searchInput.classList.toggle('active');
            if (searchInput.classList.contains('active')) {
                searchInput.focus();
            }
        });
        
        // Close search when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchIcon.contains(e.target)) {
                searchInput.classList.remove('active');
            }
        });
    }
    
    // Email validation for signup form
    const emailForms = document.querySelectorAll('.email-form');
    
    emailForms.forEach(form => {
        const emailInput = form.querySelector('input[type="email"]');
        const submitButton = form.querySelector('button[type="submit"]');
        
        if (emailInput && submitButton) {
            submitButton.addEventListener('click', function(e) {
                e.preventDefault();
                const email = emailInput.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (!email) {
                    showError(emailInput, 'Email is required');
                } else if (!emailRegex.test(email)) {
                    showError(emailInput, 'Please enter a valid email address');
                } else {
                    // Success - show success message
                    showSuccess(emailInput);
                    // Here you would typically submit the form
                    console.log('Form submitted with email:', email);
                    // Reset form
                    setTimeout(() => {
                        emailInput.value = '';
                        emailInput.blur();
                    }, 1000);
                }
            });
            
            // Add input event to clear error when user types
            emailInput.addEventListener('input', function() {
                clearError(emailInput);
            });
        }
    });
    
    // Show error message
    function showError(input, message) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message') || document.createElement('div');
        
        // Add error class to input
        input.classList.add('is-invalid');
        
        // Create or update error message
        errorElement.className = 'error-message text-danger mt-2 small d-block';
        errorElement.textContent = message;
        
        // Append error message if it doesn't exist
        if (!formControl.querySelector('.error-message')) {
            formControl.appendChild(errorElement);
        }
        
        // Add shake animation
        formControl.classList.add('shake');
        setTimeout(() => {
            formControl.classList.remove('shake');
        }, 500);
    }
    
    // Show success state
    function showSuccess(input) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message');
        
        // Remove error classes and messages
        input.classList.remove('is-invalid');
        if (errorElement) {
            errorElement.remove();
        }
        
        // Add success class
        input.classList.add('is-valid');
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message text-success mt-2 small d-block';
        successMessage.textContent = 'Thank you! We\'ll be in touch soon.';
        formControl.appendChild(successMessage);
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
            input.classList.remove('is-valid');
        }, 3000);
    }
    
    // Clear error state
    function clearError(input) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message');
        
        input.classList.remove('is-invalid');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    // Initialize video elements
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        // Mute videos for autoplay to work in most browsers
        video.muted = true;
        
        // Play video when it's in viewport
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(e => console.log('Video play failed:', e));
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });
        
        videoObserver.observe(video);
    });
    
    // Add hover effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 100}ms`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
