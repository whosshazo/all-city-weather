var API_KEY = "f90d646020d714f2dced46f00a203dcb";
var searchInput = document.querySelector("#weather-search");
var searchButton = document.querySelector("#search-btn");
var cityNameSpan = document.querySelector(".city-name");
var tempSpan = document.querySelector(".current-temp");
var humiditySpan = document.querySelector(".current-humidity");
var windSpeedSpan = document.querySelector(".current-wind-speed");
var uvSpan = document.querySelector(".current-uv");
const forecastWrapper = document.querySelector(".forecast-wrapper");
const cityWrapper = document.querySelector(".city-wrapper");

const cityHistory = JSON.parse(localStorage.getItem("city")) ?? [];

initCityHistory();

function initCityHistory() {
  if (cityHistory.length > 0) {
    buildCityHistoryHTML();
  }
}

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  const city = searchInput.value.trim();
  fetchCoordinates(city);
  buildCityHistory(city);
});

async function fetchCoordinates(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  );
  const data = await response.json();
  console.log("API Call #1", data);

  fetchWeatherData(data.coord.lat, data.coord.lon, data.name);
}

async function fetchWeatherData(lat, lon, city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&daily&appid=${API_KEY}`
  );
  const data = await response.json();
  console.log("API Call #2", data);
  buildCurrentCityWeather(data, city);
  buildFiveDayWeather(data);
}

function buildCurrentCityWeather(data, city) {
  cityNameSpan.textContent = city;
  tempSpan.textContent = `Temperature: ${data.current.temp}`;
  humiditySpan.textContent = `Humidity: ${data.current.humidity}`;
  windSpeedSpan.textContent = `Wind-Speed: ${data.current.wind_speed}`;
  uvSpan.textContent = `UV: ${data.current.uvi}`;
}

function buildFiveDayWeather(data) {
  forecastWrapper.innerHTML = "";

  for (i = 0; i < data.daily.length - 3; i++) {
    const forecastBlock = document.createElement("div");
    forecastBlock.classList.add("forecast-block");
    const dates = document.createElement("p");
    dates.textContent = moment(data.daily[i].dt * 1000).format("dddd");
    forecastBlock.appendChild(dates);
    const temp = document.createElement("p");
    temp.textContent = `Temperature: ${data.daily[i].temp.day}`;
    forecastBlock.appendChild(temp);
    const icon = document.createElement("img");
    icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`
    );
    forecastBlock.appendChild(icon);
    const humidity = document.createElement("p");
    humidity.textContent = `Humidity: ${data.daily[i].humidity}`;
    forecastBlock.appendChild(humidity);
    const windSpeed = document.createElement("p");
    windSpeed.textContent = `Wind Speed: ${data.daily[i].wind_speed}`;
    forecastBlock.appendChild(windSpeed);
    const uvIndex = document.createElement("p");
    uvIndex.textContent = `UV Index: ${data.daily[i].uvi}`;
    forecastBlock.appendChild(uvIndex);
    forecastWrapper.appendChild(forecastBlock);
  }
}

function buildCityHistory(city) {
  if (cityHistory.indexOf(city.toLowerCase()) === -1) {
    cityHistory.push(city.toLowerCase());
    localStorage.setItem("city", JSON.stringify(cityHistory));
  }

  buildCityHistoryHTML();
}

function buildCityHistoryHTML() {
  cityHistory.forEach((city) => {
    console.log(city);
    const cityButton = document.createElement("button");
    cityButton.textContent = city;
    cityWrapper.appendChild(cityButton);
  });
}
