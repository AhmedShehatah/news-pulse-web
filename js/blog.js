const URL = "https://studentsystem.onrender.com";
const id = localStorage.getItem("id");
const token = localStorage.getItem("token");
let theSame = false;
let username;
if (token !== null) {
  const user = JSON.parse(localStorage.getItem("user"));
  username = user.user_name;
}
console.log(id);
getFullBlog(id);
function getFullBlog(id) {
  axios
    .get(`${URL}/api/v1/news/${id}`)
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
              <p>${blog.content}</p>
              <div class="post-publisher">
                <span>${time[0]}</span>
                <span>${blog.publisher}</span>
              </div>
            </div>
        </div>
        <div class="box-btn" >
          <button class="blog-btn" id="Edit">Edit</button>
          <button class="blog-btn" id="Delete">Delete</button>
        </div>
    </div>`
      document.querySelector(".blog-landing-page .container").innerHTML +=
        content;
        let box = "none";
        if(username === blog.publisher) {
          theSame = true;
          let box = "block";
        }
        console.log(username , blog.publisher , theSame)
        if(!theSame) {
          document.querySelector(".box-btn").style.setProperty("display" , "none" , "important");
        }
    })
    .catch((error) => {
      console.log(error.response);
    });
}

function logoutButtonClicked() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  if(theSame) {
    document.querySelector(".box-btn").style.setProperty("display" , "none" , "important");
  }
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
