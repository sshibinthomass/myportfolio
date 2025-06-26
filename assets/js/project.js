const allPlantsDOM = document.querySelector(".project");

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
          github,
          App_link,
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
          github,
          App_link,
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
        var github = product.github;
        var appLink = product.App_link;
        console.log(product);

        // Build GitHub and App Link sections
        let githubSection = "";
        let appLinkSection = "";

        if (github && github !== "None") {
          githubSection = `<li><strong>GitHub</strong>: <a href="${github}" target="_blank" rel="noopener noreferrer">View Repository</a></li>`;
        }

        if (appLink && appLink !== "None") {
          appLinkSection = `<li><strong>App Link</strong>: <a href="{appLink}" target="_blank" rel="noopener noreferrer">View App</a></li>`;
        }

        // Build image gallery
        let imageGallery = "";

        // Handle image1
        if (image1 && image1.startsWith("http")) {
          imageGallery += `<div class="swiper-slide"><img src="${image1}" alt="${name} Project Image 1"></div>`;
        } else if (image1) {
          imageGallery += `<div class="swiper-slide"><img src="assets/img/project/${image1}.jpeg" alt="${name} Project Image 1"></div>`;
        }

        // Handle image2
        if (image2 && image2.startsWith("http")) {
          imageGallery += `<div class="swiper-slide"><img src="${image2}" alt="${name} Project Image 2"></div>`;
        } else if (image2) {
          imageGallery += `<div class="swiper-slide"><img src="assets/img/project/${image2}.jpeg" alt="${name} Project Image 2"></div>`;
        }

        // Handle image3
        if (image3 && image3.startsWith("http")) {
          imageGallery += `<div class="swiper-slide"><img src="${image3}" alt="${name} Project Image 3"></div>`;
        } else if (image3) {
          imageGallery += `<div class="swiper-slide"><img src="assets/img/project/${image3}.jpeg" alt="${name} Project Image 3"></div>`;
        }

        // Build video section if video exists
        let videoSection = "";
        if (video && video.trim() !== "") {
          videoSection = `
                    <div class="col-12">
                        <div class="project-video">
                            <h3>Project Demo</h3>
                            <iframe width="100%" height="400" src="${video}" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>`;
        }

        result += `
            <section id="project-details" class="project-details section-bg">
              <div class="container" data-aos="fade-up">
                <div class="section-title">
                  <h2>${projects}</h2>
                </div>
                
                <div class="row gy-4">
                  <!-- Project Gallery -->
                  <div class="col-lg-8">
                    <div class="project-gallery">
                      <div class="swiper project-details-slider">
                        <div class="swiper-wrapper align-items-center">
                          ${imageGallery}
                        </div>
                        <div class="swiper-pagination"></div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Project Information Card -->
                  <div class="col-lg-4">
                    <div class="card glass-card h-100">
                      <div class="card-body">
                        <h3 class="card-title mb-4">
                          <i class="bi bi-info-circle me-2"></i>Project Information
                        </h3>
                        <div class="project-info-list">
                          
                          <div class="info-item mb-3">
                            <div class="info-label">
                              <i class="bi bi-clock me-2"></i><strong>Duration</strong>
                            </div>
                            <div class="info-value">${duration}</div>
                          </div>
                          
                          <div class="info-item mb-3">
                            <div class="info-label">
                              <i class="bi bi-calendar me-2"></i><strong>Project Date</strong>
                            </div>
                            <div class="info-value">${projectDate}</div>
                          </div>
                          
                          <div class="info-item mb-3">
                            <div class="info-label">
                              <i class="bi bi-trophy me-2"></i><strong>Purpose</strong>
                            </div>
                            <div class="info-value">${competition}</div>
                          </div>
                          
                          <div class="info-item mb-3">
                            <div class="info-label">
                              <i class="bi bi-gear me-2"></i><strong>Technology</strong>
                            </div>
                            <div class="info-value">${technology}</div>
                          </div>
                          
                          ${
                            githubSection
                              ? `
                          <div class="info-item mb-3">
                            <div class="info-label">
                              <i class="bi bi-github me-2"></i><strong>GitHub</strong>
                            </div>
                            <div class="info-value">
                              <a href="${github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary btn-sm">
                                <i class="bi bi-box-arrow-up-right me-1"></i>View Repository
                              </a>
                            </div>
                          </div>
                          `
                              : ""
                          }
                          
                          ${
                            appLinkSection
                              ? `
                          <div class="info-item mb-3">
                            <div class="info-label">
                              <i class="bi bi-link-45deg me-2"></i><strong>App Link</strong>
                            </div>
                            <div class="info-value">
                              <a href="${appLink}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-success btn-sm">
                                <i class="bi bi-box-arrow-up-right me-1"></i>View App
                              </a>
                            </div>
                          </div>
                          `
                              : ""
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Project Description -->
                <div class="row mt-5">
                  <div class="col-12">
                    <div class="card glass-card">
                      <div class="card-body">
                        <h3 class="card-title mb-4">
                          <i class="bi bi-file-text me-2"></i>Project Description
                        </h3>
                        <div class="project-description">
                          ${description}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Project Video -->
                ${
                  videoSection
                    ? `
                <div class="row mt-5">
                  <div class="col-12">
                    <div class="card glass-card">
                      <div class="card-body">
                        <h3 class="card-title mb-4">
                          <i class="bi bi-play-circle me-2"></i>Project Demo
                        </h3>
                        <div class="project-video">
                          <div class="ratio ratio-16x9">
                            <iframe src="${video}" frameborder="0" allowfullscreen></iframe>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                `
                    : ""
                }
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
