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
      products = products.sort((a, b) => b.id - a.id);
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
      <div class="col-lg-4 col-md-6 project-item filter-${category}">
        <div class="project-wrap m-2">
          <img src="assets/img/project/${image1}.jpeg" class="img-fluid" alt="${name}" />
          <div class="project-links">
            <a href="project-details.html?project=${encodeURIComponent(
              name
            )}" title="More Details">${name}</a>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center pt-2 m-2">
          <h4 class="text-center pt-2">${name}</h4>
          <a class="btn btn-sm btn-outline-secondary" href="project-details.html?project=${encodeURIComponent(
            name
          )}">View</a>
        </div>
      </div>`;
    });
    try {
      if (allProjectsDOM) {
        allProjectsDOM.innerHTML = result;

        // Initialize Isotope after loading projects
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
