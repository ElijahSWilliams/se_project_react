import checkResponse from "./Api";
const baseUrl = "http://localhost:3001"; //url for making requests
const headers = {
  "Content-Type": "application/json",
};

function signUp({ name, avatar, email, password }) {
  console.log("Signing Up");
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }), //turn JS Obj into a string
  }).then((res) => {
    return checkResponse(res); //check response
  });
} //end Signup

function signIn({ email, password }) {
  //function takes email and password
  console.log("Signing In");
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
  }).then((res) => {
    return checkResponse(res);
  });
}

function sendNewUserData(userData, token) {
  //function to update user Info
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  }).then((res) => {
    return checkResponse(res);
  });
}

export { signUp, signIn, checkToken, sendNewUserData };
