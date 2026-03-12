 const signupForm = document.getElementById("signupForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const signupFeedback = document.getElementById("signupFeedback");

function showFeedback(message, type) {
  signupFeedback.className = `auth-feedback ${type}`;
  signupFeedback.textContent = message;
}

signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const nameValue = fullName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmValue = confirmPassword.value.trim();

  if (!nameValue || !emailValue || !passwordValue || !confirmValue) {
    showFeedback("Please fill in all fields.", "error");
    return;
  }

  if (!emailValue.includes("@") || !emailValue.includes(".")) {
    showFeedback("Please enter a valid email address.", "error");
    return;
  }

  if (passwordValue.length < 6) {
    showFeedback("Password must be at least 6 characters long.", "error");
    return;
  }

  if (passwordValue !== confirmValue) {
    showFeedback("Passwords do not match.", "error");
    return;
  }

  const users = JSON.parse(localStorage.getItem("skillSwapUsers")) || [];

  const existingUser = users.find((user) => user.email === emailValue);

  if (existingUser) {
    showFeedback("An account with this email already exists.", "error");
    return;
  }

  const newUser = {
    id: Date.now(),
    name: nameValue,
    email: emailValue,
    password: passwordValue
  };

  users.push(newUser);
  localStorage.setItem("skillSwapUsers", JSON.stringify(users));

  showFeedback("Account created successfully. Redirecting...", "success");

  signupForm.reset();

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1200);
});