const allProjectsDOM = document.querySelector(".all-certifications");

//Products
class Products {
  async getProducts() {
    try {
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
      return products;
    } catch (error) {
      console.log(error);
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
      <div class="col-lg-4 col-md-6 mb-4 portfolio-item filter-${category}">
      <div class="portfolio-wrap glass-card">
        <img src="assets/img/certifications/${image}.jpg" class="img-fluid" alt="">
        <div class="portfolio-links">
          <a href="assets/img/certifications/${image}.jpg" data-gallery="portfolioGallery" target="_blank" class="portfolio-lightbox" title="${category}"><i class="bx bx-plus"></i></a>
        </div>
      </div>
    </div>`;
    });
    try {
      allProjectsDOM.innerHTML = result;

      // Initialize Isotope after loading certifications
      setTimeout(() => {
        const portfolioContainer = document.querySelector(
          ".portfolio-container"
        );
        if (portfolioContainer && typeof Isotope !== "undefined") {
          const portfolioIsotope = new Isotope(portfolioContainer, {
            itemSelector: ".portfolio-item",
          });

          // Re-arrange items when portfolio filters are clicked
          const portfolioFilters = document.querySelectorAll(
            "#portfolio-flters li"
          );
          if (portfolioFilters) {
            portfolioFilters.forEach((filter) => {
              filter.addEventListener("click", function (e) {
                e.preventDefault();
                portfolioFilters.forEach(function (el) {
                  el.classList.remove("filter-active");
                });
                this.classList.add("filter-active");

                portfolioIsotope.arrange({
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
