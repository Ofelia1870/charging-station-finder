# EV Charging Station Locator

- View GitHub [Repo](https://github.com/Ofelia1870/charging-station-finder)
- View [Webpage](https://ofelia1870.github.io/charging-station-finder/)

## Overview

Original idea did not include any of the map API as we were concerned with timing, but after doing a quick research, we felt comfortable making a pivot and extended app functionality by adding a map to it. That immediately felt like a boot to UX as it greatly simplified the interaction with the app. The first challenge was to have the following data readily available: City, State, Latitude, Longitude. And rather than relying on another API, made a call to have a local file [US Cities](https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json) that was slightly modified to fit our use case. The file that stores all the data that we need is only `86K` in size a compromise we were OK with considering the fact that it will be used extensively by almost all of our functions.

All of remote APIs we chose had good documentation which made the development process smooth.

### List of APIs, Frameworks and Libraries used:

## Frameworks:

1. [Materialize](https://materializecss.com/)

## APIs

1. [OpenStreetMap](https://www.openstreetmap.org/) | Remote API
2. [OpenChargeMap](https://openchargemap.org/) | Remote API
3. [IPAPI](https://ipapi.co/api/) | Remote API
4. [US Cities](https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json) | local API

## Libraries

1. [leafletjs](https://leafletjs.com/)

## Key Topics

The following topics will be covered in this unit:

- [Server-side APIs](https://en.wikipedia.org/wiki/Web_API)

- [Git branching workflow](https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows)

- [Agile software development](https://en.wikipedia.org/wiki/Agile_software_development)

## Learning Objectives

You will be employer-ready if you are able to:

- Speak technically about a feature you implemented in your project

- Explain and execute git branching workflow in a collaborative project

- Resolve merge conflicts

- Explain agile software development

- Design, build, and deploy a client-side web application using GitHub Pages

- Prepare a professional presentation and repository README for your project

## Homework

With your team, you'll conceive and execute a design that solves a real-world problem by integrating data received from multiple server-side API requests. You will also learn about agile development methodologies to help you work collaboratively. You will implement feature and bug fixes using git branch workflow and pull requests.

You will write your own user stories and acceptance criteria in GitHub Issues to help your team stay on track with the project. Using GitHub Project as a means to track the status of your project tasks will help you understand the benefits of Kanban boards.

## Career Connection

For more information about career services, including coding milestones, demo days, technical toolkits, workshops, and additional resources, visit the [career services website](https://careernetwork.2u.com/?utm_medium=Academics&utm_source=boot_camp/).

## Heads-Up

In the next unit, you'll continue to work on your group projects. You'll end the week by presenting your project to your class. Once your project is complete, you'll want to update your professional materials and add your new project to your portfolio.

## Resources

Here are some additional resources to help solidify the topics covered in this unit.

### Full-Stack Blog Posts

Check out the [Full-Stack Blog](https://coding-boot-camp.github.io/full-stack/) for additional resources, like walkthroughs, articles, and installation guides.

- 📖 [API Resources](https://coding-boot-camp.github.io/full-stack/apis/api-resources)

### General

Refer to these resources for additional information about topics covered in this unit.

- 📖 [Learn Enough Git to Be Dangerous](https://www.learnenough.com/git-tutorial/getting_started)

---

© 2022 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
