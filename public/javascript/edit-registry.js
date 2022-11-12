//handleFormSubmsision)
//whats the new value for all the keys
// fetch(/api/registry/id)
//console.log(window.location.href);

async function editFormHandler(event) {
    event.preventDefault();
    const name = document.querySelector('#reg-name"]').value;
    const description = document.querySelector('#desc').value;
    const date = document.querySelector('#datepicker').value;
    console.log(title);
    console.log(content);
    console.log(datepicker);

    const id = parseInt(document.querySelector("#registryID").innerText);
    console.log(id)

    const response = await fetch(`/api/registry/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          registry_id: id,
          desription,
          date,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/registry/:id');
      } else {
        alert(response.statusText);
      }

}

document.querySelector('#edit-registry-btn').addEventListener('submit', editFormHandler);