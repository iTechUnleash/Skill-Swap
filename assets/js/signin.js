const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginFeedback = document.getElementById("loginFeedback");

function showLoginFeedback(message, type) {
  loginFeedback.className = `auth-feedback ${type}`;
  loginFeedback.textContent = message;
}

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const emailValue = loginEmail.value.trim();
  const passwordValue = loginPassword.value.trim();

  if (!emailValue || !passwordValue) {
    showLoginFeedback("Please fill in all fields.", "error");
    return;
  }

  const users = JSON.parse(localStorage.getItem("skillSwapUsers")) || [];

  const matchedUser = users.find((user) => {
    return user.email === emailValue && user.password === passwordValue;
  });

  if (!matchedUser) {
    showLoginFeedback("Invalid email or password.", "error");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

  showLoginFeedback("Login successful. Redirecting...", "success");

  loginForm.reset();

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1200);
});