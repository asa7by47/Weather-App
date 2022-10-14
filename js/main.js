'use strict'
let cityName = document.querySelector(".city");
let searchInput = document.querySelector(".search");
let date = document.querySelector(".date");
let date2 = document.querySelector(".date2");
let date3 = document.querySelector(".date3");
let temp = document.querySelector(".temp");
let sunny = document.querySelector(".sunny");
let minTemp = document.querySelector(".min-Temp");
let temp2 = document.querySelector(".temp2");
let minTemp2 = document.querySelector(".min-Temp2");
let sunny2 = document.querySelector(".sunny2");
let temp3 = document.querySelector(".temp3");
let minTemp3 = document.querySelector(".minTemp3");
let sunny3 = document.querySelector(".sunny3");
let btnSearch = document.querySelector(".btnSearch");
let img = document.querySelector(".img");
let img2 = document.querySelector(".img2");
let img3 = document.querySelector(".img3");
let giza = "cairo";
let container ="";



function search() {
    container = searchInput.value;
    getData();
}
async function getData() {
    
await fetch(`http://api.weatherapi.com/v1/forecast.json?key=67b2e75776b741749f4223541220910&q=${searchInput.value==""?giza:container}&days=5&aqi=yes&alerts=no`)
.then(response => response.json())
.then(data => {
    console.log(data);
     cityName.innerHTML = data.location.name;
      date.innerHTML = data.forecast.forecastday[0].date;
      date3.innerHTML = data.forecast.forecastday[2].date;
      temp.innerHTML = data.current.temp_c + `<sup>o</sup>C`;
      sunny.innerHTML = data.current.condition.text;
      minTemp.innerHTML = data.forecast.forecastday[0].day.mintemp_c +`<sup>o</sup>C`;
      img.src = data.current.condition.icon;
      date2.innerHTML = data.forecast.forecastday[1].date;
      temp2.innerHTML = data.forecast.forecastday[1].day.maxtemp_c + `<sup>o</sup>C`;
      minTemp2.innerHTML = data.forecast.forecastday[1].day.mintemp_c + `<sup>o</sup>C`;
      sunny2.innerHTML = data.forecast.forecastday[1].day.condition.text;
      img2.src = data.forecast.forecastday[1].day.condition.icon;
      img3.src = data.forecast.forecastday[2].day.condition.icon;
      temp3.innerHTML = data.forecast.forecastday[2].day.maxtemp_c + `<sup>o</sup>C`;
      minTemp3.innerHTML = data.forecast.forecastday[2].day.mintemp_c + `<sup>o</sup>C`;
      sunny3.innerHTML = data.forecast.forecastday[1].day.condition.text;
    })
}
getData();


// Step 1: Get user coordinates
function getCoordintes() {
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	function success(pos) {
		var crd = pos.coords;
		var lat = crd.latitude.toString();
		var lng = crd.longitude.toString();
		var coordinates = [lat, lng];
		console.log(`Latitude: ${lat}, Longitude: ${lng}`);
		getCity(coordinates);
		return;

	}

	function error(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	navigator.geolocation.getCurrentPosition(success, error, options);
}

// Step 2: Get city name
function getCity(coordinates) {
	var xhr = new XMLHttpRequest();
	var lat = coordinates[0];
	var lng = coordinates[1];

	// Paste your LocationIQ token below.
	xhr.open('GET', "
https://us1.locationiq.com/v1/reverse.php?key=pk.e09dd2e2bcee6e7ed61d5ac59fd67fb9TOKEN&lat=" +
	lat + "&lon=" + lng + "&format=json", true);
	xhr.send();
	xhr.onreadystatechange = processRequest;
	xhr.addEventListener("readystatechange", processRequest, false);

	function processRequest(e) {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var response = JSON.parse(xhr.responseText);
			var city = response.address.city;
			console.log(city);
			return;
		}
	}
}

getCoordintes();

