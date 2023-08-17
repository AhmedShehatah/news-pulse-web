
const URL = "https://studentsystem.onrender.com";
const token = localStorage.getItem("token");
if (token !== null) {
  userBlogs();
} else {
  getAllBlogs();
}
function userBlogs() {
  document.querySelector(".loading").style.setProperty("display", "block");
  const header = {
    Authorization: `Bearer ${token}`,
  };
  axios
    .get(`${URL}/api/v1/news`, {
      headers: header,
    })
    .then((response) => {
      const posts = response.data.data;
      posts.reverse();
      if(posts.length !== 0) {

        document.querySelector(".posts .container").innerHTML = "";
        for (let post of posts) {
          let img = post.image_url;
          if (img === "") img = "images/not-found.png";
          let time = post.updatedAt;
          time = time.split("T");
          let content = ` 
        <div class="post" dir="auto">
          <img src="${img}" alt="image not found">
          <div class="post-info">
          <a href="blog.html"><h2 id="${post._id}" class="blog-title">${post.title}</h2></a>
            <p>${post.content}...</p>
            <div class="post-publisher">
              <span>${time[0]}</span>
              <span>${post.publisher}</span>
            </div>
          </div>
      </div>
        `;
          document.querySelector(".posts .container").innerHTML += content;
        }
      } else {
        document.querySelector(".posts .container").innerHTML = `<h2 style="text-align: center; margin-bottom:60px; color:#a9a6a6">No Current News</h2>`;
      }
      document.querySelector(".loading").style.setProperty("display", "none");

    })
    .catch((error) => {
      alert(error.response.data)
      document.querySelector(".loading").style.setProperty("display", "none");

    });
}
function getAllBlogs() {
  document.querySelector(".loading").style.setProperty("display", "block");
  axios
    .get(`${URL}/api/v1/news`, {
      timeout:30000
    })
    .then((response) => {
      const posts = response.data.data;
      posts.reverse();
      if(posts.length !== 0) {
        document.querySelector(".posts .container").innerHTML = "";
        for (let post of posts) {
          let img = post.image_url;
          if (img === "") img = "images/not-found.png";
          let time = post.updatedAt;
          time = time.split("T");
          let content = ` 
        <div class="post" dir="auto">
          <img src="${img}" alt="image not found">
          <div class="post-info">
          <a href="blog.html"><h2 id="${post._id}" class="blog-title">${post.title}</h2></a>
            <p>${post.content}...</p>
            <div class="post-publisher">
              <span>${time[0]}</span>
              <span>${post.publisher}</span>
            </div>
          </div>
      </div>
        `;
          document.querySelector(".posts .container").innerHTML += content;
        }
      } else {
        document.querySelector(".posts .container").innerHTML = `<h2 style="text-align: center; margin-bottom:60px; color:#a9a6a6">No Current News</h2>`;

      }
      document.querySelector(".loading").style.setProperty("display", "none");

    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        // Request was canceled due to timeout
        alert("Request canceled due to timeout try again");
      }else 
        alert(error.response.data);
      document.querySelector(".loading").style.setProperty("display", "none");

    });
}
function logoutButtonClicked() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  showUI();
  getAllBlogs();
}

function addBtnClicked() {
  location.href = "add.html";
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
    document.getElementById("addBtn").style.setProperty("display", "block");
    document.getElementById("sgn-in").style.setProperty("display", "none");
    document.getElementById("sgn-up").style.setProperty("display", "none");
  } else {
    document
      .getElementById("logged-in-UI")
      .style.setProperty("display", "none");
    logOut.style.setProperty("display", "flex");
    document.getElementById("addBtn").style.setProperty("display", "none");
    document.getElementById("sgn-in").style.setProperty("display", "block");
    document.getElementById("sgn-up").style.setProperty("display", "block");
  }
}

showUI();
