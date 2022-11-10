const loginFormHandler = async function (event) {
  event.preventDefault();

  const usernameEl = document.querySelector("#username-login");
  const passwordEl = document.querySelector("#password-login");

  if (passwordEl.value.length < 8) {
    alert("Password needs to be at least 8 characters long.");
    return;
  }

  const response = await fetch("/api/user/login", {
    method: "post",
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    alert((await response.json()).message);
    return;
  }

  document.location.replace("/dashboard");
};

document
  .querySelector("#login-btn")
  .addEventListener("click", loginFormHandler);
