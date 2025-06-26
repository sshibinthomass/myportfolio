// Cool Effects JavaScript

// Add fade-in animation to elements when they come into view
document.addEventListener("DOMContentLoaded", function () {
  // Add fade-in-up class to elements for animation
  const animateElements = document.querySelectorAll(
    ".project-item, .section-title"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  animateElements.forEach((el) => {
    observer.observe(el);
  });

  // Add pulse effect to important elements
  const pulseElements = document.querySelectorAll(".project-links a");
  pulseElements.forEach((el) => {
    el.addEventListener("mouseenter", function () {
      this.classList.add("pulse");
    });

    el.addEventListener("mouseleave", function () {
      this.classList.remove("pulse");
    });
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add loading shimmer effect
function addShimmerEffect(element) {
  element.classList.add("shimmer");
  setTimeout(() => {
    element.classList.remove("shimmer");
  }, 1500);
}

// Export for use in other files
window.CoolEffects = {
  addShimmerEffect: addShimmerEffect,
};
