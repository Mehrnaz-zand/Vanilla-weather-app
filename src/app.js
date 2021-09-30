let apiKey = `19351561bdce0a99202ae9e49984792f`
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Tehran&appid=${apiKey}&units=metric`

function showTemperature(response){
document.querySelector("#city").innerHTML =response.data.name;

document.querySelector("#description").innerHTML = response.data.weather[0].description;
document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
humidity

document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);

console.log(response.data);

}

axios.get(apiUrl).then(showTemperature);


