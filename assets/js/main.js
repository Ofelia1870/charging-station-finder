//Additional functionality: PENDING REVIEW
function loadMap() {
	const lat = findCityCoordinates()[0];
	const lon = findCityCoordinates()[1];

	// var LeafIcon = L.Icon.extend({
	// 	options: {
	// 		iconSize: [38, 95],
	// 		shadowSize: [50, 64],
	// 		iconAnchor: [22, 94],
	// 		shadowAnchor: [4, 62],
	// 		popupAnchor: [-3, -76],
	// 	},
	// });

	// var greenIcon = new LeafIcon({
	// 	iconUrl: "http://leafletjs.com/examples/custom-icons/leaf-green.png",
	// 	shadowUrl: "http://leafletjs.com/examples/custom-icons/leaf-shadow.png",
	// });

	var map = L.map("map").setView([lat, lon], 15);

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution:
			'Map data &copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
	}).addTo(map);

	// show the scale bar on the lower left corner
	L.control.scale({ imperial: true, metric: true }).addTo(map);

	// show a marker on the map
	L.marker([47.6062095, -122.3320708])
		.bindPopup("The center of the world")
		.addTo(map);
	L.marker([45.5152, -122.6784])
		.bindPopup("The center of the world")
		.addTo(map);

	for (i in chargeMapPoi) {
		L.marker([chargeMapPoi[i][0], chargeMapPoi[i][1]])
			.bindPopup("The center of the world")
			.addTo(map);
		console.log(chargeMapPoi[i][0]);
	}
}

//Define Global properties
let jsonData;
let userInputGeoId;
let cityCoordinates = [];
let chargeMapPoi = {};

//pre-load city coordinates
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

//Open Charge Map Calls
function getChargingStations(lat, lon, max = "5") {
	console.log(lat, lon);
	let poiCallUrl =
		"https://api.openchargemap.io/v3/poi?key=>>>CHANGEME<<<&output=json&";
	let maxResults = "maxresults=" + max + "&";
	let latitude = "latitude=" + lat.toString() + "&";
	let longitude = "longitude=" + lon.toString();
	let requiredUrl = poiCallUrl + maxResults + latitude + longitude;
	console.log(requiredUrl);
	fetch(requiredUrl)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			for (let i = 0; i < data.length; i++) {
				console.log(data[i]);
				chargeMapPoi[i] = [
					data[i].AddressInfo.Latitude,
					data[i].AddressInfo.Longitude,
				];
			}
			// console.log(data, data.length);
			// return data;
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
	getChargingStations(coordinates[0], coordinates[1], "20");
	return coordinates;
}

//Init the app
function initApp() {
	loadGeoData();
	//Timeout required. Otherwise it hits a race condition
	setTimeout(findCityMatch, 90);
	getUserLocation();
	setTimeout(findCityCoordinates, 90);
	setTimeout(loadMap, 1200);
}

initApp();
