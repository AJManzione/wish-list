const name = document.querySelector("#product-name");
const link = document.querySelector("#product-url");
const price = document.querySelector("#product-price");
const category_id = document.querySelector("#categories"); // find the element within the dropdown
const addProductBtnEl = document.querySelector("#add-product-btn");
const editButtons = document.querySelectorAll("#product-edit");
const showAddProductModal = document.getElementById("show-add-product-modal");
const modalTitle = document.getElementById("product-modal-title");
const categories = document.getElementById("categories");
const deleteButtons = document.querySelectorAll("#product-delete");
const confirmButton = document.getElementById("product-delete-btn");

let urlSegments = document.location.toString().split("/");
let registry_id = urlSegments[urlSegments.length - 1];

editButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    setShowEditModal(button.getAttribute("data-id"));
  });
});

deleteButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    confirmButton.setAttribute("data-id", button.getAttribute("data-id"));
  });
});

addProductBtnEl.addEventListener("click", async (event) => {
  let id = addProductBtnEl.getAttribute("data-id");
  id ? await makeRequest("PUT", id) : await makeRequest("POST");
});

showAddProductModal.addEventListener("click", showAddModal);

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

function showAddModal() {
  addProductBtnEl.setAttribute("data-id", "");
  addProductBtnEl.textContent = "Add Product";
  modalTitle.textContent = "Add a Product";

  name.value = "";
  link.value = "";
  price.value = "";
  categories.selectedIndex = 0;
}

function setShowEditModal(itemId) {
  addProductBtnEl.setAttribute("data-id", itemId);
  addProductBtnEl.textContent = "Save Changes";
  modalTitle.textContent = "Edit a Product";

  const currentItemName = document.getElementById("product-name-" + itemId);
  name.value = currentItemName.textContent;

  const currentItemLink = document.getElementById("product-link-" + itemId);
  link.value = currentItemLink ? currentItemLink.text : "";

  const currentItemPrice = document.getElementById("product-price-" + itemId);
  price.value = currentItemPrice.textContent;

  const currentItemCategory = document.getElementById(
    "product-category-" + itemId
  ).textContent;

  for (let i = 0; i < categories.options.length; i++) {
    if (categories.options[i].text == currentItemCategory) {
      categories.selectedIndex = i;
      break;
    }
  }
}

async function makeRequest(type, id) {
  if (!name.value) {
    alert("Please enter a name");
    return;
  }

  const response = await fetch("/api/product" + (id ? "/" + id : ""), {
    method: type,
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
}
