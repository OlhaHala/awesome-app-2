let now = new Date();
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let todayIs = document.querySelector("h2");
todayIs.innerHTML = `${month}, ${day} ${date}, ${hours}:${minutes}`;

function searchLocation(event) {
  event.preventDefault();
  let location = document.querySelector("#city-input");
  let apiKey = "6787254059ff334afbc56a41b925e8c5";
  let city = `${location.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let search = document.querySelector("form");
search.addEventListener("submit", searchLocation);

function showTemp(response) {
  let temp = document.querySelector("#temper");
  temp.innerHTML = Math.round(response.data.main.temp);
  let text = document.querySelector("#main-city");
  text.innerHTML = response.data.name;
  let skyS = document.querySelector("#sky-description");
  skyS.innerHTML = `${response.data.weather[0].description}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;
  let windC = document.querySelector("#speed-description");
  windC.innerHTML = `${response.data.wind.speed}m/s`;
}

function showWeather(response) {
  let weather = Math.round(response.data.main.temp);
  let text = document.querySelector("#main-city");
  text.innerHTML = `Odessa`;
  let temp = document.querySelector("#temper");
  temp.innerHTML = weather;
  let skyS = document.querySelector("#sky-description");
  skyS.innerHTML = `${response.data.weather[0].description}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;
  let windC = document.querySelector("#speed-description");
  windC.innerHTML = `${response.data.wind.speed}m/s`;
}

function getCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apikey = "6787254059ff334afbc56a41b925e8c5";
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
  axios.get(apiurl).then(showWeather);
}

navigator.geolocation.getCurrentPosition(getCurrentPosition);
