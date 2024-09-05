//3b6ac840b21de2144ed7e6a163c45317

function checkResponse(res) {
  //function to check response from api
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  } else {
    console.log(res.ok);
    return res.json();
  }
}

//function to make api req
export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
  `).then((res) => {
    return checkResponse(res); //make sure to return
  });
};

//filters data received from API req
export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = data.main.temp;
  result.type = getWeatherType(result.temp.F);
  return result;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};
