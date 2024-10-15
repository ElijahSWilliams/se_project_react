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
function addItem({ name, imageUrl, radioValue }) {
  //used in function 'onAddItem' in App.jsx;
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
function removeItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      headers,
    },
  }).then((res) => {
    return checkResponse(res);
  });
}

export { getItems, addItem, removeItem };
