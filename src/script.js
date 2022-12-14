let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let mins = now.getMinutes();
if (mins < 10) {
  mins = `0${mins}`;
}
let displayTime = document.querySelector("#date");
displayTime.innerHTML = `${day}, ${hour}:${mins}`;

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#text-input");
  let apiKey = "fda3688b1db05987dd5d07c237aecfba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", showCity);

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${temp}`;

  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = `${response.data.name}`;

  let summary = document.querySelector("#description");
  summary.innerHTML = `${response.data.weather[0].description}`;

  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedElement = document.querySelector("#wind");
  windSpeedElement.innerHTML = `Wind: ${windSpeed} m/s`;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidity;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
}
//get current location//
function displayPosition(position) {
  let apiKey = "9f1515c6d557b936bd2810b8784d57c8";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showTempForCurrentLoc(event) {
  navigator.geolocation.getCurrentPosition(displayPosition);
}

let celsiusTemperature = null;

let currentLocation = document.querySelector("#current-loc-button");
currentLocation.addEventListener("click", showTempForCurrentLoc);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
showTempForCurrentLoc();
