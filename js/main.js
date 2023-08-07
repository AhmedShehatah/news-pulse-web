const URL = "https://studentsystem.onrender.com";
const menuIcon = document.getElementById("menu-icon");
const arrowIcon = document.getElementById("arrow");
menuIcon.addEventListener("click", () => {
  const menuBox = document.getElementById("menu");
  const navMenu = document.getElementById("left");
  const overlay = document.getElementById("overlay");
  navMenu.style.visibility = "hidden";
  menuBox.style.left = 0;
  overlay.style.display = "block";
});
arrowIcon.addEventListener("click", () => {
  const menuBox = document.getElementById("menu");
  const navMenu = document.getElementById("left");
  const overlay = document.getElementById("overlay");
  navMenu.style.visibility = "visible";
  menuBox.style.left = `-300px`;
  overlay.style.display = "none";
});
document.addEventListener("click", (e) => {
  if (e.target.id == "overlay") {
    const menuBox = document.getElementById("menu");
    const navMenu = document.getElementById("left");
    const overlay = document.getElementById("overlay");
    navMenu.style.visibility = "visible";
    menuBox.style.left = `-300px`;
    overlay.style.display = "none";
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
  } else {
    document
      .getElementById("logged-in-UI")
      .style.setProperty("display", "none");
    logOut.style.setProperty("display", "flex");
  }
}
showUI();

