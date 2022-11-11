/* add product */
//const addProductFormEl = document.querySelector("add-product-form");
const addProductBtnEl = document.querySelector("#add-product-btn");

const addProductToRegistry = async (event) => {
  event.preventDefault();
  console.log("******************In Add product handler*********************");

  /* get product details - name, url, price, category_id, registry_id */
  
  const name = document.querySelector("#product-name").value;
  const link = document.querySelector("#product-url").value;
  const price = document.querySelector("#product-price").value;
  const category_id = document.querySelector("#categories").value; // find the element within the dropdown
  const registry_id = document.querySelector("#data-registry-id").value; // is this the registry id or name ? 

  console.log("name = " + name);
  console.log("link = " + link);
  console.log("price = " + price);
  console.log("category_id = " + category_id);
  console.log("registry_id = " + registry_id);

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

/* update product */
const updateProductFormEl = document.querySelector("#updateProduct");

const updateProductInRegistry = async () => {
  event.preventDefault();
  console.log("******************In Update product handler*********************");


  /* get product details - product_id, name, url, price */
  /* category_id and registry_id */

  const product_id = document.querySelector("#product-id").value;
  const name = document.querySelector("#product-name").value;
  const link = document.querySelector("#product-url").value;
  const price = document.querySelector("#product-price").value;
  const category_id = document.querySelector("#categories").value; // find the element within the dropdown
  const registry_id = document.querySelector("#data-registry-id").value; // is this the registry id or name ? 

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


/* delete a product -  */
/* we come here on Delete Product button click */
const deleteProductBtnEl = document.querySelector("#deleteProduct");
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
addProductBtnEl.addEventListener('click', addProductToRegistry);
//addProductFormEl.addEventListener('submit', addProductToRegistry);
updateProductFormEl.addEventListener('submit', updateProductInRegistry);
deleteProductBtnEl.addEventListener('click', deleteProductFromRegistry);

