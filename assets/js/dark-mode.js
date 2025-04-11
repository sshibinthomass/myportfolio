/**
 * Dark Mode Toggle Functionality
 * Enhanced for mobile compatibility
 */
(function () {
  "use strict";

  // Check for saved theme preference or use system preference
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const savedTheme = localStorage.getItem("theme");

  // Function to toggle dark mode
  function toggleDarkMode(isDark) {
    if (isDark) {
      document.body.classList.add("dark-mode");
      const toggleIcon = document.getElementById("theme-toggle-icon");
      if (toggleIcon) {
        toggleIcon.classList.remove("bi-moon");
        toggleIcon.classList.add("bi-sun");
      }
    } else {
      document.body.classList.remove("dark-mode");
      const toggleIcon = document.getElementById("theme-toggle-icon");
      if (toggleIcon) {
        toggleIcon.classList.remove("bi-sun");
        toggleIcon.classList.add("bi-moon");
      }
    }
  }

  // Apply saved theme or system preference on page load
  if (
    savedTheme === "dark" ||
    (savedTheme === null && prefersDarkScheme.matches)
  ) {
    toggleDarkMode(true);
  } else {
    toggleDarkMode(false);
  }

  // Listen for changes in system color scheme preference
  prefersDarkScheme.addEventListener("change", function (e) {
    if (savedTheme === null) {
      // Only react to system changes if user hasn't set a preference
      if (e.matches) {
        toggleDarkMode(true);
      } else {
        toggleDarkMode(false);
      }
    }
  });

  // Add event listener to theme toggle button
  document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");

    if (themeToggle) {
      themeToggle.addEventListener("click", function () {
        // Toggle dark mode
        if (document.body.classList.contains("dark-mode")) {
          toggleDarkMode(false);
          localStorage.setItem("theme", "light");
        } else {
          toggleDarkMode(true);
          localStorage.setItem("theme", "dark");
        }
      });
    }

    // Ensure mobile navigation works well with dark mode
    const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
    if (mobileNavToggle) {
      mobileNavToggle.addEventListener("click", function () {
        // Add a small delay to ensure dark mode styles are applied to the mobile menu
        setTimeout(() => {
          if (
            document.body.classList.contains("dark-mode") &&
            document.body.classList.contains("mobile-nav-active")
          ) {
            const header = document.querySelector("#header");
            if (header) {
              header.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.5)";
            }
          }
        }, 50);
      });
    }
  });
})();
