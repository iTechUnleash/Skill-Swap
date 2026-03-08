const popularSkills = [
  {
    title: "UI/UX Design",
    description: "Master Figma, user research, and prototyping with professional designers.",
    user: "Sarah Jenkins",
    image: "assets/images/skill-1.jpg"
  },
  {
    title: "Full-Stack Dev",
    description: "Learn React, Node.js, and database architecture from industry experts.",
    user: "David Chen",
    image: "assets/images/skill-2.jpg"
  },
  {
    title: "Gourmet Cooking",
    description: "Trade your tech skills for world-class culinary techniques and recipes.",
    user: "Elena Rodriguez",
    image: "assets/images/skill-3.jpg"
  },
  {
    title: "Photography",
    description: "Learn lighting, composition, and post-processing from visual artists.",
    user: "Oliver Twist",
    image: "assets/images/skill-4.jpg"
  }
];

const popularSkillsContainer = document.getElementById("popularSkills");

if (popularSkillsContainer) {
  popularSkills.forEach((skill) => {
    popularSkillsContainer.innerHTML += `
      <div class="col-md-6 col-lg-3">
        <div class="skill-card h-100">
          <img src="${skill.image}" alt="${skill.title}">
          <div class="skill-card-body">
            <h5>${skill.title}</h5>
            <p>${skill.description}</p>
            <div class="skill-user mb-3">${skill.user}</div>
            <a href="request-skill.html" class="btn btn-soft w-100">Request Skill</a>
          </div>
        </div>
      </div>
    `;
  });
}

