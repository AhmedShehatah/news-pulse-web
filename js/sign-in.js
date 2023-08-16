const URL = "https://studentsystem.onrender.com";
// sign request
const signInButton = document.getElementById("sign-in-button");

function signInSubmitClicked() {
  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  const params = {
    email: email,
    password: password,
  };
  axios
    .post(`${URL}/api/v1/auth/login/`, params)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      alert("logged in successfully");
      // TODO: Handle successfully
      location.href = "index.html";
      signInButton.style.setProperty("pointer-events", "all");
      document.querySelector(".loading").style.setProperty("display", "none");
    })
    .catch((error) => {
      // TODO : Handle error
      alert(error.response.data.message);
      signInButton.style.setProperty("pointer-events", "all");
      document.querySelector(".loading").style.setProperty("display", "none");
    });
}

function fillAllInputs() {
  let count = 0;
  const email = document.getElementById("email-input").value;
  if (email !== "") count++;
  const password = document.getElementById("password-input").value;
  if (password !== "") count++;
  return count === 2;
}
signInButton.addEventListener("click", (e) => {
  if (fillAllInputs()) {
    e.preventDefault();
    signInButton.style.setProperty("pointer-events", "none");
    document.querySelector(".loading").style.setProperty("display", "block");
    signInSubmitClicked();
  }
});

function checkLogIn() {
  const token = localStorage.getItem("token");
  if (token !== null) {
    location.href = "index.html";
  }
}
checkLogIn();
