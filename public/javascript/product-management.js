const editButtons = document.querySelectorAll("#product-edit");
const deleteButtons = document.querySelectorAll("#product-delete");
const confirmButton = document.getElementById("product-delete-btn");

editButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    console.log(button.getAttribute("data-id"));
  });
});

deleteButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    confirmButton.setAttribute("data-id", button.getAttribute("data-id"));
  });
});

confirmButton.addEventListener("click", async (event) => {
  console.log(confirmButton.getAttribute("data-id"));
  let response = await fetch(
    "/api/product/" + confirmButton.getAttribute("data-id"),
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    alert((await response.json()).message);
    return;
  }

  document.location.reload();
});
