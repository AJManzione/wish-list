const logout = document.getElementById("logout-link");

var granimInstance = new Granim({
  element: "#canvas-basic",
  direction: "left-right",
  states: {
    "default-state": {
      gradients: [
        ["#ff9966", "#ff5e62"],
        ["#00F260", "#0575E6"],
        ["#e1eec3", "#f05053"],
      ],
    },
  },
});

if (logout) {
  logout.addEventListener("click", async (event) => {
    await fetch("/api/user/logout");
    document.location.replace("/");
  });
}

function redirectFunc() {
  document.location.replace("/dashboard")
}


document.querySelector('.click-img-1').addEventListener('click', redirectFunc)
document.querySelector('.click-img-2').addEventListener('click', redirectFunc)
document.querySelector('.click-img-3').addEventListener('click', redirectFunc)
document.querySelector('.click-img-4').addEventListener('click', redirectFunc)