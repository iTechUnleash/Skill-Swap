const requestedSkillTitle = document.getElementById("requestedSkillTitle");
const requestedRecipient = document.getElementById("requestedRecipient");
const previewSkill = document.getElementById("previewSkill");
const previewTutor = document.getElementById("previewTutor");
const previewOffer = document.getElementById("previewOffer");
const previewMessage = document.getElementById("previewMessage");

const offerSkill = document.getElementById("offerSkill");
const message = document.getElementById("message");
const requestSkillForm = document.getElementById("requestSkillForm");
const formFeedback = document.getElementById("formFeedback");

// Get values from URL
const params = new URLSearchParams(window.location.search);
const skill = params.get("skill");
const tutor = params.get("tutor");

// Fill requested skill and tutor dynamically
if (skill) {
  requestedSkillTitle.textContent = skill;
  previewSkill.textContent = skill;
}

if (tutor) {
  requestedRecipient.textContent = `Recipient: ${tutor}`;
  previewTutor.textContent = tutor;
}

// Live preview update
offerSkill.addEventListener("change", function () {
  previewOffer.textContent = this.value || "Not selected";
});

message.addEventListener("input", function () {
  const trimmedMessage = this.value.trim();
  previewMessage.textContent = trimmedMessage || "No message yet.";
});

// Form submit
requestSkillForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const selectedOffer = offerSkill.value.trim();
  const userMessage = message.value.trim();

  if (!selectedOffer || !userMessage) {
    formFeedback.className = "form-feedback error";
    formFeedback.textContent = "Please select a skill to offer and enter your message.";
    return;
  }

  const newRequest = {
    id: Date.now(),
    requestedSkill: requestedSkillTitle.textContent,
    recipient: previewTutor.textContent,
    offeredSkill: selectedOffer,
    message: userMessage,
    status: "Pending",
    createdAt: new Date().toLocaleString()
  };

  const existingRequests = JSON.parse(localStorage.getItem("skillRequests")) || [];
  existingRequests.push(newRequest);
  localStorage.setItem("skillRequests", JSON.stringify(existingRequests));

  formFeedback.className = "form-feedback success";
  formFeedback.textContent = "Skill request sent successfully.";

  requestSkillForm.reset();
  previewOffer.textContent = "Not selected";
  previewMessage.textContent = "No message yet.";

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1200);
});