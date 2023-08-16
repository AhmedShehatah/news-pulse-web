const URL = "https://studentsystem.onrender.com";
getAbout()

function getAbout() {
    document.querySelector(".loading").style.setProperty("display", "block");

    axios.get(`${URL}/api/v1/about-us`)
    .then(response => {
        const about = response.data.data[0];
        let content = `
        <div class="about-box">
                <p>${about.content}</p>
                    <img src="${about.image_url}" alt="">
            </div>
        `
        document.querySelector(".container .about").innerHTML += content
        document.querySelector(".loading").style.setProperty("display", "none");

    }).catch(error => {
        document.querySelector(".loading").style.setProperty("display", "none");
    })
}



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