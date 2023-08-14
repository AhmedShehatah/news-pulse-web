const URL = "https://studentsystem.onrender.com";
getAllBlogs();
function getAllBlogs() {
  axios.get(`${URL}/api/v1/news`)
  .then(response => {
    const posts = response.data.data;
    posts.reverse();
    document.querySelector(".posts .container").innerHTML = "";
    for(let post of posts) {
      console.log(post.image_url)
      let img = post.image_url;
      if(img === "") img = "images/not-found.png";
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
      `
      document.querySelector(".posts .container").innerHTML += content;
    }
  }).catch(error => {
    console.log(error.response);
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
    document.getElementById("addBtn").style.setProperty("display" , "block");
    document.getElementById("sgn-in").style.setProperty("display" , "none");
    document.getElementById("sgn-up").style.setProperty("display" , "none");
  } else {
    document
      .getElementById("logged-in-UI")
      .style.setProperty("display", "none");
    logOut.style.setProperty("display", "flex");
    document.getElementById("addBtn").style.setProperty("display" , "none");
    document.getElementById("sgn-in").style.setProperty("display" , "block");
    document.getElementById("sgn-up").style.setProperty("display" , "block");
  }
}
document.querySelector(".blog-title").addEventListener("click" , e => {
  console.log(e.target)
  alert("clikced")
})

showUI();

