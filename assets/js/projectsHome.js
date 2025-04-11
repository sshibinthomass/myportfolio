const allProjectsDOM = document.querySelector(".all-projects");

//Products
class Products {
  async getProducts() {
    try {
      let result = await fetch("projects.json");

      let data = await result.json();

      let products = data.items;

      products = products.map((item) => {
        const {
          name,
          category,
          competition,
          project,
          description,
          technology,
          video,
          image1,
          image2,
          image3,
          projectDate,
          duration,
        } = item.fields;
        const { id } = item.sys;

        return {
          id,
          name,
          category,
          competition,
          project,
          description,
          technology,
          video,
          image1,
          image2,
          image3,
          projectDate,
          duration,
        };
      });
      return products;
    } catch (error) {
      console.log("Error loading projects:", error);
      // Display error message in the projects container
      if (allProjectsDOM) {
        allProjectsDOM.innerHTML = `<div class="col-12 text-center"><p>Error loading projects. Please try refreshing the page.</p></div>`;
      }
    }
  }
}

class UI {
  filter(products) {
    if (!products || products.length === 0) {
      if (allProjectsDOM) {
        allProjectsDOM.innerHTML = `<div class="col-12 text-center"><p>No projects found.</p></div>`;
      }
      return;
    }

    let result = ``;
    //console.log(project);
    products.forEach((product) => {
      var name = product.name;
      var category = product.category;
      var competition = product.competition;
      var projects = product.project;
      var description = product.description;
      var technology = product.technology;
      var video = product.video;
      var image1 = product.image1;
      var image2 = product.image2;
      var image3 = product.image3;
      var projectDate = product.projectDate;
      var duration = product.duration;
      //console.log(product);
      result += `
      <div class="col-lg-4 col-md-6 portfolio-item filter-${category}">
        <div class="portfolio-wrap m-2">
          <img src="assets/img/project/${image1}.jpeg" class="img-fluid" alt="${name}" />
          <div class="portfolio-links">
            <a href="portfolio-details.html?project=${name}" title="More Details">${name}</a>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center pt-2 m-2">
          <h4 class="text-center pt-2">${name}</h4>
          <a class="btn btn-sm btn-outline-secondary" href="portfolio-details.html?project=${name}">View</a>
        </div>
      </div>`;
    });
    try {
      if (allProjectsDOM) {
        allProjectsDOM.innerHTML = result;

        // Initialize Isotope after loading projects
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
      }
    } catch (e) {
      console.log("Error displaying projects: " + e);
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
