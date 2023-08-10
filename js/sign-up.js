const URL = "https://studentsystem.onrender.com";
const signUpSubmitBtn = document.getElementById("sign-up-button");

function signUpSubmitClicked() {
  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  const username = document.getElementById("user-input").value;

  const params = {
    user_name: username,
    email: email,
    password: password,
  };
  axios
    .post(`${URL}/api/v1/auth/signup/`, params)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      alert("sign up successfully");
      // TODO: Handle successfully
      location.href = "index.html";
      signUpSubmitBtn.style.setProperty("pointer-events", "all");
      document.querySelector(".loading").style.setProperty("display", "none");
    })
    .catch((error) => {
      alert(error.response.data.message);
      signUpSubmitBtn.style.setProperty("pointer-events", "all");
      document.querySelector(".loading").style.setProperty("display", "none");
    });
}
function fillAllInputs() {
  let count = 0;
  const email = document.getElementById("email-input").value;
  if (email !== "") count++;
  const password = document.getElementById("password-input").value;
  if (password !== "") count++;
  const username = document.getElementById("user-input").value;
  if (username !== "") count++;
  return count === 3;
}
signUpSubmitBtn.addEventListener("click", (e) => {
  if (fillAllInputs()) {
    e.preventDefault();
    signUpSubmitBtn.style.setProperty("pointer-events", "none");
    document.querySelector(".loading").style.setProperty("display", "block");
    signUpSubmitClicked();
  }
});
function checkLogIn() {
  const token = localStorage.getItem("token");
  if (token !== null) {
    location.href = "index.html";
  }
}
checkLogIn();
