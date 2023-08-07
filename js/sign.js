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
      // TODO: showUI
      location.href = "home.html";
    })
    .catch((error) => {
        // TODO : Handle error
      console.log(error.response);
    });
}

document.getElementById("sign-in-button").addEventListener("click", (e) => {
    e.preventDefault();
    signInSubmitClicked();
  });