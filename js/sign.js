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
      location.href = "home.html";
      signInButton.style.setProperty("pointer-events" , "all");
      signInButton.classList.remove("focus");

    })
    .catch((error) => {
      // TODO : Handle error
      alert(error.response.data.message)
      signInButton.style.setProperty("pointer-events" , "all")
      signInButton.classList.remove("focus");

    });
}

function checkLogIn() {
  const token = localStorage.getItem("token");
  if(token !== null) {
    location.href = "home.html";
  }
}
const signInButton = document.getElementById("sign-in-button")
signInButton.addEventListener("click", (e) => {
  e.preventDefault();
  signInButton.style.setProperty("pointer-events" , "none");
  signInButton.classList.add("focus");
  signInSubmitClicked();
});

checkLogIn();