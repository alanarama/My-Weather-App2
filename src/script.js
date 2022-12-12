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
let displayTime = document.querySelector("h6", "#time");
displayTime.innerHTML = `${day}, ${hour}: ${mins}`;

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
  let tempElement = document.querySelector("#temp-display");
  tempElement.innerHTML = `${temp}°C`;

  let currentCity = document.querySelector("#cityLocation");
  currentCity.innerHTML = `${response.data.name}`;

  let summary = document.querySelector("#temp-des");
  summary.innerHTML = `${response.data.weather[0].description}`;

  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `Wind: ${windSpeed} m/s`;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidity;

  let pressure = response.data.main.pressure;
  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = pressure;
}
//get current location//
function getCurrentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "9f1515c6d557b936bd2810b8784d57c8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showTempForCurrentLoc() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

let currentlocation = document.querySelector("#current-loc-button");
currentlocation.addEventListener("click", showTempForCurrentLoc);
