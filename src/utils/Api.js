const baseUrl = "http://localhost:3001";
const headers = {
  "Content-Type": "application/json",
};

export default function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  } else {
    return res.json();
  }
}

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return checkResponse(res); //dont forget to return the value from the function call
  });
}

//Post Request
function addItem({ name, imageUrl, radioValue }, token) {
  //used in function 'onAddItem' in App.jsx;
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      imageUrl: imageUrl,
      weather: radioValue,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}

//Delete Request
function removeItem(id, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      headers,
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return checkResponse(res);
  });
}

function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return checkResponse(res);
  });
}

function removeCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return checkResponse(res);
  });
}

export { getItems, addItem, removeItem, addCardLike, removeCardLike };
