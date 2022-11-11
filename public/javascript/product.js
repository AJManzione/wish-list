/* add product */
const addProductFormEl = document.querySelector("#addProduct");

const addProductToRegistry = async (event) => {
  event.preventDefault();

  /* get product details - name, url, price, category_id, registry_id */
  const name = document.querySelector("#productName").value;
  const link = document.querySelector("#productUrl").value;
  const price = document.querySelector("#productPrice").value;
  const category_id = document.querySelector("#productCategory").val(); // find the element within the dropdown
  const registry_id = document.querySelector("#productRegistry").value; // is this the registry id or name ? 

  /* send /api/product POST method to add product to registry */
  const response = await fetch("/api/product", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify ({
      name: name,
      link: link,
      price: price,
      category_id: category_id,
      registry_id: registry_id
    })
  });

  let responseData = await response.json();
  if(!response.ok){
    alert(responseData.message);
  }

  document.location.replace("/registry/" + registry_id);

}
addProductFormEl.addEventListener('submit', addProductToRegistry);

/* update product */
const updateProductFormEl = document.querySelector("#updateProduct");

const updateProductInRegistry = async () => {
  event.preventDefault();

  /* get product details - product_id, name, url, price */
  /* category_id and registry_id */

  const product_id = document.querySelector("#productId").value;
  const name = document.querySelector("#productName").value;
  const link = document.querySelector("#productUrl").value;
  const price = document.querySelector("#productPrice").value;
  const category_id = document.querySelector("#productCategory").val(); // find the element within the dropdown
  const registry_id = document.querySelector("#productRegistry").value; // is this the registry id or name ? 

  /* send /api/product/:id PUT method */
  const response = await fetch(`/api/product/${product_id}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify ({
      id: product_id,
      name: name,
      link: link,
      price: price,
      category_id: category_id,
      registry_id: registry_id
    })
  });

  let responseData = await response.json();
  if(!response.ok){
    alert(responseData.message);
  }

  document.location.replace("/registry/" + registry_id);
}
updateProductFormEl.addEventListener('submit', updateProductInRegistry);


/* delete a product - mybe this is not a form at all */
/* and we come here on Delete Registry button click */
const deleteProductFormEl = document.querySelector("#deleteProduct");
const deleteProductFromRegistry = async () => {
  event.preventDefault();

  /* get product id */
  /* set a data attribute on the product with the product_id */
  /* and read that here */
  const product_id = document.querySelector("#productId").value; 

  /* send /api/product/:id with DELETE method */
  const response = await fetch(`/api/product/${product_id}`, {
    method: 'DELETE',
    headers: { "Content-Type": "application/json" },
  });

  /* handle response */
  let responseData = await response.json();
  if(!response.ok){
    alert(responseData.message);
  }

  document.location.replace("/registry");


}
deleteProductFormEl.addEventListener('submit', deleteProductFromRegistry);
