//Define Global properties

//pre-load city coordinates
let jsonData;
let userInputGeoId;

function loadGeoData() {
	fetch("./assets/js/cities.json")
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log(data);
			return (jsonData = data);
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

async function findCityCoordinates() {
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

function initApp() {
	loadGeoData();
	//Timeout required. Otherwise it hits a race condition
	setTimeout(findCityMatch, 10);
	getUserLocation();
	setTimeout(findCityCoordinates, 10);
}

initApp();
