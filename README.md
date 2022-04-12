# EV Charging Station Locator

- View GitHub [Repo](https://github.com/Ofelia1870/charging-station-finder)
- View [Webpage](https://ofelia1870.github.io/charging-station-finder/)

## Table of Contents

- [Project Description](https://github.com/Ofelia1870/charging-station-finder/#project-description)
- [User Story](https://github.com/Ofelia1870/charging-station-finder/#user-story)
- [Overview](https://github.com/Ofelia1870/charging-station-finder/#overview)
- [List of APIs Frameworks and Libraries used:](https://github.com/Ofelia1870/charging-station-finder/#List-of-APIs-Frameworks-and-Libraries-used:)
- [Our Contact Info](https://github.com/Ofelia1870/charging-station-finder/#our-contact-info)

# Project Description

This is our team's first group project where we created a one page app that allows a user to search for electric vehicle charging stations nearby or at a specific location/city based on the city that they input in the search bar. The page initially loads a home page with a search bar, a search icon, a menu icon, and an automatically generated map loads with pinneed charging stations near their current location (based on their IP Address). The user has the ability to click on the search bar and input a city of their choice and once they select an autocompleted city and click on the search icon, the page will load up pinned charging station locations found within their searched city. If the user clicks on the menu icon a side nav bar will pop up where the user is able to click on the section titled (Nearby) which then displays a dropdown list of all charging stations located in the city they have searched, with some extra information about each specific charging station, as well as a star icon where the user is able to save a specific charging station and add it to their favorites. Underneath the Nearby section, there is a favorites section which will include the user's favorited locations. On the map itself, the user is able to click on a specific pin where a card with information about that specific charging station is displayed; within the card, the user is able to click to save and open google maps nto navigate to the pinned location that they selected. At the bottom of the page, the user is able to click on the github icon which will redirect them to our project's repo page on github.

# User Story

```
AS AN owner of an electric vehicle
I WANT to be able to view a generated list and map of nearby charging stations
SO THAT I am able to save a desired amount of charging station locations
GIVEN my search query is successful
WHEN I click on a pinned charging station location
THEN I am presented with a card that displays information specific to the pin selected
WHEN I click on the menu icon
THEN I am presented with a side nav bar that displays a Nearby and Favorites section
WHEN I click on the Nearby section
THEN I am presented with a dropdown list of charging station locations within my searched city
WHEN I click on the star icon
THEN I am able to save and view that specific card within my Favorites section
```

# Overview

Original idea did not include any of the map API as we were concerned with timing, but after doing a quick research, we felt comfortable making a pivot and extended app functionality by adding a map to it. That immediately felt like a boot to UX as it greatly simplified the interaction with the app. The first challenge was to have the following data readily available: City, State, Latitude, Longitude. And rather than relying on another API, made a call to have a local file [US Cities](https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json) that was slightly modified to fit our use case. The file that stores all the data that we need is only `86K` in size a compromise we were OK with considering the fact that it will be used extensively by almost all of our functions.

All of remote APIs we chose had good documentation which made the development process smooth.

# List of APIs Frameworks and Libraries used:

## Frameworks:

1. [Materialize](https://materializecss.com/)

## APIs

1. [OpenStreetMap](https://www.openstreetmap.org/) | Remote API
2. [OpenChargeMap](https://openchargemap.org/) | Remote API
3. [IPAPI](https://ipapi.co/api/) | Remote API
4. [US Cities](https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json) | local API

## Libraries

1. [leafletjs](https://leafletjs.com/)

# Our Contanct Info

Emails: rkutsel@gmail.com, scarletfedora@gmail.com, ofeliasanchez30@gmail.com

Git Hub Pages:

Link to our Project: https://github.com/Ofelia1870/charging-station-finder
