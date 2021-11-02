const container = document.getElementById('container');

const form = document.createElement('form');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');
searchButton.setAttribute('type', 'button');
form.appendChild(searchInput);
form.appendChild(searchButton);
container.appendChild(form);

async function getWeatherData(city) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=746149ecb44c6b9cbab720bddd6eeee5`,
      { mode: 'cors' }
    );
    const weatherData = await response.json();
    return weatherData;
  } catch {
    alert('ERROR');
  }
}
class Weather {
  constructor(feelsLike, humidity, temp, city) {
    this.feelsLike = feelsLike;
    this.humidity = humidity;
    this.temp = temp;
    this.city = city;
  }
}
async function processWeatherData(city) {
  const weatherData = await getWeatherData(city);

  const weather = new Weather(
    weatherData.main.feels_like,
    weatherData.main.humidity,
    weatherData.main.temp,
    weatherData.name
  );
  console.log(weather);
}
searchButton.addEventListener('click', () => {
  processWeatherData(searchInput.value);
});
