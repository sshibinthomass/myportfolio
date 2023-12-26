const allAchievementsDOM = document.querySelector(".achievement");

const urlParams = new URLSearchParams(window.location.search);
const achievement = urlParams.get("achievement");

//Achievements
class Achievements {
  async getAchievements() {
    try {
      let result = await fetch("achievement.json");

      let data = await result.json();

      let achievements = data.items;

      achievements = achievements.map((item) => {
        const {
          name,
          competition,
          place,
          organizers,
          projectDate,
          duration,
          preparationTime,
          category,
          location,
          team,
          prize,
          problemStatement,
          aboutCompetition,
          solution,
          image1,
          image2,
          image3,
          image4,
          image5,
          image6,
          image7,
          image8,
          image9,
          image10,
          video,
        } = item.fields;
        const { id } = item.sys;

        return {
          name,
          competition,
          place,
          organizers,
          projectDate,
          duration,
          preparationTime,
          category,
          location,
          team,
          prize,
          problemStatement,
          aboutCompetition,
          solution,
          image1,
          image2,
          image3,
          image4,
          image5,
          image6,
          image7,
          image8,
          image9,
          image10,
          video,
        };
      });
      return achievements;
    } catch (error) {
      console.log(error);
    }
  }
}

class AchievementsUI {
  filter(achievements) {
    let result = ``;
    //console.log(project);
    achievements.forEach((product) => {
      if (achievement == product.name) {
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
        var image6 = product.image6;
        var image7 = product.image7;
        var image8 = product.image8;
        var image9 = product.image9;
        var image10 = product.image10;
        if (product.video == "Empty") {
          var video =``;
        } else {
          var video =`<iframe width="560" height="315" src="${product.video}"frameborder="0" allowfullscreen></iframe>`;
        };
        if (product.image2 == "Empty") {
          var certificate = product.image1;
        } else {
          var certificate = product.image2;
        };
        if (
          achievement == "SIH" ||
          achievement == "IFA" ||
          achievement == "TNSCST" ||
          achievement == "TCS_XR_Pro"
        ) {
          var carousel = `<div class="portfolio-details-slider swiper">
          <div class="swiper-wrapper align-items-center">
          <div id="carouselExampleIndicators" class="carousel slide">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="assets/img/acheivements/${image3}.jpg" alt="">
            </div>
            <div class="carousel-item">
              <img src="assets/img/acheivements/${image5}.jpg" alt="">          
            </div>
            <div class="carousel-item">
              <img src="assets/img/acheivements/${image4}.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="assets/img/acheivements/${image1}.jpg" class="d-block w-100" alt="...">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
          </div>            
        </div>`;
        } else if (achievement == "EXPO_19" || achievement == "SAR_Tire2") {
          var carousel = `<div class="portfolio-details-slider swiper">
          <div class="swiper-wrapper align-items-center">
          <div id="carouselExampleIndicators" class="carousel slide">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="assets/img/acheivements/${image1}.jpg" alt="">
            </div>
            <div class="carousel-item">
              <img src="assets/img/acheivements/${image3}.jpg" alt="">          
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
          </div>            
        </div>`;
        } else {
          var carousel = `<div class="portfolio-details-slider swiper">
          <div class="swiper-wrapper align-items-center">
          <img src="assets/img/acheivements/${image1}.jpg" alt="">              
        </div>`;
        }
        result += `      
        <section id="breadcrumbs" class="breadcrumbs">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center">
            <h2>${competition}</h2>
            <ol>
                <li><a href="index.html#acheivements">Home</a></li>
                <li>${competition}</li>
            </ol>
            </div>
        </div>
    </section>
    <section id="portfolio-details" class="portfolio-details">
    <div class="container">
      <div class="row gy-4">
        <div class="col-lg-8">
${carousel}
          </div>
        </div>
        <div class="col-lg-4">
          <div class="portfolio-info">
            <h3>Project information</h3>
            <ul>
              <li><strong>Category</strong>: ${category}</li>
              <li><strong>Position</strong>: ${place}</li>
              <li><strong>Prize</strong>: ${prize}</li>
              <li><strong>Organizer</strong>: ${organizers}</li>
              <li><strong>Duration</strong>: ${duration}</li>
              <li><strong>Project date</strong>: ${projectDate}</li>
              <li><strong>Preparation Time</strong>: ${preparationTime}</li>
              <li><strong>Location</strong>: ${location}</li>
              <!--<li><strong>Project URL</strong>: <a href="#">www.example.com</a></li>-->
            </ul>
          </div>
        </div>
        <div class="portfolio-description">
          <h2>About Competition</h2>
          ${aboutCompetition}
        </div>
        <div class="portfolio-description">
          <h2>Problem Statement</h2>
          ${problemStatement}
        </div>
        <div class="portfolio-description">
          <h2>Solution</h2>
          ${solution}
          ${video}
          <img src="assets/img/acheivements/${certificate}.jpg" class="d-block w-100 alt="certificate">
          </div>
      </div>
    </div>
  </section>
      `;
      } else {
      }
    });
    try {
      allAchievementsDOM.innerHTML = result;
    } catch (e) {
      console.log("Error = " + e);
    }
  }
}

//Filter
function filter() {
  const achievements = new Achievements();
  //console.log(products);
  const ui = new AchievementsUI();
  achievements.getAchievements().then((achievements) => {
    ui.filter(achievements);
  });
}
filter();
