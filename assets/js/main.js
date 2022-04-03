//Define Global properties

//pre-load city coordinates
let getData = [];

function loadGeoData() {
	fetch("./assets/js/cities.json")
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log(data);
			return (getData = data);
		});
}

//Find a match for City && State. NOTE: ADD 2 ARGS FOR EVENT LISTENERS
function findCityMatch() {
	console.log(getData);
	let cityMatch = getData.find((cityId) => cityId.city === "Seattle"); // CHANGE ME || when we have event listeners ready
	let stateMatch = getData.find((stateId) => stateId.state === "Washington"); // CHANGE ME || when we have event listeners ready

	if (cityMatch && stateMatch) {
		return console.log("Found a match!", cityMatch.city, stateMatch.state);
	} else {
		return console.log(`Could not find ${cityMatch.city}, ${stateMatch.state}`);
	}
}

function initApp() {
	loadGeoData();
	//Timeout required. Otherwise it hits a race condition.
	setTimeout(findCityMatch, 90);
}

initApp();
