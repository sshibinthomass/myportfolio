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
    //console.log(project);
    products.forEach((certificate) => {
      var image = certificate.image;
      var category = certificate.category;
      var heading = certificate.heading;
      result += `
      <div class="col-lg-4 col-md-6 mb-4 project-item filter-${category}">
      <div class="project-wrap glass-card">
        <img src="assets/img/certifications/${image}.jpg" class="img-fluid" alt="">
        <div class="project-links">
          <a href="assets/img/certifications/${image}.jpg" data-gallery="projectGallery" target="_blank" class="project-lightbox" title="${category}"><i class="bx bx-plus"></i></a>
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
          });

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
      }, 100);
    } catch (e) {
      console.log("Error = " + e);
    }
  }
}

//Filter
function filter() {
  const products = new Products();
  //console.log(products);
  const ui = new UI();
  products.getProducts().then((products) => {
    ui.filter(products);
  });
}
filter();
