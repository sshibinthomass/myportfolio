const allProjectsDOM = document.querySelector(".all-certifications");

// Check if the element exists
if (!allProjectsDOM) {
  console.error(
    'Error: Could not find element with class ".all-certifications"'
  );
}

//Products
class Products {
  async getProducts() {
    try {
      console.log("Fetching certification data...");
      let result = await fetch("assets/json/certification.json");

      let data = await result.json();

      let products = data.items;

      products = products.map((item) => {
        const { image, category, heading } = item.fields;
        const { id } = item.sys;

        return {
          id,
          image,
          category,
          heading,
        };
      });
      console.log(
        "Certification data loaded successfully:",
        products.length,
        "items"
      );
      return products;
    } catch (error) {
      console.error("Error loading certification data:", error);
    }
  }
}

class UI {
  filter(products) {
    let result = ``;
    products.forEach((certificate) => {
      var image = certificate.image;
      var category = certificate.category;
      var heading = certificate.heading;
      result += `
      <div class="col-lg-4 col-md-6 mb-4 project-item filter-${category}">
        <div class="project-wrap glass-card">
          <img src="assets/img/certifications/${image}.jpg" class="img-fluid certificate-img" alt="${heading}" loading="lazy" data-image="assets/img/certifications/${image}.jpg" data-title="${heading}">
        </div>
        <div class="certificate-info mt-2">

          <div class="d-grid mt-2">
            <button class="btn btn-outline-primary view-fullsize-btn" data-image="assets/img/certifications/${image}.jpg" data-title="${heading}">View Full Size</button>
          </div>
        </div>
      </div>`;
    });
    try {
      allProjectsDOM.innerHTML = result;

      // Initialize Isotope after loading certifications
      setTimeout(() => {
        const projectContainer = document.querySelector(".project-container");
        if (projectContainer && typeof Isotope !== "undefined") {
          const projectIsotope = new Isotope(projectContainer, {
            itemSelector: ".project-item",
            layoutMode: "fitRows",
            transitionDuration: "0.4s",
          });

          // Re-attach click event after filtering
          const reattachEvents = () => this.initializeCertificateViewers();
          projectIsotope.on("arrangeComplete", reattachEvents);

          // Re-arrange items when project filters are clicked
          const projectFilters =
            document.querySelectorAll("#project-flters li");
          if (projectFilters) {
            projectFilters.forEach((filter) => {
              filter.addEventListener("click", function (e) {
                e.preventDefault();
                projectFilters.forEach(function (el) {
                  el.classList.remove("filter-active");
                });
                this.classList.add("filter-active");

                projectIsotope.arrange({
                  filter: this.getAttribute("data-filter"),
                });
              });
            });
          }
        }
        // Always attach click events after DOM update
        this.initializeCertificateViewers();
      }, 100);
    } catch (e) {
      console.log("Error = " + e);
    }
  }

  initializeCertificateViewers() {
    const viewButtons = document.querySelectorAll(".view-fullsize-btn");
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("imageModalLabel");
    const downloadLink = document.getElementById("downloadLink");

    viewButtons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const imageSrc = this.getAttribute("data-image");
        const title = this.getAttribute("data-title");
        // Preload image to ensure it's ready
        const preloadImg = new Image();
        preloadImg.onload = function () {
          modalImage.src = imageSrc;
          modalTitle.textContent = title;
          downloadLink.href = imageSrc;
          downloadLink.download = title.replace(/[^a-zA-Z0-9]/g, "_") + ".jpg";
          // Show modal
          const bootstrapModal = new bootstrap.Modal(modal);
          bootstrapModal.show();
        };
        preloadImg.onerror = function () {
          console.error("Failed to load image:", imageSrc);
          alert("Failed to load certificate image. Please try again.");
        };
        preloadImg.src = imageSrc;
      });
    });

    // Add keyboard support for modal
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("show")) {
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        if (bootstrapModal) {
          bootstrapModal.hide();
        }
      }
    });

    // Prevent modal from closing when clicking inside modal content
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        if (bootstrapModal) {
          bootstrapModal.hide();
        }
      }
    });
  }
}

//Filter
function filter() {
  const products = new Products();
  const ui = new UI();
  products.getProducts().then((products) => {
    ui.filter(products);
  });
}
filter();
