const createNewRegistry = async function (event) {
    event.preventDefault();
  
    const regName = document.querySelector("#reg-name");
    const selectedDate = document.querySelector("#datepicker");

    if (!regName && !selectedDate) {
      alert("Please enter the fields to create a registry");
      return;
    }
    const response = await fetch("/api/registry", {
      method: "POST",
      body: JSON.stringify({
        name: regName.value,
        date: selectedDate.value,
      }),
      headers: { "Content-Type": "application/json" },
    });
  
    
    if (!response.ok) {
      alert((await response.json()).message);
      return;
    }
/* document.location.replace("/registry/:id"); */
  };
  
  document
    .querySelector("#create-registry-btn")
    .addEventListener("click", createNewRegistry);
  