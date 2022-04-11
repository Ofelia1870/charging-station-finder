//Define Global properties

let jsonData;
let userInputGeoId;
let cityCoordinates = [];
let autoComplete = {};
let chargeMapPoi = {};
let chargeMapData = {};
let favoritePoiItem = {};

//Event Listeners
const userInputEl = document.getElementById("autocomplete-input");
const userButtonEl = document.getElementById("search-btn");

document.addEventListener("DOMContentLoaded", favList);
userButtonEl.addEventListener("click", captureUserInput);

//This initializes the collapsible lists in the sidenav
function favList() {
  let collapsEl = document.querySelectorAll(".collapsible");
  M.Collapsible.init(collapsEl);
}

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
      // Added class="sav-poi" and class="navigate-btn to be able to change colors in css"
      .bindPopup(
        `<div class="row">
          <div class="col 12">
            <div class="card z-depth-1">
              <div class="card-image">
                <img src="./assets/img/e-station-plug.jpg">
              </div>
              <div class="card-content">
                <b>Location Info:</b> ${chargeMapPoi[i].AddressInfo.Title}
                </br></br><b>Provided by:</b> <a href='https://${chargeMapPoi[i].DataProvider.Title}'>${chargeMapPoi[i].DataProvider.Title}</a>
              </div>
              <div class="card-action">
              <a class="navigate-btn" href='https://www.google.com/maps?q=${chargeMapPoi[i].AddressInfo.Latitude},${chargeMapPoi[i].AddressInfo.Longitude}'>Navigate</a>
              </div>
              <div class="card-action">
                <a id="poi" class="save-poi" data-poi-id="${i}" href="#" onclick="saveCard()">Save</a>
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
}

function saveCard() {
  const showCard = document.getElementById("poi");
  showCard.addEventListener("click", (event) => {
    event.preventDefault();
    const saveBtn = event.target;
    console.log(saveBtn);
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
          // phonenumber: data[i].AddressInfo.ContactTelephone1,
          // chargeLvl: data[i].Connections[0].LevelID,
        };
        //console.log(chargeMapData[i]);
        localStorage.setItem(lat + " " + lon, JSON.stringify(chargeMapData));
      }
      locationCards(lat, lon);
    });
}

//This will clear the current list of Info-cards in the side-bar,
//and re-fill it with new Infocards based on the new coordinates
function locationCards(lat, lon) {
  let cityKey = lat + " " + lon;

  let stationData = JSON.parse(localStorage.getItem(cityKey));
  console.log(stationData);

  sidebarList = document.querySelector(".collection");
  //let parent = document.getElementById("cardParent");

  while (sidebarList.firstChild) {
    sidebarList.removeChild(sidebarList.firstChild);
  }

  sidebarList = document.querySelector(".collection");

  //this is the for-loop for the Info-cards
  for (let i = 0; i < 5; i++) {
    console.log(stationData[i]);

    let cardEl = document.createElement("li");
    let navIconEl = document.createElement("i");
    let favIconEl = document.createElement("i");
    let titleEl = document.createElement("span");
    let paraEl = document.createElement("p");
    let paraEl2 = document.createElement("p");
    let aEl = document.createElement("a");

    let nullEl = document.createElement("p");
    nullEl.textContent = "Not Available";

    cardEl.classList.add(
      "collection-item",
      "avatar",
      "grey",
      "darken-3",
      "grey-text",
      "text-lighten-5"
    );
    sidebarList.append(cardEl);

    navIconEl.classList.add("#7cb342", "material-icons", "circle");
    navIconEl.style.backgroundColor = "#7cb342";
    navIconEl.textContent = "navigation";
    cardEl.append(navIconEl);

    titleEl.classList.add("title");
    titleEl.textContent = stationData[i].title;
    cardEl.append(titleEl);

    paraEl.textContent = stationData[i].phonenumber;
    cardEl.append(paraEl);

    paraEl2.textContent = "Charge Level: " + stationData[i].chargeLvl;
    cardEl.append(paraEl2);

    aEl.href = "#!";
    aEl.classList.add("secondary-content");
    cardEl.append(aEl);

    favIconEl.classList.add("material-icons");
    // added id and changed default icon color to white
    favIconEl.setAttribute("id", "fav-icon");
    favIconEl.style.color = "#ffffff";
    favIconEl.textContent = "grade";
    aEl.append(favIconEl);
  }
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

function captureInvalidText(event) {
  let userButtonEl = document.getElementById("search-btn");
  userButtonEl = event.target;
  let invalidText = document.getElementById("invalidInput");
  const inputVal = userInputEl.value;
  let errorType = invalidText.getAttribute("data-error");
  const successType = invalidText.getAttribute("data-success");
  if (!inputVal || inputVal.length < 3) {
    invalidText.innerHTML = errorType;
  } else {
    invalidText.innerHTML = successType;
  }
  // ADDED set timeout function to get text to disappear after 3 sec
  setTimeout(function () {
    invalidText.innerHTML = "";
  }, 3000);
}

//Init the app
function initApp() {
  loadGeoData();
  getAutoComplete();
}

initApp();
