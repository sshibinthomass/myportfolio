showProduct = document.querySelector(".show-product");
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
                    duration
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
                    duration
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
        console.log(project);
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
                result += `
            <section id="breadcrumbs" class="breadcrumbs">
                <div class="container">
                    <div class="d-flex justify-content-between align-items-center">
                    <h2>${projects}</h2>
                    <ol>
                        <li><a href="index.html#project">Home</a></li>
                        <li>${project}</li>
                    </ol>
                    </div>
                </div>
            </section>
            <section id="portfolio-details" class="portfolio-details">
            <div class="container">
              <div class="row gy-4">
                <div class="col-lg-8">
                  <div class="portfolio-details-slider swiper">
                    <div class="swiper-wrapper align-items-center">
                        <img src="assets/img/project/${image1}.jpeg" alt="">
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
                     <iframe width="560" height="315" src="${video}"frameborder="0" allowfullscreen>
                     </iframe>
              </div>
            </div>
          </section>
            `
            } else {

            };
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









