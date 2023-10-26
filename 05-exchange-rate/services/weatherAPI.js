const axios = require("axios");

const BASE_URL = "http://api.openweathermap.org/data/2.5/forecast?units=metric";

const API_KEY = "509c5e82e4b16cc50074073127fe3923"

const LOCATION = {
  lat: 50.51,
  lon: 30.8,
};

const URL = `${BASE_URL}&appid=${API_KEY}&lat=${LOCATION.lat}&lon=${LOCATION.lon}`;

const getWeatherForcast = async () => {
  try {
    const res = await axios.get(`${URL}`);
    return res.data.list;
  } catch (error) {
    console.log(error.message);
  }
};

const getForcastForInterval = async (value) => {
  try {
    const data = await getWeatherForcast();

    const filteredData = data.filter((item, index) => index % 2 === 0);

    const forcast = value === 3 ? data : filteredData;

    const result = forcast.map((item) => {
      const temp = parseInt(item.main.temp);
      const time = new Date(item.dt * 1000).toLocaleString();
      const weather = item.weather[0].description;
      const weatherWithFirstLetter = weather.replace(
        weather[0],
        weather[0].toUpperCase()
      );

      const windSpeed = parseInt(item.wind.speed);

      const humidity = item.main.humidity;
      return `\n${time}: ${weatherWithFirstLetter}\nTemperature - ${temp} C\nWind - ${windSpeed} m per sec\nHumidity - ${humidity} %`;
    });

    return result;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getForcastForInterval;
