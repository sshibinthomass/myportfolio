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
      console.log(error);
    }
  }
}

class UI {
  filter(products) {
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
        <img src="assets/img/project/${image1}.jpeg" class="img-fluid" alt="" />
      </div>
      <h4 class="text-center pt-2"><a href="portfolio-details.html?project=${name}">${name}</a></h4>
    </div>`;
    });
    try {
      allProjectsDOM.innerHTML = result;
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
