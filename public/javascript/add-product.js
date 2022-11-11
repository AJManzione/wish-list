const myModal = document.getElementById('add-product')
const myInput = document.getElementById('add-product')


myModal.addEventListener('click', () => {
  myInput.focus();
  console.log("!!!!!!!!!In add-product.js event listener handler!!!!!!!!!!!");
})
