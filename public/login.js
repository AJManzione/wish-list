const loginFormHandler = async function(event) {
    event.preventDefault();
  
    const usernameEl = document.querySelector("#username-login")；
    const passwordEl = document.querySelector("#password-login");

    const response = await fetch("/api/user/login", {
      method: "post",
      body: JSON.stringify({
        username: usernameEl.value,
        password: passwordEl.value
      }),
      headers: { "Content-Type": "application/json" }
    })
     
  };
  
  document.querySelector("#login-form").addEventListener("submit", loginFormHandler);