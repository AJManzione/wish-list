const logout = document.getElementById("logout-link");
if (logout) {
  logout.addEventListener("click", async (event) => {
    await fetch("/api/user/logout");
    document.location.replace("/");
  });
}
