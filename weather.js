// Weather App

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "6c2d495d4af9e1ac7d400763d728ed77";

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    const city = cityInput.value.trim(); 

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData, city);
            cityInput.value = ""; 
        } catch (error) {
            console.error(error);
            displayWeatherError("City not found. Please enter a valid city.");
        }
    } else {
        displayWeatherError("Please enter a city.");
    }
});

// Function to fetch weather data
async function getWeatherData(city) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    const response = await fetch(weatherUrl);
    const data = await response.json();

    if (data.cod !== 200) {
        throw new Error(data.message); 
    }

    return data; // Return weather data
}

// Function to display weather information
function displayWeatherInfo(data, city) {
    const { main, weather, wind } = data; 
    const { temp, humidity, pressure } = main;
    const { description, id } = weather[0];
    const { speed } = wind;

    // Update weather card content
    card.innerHTML = `
        <h1>${city}</h1>
        <p>Temperature: ${temp}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Pressure: ${pressure} hPa</p>
        <p>Wind Speed: ${speed} m/s</p>
        <p>${description}</p>
        <div class="weatherEmoji">${getWeatherEmoji(id)}</div>
    `;

    card.style.display = "block"; // Show the card
}

// Function to get the appropriate weather emoji
function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId <= 232) {
        return "⛈️"; // Thunderstorm
    } else if (weatherId >= 300 && weatherId <= 321) {
        return "🌧️"; // Drizzle
    } else if (weatherId >= 500 && weatherId <= 531) {
        return "🌧️"; // Rain
    } else if (weatherId >= 600 && weatherId <= 622) {
        return "❄️"; // Snow
    } else if (weatherId === 800) {
        return "☀️"; // Clear
    } else if (weatherId >= 801 && weatherId <= 804) {
        return "☁️"; // Clouds
    }
    return "🌍"; // Default
}

// Function to display an error message
function displayWeatherError(message) {
    card.innerHTML = `<p class="errorDisplay">${message}</p>`;
    card.style.display = "block"; // Show error message
}
