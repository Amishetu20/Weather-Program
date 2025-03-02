const apiKey = '804194fb853917370ffa5165727fa';

const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityNameElement = document.getElementById('cityName');
const temperatureElement = document.getElementById('temperature');
const weatherDescriptionElement = document.getElementById('weatherDescription');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('windSpeed');
const weatherInfo = document.getElementById('weatherInfo');

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    fetchWeatherData(city);
});

async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            alert('City not found');
            return;
        }

        weatherInfo.style.display = 'block';

        cityNameElement.textContent = `${data.name}, ${data.sys.country}`;
        temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
        weatherDescriptionElement.textContent = `Weather: ${data.weather[0].description}`;
        humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('There was an error fetching the weather data.');
    }
}