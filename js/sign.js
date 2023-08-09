const URL = "https://studentsystem.onrender.com";
// sign request

function signInSubmitClicked() {
  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  console.log(email, password);

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
      document.querySelector(".ring").style.setProperty("display", "none");
      document.getElementById("email-input").disabled = false;
      document.getElementById("password-input").disabled = false;
    })
    .catch((error) => {
      // TODO : Handle error
      alert(error.response.data.message);
      signInButton.style.setProperty("pointer-events", "all");
      document.querySelector(".ring").style.setProperty("display", "none");
      document.getElementById("email-input").disabled = false;
      document.getElementById("password-input").disabled = false;
    });
}

function checkLogIn() {
  const token = localStorage.getItem("token");
  if (token !== null) {
    location.href = "index.html";
  }
}
const signInButton = document.getElementById("sign-in-button");
signInButton.addEventListener("click", (e) => {
  e.preventDefault();
  signInButton.style.setProperty("pointer-events", "none");
  document.querySelector(".ring").style.setProperty("display", "block");
  document.getElementById("email-input").disabled = true;
  document.getElementById("password-input").disabled = true;
  signInSubmitClicked();
});

checkLogIn();

