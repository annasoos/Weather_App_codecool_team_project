// API DECLARATION

let apiOrigin = "https://api.weatherapi.com/v1/current.json?key=e2d6ed729da34234ba7105923213008";
let apiURL = "https://api.weatherapi.com/v1/current.json?key=e2d6ed729da34234ba7105923213008&q=Budapest";
let apiSearch = "https://api.weatherapi.com/v1/search.json?key=e2d6ed729da34234ba7105923213008"

// FETCHING FUNCTION

function fetching(url) {
	fetch(apiURL)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);

			let apiCurrentTemperature = `${data.current.temp_c}`;
			let apiLocationCity = `${data.location.name}`;
			let apiLocationCountry = `${data.location.country}`;
			let apiDate = `${data.location.localtime}`;

			let apiSkyCondition = `${data.current.condition.text}`;
			let apiHumidity = `${data.current.humidity}`;
			let apiWind = `${data.current.wind_kph}`;
			let apiUV = `${data.current.uv}`;
			let apiFeelsLike = `${data.current.feelslike_c}`;

			let locations = document.getElementsByClassName("location");

			document.getElementById("temperature").innerHTML = apiCurrentTemperature + "°";
			locations[0].innerHTML = apiLocationCity + ", " + apiLocationCountry;
			locations[1].innerHTML = apiLocationCity + ", " + apiLocationCountry;
			document.getElementById("date").innerHTML = apiDate;

			document.getElementById("celsiusValue").innerHTML = apiCurrentTemperature + "°";
			document.getElementById("feelsLikeValue").innerHTML = apiFeelsLike + "°";
			document.getElementById("skyConditionValue").innerHTML = apiSkyCondition;
			document.getElementById("humidityValue").innerHTML = apiHumidity + "%";
			document.getElementById("windValue").innerHTML = apiWind + "km/h";
			document.getElementById("uvValue").innerHTML = apiUV;

			// BACKGROUND VIDEO

			let video = document.getElementById("backgroundVideo");
			let skyValue = document.getElementById("skyConditionValue").textContent;

			let sunnyWeather = ["Sunny", "Clear"];
			let cloudyWeather = ["Cloudy", "Partly cloudy", "Overcast", "Mist", "Fog", "Freezing fog", "Patchy rain possible"];
			let rainyWeather = ["Patchy sleet possible", "Patchy freezing drizzle possible", "Thundery outbreaks possible", "Patchy light drizzle", "Light drizzle", "Freezing drizzle", "Heavy freezing drizzle", "Patchy light rain", "Light rain", "Moderate rain at times", "Moderate rain", "Heavy rain at times", "Heavy rain", "Light freezing rain", "Moderate or heavy freezing rain", "Light sleet", "Moderate or heavy sleet", "Light rain shower", "Moderate or heavy rain shower", "Torrential rain shower", "Light sleet showers", "Moderate or heavy sleet showers", "Patchy light rain with thunder", "Moderate or heavy rain with thunder"];
			let snowWeather = ["Patchy snow possible", "Blowing snow", "Blizzard", "Patchy light snow", "Light snow", "Patchy moderate snow", "Moderate snow", "Patchy heavy snow", "Heavy snow", "Ice pellets", "Light snow showers", "Moderate or heavy snow showers", "Light showers of ice pellets", "Moderate or heavy showers of ice pellets", "Patchy light snow with thunder", "Moderate or heavy snow with thunder"];

			if (sunnyWeather.includes(skyValue)) {
				video.src = "media/sky_conditions/sunny_video.mp4"
			} else if (cloudyWeather.includes(skyValue)) {
				video.src = "media/sky_conditions/cloudy_video.mp4"
			} else if (rainyWeather.includes(skyValue)) {
				video.src = "media/sky_conditions/rainy_video.mp4"
			} else if (snowWeather.includes(skyValue)) {
				video.src = "media/sky_conditions/snow_video.mp4"
			}

			//UMBRELLA VARIABLES & EVENT

			const takeUmb = ["Cloudy", "Overcast", "Patchy rain possible", "Patchy sleet possible", "Thundery outbreaks possible", "Patchy freezing drizzle possible", "Patchy light drizzle", "Light drizzle", "Freezing drizzle", "Heavy freezing drizzle", "Patchy light rain", "Light rain", "Moderate rain at times", "Moderate rain", "Heavy rain at times", "Heavy rain", "Light freezing rain", "Moderate or heavy freezing rain", "Light sleet", "Moderate or heavy sleet", "Light rain shower", "Moderate or heavy rain shower", "Torrential rain shower", "Light sleet showers", "Moderate or heavy sleet showers", "Light snow showers", "Moderate or heavy snow showers", "Light showers of ice pellets", "Moderate or heavy showers of ice pellets", "Patchy light rain with thunder", "Moderate or heavy rain with thunder"];
			const leaveUmb = ["Sunny", "Clear", "Partly cloudy", "Mist", "Patchy snow possible", "Blowing snow", "Blizzard", "Fog", "Freezing fog", "Patchy light snow", "Light snow", "Patchy moderate snow", "Moderate snow", "Patchy heavy snow", "Heavy snow", "Ice pellets", "Patchy light snow with thunder", "Moderate or heavy snow with thunder"];

			const takeUmbText = "It's raining man! Hallelujah!";
			const leaveUmbText = "Here comes the sun do, do, do...";
			const takeUmbSrc = "media/rain.png";
			const leaveUmbSrc = "media/sun.png";

			let imgE = document.querySelector("#needUmbrella img");
			let pAnswer = document.getElementById("answer");

			for (let value of leaveUmb) {
				if (skyValue === value) {
					imgE.setAttribute("src", leaveUmbSrc);
					pAnswer.innerHTML = leaveUmbText;
				};
			};

			for (let value of takeUmb) {
				if (skyValue === value) {
					imgE.setAttribute("src", takeUmbSrc);
					pAnswer.innerHTML = takeUmbText;
				};
			};

		})
		.catch(function (error) {
			console.log("Error: ", error);
		})
};

