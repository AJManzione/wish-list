//handleFormSubmsision)
//whats the new value for all the keys
// fetch(/api/registry/id)
//console.log(window.location.href);

async function editFormHandler(event) {
    event.preventDefault();
    const name = document.querySelector('#reg-name').value;
    const description = document.querySelector('#desc').value;
    const date = document.querySelector('#datepicker').value;

    const id = parseInt(document.querySelector("#registryID").innerText);
    console.log(id)

    const response = await fetch(`/api/registry/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: name.value,
          description: description.value,
          registry_id: id,
          date: date.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace(`/registry/${id}`);
      } else {
        alert(response.statusText);
      }

}

document.getElementById('edit-registry-btn').addEventListener('click', editFormHandler);