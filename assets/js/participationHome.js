const allParticipationsDOM = document.querySelector(".all-participations");

//Participation
class Participations {
  async getParticipations() {
    try {
      let result = await fetch("participation.json");

      let data = await result.json();

      let participations = data.items;

      participations = participations.map((item) => {
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
      return participations;
    } catch (error) {
      console.log(error);
    }
  }
}

class ParticipationsUI {
  filter(participations) {
    let result = ``;
    //console.log(project);
    participations.forEach((product) => {
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
      result += `
      <div class="col-lg-4 col-md-6 portfolio-item">
        <div class="portfolio-wrap m-2">
          <img src="assets/img/acheivements/${image1}.jpg" class="img-fluid" alt="${competition}" />
          <div class="portfolio-links">
            <span>${competition}</span>
          </div>
        </div>
        <div class="d-flex flex-column justify-content-between align-items-start pt-2 m-2">
          <div><b>Competition:</b> ${competition}</div>
          <div><b>Organizer:</b> ${organizers}</div>
          <small class="text-body-secondary mt-2"><span class="badge rounded-pill text-bg-light">${projectDate}</span></small>
        </div>
      </div>`;
    });
    try {
      allParticipationsDOM.innerHTML = result;
    } catch (e) {
      console.log("Error = " + e);
    }
  }
}

//Filter
function filter() {
  const participations = new Participations();
  //console.log(participations);
  const ParticipationsUi = new ParticipationsUI();
  participations.getParticipations().then((participations) => {
    ParticipationsUi.filter(participations);
  });
}
filter();
