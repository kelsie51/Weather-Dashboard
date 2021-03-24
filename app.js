const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const humidityElement = document.querySelector(".humidity-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

var forecastWeatherShared = {}; //items that are the same across current weather and forecast
var weather = {};
var forecastDay1 = {};
var forecastDay2 = {};
var forecastDay3 = {};
var forecastDay4 = {};
var forecastDay5 = {};
var city ="";
var searchedCitiesArray;


weather.temperature = {
    unit : "fahrenheit"
}

$( "body" ).click(function( event ) {
  $( "#notification" ).html( "clicked: " + event.target.nodeName );
});

//API Key
const key = "94b855f34d06575756d4ca16a7850e11";

// GET WEATHER FROM API PROVIDER
function getWeather(){

    city = document.getElementById("weatherCity").value;

	localStorageHandlerAdd(true);
    
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;
    

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        
        .then(function(data){
            console.log(data);
            weather.temperature.value = Math.floor(data.main.temp);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            forecastWeatherShared.city = data.name;
            forecastWeatherShared.country = data.sys.country;
            weather.humidity = data.main.humidity;
        })
        
		getForecast();
}
function getWeather_SearchedCities(){

	//localStorageHandlerAdd();
    
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;
    

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        
        .then(function(data){
            console.log(data);
            weather.temperature.value = Math.floor(data.main.temp);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            forecastWeatherShared.city = data.name;
            forecastWeatherShared.country = data.sys.country;
            weather.humidity = data.main.humidity;
        })
        
		getForecast();
}

function localStorageHandlerAdd(addNew){
	var searchedCities =localStorage.getItem("searchedCities");
    console.log(localStorage.getItem("searchedCities"));
   
	if(addNew)//so it only adds when it is supposed to, not on page load
    	localStorage.setItem("searchedCities", searchedCities+","+city);
    console.log(searchedCities);
	
	searchedCities =localStorage.getItem("searchedCities");
	if(searchedCities != null)
		searchedCitiesArray = searchedCities.split(",");
	
	console.log(searchedCitiesArray);
	document.getElementById("buttonContainer").innerHTML = "";

	for(i=0; i<searchedCitiesArray.length; i++)
	{
		if(searchedCitiesArray[i] != "null")
			document.getElementById("buttonContainer").innerHTML += `<button id=${searchedCitiesArray[i]}" class="btn">${searchedCitiesArray[i]}</button>`;
		console.log(i);
	}
	var btn = document.getElementsByClassName('btn');
	for (var i = 0; i < btn.length; i++) {
		btn[i].addEventListener("click", function() {
		city = this.innerHTML;
		console.log(this.innerHTML);
		console.log("Click_"+city);
		getWeather_SearchedCities();
		});
	}
	//localStorage.clear();
}

function btnHandler(){
	
}

function getForecast(){	
	 let api = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${key}`;
	 
	 fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })        
        .then(function(data){
            console.log(data);
			console.log(data.list[0].weather[0].icon);
			forecastDay1.temperature = Math.floor(data.list[0].main.temp);
			forecastDay1.description = data.list[0].weather[0].description;
			forecastDay1.iconId = data.list[0].weather[0].icon;			
            forecastDay1.humidity = data.list[0].main.humidity;
			forecastDay1.date = data.list[0].dt_txt;			
			
			forecastDay2.temperature = Math.floor(data.list[8].main.temp);
			forecastDay2.description = data.list[8].weather[0].description;
			forecastDay2.iconId = data.list[8].weather[0].icon;			
            forecastDay2.humidity = data.list[8].main.humidity;
			forecastDay2.date = data.list[8].dt_txt;
			
			forecastDay3.temperature = Math.floor(data.list[16].main.temp);
			forecastDay3.description = data.list[16].weather[0].description;
			forecastDay3.iconId = data.list[16].weather[0].icon;			
            forecastDay3.humidity = data.list[16].main.humidity;
			forecastDay3.date = data.list[16].dt_txt;
			
			forecastDay4.temperature = Math.floor(data.list[24].main.temp);
			forecastDay4.description = data.list[24].weather[0].description;
			forecastDay4.iconId = data.list[24].weather[0].icon;			
            forecastDay4.humidity = data.list[24].main.humidity;
			forecastDay4.date = data.list[24].dt_txt;
			
			forecastDay5.temperature = Math.floor(data.list[32].main.temp);
			forecastDay5.description = data.list[32].weather[0].description;
			forecastDay5.iconId = data.list[32].weather[0].icon;			
            forecastDay5.humidity = data.list[32].main.humidity;
			forecastDay5.date = data.list[32].dt_txt;
        })
        .then(function(){
            displayWeather();
        });
}

// Render weather data 
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>F</span>`;
    humidityElement.innerHTML = "Humidity:" + weather.humidity +"%";
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${forecastWeatherShared.city}, ${forecastWeatherShared.country}`;
	
	document.getElementById("forecastHumidity1").innerHTML = "Humidity:" + forecastDay1.humidity ;
	document.getElementById("forecastTemp1").innerHTML = forecastDay1.temperature +"°<span>F</span>";
	document.getElementById("forecastDescription1").innerHTML = forecastDay1.description;
	document.getElementById("forecastDate1").innerHTML = "Date: "+forecastDay1.date;
	document.getElementById("forecastLocation1").innerHTML = `${forecastWeatherShared.city}, ${forecastWeatherShared.country}`;
	document.getElementById("weather-Icon1").innerHTML = `<img src="icons/${forecastDay1.iconId}.png"/>`

	
	document.getElementById("forecastHumidity2").innerHTML = "Humidity:" + forecastDay2.humidity ;
	document.getElementById("forecastTemp2").innerHTML = forecastDay2.temperature +"°<span>F</span>";
	document.getElementById("forecastDescription2").innerHTML = forecastDay2.description;
	document.getElementById("forecastDate2").innerHTML = "Date: "+forecastDay2.date;
	document.getElementById("forecastLocation2").innerHTML = `${forecastWeatherShared.city}, ${forecastWeatherShared.country}`;
	document.getElementById("weather-Icon2").innerHTML = `<img src="icons/${forecastDay2.iconId}.png"/>`

	document.getElementById("forecastHumidity3").innerHTML = "Humidity:" + forecastDay3.humidity ;
	document.getElementById("forecastTemp3").innerHTML = forecastDay3.temperature +"°<span>F</span>";
	document.getElementById("forecastDescription3").innerHTML = forecastDay3.description;
	document.getElementById("forecastDate3").innerHTML = "Date: "+forecastDay3.date;
	document.getElementById("forecastLocation3").innerHTML = `${forecastWeatherShared.city}, ${forecastWeatherShared.country}`;
	document.getElementById("weather-Icon3").innerHTML = `<img src="icons/${forecastDay3.iconId}.png"/>`

	document.getElementById("forecastHumidity4").innerHTML = "Humidity:" + forecastDay4.humidity ;
	document.getElementById("forecastTemp4").innerHTML = forecastDay4.temperature +"°<span>F</span>";
	document.getElementById("forecastDescription4").innerHTML = forecastDay4.description;
	document.getElementById("forecastDate4").innerHTML = "Date: "+forecastDay4.date;
	document.getElementById("forecastLocation4").innerHTML = `${forecastWeatherShared.city}, ${forecastWeatherShared.country}`;
	document.getElementById("weather-Icon4").innerHTML = `<img src="icons/${forecastDay4.iconId}.png"/>`

	document.getElementById("forecastHumidity5").innerHTML = "Humidity:" + forecastDay5.humidity ;
	document.getElementById("forecastTemp5").innerHTML = forecastDay5.temperature +"°<span>F</span>";
	document.getElementById("forecastDescription5").innerHTML = forecastDay5.description;
	document.getElementById("forecastDate5").innerHTML = "Date: "+forecastDay5.date;
	document.getElementById("forecastLocation5").innerHTML = `${forecastWeatherShared.city}, ${forecastWeatherShared.country}`;
	document.getElementById("weather-Icon5").innerHTML = `<img src="icons/${forecastDay5.iconId}.png"/>`

}

