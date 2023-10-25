const axios = require("axios");

const BASE_URL = "http://api.openweathermap.org/data/2.5/forecast?units=metric";

const API_KEY = "509c5e82e4b16cc50074073127fe3923";

const LOCATION = {
  lat: 50.51,
  lon: 30.8,
};

const URL = `${BASE_URL}&appid=${API_KEY}&lat=${LOCATION.lat}&lon=${LOCATION.lon}`;

const getWeatherForcast = async (value) => {
  try {
    const res = await axios.get(`${URL}&cnt=${value}`);
    return res.data.list;
  } catch (error) {
    console.log(error.message);
  }
};

const getForcastForInterval = async (value) => {
  try {
    const int = value === 0 ? 1 : 2;
    const hours = value === 0 ? 3: 6;

    const data = await getWeatherForcast(int);

    const temp = parseInt(data[value].main.temp);

    const weather = data[value].weather[0].description;
    const weatherWithFirstLetter = weather.replace(
      weather[0],
      weather[0].toUpperCase()
    );

    const windSpeed = parseInt(data[value].wind.speed);

    const humidity = data[value].main.humidity;

    return `Weather forcast for the next ${hours} hours:\n${weatherWithFirstLetter}\nTemperature - ${temp} C\nWind - ${windSpeed} m per sec\nHumidity - ${humidity} %`;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getForcastForInterval;
