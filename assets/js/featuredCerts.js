document.addEventListener("DOMContentLoaded", function () {
  // Fetch and render featured certifications
  fetch("assets/json/certification.json")
    .then((res) => res.json())
    .then((data) => {
      const featured = data.items.slice(0, 3); // Show first 3 as featured
      const container = document.getElementById("featured-certifications");
      let html = "";
      featured.forEach((cert) => {
        const { image, category, heading } = cert.fields;
        html += `
          <div class="col-lg-4 col-md-6 mb-4 project-item">
            <div class="project-wrap glass-card">
              <img src="assets/img/certifications/${image}.jpg" class="img-fluid" alt="${heading}" loading="lazy">
            </div>
            <div class="certificate-info mt-2">
              <div class="d-grid mt-2">
                <button class="btn btn-outline-primary view-featured-btn" data-image="assets/img/certifications/${image}.jpg" data-title="${heading}">View Full Size</button>
              </div>
            </div>
          </div>
        `;
      });
      container.innerHTML = html;
      attachFeaturedCertModalEvents();
    });

  function attachFeaturedCertModalEvents() {
    const viewBtns = document.querySelectorAll(".view-featured-btn");
    const modal = document.getElementById("featuredCertModal");
    const modalImage = document.getElementById("featuredCertModalImage");
    const modalTitle = document.getElementById("featuredCertModalLabel");
    const downloadLink = document.getElementById("featuredCertDownloadLink");

    viewBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const imageSrc = this.getAttribute("data-image");
        const title = this.getAttribute("data-title");
        // Preload image
        const preloadImg = new Image();
        preloadImg.onload = function () {
          modalImage.src = imageSrc;
          modalTitle.textContent = title;
          downloadLink.href = imageSrc;
          downloadLink.download = title.replace(/[^a-zA-Z0-9]/g, "_") + ".jpg";
          const bootstrapModal = new bootstrap.Modal(modal);
          bootstrapModal.show();
        };
        preloadImg.onerror = function () {
          alert("Failed to load certificate image. Please try again.");
        };
        preloadImg.src = imageSrc;
      });
    });
  }
});
