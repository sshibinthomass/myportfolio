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
          image5
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
          image5
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
      var id=product.id;
      var name=product.name;
      var competition=product.competition;
      var place=product.place;
      var organizers=product.organizers;
      var projectDate=product.projectDate;
      var duration=product.duration;
      var preparationTime=product.preparationTime;
      var category=product.category;
      var location=product.location;
      var team=product.team;
      var prize=product.prize;
      var problemStatement=product.problemStatement;
      var aboutCompetition=product.aboutCompetition;
      var solution=product.solution;
      var image1=product.image1;
      var image2=product.image2;
      var image3=product.image3;
      var image4=product.image4;
      var image5=product.image5;
      result += `
      <div class="col">
      <div class="card shadow-sm">
      <img src="assets/img/acheivements/${image1}.jpg" class="img-fluid" alt="" />
      <div class="card-body">
          <div class="container text-left">
            <div class="row">
              <div class="col-4 p-0">
                <b>Competition</b>
              </div>
              <div class="col-8 p-0">
                :${competition}
              </div>
            </div>
            <div class="row">
              <div class="col-4 p-0">
                <b>Organizer</b>
              </div>
              <div class="col-8 p-0">
                :${organizers}
              </div>
            </div>
            </div>
          <div class="d-flex justify-content-between align-items-center pt-2">
          <small class="text-body-secondary"><span class="badge rounded-pill text-bg-light">${projectDate}</span>
          </small> 
            <a class="btn btn-sm btn-outline-secondary" href="participation-details.html?participation=${name}">View</a>

          </div>
        </div>
      </div>
    </div>
    `;
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