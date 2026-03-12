 /* Explorer Script start */
 
              const skillsData = [
                {
                  id: 1,
                  title: "UI/UX Design",
                  category: "Design",
                  description:
                    "Master Figma and learn user-centric design principles for modern digital products.",
                  tutor: "Sarah Jenkins",
                  role: "Product Designer",
                  reviews: 48,
                  rating: 4.8,
                  image: "assets/images/uiux.jpg",
                  avatar: "assets/images/avatar-sarah.avif",
                },
                {
                  id: 2,
                  title: "Python Programming",
                  category: "Programming",
                  description:
                    "Go from zero to hero in Python with practical exercises and project-based learning.",
                  tutor: "David Chen",
                  role: "Software Engineer",
                  reviews: 61,
                  rating: 4.9,
                  image: "assets/images/python-card.png",
                  avatar: "assets/images/avatar-david.jpg",
                },
                {
                  id: 3,
                  title: "Spanish Conversation",
                  category: "Language",
                  description:
                    "Improve your fluency through casual dialogue with native speakers and guided practice.",
                  tutor: "Elena Rodriguez",
                  role: "Language Coach",
                  reviews: 35,
                  rating: 4.7,
                  image: "assets/images/spanish-card.webp",
                  avatar: "assets/images/avatar-lucy.jpg",
                },
                {
                  id: 4,
                  title: "Digital Marketing",
                  category: "Marketing",
                  description:
                    "Learn SEO, SEM and social media strategies to grow your online presence effectively.",
                  tutor: "Marcus Sterling",
                  role: "Marketing Strategist",
                  reviews: 52,
                  rating: 4.6,
                  image: "assets/images/marketing-card.jpg",
                  avatar: "assets/images/avatar-kelvin.avif",
                },
                {
                  id: 5,
                  title: "Data Science with R",
                  category: "Data",
                  description:
                    "Analyze complex datasets and create beautiful visualizations with real case studies.",
                  tutor: "Julianna Moss",
                  role: "Data Analyst",
                  reviews: 40,
                  rating: 4.8,
                  image: "assets/images/data-card.jpg",
                  avatar: "assets/images/avatar-rayan.avif",
                },
                {
                  id: 6,
                  title: "Photography",
                  category: "Photography",
                  description:
                    "Capture stunning portraits and landscapes using natural light and creative composition.",
                  tutor: "Oliver Twist",
                  role: "Visual Storyteller",
                  reviews: 27,
                  rating: 4.5,
                  image: "assets/images/photoshop-card.jpg",
                  avatar: "assets/images/avatar-mariam.avif",
                },
                {
                  id: 7,
                  title: "React for Beginners",
                  category: "Programming",
                  description:
                    "Learn components, props, state, and project structure with beginner-friendly guidance.",
                  tutor: "Aisha Bello",
                  role: "Frontend Developer",
                  reviews: 44,
                  rating: 4.8,
                  image: "assets/images/react-card.png",
                  avatar: "assets/images/avatar-sandra.avif",
                },
                {
                  id: 8,
                  title: "Brand Identity Design",
                  category: "Design",
                  description:
                    "Build logos, color systems, and brand visuals that communicate clearly and professionally.",
                  tutor: "Kelvin Moore",
                  role: "Brand Designer",
                  reviews: 31,
                  rating: 4.6,
                  image: "assets/images/brand-card.webp",
                  avatar: "assets/images/avatar-david.jpg",
                },
              ];

              const grid = document.getElementById("exploreSkillsGrid");
              const resultsCount = document.getElementById("resultsCount");
              const skillSearch = document.getElementById("skillSearch");
              const navbarSearch = document.getElementById("navbarSearch");
              const categoryFilter = document.getElementById("categoryFilter");
              const sortFilter = document.getElementById("sortFilter");
              const pillButtons = document.querySelectorAll(".pill-btn");
              const skillDetailsContent = document.getElementById(
                "skillDetailsContent",
              );

              let activeCategory = "all";

              function getStars(rating) {
                const rounded = Math.round(rating);
                let stars = "";

                for (let i = 1; i <= 5; i++) {
                  stars +=
                    i <= rounded
                      ? `<i class="bi bi-star-fill"></i>`
                      : `<i class="bi bi-star"></i>`;
                }

                return stars;
              }

              function createSkillCard(skill) {
                return `
    <div class="col-sm-6 col-lg-4 col-xl-3">
      <div class="explore-card">
        <div class="explore-card-image-wrap">
          <img src="${skill.image}" alt="${skill.title}" class="explore-card-image">
          <span class="skill-badge">${skill.category}</span>
        </div>

        <div class="explore-card-body">
          <h5 class="explore-card-title">${skill.title}</h5>
          <p class="explore-card-text">${skill.description}</p>

          <div class="tutor-row">
            <img src="${skill.avatar}" alt="${skill.tutor}" class="tutor-avatar">
            <div>
              <p class="tutor-name">${skill.tutor}</p>
              <p class="tutor-meta">${skill.role}</p>
            </div>
          </div>

          <div class="rating-row">
            <div class="rating-stars">${getStars(skill.rating)} <span class="ms-1">${skill.rating}</span></div>
            <div class="review-count">${skill.reviews} reviews</div>
          </div>

          <div class="card-actions">
            <button class="btn btn-outline-soft view-details-btn" data-id="${skill.id}">
              View Details
            </button>
            <a href="request-skill.html?skill=${encodeURIComponent(skill.title)}&tutor=${encodeURIComponent(skill.tutor)}" class="btn btn-brand">
              Request Skill
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
              }

              function renderSkills() {
                const query = (skillSearch.value || navbarSearch.value || "")
                  .toLowerCase()
                  .trim();
                const categoryValue =
                  activeCategory === "all"
                    ? categoryFilter.value
                    : activeCategory;
                const selectedCategory = categoryValue.toLowerCase();

                let filteredSkills = [...skillsData].filter((skill) => {
                  const matchesSearch =
                    skill.title.toLowerCase().includes(query) ||
                    skill.tutor.toLowerCase().includes(query) ||
                    skill.category.toLowerCase().includes(query);

                  const matchesCategory =
                    selectedCategory === "all" ||
                    skill.category.toLowerCase() === selectedCategory;

                  return matchesSearch && matchesCategory;
                });

                switch (sortFilter.value) {
                  case "rating":
                    filteredSkills.sort((a, b) => b.rating - a.rating);
                    break;
                  case "reviews":
                    filteredSkills.sort((a, b) => b.reviews - a.reviews);
                    break;
                  case "title":
                    filteredSkills.sort((a, b) =>
                      a.title.localeCompare(b.title),
                    );
                    break;
                  default:
                    break;
                }

                grid.innerHTML = "";

                if (filteredSkills.length === 0) {
                  grid.innerHTML = `
      <div class="col-12">
        <div class="empty-state">
          <i class="bi bi-search"></i>
          <h5>No skills found</h5>
          <p class="mb-0">Try another keyword or choose a different category.</p>
        </div>
      </div>
    `;
                } else {
                  filteredSkills.forEach((skill) => {
                    grid.innerHTML += createSkillCard(skill);
                  });
                }

                resultsCount.textContent = `${filteredSkills.length} skill${filteredSkills.length !== 1 ? "s" : ""} found`;

                bindDetailButtons(filteredSkills);
              }

              function bindDetailButtons(filteredSkills) {
                const detailButtons =
                  document.querySelectorAll(".view-details-btn");

                detailButtons.forEach((button) => {
                  button.addEventListener("click", () => {
                    const skillId = Number(button.dataset.id);
                    const selectedSkill = filteredSkills.find(
                      (skill) => skill.id === skillId,
                    );

                    if (!selectedSkill) return;

                    skillDetailsContent.innerHTML = `
        <img src="${selectedSkill.image}" alt="${selectedSkill.title}" class="details-hero">
        <div class="details-body">
          <span class="details-pill">${selectedSkill.category}</span>
          <h3 class="mb-2">${selectedSkill.title}</h3>
          <p class="text-muted mb-3">${selectedSkill.description}</p>

          <div class="details-user">
            <img src="${selectedSkill.avatar}" alt="${selectedSkill.tutor}">
            <div>
              <h6 class="mb-1">${selectedSkill.tutor}</h6>
              <p class="mb-0 text-muted">${selectedSkill.role}</p>
            </div>
          </div>

          <div class="d-flex flex-wrap gap-3 mb-4">
            <span class="results-count">${selectedSkill.rating} rating</span>
            <span class="results-count">${selectedSkill.reviews} reviews</span>
          </div>

          <p class="mb-4">
            This skill exchange allows learners to connect directly with peers who have practical experience in the subject area.
            You can request a session and offer a skill in return.
          </p>

          <div class="d-flex flex-wrap gap-2">
            <a href="request-skill.html?skill=${encodeURIComponent(selectedSkill.title)}&tutor=${encodeURIComponent(selectedSkill.tutor)}" class="btn btn-brand">
              Request Skill
            </a>
            <button type="button" class="btn btn-outline-soft" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      `;

                    const modal = new bootstrap.Modal(
                      document.getElementById("skillDetailsModal"),
                    );
                    modal.show();
                  });
                });
              }

              skillSearch.addEventListener("input", () => {
                navbarSearch.value = skillSearch.value;
                renderSkills();
              });

              navbarSearch.addEventListener("input", () => {
                skillSearch.value = navbarSearch.value;
                renderSkills();
              });

              categoryFilter.addEventListener("change", () => {
                activeCategory = "all";
                pillButtons.forEach((btn) => btn.classList.remove("active"));
                document
                  .querySelector('.pill-btn[data-category="all"]')
                  .classList.add("active");
                renderSkills();
              });

              sortFilter.addEventListener("change", renderSkills);

              pillButtons.forEach((button) => {
                button.addEventListener("click", () => {
                  pillButtons.forEach((btn) => btn.classList.remove("active"));
                  button.classList.add("active");

                  activeCategory = button.dataset.category;
                  categoryFilter.value =
                    activeCategory === "all" ? "all" : activeCategory;
                  renderSkills();
                });
              });

              renderSkills();

