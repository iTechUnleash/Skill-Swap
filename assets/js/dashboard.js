const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
let skillRequests = JSON.parse(localStorage.getItem("skillRequests")) || [];

const sidebarUserName = document.getElementById("sidebarUserName");
const sidebarUserRole = document.getElementById("sidebarUserRole");
const topbarAvatar = document.getElementById("topbarAvatar");
const sidebarProfileImage = document.getElementById("sidebarProfileImage");
const swapCount = document.getElementById("swapCount");
const ratingCount = document.getElementById("ratingCount");
const requestsBadge = document.getElementById("requestsBadge");

const incomingRequestsContainer = document.getElementById("incomingRequestsContainer");
const upcomingSessionsContainer = document.getElementById("upcomingSessionsContainer");

function saveRequests() {
  localStorage.setItem("skillRequests", JSON.stringify(skillRequests));
}

function redirectIfNotLoggedIn() {
  if (!loggedInUser) {
    window.location.href = "login.html";
  }
}

function getUserAvatar(name) {
  const avatarMap = {
    "Sarah": "assets/images/avatar-sarah.avif",
    "David": "assets/images/avatar-david.jpg",
    "Lucy": "assets/images/avatar-lucy.jpg",
    "Mariam": "assets/images/avatar-mariam.avif",
    "Rayan": "assets/images/avatar-rayan.avif",
    "Sandra": "assets/images/avatar-sandra.avif",
    "Kelvin": "assets/images/avatar-kelvin.avif"
  };

  const firstName = name ? name.split(" ")[0] : "Sarah";
  return avatarMap[firstName] || "assets/images/avatar-sarah.avif";
}

function loadUserProfile() {
  const userName = loggedInUser.name || "Sarah Jenkins";
  const userProgram = loggedInUser.program || "UI/UX Designer & Frontend Dev";
  const requestCount = skillRequests.length;

  sidebarUserName.textContent = userName;
  sidebarUserRole.textContent = userProgram;

  const avatar = getUserAvatar(userName);
  topbarAvatar.src = avatar;
  sidebarProfileImage.src = avatar;

  swapCount.textContent = requestCount;
  ratingCount.textContent = "4.9";

  const pendingCount = skillRequests.filter(
    (req) => (req.status || "").toLowerCase() === "pending"
  ).length;

  requestsBadge.textContent = pendingCount;
}

function createIncomingRequestCard(request) {
  const requestId = request.id;
  const tutorName = request.recipient || "David Chen";
  const requestedSkill = request.requestedSkill || "Python Programming";
  const offeredSkill = request.offeredSkill || "UI/UX Design";
  const message = request.message || "Wants to swap skills";
  const avatar = getUserAvatar(tutorName);

  return `
    <div class="request-card" data-id="${requestId}">
      <div class="request-left">
        <img src="${avatar}" alt="${tutorName}" class="request-avatar">

        <div class="request-info">
          <h5>${tutorName}</h5>
          <p>${message}</p>

          <div class="skill-pills">
            <span class="skill-pill skill-pill-light">${requestedSkill}</span>
            <span class="skill-pill skill-pill-teal">${offeredSkill}</span>
          </div>
        </div>
      </div>

      <div class="request-actions">
        <button class="btn-decline" onclick="updateRequestStatus(${requestId}, 'Declined')">Decline</button>
        <button class="btn-accept" onclick="updateRequestStatus(${requestId}, 'Accepted')">Accept Swap</button>
      </div>
    </div>
  `;
}

function renderIncomingRequests() {
  const pendingRequests = skillRequests.filter(
    (request) => (request.status || "").toLowerCase() === "pending"
  );

  if (pendingRequests.length === 0) {
    incomingRequestsContainer.innerHTML = `
      <div class="empty-box">
        <i class="bi bi-inbox"></i>
        <h5>No incoming requests</h5>
        <p class="mb-0">New swap requests will appear here.</p>
      </div>
    `;
    return;
  }

  incomingRequestsContainer.innerHTML = pendingRequests
    .map((request) => createIncomingRequestCard(request))
    .join("");
}

function createSessionCard(request, index) {
  const tutorName = request.recipient || "Alex Rivera";
  const requestedSkill = request.requestedSkill || "Data Science with R";
  const avatar = getUserAvatar(tutorName);

  const times = [
    "Tomorrow, 2:00 PM",
    "Oct 12, 11:00 AM",
    "Friday, 4:30 PM",
    "Sunday, 9:00 AM"
  ];

  const sessionTime = times[index % times.length];
  const isConfirmed = index % 2 === 0;

  return `
    <div class="session-card">
      <div class="session-top">
        <span class="status-tag ${isConfirmed ? "status-confirmed" : "status-pending"}">
          <i class="bi bi-circle-fill"></i>
          ${isConfirmed ? "Confirmed" : "Pending"}
        </span>

        <span class="session-time">
          <i class="bi bi-clock"></i>
          ${sessionTime}
        </span>
      </div>

      <div class="session-user">
        <img src="${avatar}" alt="${tutorName}">
        <div>
          <h5>${tutorName}</h5>
          <p>${requestedSkill}</p>
        </div>
      </div>

      ${
        isConfirmed
          ? `<button class="session-action-btn"><i class="bi bi-camera-video me-2"></i>Join Video Call</button>`
          : `<button class="session-action-btn disabled"><i class="bi bi-camera-video-off me-2"></i>Not Available Yet</button>`
      }
    </div>
  `;
}

function renderUpcomingSessions() {
  const acceptedRequests = skillRequests.filter(
    (request) => (request.status || "").toLowerCase() === "accepted"
  );

  if (acceptedRequests.length === 0) {
    upcomingSessionsContainer.innerHTML = `
      <div class="empty-box">
        <i class="bi bi-calendar-event"></i>
        <h5>No upcoming sessions</h5>
        <p class="mb-0">Accepted swaps will appear here as sessions.</p>
      </div>
    `;
    return;
  }

  upcomingSessionsContainer.innerHTML = acceptedRequests
    .map((request, index) => createSessionCard(request, index))
    .join("");
}

window.updateRequestStatus = function (id, status) {
  skillRequests = skillRequests.map((request) => {
    if (request.id === id) {
      return { ...request, status };
    }
    return request;
  });

  saveRequests();
  loadUserProfile();
  renderIncomingRequests();
  renderUpcomingSessions();
};

function seedDemoRequestsIfEmpty() {
  if (skillRequests.length > 0) return;

  skillRequests = [
    {
      id: 1,
      requestedSkill: "Python",
      recipient: "David Chen",
      offeredSkill: "UI/UX Design",
      message: "Wants to swap Python Programming for UI/UX Design",
      status: "Pending",
      createdAt: new Date().toLocaleString()
    },
    {
      id: 2,
      requestedSkill: "Spanish",
      recipient: "Elena Rodriguez",
      offeredSkill: "Figma Prototyping",
      message: "Wants to swap Spanish Conversation for Figma Prototyping",
      status: "Pending",
      createdAt: new Date().toLocaleString()
    }
  ];

  saveRequests();
}

function initDashboard() {
  redirectIfNotLoggedIn();
  seedDemoRequestsIfEmpty();
  loadUserProfile();
  renderIncomingRequests();
  renderUpcomingSessions();
}

initDashboard();