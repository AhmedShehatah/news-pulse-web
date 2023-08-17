const URL = "https://studentsystem.onrender.com";
const id = localStorage.getItem("id");
const token = localStorage.getItem("token");

let theSame = false;
let username;
if (token !== null) {
  const user = JSON.parse(localStorage.getItem("user"));
  username = user.user_name;
}
getFullBlog(id);
function getFullBlog(id) {
  document.querySelector(".loading").style.setProperty("display", "block");

  axios
    .get(`${URL}/api/v1/news/${id}`, {
      timeout: 30000,
    })
    .then((response) => {
      const blog = response.data.data;
      document.querySelector(".blog-landing-page .container").innerHTML = "";
      let img = blog.image_url;
      if (img === "") img = "images/not-found.png";
      let time = blog.updatedAt;
      time = time.split("T");

      let content = `
        <div class="blog">
        <div class="full-blog" dir="auto">
            <img src="${img}" alt="">
            <div class="post-info">
              <h2 class="blog-title" id="${blog.publisher}">${blog.title}</h2>
              <p id="content">${blog.content}</p>
              <div class="post-publisher">
              <span>${blog.publisher}</span>
              <span>${time[0]}</span>
              </div>
            </div>
        </div>
        <div class="box-btn" >

        <button class="blog-btn" id="Edit" onclick="editBtnClicked()">Edit</button>

          <button class="blog-btn" id="Delete" onclick="deleteBtnClicked()">Delete</button>

        </div>
    </div>`;
      document.querySelector(".blog-landing-page .container").innerHTML +=
        content;
      localStorage.setItem("contentBlog", blog.content);
      localStorage.setItem("titleBlog", blog.title);
      localStorage.setItem("imgBlog", img);

      let box = "none";
      if (username === blog.publisher) {
        theSame = true;
        let box = "block";
      }
      if (!theSame) {
        document
          .querySelector(".box-btn")
          .style.setProperty("display", "none", "important");
      }
      document.querySelector(".loading").style.setProperty("display", "none");
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        // Request was canceled due to timeout
        alert("Request canceled due to timeout try again");
      } else alert(error.response.data);
      document.querySelector(".loading").style.setProperty("display", "none");
    });
}

function editBtnClicked() {
  location.href = "update.html";
}

function deleteBtnClicked() {
  document.getElementById("Delete").style.setProperty("pointer-events", "none");
  document.querySelector(".loading").style.setProperty("display", "block");
  const header = {
    Authorization: `Bearer ${token}`,
  };
  axios
    .delete(`${URL}/api/v1/news/${id}`, {
      headers: header,
      timeout: 30000,
    })
    .then((response) => {
      alert(response.data);
      document
        .getElementById("Delete")
        .style.setProperty("pointer-events", "all");
      document.querySelector(".loading").style.setProperty("display", "none");
      location.href = "index.html";
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        // Request was canceled due to timeout
        alert("Request canceled due to timeout try again");
      } else alert(error.response.data);
      document
        .getElementById("Delete")
        .style.setProperty("pointer-events", "all");
      document.querySelector(".loading").style.setProperty("display", "none");
      location.href = "index.html";
    });
}

function logoutButtonClicked() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  if (theSame) {
    document
      .querySelector(".box-btn")
      .style.setProperty("display", "none", "important");
  }
  location.href = "index.html";
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
