// Achievement Home Page Handler
class AchievementManager {
  constructor() {
    this.container = document.querySelector(".all-achievements");
    this.achievements = [];
  }

  async loadAchievements() {
    try {
      const response = await fetch("achievement.json");
      const data = await response.json();

      this.achievements = data.items.map((item) => ({
        id: item.sys.id,
        name: item.fields.name,
        competition: item.fields.competition,
        place: item.fields.place,
        organizers: item.fields.organizers,
        projectDate: item.fields.projectDate,
        category: item.fields.category,
        image1: item.fields.image1,
        prize: item.fields.prize,
      }));

      this.renderAchievements();
    } catch (error) {
      console.error("Error loading achievements:", error);
      this.showError("Failed to load achievements. Please refresh the page.");
    }
  }

  renderAchievements() {
    if (!this.container) return;

    if (!this.achievements || this.achievements.length === 0) {
      this.showError("No achievements found.");
      return;
    }

    const achievementsHTML = this.achievements
      .map((achievement) => this.createAchievementCard(achievement))
      .join("");

    this.container.innerHTML = achievementsHTML;
  }

  createAchievementCard(achievement) {
    const positionClass = this.getPositionClass(achievement.place);

    return `
      <div class="col-lg-4 col-md-6 mb-3">
        <div class="card achievement-card h-100 shadow-sm border-0">
          <div class="achievement-image-container">
            <img 
              src="assets/img/acheivements/${achievement.image1}.jpg" 
              class="card-img-top achievement-image" 
              alt="${achievement.name}"
              onerror="this.src='assets/img/acheivements/default-achievement.jpg'"
            />
            <div class="achievement-overlay">
              <span class="badge ${positionClass} position-badge">${
      achievement.place
    }</span>
            </div>
          </div>
          
          <div class="card-body d-flex flex-column p-3">
            <h6 class="card-title achievement-title mb-2">
              ${achievement.competition}
            </h6>
            
            <div class="achievement-details mb-2">
              <div class="detail-item">
                <i class="bi bi-trophy-fill text-warning me-1"></i>
                <span class="detail-label">Prize:</span>
                <span class="detail-value">${achievement.prize}</span>
              </div>
              
              <div class="detail-item">
                <i class="bi bi-building text-primary me-1"></i>
                <span class="detail-label">Org:</span>
                <span class="detail-value">${achievement.organizers}</span>
              </div>
              
              <div class="detail-item">
                <i class="bi bi-calendar-event text-success me-1"></i>
                <span class="detail-label">Date:</span>
                <span class="detail-value">${achievement.projectDate}</span>
              </div>
              
              ${
                achievement.category
                  ? `
                <div class="detail-item">
                  <i class="bi bi-tags text-info me-1"></i>
                  <span class="detail-label">Cat:</span>
                  <span class="detail-value">${achievement.category}</span>
                </div>
              `
                  : ""
              }
            </div>
            
            <div class="mt-auto">
              <a 
                href="achievement-details.html?achievement=${encodeURIComponent(
                  achievement.name
                )}" 
                class="btn btn-outline-primary btn-sm w-100"
              >
                <i class="bi bi-eye me-1"></i>
                View Details
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getPositionClass(place) {
    const placeLower = place.toLowerCase();
    if (placeLower.includes("1st") || placeLower.includes("first"))
      return "bg-success";
    if (placeLower.includes("2nd") || placeLower.includes("second"))
      return "bg-info";
    if (placeLower.includes("3rd") || placeLower.includes("third"))
      return "bg-warning";
    return "bg-secondary";
  }

  showError(message) {
    if (this.container) {
      this.container.innerHTML = `
        <div class="col-12 text-center">
          <div class="alert alert-info" role="alert">
            <i class="bi bi-info-circle me-2"></i>
            ${message}
          </div>
        </div>
      `;
    }
  }
}

// Initialize and load achievements
document.addEventListener("DOMContentLoaded", () => {
  const achievementManager = new AchievementManager();
  achievementManager.loadAchievements();
});

// Add custom CSS for achievements
const style = document.createElement("style");
style.textContent = `
  /* Center the achievements container */
  .all-achievements {
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
  }
  
  .achievement-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 8px;
    overflow: hidden;
    margin: 0;
  }
  
