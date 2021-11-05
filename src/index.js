import css from './style.css';
import { createDom } from './dom';
const API = '746149ecb44c6b9cbab720bddd6eeee5';
const container = document.getElementById('container');
createDom();
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

async function getWeatherData(city) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&exclude=daily&APPID=${API}&units=metric`,
      { mode: 'cors' }
    );
    const weatherData = await response.json();
    return weatherData;
  } catch {
    alert('ERROR');
  }
}
async function getOnecallWeatherData(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${API}`,
      { mode: 'cors' }
    );
    const weatherData = await response.json();
    return weatherData;
  } catch {
    alert('ERROR');
  }
}
class Weather {
  constructor(currentTemp, currentHumidity, currentTime, hourly) {
    this.currentTemp = currentTemp;
    this.currentHumidity = currentHumidity;
    this.currentTime = currentTime;
    this.hourly = hourly;
  }
}
async function processWeatherData(city) {
  try {
    const weatherData = await getWeatherData(city);
    console.log(weatherData);
    const onecallRequest = await getOnecallWeatherData(
      weatherData.coord.lat,
      weatherData.coord.lon
    );
    console.log(onecallRequest);
    const weather = new Weather(
      onecallRequest.current.temp,
      onecallRequest.current.humidity,
      onecallRequest.current.dt,
      onecallRequest.hourly
    );
    setCurrentWeather(weather, weatherData.name);
    setHourlyWeather(weather);
    console.log(weather);
  } catch {
    console.log('processWeatherData Error!');
  }
}

function setCurrentWeather(weatherTemperature, currentCity) {
  const city = document.getElementById('city');
  const currentTemperature = document.getElementById('current-temperature');
  const currentWeatherContainer = document.getElementById(
    'current-weather-container'
  );
  city.textContent = currentCity;
  currentTemperature.textContent = weatherTemperature.currentTemp;
  currentWeatherContainer.appendChild(city);
  currentWeatherContainer.appendChild(currentTemperature);
}

searchButton.addEventListener('click', () => {
  processWeatherData(searchInput.value);
});

function setHourlyWeather(weather) {
  const hourlyWeatherContainer = document.getElementById(
    'hourly-weather-container'
  );
  const hourlyWeatherCards = document.querySelectorAll('.hourly-weather-card');
  let counter = 0;
  hourlyWeatherCards.forEach((element) => {
    element.textContent = weather.hourly[counter].temp;
    counter++;
  });
}
