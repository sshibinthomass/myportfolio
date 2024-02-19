const allPlantsDOM = document.querySelector(".participation");

const urlParams = new URLSearchParams(window.location.search);
const participation = urlParams.get("participation");

//Participation
class Products {
  async getProducts() {
    try {
      let result = await fetch("participation.json");

      let data = await result.json();

      let products = data.items;

      products = products.map((item) => {
        const {
          name,
          competition,
          organizers,
          projectDate,
          duration,
          preparationTime,
          category,
          location,
          team,
          problemStatement,
          aboutCompetition,
          solution,
          image1,
          image2,
          image3,
          image4,
          image5,
        } = item.fields;
        const { id } = item.sys;

        return {
          name,
          competition,
          organizers,
          projectDate,
          duration,
          preparationTime,
          category,
          location,
          team,
          problemStatement,
          aboutCompetition,
          solution,
          image1,
          image2,
          image3,
          image4,
          image5,
        };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

class ParticipationsUI {
  filter(products) {
    let result = ``;
    console.log(participation);
    console.log(products);
    products.forEach((product) => {
      console.log(participation == product.name);
      if (participation == product.name) {
        //console.log(participation.name);
        var id = product.id;
        var name = product.name;
        var competition = product.competition;
        var place = product.place;
        var organizers = product.organizers;
        var projectDate = product.projectDate;
        var duration = product.duration;
        var preparationTime = product.preparationTime;
        var category = product.category;
        var location = product.location;
        var team = product.team;
        var prize = product.prize;
        var problemStatement = product.problemStatement;
        var aboutCompetition = product.aboutCompetition;
        var solution = product.solution;
        var image1 = product.image1;
        var image2 = product.image2;
        var image3 = product.image3;
        var image4 = product.image4;
        var image5 = product.image5;
        var video = product.video;
        result += `
      <section id="breadcrumbs" class="breadcrumbs">
          <div class="container">
              <div class="d-flex justify-content-between align-items-center">
              <h2>${name}</h2>
              <ol>
                  <li><a href="index.html#participations">Home</a></li>
                  <li>${name}</li>
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
            <h2>${duration}</h2>
            <p>
            &emsp;${category}
            </p>
          </div>
          <iframe width="560" height="315" src="${video}"frameborder="0" allowfullscreen>
          </iframe>
        </div>
      </div>
    </section>
      `;
      } else {
      }
    });
    console.log(result);
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
  //console.log(participations);
  const ui = new ParticipationsUI();
  products.getProducts().then((products) => {
    ui.filter(products);
  });
}
filter();
