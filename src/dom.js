function createDom(data) {
  const container = document.getElementById('container');

  const header = document.createElement('div');
  header.id = 'header';
  const headerIcon = document.createElement('div');
  headerIcon.id = 'header-icon';
  headerIcon.textContent = 'X';
  const headerText = document.createElement('div');
  headerText.id = 'header-text';
  headerText.textContent = 'Weather';
  header.appendChild(headerIcon);
  header.appendChild(headerText);
  container.appendChild(header);

  const form = document.createElement('form');
  form.id = 'form';
  const searchInput = document.createElement('input');
  searchInput.id = 'search-input';
  const searchButton = document.createElement('button');
  searchButton.id = 'search-button';
  searchButton.setAttribute('type', 'button');
  form.appendChild(searchInput);
  form.appendChild(searchButton);
  container.appendChild(form);

  const currentWeatherContainer = document.createElement('div');
  currentWeatherContainer.id = 'current-weather-container';
  const city = document.createElement('div');
  city.id = 'city';
  city.textContent = 'Ogulin';
  const currentTemperature = document.createElement('div');
  currentTemperature.id = 'current-temperature';
  currentTemperature.textContent = '8';
  currentWeatherContainer.appendChild(city);
  currentWeatherContainer.appendChild(currentTemperature);

  container.appendChild(currentWeatherContainer);

  const hourlyWeatherContainer = document.createElement('ul');
  hourlyWeatherContainer.id = 'hourly-weather-container';

  for (let i = 0; i <= 24; i++) {
    const hourlyWeatherCard = document.createElement('li');
    hourlyWeatherCard.classList = 'hourly-weather-card';
    
    const hourlyWeatherTime = document.createElement('div');
    hourlyWeatherTime.classList = 'hourly-weather-time';
    hourlyWeatherCard.appendChild(hourlyWeatherTime);

    const hourlyWeatherTemperature = document.createElement('div');
    hourlyWeatherTemperature.classList = 'hourly-weather-temperature';
    hourlyWeatherCard.appendChild(hourlyWeatherTemperature);

    const hourlyWeatherIcon = document.createElement('div');
    hourlyWeatherIcon.classList = 'hourly-weather-icon';
    hourlyWeatherCard.appendChild(hourlyWeatherIcon);
    
    const hourlyWeatherHumidity = document.createElement('div');
    hourlyWeatherHumidity.classList = 'hourly-weather-humidity';
    hourlyWeatherCard.appendChild(hourlyWeatherHumidity);

    hourlyWeatherContainer.appendChild(hourlyWeatherCard);
  }
  container.appendChild(hourlyWeatherContainer);

  const dailyWeatherContainer = document.createElement('ul');
  dailyWeatherContainer.id = 'daily-weather-container';

  for (let i = 0; i <= 7; i++) {
    const dailyWeatherCard = document.createElement('li');
    dailyWeatherCard.classList = 'daily-weather-card';
    dailyWeatherCard.textContent = i;
    dailyWeatherContainer.appendChild(dailyWeatherCard);
  }
  container.appendChild(dailyWeatherContainer);
}

export { createDom };
