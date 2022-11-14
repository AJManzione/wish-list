//handleFormSubmsision)
//whats the new value for all the keys
// fetch(/api/registry/id)
//console.log(window.location.href);

const regName = document.querySelector("#reg-name");
console.log(regName)
const description = document.querySelector("#desc");
const date = document.querySelector("#datepicker");
let urlSegments = document.location.toString().split("/");
let registry_id = urlSegments[urlSegments.length - 1];

async function editFormHandler(event) {
  const response = await fetch(`/api/registry/${registry_id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: regName.value,
      description: description.value,
      date: date.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace(`/registry/${registry_id}`);
  } else {
    alert(response.statusText);
  }
}

document
  .getElementById("edit-registry-btn")
  .addEventListener("click", editFormHandler);
