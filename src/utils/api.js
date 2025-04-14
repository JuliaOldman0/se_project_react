const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Eror: ${res.status}`);
  });
}

export { getItems };
