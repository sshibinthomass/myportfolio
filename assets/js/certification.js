const allProjectsDOM = document.querySelector(".all-certifications");

//Products
class Products {
  async getProducts() {
    try {
      let result = await fetch("assets/json/certification.json");

      let data = await result.json();

      let products = data.items;

      products = products.map((item) => {
        const {
          image,
          category,
          heading
        } = item.fields;
        const { id } = item.sys;

        return {
          id,
          image,
          category,
          heading
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
      <div class="col-lg-4 col-md-6 portfolio-item filter-${category}">
      <div class="portfolio-wrap">
        <img src="assets/img/certifications/${image}.jpg" class="img-fluid" alt="">
        <div class="portfolio-links">
          <a href="assets/img/certifications/${image}.jpg" data-gallery="portfolioGallery" target="_blank" class="portfolio-lightbox" title="${category}"><i class="bx bx-plus"></i></a>
        </div>
      </div>
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
filter();``