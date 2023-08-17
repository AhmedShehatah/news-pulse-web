const URL = "https://studentsystem.onrender.com";

// Get the input element and preview container
const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");
const saveBlogBtn = document.getElementById("save");
const id = localStorage.getItem("id");
document.getElementById("tblog").value = localStorage.getItem("titleBlog");
document.getElementById("cblog").value = localStorage.getItem("contentBlog");
let file = "";
// Add an event listener to the input for when a file is selected
imageInput.addEventListener("change", function (event) {
  // Get the selected file
  file = event.target.files[0];

  // Check if a file is selected
  if (file) {
    // Create a new FileReader instance
    const reader = new FileReader();

    // Set the onload event handler
    reader.onload = function (e) {
      // Create a new image element
      const img = document.createElement("img");
      img.src = e.target.result;
      document
        .getElementById("upload-text")
        .style.setProperty("display", "none", "important");

      // Create a delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "x";
      deleteButton.addEventListener("click", function () {
        // Remove the image preview
        imagePreview.innerHTML = "";
        // Reset the input value to clear the selected file
        imageInput.value = "";
        document
          .getElementById("upload-text")
          .style.setProperty("display", "block", "important");
        file = "";
      });

      // Append the image and delete button to the preview container
      imagePreview.innerHTML = "";
      imagePreview.appendChild(img);
      imagePreview.appendChild(deleteButton);
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
  }
});

function updateBlog(img) {
  const title = document.getElementById("tblog").value;
  const content = document.getElementById("cblog").value;
  const token = localStorage.getItem("token");
  const params = {
    title: title,
    image_url: img,
    content: content,
  };
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  axios
    .patch(`${URL}/api/v1/news/${id}`, params, {
      headers: headers,
      timeout: 50000,
    })
    .then((response) => {
      alert("updated successfully");
      saveBlogBtn.style.setProperty("pointer-events", "all");
      document.querySelector(".loading").style.setProperty("display", "none");
      location.href = "index.html";
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        // Request was canceled due to timeout
        alert("Request canceled due to timeout try again");
      } else alert("try again");
      saveBlogBtn.style.setProperty("pointer-events", "all");
      document.querySelector(".loading").style.setProperty("display", "none");
    });
}

function saveBtnClicked() {
  let formData = new FormData();
  formData.append("image", file);
  const headers = {
    "Content-Type": "multipart/form-data;",
  };
  axios
    .post(`${URL}/uploads/`, formData, {
      headers: headers,
      timeout: 50000,
    })
    .then((response) => {
      updateBlog(response.data.data.src);
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        // Request was canceled due to timeout
        alert("Request canceled due to timeout try again");
      } else alert("try again");
    });
}

saveBlogBtn.addEventListener("click", (e) => {
  if (fillAllInputs()) {
    e.preventDefault();
    saveBlogBtn.style.setProperty("pointer-events", "none");
    document
      .querySelector(".loading")
      .style.setProperty("display", "block", "important");
    saveBtnClicked();
  } else {
    alert("fill all inputs");
    e.preventDefault();
  }
});
function logoutButtonClicked() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  location.href = "index.html";
  showUI();
}
function fillAllInputs() {
  const title = document.getElementById("tblog").value;
  const content = document.getElementById("cblog").value;
  if (title === "") return false;
  if (content === "") return false;
  if (file === "") return false;
  return true;
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
