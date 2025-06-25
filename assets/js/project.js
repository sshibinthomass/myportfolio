const allPlantsDOM = document.querySelector(".portfolio");

const urlParams = new URLSearchParams(window.location.search);
const project = urlParams.get("project");

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
      console.log(error);
    }
  }
}

class UI {
  filter(products) {
    let result = ``;
    //console.log(project);
    products.forEach((product) => {
      if (project == product.name) {
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
        console.log(product);

        // Build image gallery
        let imageGallery = `<img src="assets/img/project/${image1}.jpeg" alt="${name} Project Image 1">`;
        if (image2) {
          imageGallery += `<img src="assets/img/project/${image2}.jpeg" alt="${name} Project Image 2">`;
        }
        if (image3) {
          imageGallery += `<img src="assets/img/project/${image3}.jpeg" alt="${name} Project Image 3">`;
        }

        // Build video section if video exists
        let videoSection = "";
        if (video && video.trim() !== "") {
          videoSection = `
                    <div class="col-12">
                        <div class="portfolio-video">
                            <h3>Project Demo</h3>
                            <iframe width="100%" height="400" src="${video}" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>`;
        }

        result += `

            <section id="portfolio-details" class="portfolio-details">
            <div class="container">
              <div class="row gy-4">
                <div class="col-lg-8">
                  <div class="portfolio-details-slider swiper">
                    <div class="swiper-wrapper align-items-center">
                        ${imageGallery}
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="portfolio-info">
                    <h3>Project information</h3>
                    <ul>
                      <li><strong>Category</strong>: ${category}</li>
                      <li><strong>Duration</strong>: ${duration}</li>
                      <li><strong>Project date</strong>: ${projectDate}</li>
                      <li><strong>Competition</strong>: ${competition}</li>
                      <li><strong>Technology</strong>: ${technology}</li>
                      <li><strong>Project URL</strong>: <a href="#">www.example.com</a></li>
                    </ul>
                  </div>
                </div>
                <div class="portfolio-description">
                  <h2>${projects}</h2>
                  <p>
                  &emsp;${description}
                  </p>
                </div>
                ${videoSection}
              </div>
            </div>
          </section>
            `;
      } else {
      }
    });
    try {
      allPlantsDOM.innerHTML = result;
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
