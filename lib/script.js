var my_location = ""
var my_city = ""
var my_state = ""
var weather_data = [];

$(document).ready(function() {
    document.querySelector('.dashboard').style.visibility = "hidden";
    listenForCityChange();
    
})

const delay = ms => new Promise(res => setTimeout(res, ms));
const pauseThenLoadWeather = async () => {
    var form = document.getElementById('location-form');
    var dash = document.querySelector('.dashboard');
    var spinner = document.querySelector('.lds-roller');

    if (form.style.display != "none" || dash.style.visibility === "hidden") { // if the user can see the input or the dashboard is hidden
        form.style.display = "none"; // hide the input
        dash.style.visibility = "visible"; // show the dashboard
        dash.style.animation = "fadeIn 1s ease-in"; // animate the dashboard as it becomes visible
    }

    document.getElementById('fahrenheit-symbol').innerHTML = ""
    await delay(3000);
    document.getElementById('fahrenheit-symbol').innerHTML = "F";
    displayCurrentWeather();
    spinner.style.visibility = 'hidden';
  };

function ShowCurrentTime() {
    var relative_time = moment.unix(weather_data[0].data.attributes.right_now.time);
    document.getElementById('current-weather__time').innerHTML = moment(relative_time).format('h:mm A');
} 

function getWeather(city, state) {
    // if the city/state combination is already stored, find and use it instead of making a new call. else, make a new call.
    var saved_locations = searchArrayForLocation(weather_data); //hoisted object (function defined on line 109)

    if (saved_locations.includes(`${city},${state}`)) { // if weather_data contains the city/state combination
        var i = saved_locations.indexOf(`${city},${state}`)
        weather_data[0] = weather_data[i]; // make the first item in the weather_data array equal the stored api response for that location.
        console.log("requested location is already stored. loading stored weather info...") 
    } else {
        fetch(`https://rocky-cliffs-95700.herokuapp.com/api/v1/forecast?location=${city},${state}`)
        .then(response => response.json())
        .then(result => weather_data.unshift(result));
    }
}

function displayCurrentWeather () {
    var temperature = Math.round(weather_data[0].data.attributes.right_now.apparentTemperature);
    document.getElementById("current-weather__temperature").innerHTML = temperature + `&deg;`;

    var condition = weather_data[0].data.attributes.right_now.summary;
    document.getElementById("current-weather__condition").innerHTML = condition;

    var weather_icon = weather_data[0].data.attributes.right_now.icon;
    document.getElementById("current-weather__icon").src = `./lib/img/${weather_icon}.png`; //import the relevant weather icon

    var current_location = weather_data[0].data.attributes.location;
    var current_city = current_location.slice(0, -3).toUpperCase();
    var current_state = current_location.substr(-2).toUpperCase();
    document.getElementById("current-weather__location").innerHTML = current_city;

    var windspeed = Math.round(weather_data[0].data.attributes.right_now.windSpeed);
    document.getElementById("current-weather__windspeed").innerHTML = 'Winds at ' + windspeed + ' mph';

    ShowCurrentTime();
    displayHourlyForecast();
    displayDailyForecast();
}

// when someone clicks a location on the nav, close the nav and populate the new weather data on the cards.
function listenForCityChange() {
    document.addEventListener('click', function (event) {
        // event bubbling with 1 class for multiple elements.
        if ( event.target.classList.contains('navigation__link')) {
            document.querySelector('#navi-toggle').click(); // close the nav radial button
            document.querySelector('.lds-roller').style.visibility = 'visible'; // show spinner again
            var new_location = event.target.innerHTML; // location = "denver, co"
            
            if (new_location === "my location") {

                getWeather(my_city, my_state);
                pauseThenLoadWeather();
            } else {
                var new_city = new_location.slice(0, -4); // "denver"
                var new_state = new_location.substr(-2); // "co"
                
                getWeather(new_city, new_state);
                pauseThenLoadWeather();
            }
        }
    });
}

function respondToInput() {
    my_location += document.getElementById('my-location-field').value.toLowerCase(); //sanitize user input to lowercase
    my_city +=  my_location.slice(0, -4);// "dallas"
    my_state +=  my_location.substr(-2);// "tx"
    getWeather(my_city, my_state);
    pauseThenLoadWeather();
}

function searchArrayForLocation(array) {
    var saved_locations = array.map(function (element) {
        return element.data.attributes.location;
      });
    return saved_locations;
}

function displayHourlyForecast() {
    var hourly_condition = weather_data[0].data.attributes.hourly.summary;
    document.querySelector('.hourly__condition').innerHTML = hourly_condition;

    var hourly_data = weather_data[0].data.attributes.hourly.data; //array with all the time data

    for (var i = 0; i < 7; i++) { // display only 6 hours ahead, so i < 7
        if (i === 0) {
            continue;
        } else {
            var relative_time = moment.unix(hourly_data[i].time);
            document.querySelector(`.ahead__${i}-hours--time`).innerHTML = moment(relative_time).format('h') + "pm";
            document.querySelector(`.ahead__${i}-hours--icon`).src = `./lib/img/${hourly_data[i].icon}.png`;
            document.querySelector(`.ahead__${i}-hours--temp`).innerHTML = Math.round(hourly_data[i].temperature) + `&deg;`;
        }
    }
}

function displayDailyForecast() {
    var conditions_this_week = weather_data[0].data.attributes.daily.summary;
    document.querySelector('.daily__condition').innerHTML = "This Week: " + conditions_this_week;

    var daily_data = weather_data[0].data.attributes.daily.data;

    for (var i = 0; i < 8; i++) {
        if (i === 0) {
            continue;
        } else {
            var day_name = new Date(daily_data[i].time * 1000).toDateString().slice(0, 3);
            document.querySelector(`.day__${i}--name`).innerHTML = day_name; // "Mon", "Tue", etc
            document.querySelector(`.day__${i}--icon`).src = `./lib/img/${daily_data[i].icon}.png`;
            document.querySelector(`.day__${i}--temp`).innerHTML = Math.round(daily_data[i].temperatureLow) + `&deg;` + ` - ` + Math.round(daily_data[i].temperatureHigh) + `&deg;`;
            if (daily_data[i].icon === "rain") {
                // Fixes rain icon position. had some issues with it being too far down on Y axis due to its design. 
                // This was only true on the daily footer.
                document.querySelector(`.day__${i}--icon`).style.transform = "translateY(-15px)"; // move icon up 15px
            }
        }
    }
}



/* 
WEATHER API ICON CONDITIONS
    // clear-day
    // clear-night
    // rain
    // snow
    // sleet
    // wind
    // fog
    // cloudy
    // partly-cloudy-day
    // partly-cloudy-night
    // hail
    // thunderstorm
    // tornado
*/