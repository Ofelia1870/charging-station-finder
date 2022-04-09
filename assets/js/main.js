//Define Global properties

let jsonData;
let userInputGeoId;
let cityCoordinates = [];
let autoComplete = {};
let chargeMapPoi = {};
let chargeMapData = {};

//Event Listeners
const userInputEl = document.getElementById("autocomplete-input");
const userButtonEl = document.getElementById("search-btn");
userButtonEl.addEventListener("click", captureUserInput);

function captureUserInput(event) {
	const userInput = event.target;
	const inputVal = userInputEl.value;
	if (!inputVal || inputVal < 3) {
		return;
	} else {
		const inputMatch = inputVal.split(",");
		console.log(inputMatch);
		findCityMatch(inputMatch[0], inputMatch[1]);
	}
}

function loadMap() {
	const mapEl = document.getElementById("map");
	mapEl.removeAttribute("id");
	const mapContainer = document.getElementById("leaflet");
	mapDiv = document.createElement("div");
	mapDiv.setAttribute("id", "map");
	mapContainer.appendChild(mapDiv);

	const lat = cityCoordinates[0];
	const lon = cityCoordinates[1];

	let map = L.map("map").setView([lat, lon], 15);

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution:
			'Map data &copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
	}).addTo(map);

	// show the scale bar on the lower left corner
	L.control.scale({ imperial: true, metric: true }).addTo(map);

	for (i in chargeMapPoi) {
		L.marker([
			chargeMapPoi[i].AddressInfo.Latitude,
			chargeMapPoi[i].AddressInfo.Longitude,
		])
			.bindPopup(
				`<div class="row">
          <div class="col 12">
            <div class="card">
              <div class="card-image">
                <img src="./assets/img/e-station-plug.jpg">
              </div>
              <div class="card-content">
                <p><b>Address Info:</b> ${chargeMapPoi[i].AddressInfo.Title}
                I am convenient because I require little markup to use effectively.</p>
                </br><b>Data Provider:</b> <a href='https://${chargeMapPoi[i].DataProvider.Title}'>${chargeMapPoi[i].DataProvider.Title}</a>
              </div>
              <div class="card-action">
              <a href='https://www.google.com/maps?q=${chargeMapPoi[i].AddressInfo.Latitude},${chargeMapPoi[i].AddressInfo.Longitude}'>Navigate</a>
              </div>
              <div class="card-action">
                <a id="poi" data-poi-id="${i}" href="#">Save</a>
              </div>
            </div>
          </div>
      </div>`,
				{ closeButton: false }
			)
			.addTo(map);
		console.log(chargeMapPoi[i].AddressInfo.Latitude);
	}
	cityCoordinates = [];
	setTimeout(dropPinSelect, 2000);
}

function dropPinSelect() {
	const dropPinArea = document.getElementsByClassName("leaflet-marker-pane");
	dropPinArea.addEventListener("click", (event) => {
		console.log(event.target);
	});
}

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
			getUserLocation();
		});
}

//Open Charge Map Calls
function getChargingStations(lat, lon, max = "5") {
	console.log(lat, lon);
	let poiCallUrl = "https://api.openchargemap.io/v3/poi?key=mykey&output=json&";
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
			chargeMapPoi = data;
			loadMap();

			//Saves Charging Stations to LS
			for (let i = 0; i < data.length; i++) {
				chargeMapData[i] = {
					title: data[i].AddressInfo.Title,
					address: data[i].AddressInfo.AddressLine1,
					phonenumber: data[i].AddressInfo.ContactTelephone1,
					chargeLvl: data[i].Connections[0].LevelID,
				};
				console.log(chargeMapData[i]);
				localStorage.setItem(lat + " " + lon, JSON.stringify(chargeMapData));
			}
		});
}

//Get user location on initial page load
function getUserLocation() {
	const geoLocation = fetch("https://ipapi.co/json")
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				findCityMatch();
			}
		})
		.then((data) => {
			findCityMatch(data.city);

			console.log(
				"Your current location is",
				data.city,
				"\n",
				"*******************************"
			);
		})
		.catch((error) => {
			findCityMatch();
		});
}

//Find a match for City && State. NOTE: ADD 2 ARGS FOR EVENT LISTENERS
function findCityMatch(city = "Portland", state = "Oregon") {
	// console.log(city);
	let cityMatch = jsonData.find((cityId) => cityId.city === city);
	let stateMatch = jsonData.find((stateId) => stateId.state === state);

	if (cityMatch || (cityMatch && stateMatch)) {
		userInputGeoId = jsonData.indexOf(cityMatch);
		findCityCoordinates();
		return console.log(
			"Found a match!",
			jsonData.indexOf(cityMatch),
			cityMatch.city,
			// stateMatch.state,
			"\n",
			"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
		);
	} else {
		// changed to return undefined if match is not found
		return undefined;
	}
}

//Find and return an array that holds city coordinates

function findCityCoordinates() {
	cityCoordinates.push(jsonData[userInputGeoId].latitude);
	cityCoordinates.push(jsonData[userInputGeoId].longitude);
	console.log(
		"Your city coordinates are: \n",
		"Latitude:",
		cityCoordinates[0],
		"Longitude",
		cityCoordinates[1],
		"\n",
		"============================================="
	);
	getChargingStations(cityCoordinates[0], cityCoordinates[1], "20");
}

function getAutoComplete() {
	document.addEventListener("DOMContentLoaded", function () {
		const inputField = document.querySelectorAll(".autocomplete");
		M.Autocomplete.init(inputField, {
			data: autoComplete,
			limit: 5,
			minLength: 3,
		});
	});

	document.addEventListener("DOMContentLoaded", function () {
		const sideNavEl = document.querySelectorAll(".sidenav");
		const sideNavInit = M.Sidenav.init(sideNavEl, { edge: "right" });
		const instanceEl = M.Sidenav.getInstance(sideNavInit);
	});
}

//Added Event Listener for Displaying Error Message with Invalid Text
userButtonEl.addEventListener("click", captureInvalidText);
//Created a function to display error message when invalid text is searched
function captureInvalidText(event) {
	let userInput = event.target;
	let invalidText = document.getElementById("invalidInput");
	const inputVal = userInputEl.value;
	const errorType = invalidText.getAttribute("data-error");
	const successType = invalidText.getAttribute("data-success");
	if (!inputVal || inputVal.length < 3) {
		return (invalidText.innerHTML = errorType);
	} else {
		return (invalidText.innerHTML = successType);
	}
}

//Init the app
function initApp() {
	loadGeoData();
	getAutoComplete();
}

initApp();
