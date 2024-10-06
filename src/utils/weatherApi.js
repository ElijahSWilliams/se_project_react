//3b6ac840b21de2144ed7e6a163c45317

function checkResponse(res) {
  //function to check response from api
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  } else {
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
  result.temp = {
    F: data.main.temp,
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.type = getWeatherType(result.temp.F);
  console.log(result.temp);
  return result; //returns weather object
};
//Context
/* const { currentTempUnit, handleToggleUnit } = useContext(
  currentTempUnitContext
);

const weatherTempVar = wea; */

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};

/* weather.temperature.F = data.main.temp;
weather.temperature.C = Math.round((data.main.temp - 32) * 5/9); */
