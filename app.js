
//Weather App 

const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p ");
const notificationElement = document.querySelector(".notification");

//App Data

const weather = {};

weather.temperature = {
    unit: "celsius"

}

//APP consts and variables

const KELVIN = 273;

const key = "7fe1effd09563e57fbbf9cd7775ad2cc";


//Browser Geo Location Check

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser Doesn't Support GEO LOCATION</p>";
}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

//Show Erro if n

function showError(error) {
    console.log(error.message);
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude) {

    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function (response) {

            let data = response.json();
            return data;
        })

        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })

        .then(function () {
            displayWeather();
        })
}


//Display Weather

function displayWeather() {
    iconElement.innerHTML = `<img src = "icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}*<span>C</span`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city},${weather.country}`;
    
}

function celToFar(temperature){
    return ((temperature*9/5)+32);
}



tempElement.addEventListener("click",function(){
    if(weather.temperature.value==undefined){
        return ;
    }
    
    if(weather.temperature.unit=="celsius"){
        let far = celToFar(weather.temperature.value);
        far = Math.floor(far);
        
        tempElement.innerHTML= `${far}*<span>F</span`;
        weather.temperature.unit='far';
    }else{
        tempElement.innerHTML= `${weather.temperature.value}*<span>C</span`;
        weather.temperature.unit='celsius';
    }
});
