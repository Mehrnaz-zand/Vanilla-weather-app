
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

function showTemperature(response){
document.querySelector("#city").innerHTML =response.data.name;
document.querySelector("#description").innerHTML = response.data.weather[0].description;
document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#date").innerHTML = getDate(response.data.dt*1000);
document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
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



let form = document.querySelector("#search-bar");
form.addEventListener("submit", handleSubmit);

search("tehran");