async function deleteFormHandler(event) {
    event.preventDefault();
      const id = parseInt(document.querySelector("#registryID").innerText);
      
      console.log(id);
      const response = await fetch(`/api/registry/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          registry_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
      
}

document.querySelector('#delete-btn').addEventListener('click', deleteFormHandler);