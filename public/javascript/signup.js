const signUpFormHandler = async function (event) {
  event.preventDefault();

  const firstNameEl = document.querySelector("#firstname-signup");
  const lastNameEl = document.querySelector("#lastname-signup");
  const usernameEl = document.querySelector("#username-signup");
  const passwordEl = document.querySelector("#password-signup");

  if (passwordEl.value.length < 8) {
    alert("Password needs to be at least 8 characters long.");
    return;
  }

  const response = await fetch("/api/user/signup", {
    method: "POST",
    body: JSON.stringify({
      first_name: firstNameEl.value,
      last_name: lastNameEl.value,
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
  .querySelector("#signup-btn")
  .addEventListener("click", signUpFormHandler);
