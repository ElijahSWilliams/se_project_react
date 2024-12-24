import checkResponse from "./Api";
const baseUrl = "http://localhost:3001"; //url for making requests
const headers = {
  "Content-Type": "application/json",
};

function signUp({ name, avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      headers, //"Content-Type": "application/json"
    },
    body: JSON.stringify({ name, avatar, email, password }), //turn JS Obj into a string
  }).then((res) => {
    return checkResponse(res); //check response
  });
} //end Signup

function signIn({ email, password }) {
  //function takes email and password
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      headers, //"Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return checkResponse(res);
  });
}

function checkToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export { signUp, signIn };
