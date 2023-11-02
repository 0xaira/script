const apiKey = "c19f1bb93495ce43ce968d5f1e3c3828";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon");
// Async Await
// API
async function getWeather(city) {
  try {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    cityElement.innerHTML = data.name;
    tempElement.innerHTML = Math.round(data.main.temp) + "°C";
    humidityElement.innerHTML = data.main.humidity + "%";
    windElement.innerHTML = data.wind.speed + "km/h";
    if (data.weather[0].main === "Clouds") {
      weatherIcon.src="images/clouds.png";
    } else if( data.weather[0].main === "Rain") {
      weatherIcon.src="images/rain.png";
    } else if( data.weather[0].main === "Clear") {
        weatherIcon.src="images/clear.png"; 
    } else if( data.weather[0].main === "Drizzle") {
        weatherIcon.src="images/drizzle.png"; 
    } else if( data.weather[0].main === "Mist"){
        weatherIcon.src="images/mist.png"; 
    }

  } catch (error) {
    console.error(error);
    // Handle the error here, e.g., display an error message to the user.
  }
}

searchBtn.addEventListener("click", () => {
  getWeather(searchBox.value);
});

// Listen for the "keydown" event on the input field
searchBox.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    // Check if Enter key (key code 13) is pressed
    getWeather(searchBox.value);
  }
});


