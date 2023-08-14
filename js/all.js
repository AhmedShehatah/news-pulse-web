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
  } else {
    if(e.target.className == "blog-title") {
      localStorage.setItem("id" , e.target.id);
    }
    
  }
});