// DROPDOWN INPUT EVENT FUNCTION

function apiUpdate() {

	let selectedLocation = citySelector.value;
	apiURL = apiOrigin + "&q=" + selectedLocation;

	fetching();
};

// AUTOCOMPLETE FUNCTION

async function searchComplete() {

	let inputFieldElement = document.getElementById("inputField");

	if (inputFieldElement.value.length >= 3) {
		let newURL = apiSearch + "&q=" + inputFieldElement.value;

		const response = await fetch(newURL);
		const foundCities = await response.json();

		let regex = new RegExp(`^${inputFieldElement.value}`, "gi");

		let matches = foundCities.filter(function (cityElement) {
			return cityElement.name.match(regex)
		});

		console.log(matches)

		outputHTML(matches);
	}

};

// SHOW RESULTS AS INPUT DROPDOWN

function outputHTML(matchesArray) {  

	let cityBrowserElement = document.getElementById("cityBrowser");

	while (cityBrowserElement.firstChild) {
		cityBrowserElement.removeChild(cityBrowserElement.lastChild);
	};
	
	for (i = 0; i < matchesArray.length; i++) {

		cityBrowserElement.insertAdjacentHTML("beforeend", `
		<option class="autoOption"> ${matchesArray[i].name} </option>
		`)
	};

};

// SPINNER

let docState = document.readyState;

let spinnerFunction = function () {
	if (docState === "interactive") {
		setTimeout(function () {
			document.getElementById("spinner").style.display = "none";
			document.getElementById("loadingText").style.display = "none";
			document.querySelector(".afterSpinner").style.display = "flex";
		}, 3000);
	}
}

document.addEventListener("readystatechange", spinnerFunction)

//ADDED SPINNER GIF

const spinnerCont = document.getElementById("spinner");
const gifImg = document.createElement("img");

gifImg.setAttribute("src", "media/cute_sun.gif");
spinnerCont.appendChild(gifImg).classList.add("gif");

function loadEvent() {

	// CREATING HTML ELEMENTS

	const rootElement = document.getElementById("root");
	const cities = ["Budapest", "Rome", "Paris", "Barcelona", "Stockholm"];

	rootElement.insertAdjacentHTML('afterbegin', `
		<div id="leftSide">
			<h1> Current weather in </h1>
			<h2 id="headerLocation" class="location"> </h2>
	
			<div id="currentWeatherData">
				<div id="temperature"></div>
				<div class="location"></div>
				<div id="date"> </div>
			</div>

		</div>

		<div id="rightSide">
			<input list="cityBrowser" id="inputField" type="text" autocomplete="off" placeholder="Find your location...">
			<div id="searchIconHolder">
				<svg id="searchIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
					<path d="M15.5,14 L14.71,14 L14.43,13.73 C15.63,12.33 16.25,10.42 15.91,8.39 C15.44,5.61 13.12,3.39 10.32,3.05 C6.09,2.53 2.53,6.09 3.05,10.32 C3.39,13.12 5.61,15.44 8.39,15.91 C10.42,16.25 12.33,15.63 13.73,14.43 L14,14.71 L14,15.5 L18.25,19.75 C18.66,20.16 19.33,20.16 19.74,19.75 C20.15,19.34 20.15,18.67 19.74,18.26 L15.5,14 Z M9.5,14 C7.01,14 5,11.99 5,9.5 C5,7.01 7.01,5 9.5,5 C11.99,5 14,7.01 14,9.5 C14,11.99 11.99,14 9.5,14 Z"></path>      
				</svg>
			</div>

			<datalist id="cityBrowser"> </datalist>

			<div id="selectorContainer">
				<span id="imgCont">
					<img src="/media/arrow.png" alt="arrow">
				</span>
				<select id="citySelector">
					<option selected disabled> Our favourite cities </option>
				</select>
			</div>

			<div id="detailsContainer">
				<h2> Weather Details</h2>
				<div id="celsius"> Temperature </div> <div id="celsiusValue"> </div>
				<div id="feelsLike"> Feels like </div> <div id="feelsLikeValue"> </div>
				<div id="skyCondition"> Sky Condition </div> <div id="skyConditionValue"> </div>
				<div id="humidity"> Humidity </div> <div id="humidityValue"> </div>
				<div id="wind"> Wind </div> <div id="windValue"> </div>
				<div id="uv"> UV </div> <div id="uvValue"> </div>
			</div>

			<div id="needUmbrella">
				<p id="question">Do I need an umbrella now?</p>
				<img />
				<p id="answer"></p>
			</div>
		</div>
	`);


	// USING FOR LOOP TO FILL UP 'FAVOURITE CITIES' DROPDOWN

	for (let cityElement of cities) {

		document.querySelector("#citySelector").insertAdjacentHTML("beforeend", `<option>${cityElement}</option>`);

	};

	// CALL FETCHING FUNCTION

	fetching();

	// EVENT LISTENERS

	document.getElementById("citySelector").addEventListener("change", apiUpdate);

	document.getElementById("inputField").addEventListener("input", searchComplete);

	document.getElementById("inputField").addEventListener("keypress", function (event) {

		if (event.key === "Enter") {
			let selectedLocation = document.getElementById("inputField").value;
			apiURL = apiOrigin + "&q=" + selectedLocation;
			fetching();
		}

	});

};

window.addEventListener("load", loadEvent);