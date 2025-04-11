/**
 * Dark Mode Toggle Functionality
 */
(function() {
  "use strict";

  // Check for saved theme preference or use system preference
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const savedTheme = localStorage.getItem("theme");
  
  // Function to toggle dark mode
  function toggleDarkMode(isDark) {
    if (isDark) {
      document.body.classList.add("dark-mode");
      document.getElementById("theme-toggle-icon").classList.remove("bi-moon");
      document.getElementById("theme-toggle-icon").classList.add("bi-sun");
    } else {
      document.body.classList.remove("dark-mode");
      document.getElementById("theme-toggle-icon").classList.remove("bi-sun");
      document.getElementById("theme-toggle-icon").classList.add("bi-moon");
    }
  }

  // Apply saved theme or system preference on page load
  if (savedTheme === "dark" || (savedTheme === null && prefersDarkScheme.matches)) {
    toggleDarkMode(true);
  } else {
    toggleDarkMode(false);
  }

  // Add event listener to theme toggle button
  document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("theme-toggle");
    
    if (themeToggle) {
      themeToggle.addEventListener("click", function() {
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
  });
})();
