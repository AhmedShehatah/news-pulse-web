const URL = "https://studentsystem.onrender.com";



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
    document.getElementById("addBtn").style.setProperty("display" , "block");
  } else {
    document
      .getElementById("logged-in-UI")
      .style.setProperty("display", "none");
    logOut.style.setProperty("display", "flex");
    document.getElementById("addBtn").style.setProperty("display" , "none");

  }
}
showUI();

