//Define Global properties

let jsonData;
let userInputGeoId;
let autoComplete = {};

//pre-load city coordinates
function loadGeoData() {
	fetch("./assets/js/cities.json")
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log(data);
			for (let i = 0; i < data.length; i++) {
				autoComplete[`${data[i].city}, ${data[i].state}`] = null;
			}
			jsonData = data;
		});
}

//Get user location on initial page load
function getUserLocation() {
	const geoLocation = fetch("https://ipapi.co/json")
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log(
				"Your current location is",
				data.city,
				"\n",
				"*******************************"
			);
			return data.city;
		});
}

//Find a match for City && State. NOTE: ADD 2 ARGS FOR EVENT LISTENERS
function findCityMatch() {
	let cityMatch = jsonData.find((cityId) => cityId.city === "Seattle"); // CHANGE ME || when we have event listeners ready
	let stateMatch = jsonData.find((stateId) => stateId.state === "Washington"); // CHANGE ME || when we have event listeners ready

	if (cityMatch && stateMatch) {
		userInputGeoId = jsonData.indexOf(cityMatch);
		return console.log(
			"Found a match!",
			jsonData.indexOf(cityMatch),
			cityMatch.city,
			stateMatch.state,
			"\n",
			"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
		);
	} else {
		return console.log(`Could not find ${cityMatch.city}, ${stateMatch.state}`);
	}
}

//Find and return an array that holds city coordinates
function findCityCoordinates() {
	let coordinates = [];
	coordinates.push(jsonData[userInputGeoId].latitude);
	coordinates.push(jsonData[userInputGeoId].longitude);
	console.log(
		"Your city coordinates are: \n",
		"Latitude:",
		coordinates[0],
		"Longitude",
		coordinates[1],
		"\n",
		"============================================="
	);
	return coordinates;
}

function getAutoComplete() {
	document.addEventListener("DOMContentLoaded", function () {
		const inputField = document.querySelectorAll(".autocomplete");
		M.Autocomplete.init(inputField, {
			data: autoComplete,
			limit: 5,
			minLength: 2,
		});
	});
}

//Init the app
function initApp() {
	loadGeoData();
	//Timeout required. Otherwise it hits a race condition
	setTimeout(findCityMatch, 90);
	getUserLocation();
	setTimeout(findCityCoordinates, 90);
	getAutoComplete();
}

initApp();