  .achievement-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.12) !important;
  }
  
  .achievement-image-container {
    position: relative;
    overflow: hidden;
    height: 160px;
  }
  
  .achievement-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .achievement-card:hover .achievement-image {
    transform: scale(1.03);
  }
  
  .achievement-overlay {
    position: absolute;
    top: 8px;
    right: 8px;
  }
  
  .position-badge {
    font-size: 0.7rem;
    padding: 0.3rem 0.6rem;
    border-radius: 15px;
    font-weight: 600;
  }
  
  .achievement-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: #333;
    line-height: 1.2;
    min-height: 2.2rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 0.5rem !important;
  }
  
  .achievement-details {
    font-size: 0.75rem;
  }
  
  .detail-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.3rem;
    line-height: 1.1;
  }
  
  .detail-label {
    font-weight: 600;
    color: #666;
    margin-right: 0.3rem;
    min-width: 35px;
    font-size: 0.7rem;
  }
  
  .detail-value {
    color: #333;
    flex: 1;
    word-break: break-word;
    font-size: 0.7rem;
  }
  
  .achievement-card .btn {
    border-radius: 6px;
    font-weight: 500;
    transition: all 0.3s ease;
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
  
  .achievement-card .btn:hover {
    transform: translateY(-1px);
  }
  
  .achievement-card .card-body {
    padding: 0.75rem !important;
  }
  
  @media (max-width: 768px) {
    .achievement-image-container {
      height: 140px;
    }
    
    .achievement-title {
      font-size: 0.85rem;
      min-height: 2rem;
    }
    
    .achievement-details {
      font-size: 0.7rem;
    }
    
    .detail-label {
      min-width: 30px;
    }
    
    .achievement-card .card-body {
      padding: 0.5rem !important;
    }
  }
  
  /* Ensure proper spacing for 3 columns */
  .all-achievements .col-lg-4 {
    padding-left: 8px;
    padding-right: 8px;
  }
  
  .all-achievements .col-md-6 {
    padding-left: 8px;
    padding-right: 8px;
  }
  
  /* Dark Mode Styles for Achievement Cards */
  body.dark-mode .achievement-card {
    background: var(--dark-card-bg, #252525);
    border-color: var(--dark-border, #444444);
  }
  
  body.dark-mode .achievement-title {
    color: var(--dark-text-primary, #e0e0e0) !important;
  }
  
  body.dark-mode .detail-label {
    color: var(--dark-text-secondary, #b0b0b0) !important;
  }
  
  body.dark-mode .detail-value {
    color: var(--dark-text-primary, #e0e0e0) !important;
  }
  
  body.dark-mode .achievement-card .btn-outline-primary {
    color: var(--dark-accent, #149ddd);
    border-color: var(--dark-accent, #149ddd);
  }
  
  body.dark-mode .achievement-card .btn-outline-primary:hover {
    background: var(--dark-accent, #149ddd);
    color: #fff;
  }
  
  body.dark-mode .achievement-card:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4) !important;
  }
  
  /* Dark mode icon colors */
  body.dark-mode .detail-item .bi-trophy-fill {
    color: #ffc107 !important;
  }
  
  body.dark-mode .detail-item .bi-building {
    color: var(--dark-accent, #149ddd) !important;
  }
  
  body.dark-mode .detail-item .bi-calendar-event {
    color: #28a745 !important;
  }
  
  body.dark-mode .detail-item .bi-tags {
    color: #17a2b8 !important;
  }
`;
document.head.appendChild(style);
