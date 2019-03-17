# Sweater Weather: Front End
Deployed at: 

This repository hosts the front end code for the backend API we built last module. 

The backend API is hosted at:
https://github.com/SyntheticAutomation/sweater_weather

## Setup

To access this repository locally, clone the repository by entering this in your shell:

`git clone https://github.com/SyntheticAutomation/sweater_weather_front_end.git`

Otherwise, use the deployed version by visiting:
 https://syntheticautomation.github.io/sweater_weather_front_end/

## How to Use

This app can load any US location's weather data as long as it is a recognized city. Upon page load, users will have the ability to enter a city and state and click Submit to see all of the weather data for that area. 

Once this has been done, if you'd like to see different weather data, you can click the nav button in the top left and select the major US City. If you want to access your original location again, you can simply click "My Location". If you'd like to enter a new custom location you'll just reload the page and the form will be there again.

## Known Issues
- The Weather API used on the backend is DarkSky which has a 1000 request rate limit. This caused some major problems in development since there were lots of refreshes during styling changes and javascript edits. Commercial version of this would either use a custom weather api or just pay darksky to exceed the rate limit to scale up to thousands of users.

- There are lots of endpoints available to be added into this front-end app. Login, flickr images, favoriting locations, and more are still to be programmed in.

## Project Management
Agile Board: https://waffle.io/SyntheticAutomation/sweater_weather_front_end

RIP Waffle! (May 16 2019)

## Design/Features
This project uses the following design principles & strategies:

- CSS
    - 7-1 Architecture
    - SCSS Syntax
    - Easing Functions
    - Custom Animations
    - Advanced Built-in Animations: cubic bezier, translate, rotate, scale and more

- HTML
    - BEM (Block Element Modifier) Tag Conventions
    - Custom Grids

- JavaScript
    - Event Bubbling
    - Async / Await 
    - API Fetch

## Tools & Technologies
- HTML5
- CSS3
- Sass/SCSS
- JavaScript
- Icons8
- [PureCSSLoader](https://loading.io/css/)
- MomentJS

## Preview
!["Dashboard"](./lib/img/dashboard.png "Dashboard")
!["Navigation"](./lib/img/nav.png "Navigation")

