import css from './style.css';
import { createDom } from './dom';
const API = '746149ecb44c6b9cbab720bddd6eeee5';
const container = document.getElementById('container');
createDom();
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    searchButton.click();
  }
});

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
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${API}`,
      { mode: 'cors' }
    );
    const weatherData = await response.json();
    return weatherData;
  } catch {
    alert('ERROR');
  }
}
class Weather {
  constructor(currentTemp, currentHumidity, currentTime, hourly, daily) {
    this.currentTemp = currentTemp;
    this.currentHumidity = currentHumidity;
    this.currentTime = currentTime;
    this.hourly = hourly;
    this.daily = daily;
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
      onecallRequest.hourly,
      onecallRequest.daily
    );
    setCurrentWeather(weather, weatherData.name);
    setHourlyWeatherTemperature(weather);
    setHourlyWeatherTime(weather);
    setHourlyWeatherIcon(weather);
    setHourlyWeatherHumidity(weather);
    setDailyWeatherTemperature(weather);
    setDailyWeatherDay(weather);
    setDailyWeatherHumidity(weather);
    setDailyWeatherIcon(weather);
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
  currentTemperature.textContent =
    Math.round(weatherTemperature.currentTemp) + '°';
  currentWeatherContainer.appendChild(city);
  currentWeatherContainer.appendChild(currentTemperature);
}

searchButton.addEventListener('click', () => {
  processWeatherData(searchInput.value);
});

function setHourlyWeatherTemperature(weather) {
  let counter = 0;

  const hourlyWeatherTemperature = document.querySelectorAll(
    '.hourly-weather-temperature'
  );
  hourlyWeatherTemperature.forEach((element) => {
    element.textContent = Math.round(weather.hourly[counter].temp) + '°';
    counter++;
  });
}

function setHourlyWeatherTime(weather) {
  let counter = 0;

  const hourlyWeatherTime = document.querySelectorAll('.hourly-weather-time');
  hourlyWeatherTime.forEach((element) => {
    element.textContent = convertUnixTime(weather.hourly[counter].dt);

    counter++;
  });
}

function setHourlyWeatherIcon(weather) {
  let counter = 0;

  const hourlyWeatherIcon = document.querySelectorAll('.hourly-weather-icon');
  hourlyWeatherIcon.forEach((element) => {
    const icon = weather.hourly[counter].weather[0].icon;
    element.src = `http://openweathermap.org/img/wn/${icon}.png`;
    counter++;
  });
}
function setHourlyWeatherHumidity(weather) {
  let counter = 0;

  const hourlyWeatherHumidity = document.querySelectorAll(
    '.hourly-weather-humidity'
  );
  hourlyWeatherHumidity.forEach((element) => {
    element.textContent = weather.hourly[counter].humidity + '%';
    counter++;
  });
}
function convertUnixTime(time) {
  const unixTime = time;
  const date = new Date(unixTime * 1000);
  return date.toLocaleString('en-US', { hour: 'numeric', hour12: true });
}
function convertUnixDate(time) {
  const unixTime = time;
  const date = new Date(unixTime * 1000);
  const options = { weekday: 'long' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

function setDailyWeatherDay(weather) {
  const dailyWeatherDay = document.querySelectorAll('.daily-weather-day');
  let counter = 0;
  dailyWeatherDay.forEach((element) => {
    element.textContent = convertUnixDate(weather.daily[counter].dt);
    counter++;
  });
}

function setDailyWeatherHumidity(weather) {
  const dailyWeatherHumidity = document.querySelectorAll(
    '.daily-weather-humidity'
  );
  let counter = 0;
  dailyWeatherHumidity.forEach((element) => {
    element.textContent = weather.daily[counter].humidity + '%';
    counter++;
  });
}

function setDailyWeatherIcon(weather) {
  const dailyWeatherIcon = document.querySelectorAll('.daily-weather-icon');
  let counter = 0;
  dailyWeatherIcon.forEach((element) => {
    const icon = weather.daily[counter].weather[0].icon;
    element.src = `http://openweathermap.org/img/wn/${icon}.png`;
    counter++;
  });
}

function setDailyWeatherTemperature(weather) {
  const dailyWeatherTemperature = document.querySelectorAll(
    '.daily-weather-temperature'
  );
  let counter = 0;
  dailyWeatherTemperature.forEach((element) => {
    element.textContent = Math.round(weather.daily[counter].temp.day) + '°';
    counter++;
  });
}

processWeatherData('London');
