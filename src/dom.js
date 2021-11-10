function createDom(data) {
  const container = document.getElementById('container');

  const header = document.createElement('div');
  header.id = 'header';
  const headerIcon = document.createElement('img');
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
  const currentTemperature = document.createElement('div');
  currentTemperature.id = 'current-temperature';
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

    const hourlyWeatherIcon = document.createElement('img');
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

  for (let i = 0; i < 7; i++) {
    const dailyWeatherCard = document.createElement('li');
    dailyWeatherCard.classList = 'daily-weather-card';

    const dailyWeatherDay = document.createElement('div');
    dailyWeatherDay.classList = 'daily-weather-day';
    dailyWeatherDay.classList.add('daily-weather-item');
    dailyWeatherCard.appendChild(dailyWeatherDay);

    const dailyWeatherHumidity = document.createElement('div');
    dailyWeatherHumidity.classList = 'daily-weather-humidity';
    dailyWeatherHumidity.classList.add('daily-weather-item');
    dailyWeatherCard.appendChild(dailyWeatherHumidity);

    const dailyWeatherIcon = document.createElement('img');
    dailyWeatherIcon.classList = 'daily-weather-icon';
    dailyWeatherIcon.classList.add('daily-weather-item');
    dailyWeatherCard.appendChild(dailyWeatherIcon);

    const dailyWeatherTemperature = document.createElement('div');
    dailyWeatherTemperature.classList = 'daily-weather-temperature';
    dailyWeatherTemperature.classList.add('daily-weather-item');
    dailyWeatherCard.appendChild(dailyWeatherTemperature);

    dailyWeatherContainer.appendChild(dailyWeatherCard);
  }
  container.appendChild(dailyWeatherContainer);
}

export { createDom };
