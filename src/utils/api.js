const baseUrl = "http://localhost:3001";

// Helper to check response
export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

// Generic request wrapper
function request(url, options) {
  return fetch(`${baseUrl}${url}`, options).then(checkResponse);
}

// GET /items — Public, no token needed
function getItems() {
  return request(`/items`, {
    method: "GET",
  });
}

// POST /items — Requires auth token
function addItem({ name, imageUrl, weather }, token) {
  return request(`/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

// DELETE /items/:id — Requires auth token
function deleteItem(id, token) {
  return request(`/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export { getItems, addItem, deleteItem };
