document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const location = document.getElementById('locationInput').value;
    fetchWeather(location);
});

function fetchWeather(location) {
    const apiKey = 'a2a58f23d54d1908371d9c298863af19'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found. Please check the city name and try again.');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('errorMessage').textContent = 'Error: ' + error.message;
            clearWeatherDisplay(); 
        });
}

function displayWeather(data) {
    document.getElementById('cityName').textContent = `City: ${data.name}, ${data.sys.country}`;
    document.getElementById('weatherCondition').textContent = `Conditions: ${data.weather[0].description}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById('errorMessage').textContent = ''; 
}

function clearWeatherDisplay() {
    document.getElementById('cityName').textContent = '';
    document.getElementById('weatherCondition').textContent = '';
    document.getElementById('temperature').textContent = '';
    document.getElementById('humidity').textContent = '';
    document.getElementById('windSpeed').textContent = '';
}