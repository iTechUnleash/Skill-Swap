const createProfileForm = document.getElementById("createProfileForm");
const schoolInput = document.getElementById("school");
const programInput = document.getElementById("program");

const teachInput = document.getElementById("teachInput");
const learnInput = document.getElementById("learnInput");

const teachTagsContainer = document.getElementById("teachTags");
const learnTagsContainer = document.getElementById("learnTags");

const profileFeedback = document.getElementById("profileFeedback");

let teachSkills = [];
let learnSkills = [];

function showProfileFeedback(message, type) {
  profileFeedback.className = `profile-feedback ${type}`;
  profileFeedback.textContent = message;
}

function renderTags(container, items, type) {
  container.innerHTML = "";

  items.forEach((item, index) => {
    const tag = document.createElement("span");
    tag.className = "skill-tag";
    tag.innerHTML = `
      ${item}
      <button type="button" class="remove-tag" data-type="${type}" data-index="${index}">&times;</button>
    `;
    container.appendChild(tag);
  });

  bindRemoveButtons();
}

function bindRemoveButtons() {
  const removeButtons = document.querySelectorAll(".remove-tag");

  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const type = this.dataset.type;
      const index = Number(this.dataset.index);

      if (type === "teach") {
        teachSkills.splice(index, 1);
        renderTags(teachTagsContainer, teachSkills, "teach");
      } else if (type === "learn") {
        learnSkills.splice(index, 1);
        renderTags(learnTagsContainer, learnSkills, "learn");
      }
    });
  });
}

function addTag(input, array, container, type) {
  const value = input.value.trim();

  if (!value) return;

  if (!array.includes(value)) {
    array.push(value);
    renderTags(container, array, type);
  }

  input.value = "";
}

teachInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addTag(teachInput, teachSkills, teachTagsContainer, "teach");
  }
});

learnInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addTag(learnInput, learnSkills, learnTagsContainer, "learn");
  }
});

createProfileForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const school = schoolInput.value.trim();
  const program = programInput.value.trim();

  if (!school || !program) {
    showProfileFeedback("Please fill in your school and program.", "error");
    return;
  }

  if (teachSkills.length === 0 || learnSkills.length === 0) {
    showProfileFeedback("Please add at least one skill to teach and one skill to learn.", "error");
    return;
  }

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
    showProfileFeedback("No logged-in user found. Please sign in first.", "error");
    return;
  }

  const updatedProfile = {
    ...loggedInUser,
    school,
    program,
    teachSkills,
    learnSkills,
    profileCompleted: true
  };

  localStorage.setItem("loggedInUser", JSON.stringify(updatedProfile));

  const users = JSON.parse(localStorage.getItem("skillSwapUsers")) || [];
  const updatedUsers = users.map((user) => {
    if (user.email === updatedProfile.email) {
      return updatedProfile;
    }
    return user;
  });

  localStorage.setItem("skillSwapUsers", JSON.stringify(updatedUsers));

  showProfileFeedback("Profile completed successfully. Redirecting...", "success");

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1200);
});