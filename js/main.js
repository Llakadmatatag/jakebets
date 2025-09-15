// Copy promo code to clipboard
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        // Change icon to checkmark
        const icon = button.querySelector('i');
        const originalClass = icon.className;
        icon.className = 'fas fa-check';
        
        // Revert back to copy icon after 2 seconds
        setTimeout(() => {
            icon.className = originalClass;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Check Kick.com stream status
async function checkStreamStatus() {
    const statusIndicator = document.querySelector('.status-indicator');
    const streamBtn = document.getElementById('liveStreamBtn');
    const statusText = document.querySelector('.status-text');
    
    if (!streamBtn) return;
    
    // Add loading state
    if (statusIndicator) {
        statusIndicator.classList.remove('live', 'offline');
        statusIndicator.classList.add('loading');
    }
    if (statusText) {
        statusText.textContent = 'Checking...';
    }
    
    try {
        // Using Kick.com API endpoint for channel status
        const response = await fetch('https://kick.com/api/v1/channels/jakebets', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch stream status');
        }
        
        const data = await response.json();
        
        if (statusIndicator) {
            statusIndicator.classList.remove('loading');
            if (data.livestream) {
                statusIndicator.classList.remove('offline');
                statusIndicator.classList.add('live');
                if (statusText) {
                    statusText.textContent = 'LIVE NOW';
                }
            } else {
                statusIndicator.classList.remove('live');
                statusIndicator.classList.add('offline');
                if (statusText) {
                    statusText.textContent = 'OFFLINE';
                }
            }
        }
    } catch (error) {
        console.error('Error checking stream status:', error);
        if (statusIndicator) {
            statusIndicator.classList.remove('loading', 'live');
            statusIndicator.classList.add('offline');
        }
        if (statusText) {
            statusText.textContent = 'OFFLINE';
        }
    }
}

// Check stream status when page loads
checkStreamStatus();
// Check every 2 minutes
setInterval(checkStreamStatus, 2 * 60 * 1000);

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for anchor links
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

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animate progress bars when they come into view
    const animateOnScroll = function() {
        const progressBars = document.querySelectorAll('.progress');
        
        progressBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition) {
                const width = bar.getAttribute('data-width') || '100%';
                bar.style.width = width;
            }
        });
    };

    // Add click event listeners to copy buttons
    document.querySelectorAll('.copy-icon').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const code = this.getAttribute('data-code');
            copyToClipboard(code, this);
        });
    });

    // Video modal
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const videoUrl = this.getAttribute('data-video-url');
            if (videoUrl) {
                // In a real implementation, you would open a modal with the video
                // For this example, we'll just open the video in a new tab
                window.open(videoUrl, '_blank');
            }
        });
    });


    // Initialize animations on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial check for elements in viewport
    animateOnScroll();

    // Add animation to hero section elements on load
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (heroImage) {
        setTimeout(() => {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateY(0)';
        }, 600);
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
