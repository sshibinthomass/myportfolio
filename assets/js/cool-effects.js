/**
 * Cool Effects JavaScript
 */
(function() {
  "use strict";

  // Create animated background
  function createAnimatedBackground() {
    const body = document.querySelector('body');
    const bgAnimation = document.createElement('div');
    bgAnimation.classList.add('bg-animation');
    body.appendChild(bgAnimation);

    // Create canvas for particles
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    bgAnimation.appendChild(canvas);

    // Initialize particles
    if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-canvas', {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#149ddd"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#149ddd",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 140,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      });
    }
  }

  // Apply cool effects to elements
  function applyCoolEffects() {
    // Apply glass card effect
    document.querySelectorAll('.services .icon-box, .skills .icon-box, .portfolio .portfolio-wrap, .contact .info').forEach(el => {
      el.classList.add('glass-card');
    });

    // Apply modern profile effect
    const profileImg = document.querySelector('#header .profile img');
    if (profileImg) {
      const profileContainer = profileImg.parentElement;
      profileContainer.classList.add('modern-profile');
    }

    // Apply modern social links
    const socialLinks = document.querySelector('#header .social-links');
    if (socialLinks) {
      socialLinks.classList.add('modern-social');
    }

    // Apply animated title effect
    document.querySelectorAll('.section-title, .skills-title').forEach(el => {
      el.classList.add('animated-title');
    });

    // Apply animated icon effect
    document.querySelectorAll('.skills .icon-box .icon').forEach(el => {
      el.classList.add('animated-icon');
    });

    // Apply portfolio cool effect
    document.querySelectorAll('.portfolio .portfolio-wrap').forEach(el => {
      el.classList.add('portfolio-cool-effect');
    });

    // Apply floating animation to selected elements
    document.querySelectorAll('.facts .count-box, .testimonials .testimonial-item').forEach(el => {
      el.classList.add('floating');
    });

    // Convert regular buttons to cool buttons
    document.querySelectorAll('.btn-primary, .btn-outline-primary').forEach(el => {
      el.classList.add('cool-btn');
    });
  }

  // Apply neon text effect in dark mode
  function applyDarkModeEffects() {
    if (document.body.classList.contains('dark-mode')) {
      document.querySelectorAll('h1.text-light, .section-title h2, .skills-title h2').forEach(el => {
        el.classList.add('neon-text');
      });
    } else {
      document.querySelectorAll('h1.text-light, .section-title h2, .skills-title h2').forEach(el => {
        el.classList.remove('neon-text');
      });
    }
  }

  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Load particles.js script dynamically
    const particlesScript = document.createElement('script');
    particlesScript.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    particlesScript.onload = function() {
      createAnimatedBackground();
    };
    document.head.appendChild(particlesScript);

    // Apply cool effects
    applyCoolEffects();
    
    // Apply dark mode specific effects
    applyDarkModeEffects();
    
    // Listen for dark mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        // Wait for dark mode class to be applied/removed
        setTimeout(applyDarkModeEffects, 100);
      });
    }
  });
})();
