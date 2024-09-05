//3b6ac840b21de2144ed7e6a163c45317

function checkResponse(res) {
  //function to check response from api
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  } else {
    return res.json();
  }
}

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
  `).then((res) => {
    checkResponse(res);
  });
};
