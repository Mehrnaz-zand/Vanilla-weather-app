
function getDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours<10){
        hours = `0${hours}`
    }
    let minutes = date.getMinutes();
    if (minutes<10){
        minutes = `0${minutes}`
    }

    let days = [
    "Sunday", 
    "Monday",
    "Tuesday", 
    "Wednesday", 
    "Thursday", 
    "Friday", 
    "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`

}
function getForecastDays(timestamp){
    let date = new Date(timestamp*1000);
    let days = [
    "Sun", 
    "Mon",
    "Tue", 
    "Wed", 
    "Thur", 
    "Fri", 
    "Sat"];
    let day = days[date.getDay()];
    return `${day}`
}
function dispalyForecast(response) {
let forecast= document.querySelector(".weatherForecast");
let forecastDaily = response.data.daily;
let forecastHTML = `<div class="row">`;
forecastDaily.forEach(function(forecast, index){
    if(index < 6){
    forecastHTML = forecastHTML + `               
                        <div class="col-2">
                             <div class="forecastDay">
                                ${getForecastDays(forecast.dt)}
                             </div>
                            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="" width="42">
                         <div class="forecastTemperatures">
                            <span class="forecastTemperatureMax">${Math.round(forecast.temp.max)}°</span>
                            <span class="forecastTemperatureMin">${Math.round(forecast.temp.min)}°</span>
                         </div>                      
                         </div>`;

    }    
});

    forecast.innerHTML= forecastHTML + `</div>`;
}

function getForecast(coordinates){
    let apiKey =  `19351561bdce0a99202ae9e49984792f`
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(dispalyForecast);
}

function showTemperature(response){
celsiusTemperature = response.data.main.temp;
document.querySelector("#city").innerHTML =response.data.name;
document.querySelector("#description").innerHTML = response.data.weather[0].description;
document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#date").innerHTML = getDate(response.data.dt*1000);
document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
getForecast(response.data.coord);
}

function search(city) {
let apiKey = `19351561bdce0a99202ae9e49984792f`
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event){
event.preventDefault();
let cityInput = document.querySelector("#city-input");
search(cityInput.value);
}

document.querySelector("#search-bar").addEventListener("submit", handleSubmit);

search("tehran");