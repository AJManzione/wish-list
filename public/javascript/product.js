const name = document.querySelector("#product-name");
const link = document.querySelector("#product-url");
const price = document.querySelector("#product-price");
const category_id = document.querySelector("#categories"); // find the element within the dropdown
const addProductBtnEl = document.querySelector("#add-product-btn");

let urlSegments = document.location.toString().split("/");
let registry_id = urlSegments[urlSegments.length - 1];

addProductBtnEl.addEventListener("click", async (event) => {
  const response = await fetch("/api/product", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name.value,
      link: link.value ? link.value : null,
      price: price.value,
      category_id: category_id.value,
      registry_id: registry_id,
    }),
  });

  if (!response.ok) {
    alert((await response.json()).message);
    return;
  }

  document.location.replace("/registry/" + registry_id);
});
