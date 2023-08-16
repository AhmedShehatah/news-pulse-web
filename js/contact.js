const URL = "https://studentsystem.onrender.com";
const signInButton = document.getElementById("sign-in-button");

function SubmitClicked() {
  const msg = document.getElementById("msg").value;
  const email = document.getElementById("email-input").value;
  const params = {
    email:email,
    report:msg
  }
  axios.post(`${URL}/api/v1/contact`, params)
  .then(response => {
    alert("sent successfully");
    signInButton.style.setProperty("pointer-events", "all");
    document.querySelector(".loading").style.setProperty("display", "none");
  }).catch(error => {
    alert("try again");
    signInButton.style.setProperty("pointer-events", "all");
    document.querySelector(".loading").style.setProperty("display", "none");
  });
}
function fillAllInputs() {
  const msg = document.getElementById("msg").value;
  const email = document.getElementById("email-input").value;
  if (msg === "") return false;
  if (email === "") return false;
  return true;
}

signInButton.addEventListener("click", (e) => {
  if (fillAllInputs()) {
    e.preventDefault();
    signInButton.style.setProperty("pointer-events", "none");
    document.querySelector(".loading").style.setProperty("display", "block");
    SubmitClicked();
  }
});
function logoutButtonClicked() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    showUI();
  }
function showUI() {
    const token = localStorage.getItem("token");
    const logOut = document.getElementById("logged-out-UI");
    const infoDiv = document.getElementById("info");
  
    if (token !== null) {
      const user = JSON.parse(localStorage.getItem("user"));
      const userName = user.user_name;
      infoDiv.innerHTML = "";
      let content = `
      <b>${userName[0].toUpperCase()}</b>
      <span>${userName}</span>
      `;
      infoDiv.innerHTML = content;
      document
        .getElementById("logged-in-UI")
        .style.setProperty("display", "flex");
      logOut.style.setProperty("display", "none");
      document.getElementById("sgn-in").style.setProperty("display", "none");
      document.getElementById("sgn-up").style.setProperty("display", "none");
    } else {
      document
        .getElementById("logged-in-UI")
        .style.setProperty("display", "none");
      logOut.style.setProperty("display", "flex");
      document.getElementById("sgn-in").style.setProperty("display", "block");
      document.getElementById("sgn-up").style.setProperty("display", "block");
    }
  }
  
  showUI();
