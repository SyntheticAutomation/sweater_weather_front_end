/**** To change time from UNIX to normal ***/
// var time = new Date(timestamp*1000);

var weather_data = [];

$(document).ready(function() {
    ShowCurrentTime();
    getWeather("denver", "co");
    pauseThenLoadWeather();
    listenForCityChange();
})

const delay = ms => new Promise(res => setTimeout(res, ms));
const pauseThenLoadWeather = async () => {
    document.getElementById('fahrenheit-symbol').innerHTML = ""
    await delay(2000);
    document.getElementById('fahrenheit-symbol').innerHTML = "F";
    displayCurrentWeather();
    document.querySelector('.lds-roller').style.display = 'none';
  };

function ShowCurrentTime() {
    var time = moment().format('h:mm a');
    document.getElementById('current-weather__time').innerHTML = time;

    setInterval(() => {
        document.getElementById('current-weather__time').innerHTML = time;
      }, 1000);
} 

function getWeather(city, state) {
    fetch(`https://rocky-cliffs-95700.herokuapp.com/api/v1/forecast?location=${city,state}`)
    .then(response => response.json())
    .then(result => weather_data.unshift(result));
}

function displayCurrentWeather () {
    var temperature = Math.ceil(weather_data[0].data.attributes.right_now.apparentTemperature);
    document.getElementById("current-weather__temperature").innerHTML = temperature + `&deg;`

    var condition = weather_data[0].data.attributes.right_now.summary;
    document.getElementById("current-weather__condition").innerHTML = condition

    var weather_icon = weather_data[0].data.attributes.right_now.icon;
    document.getElementById("current-weather__icon").src = `./lib/img/${weather_icon}.png`
    //  import the icons here
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


// when someone clicks a location on the nav, close the nav and populate the new weather data on the cards.
function listenForCityChange() {
    document.addEventListener('click', function (event) {
        if ( event.target.classList.contains('navigation__link')) {
            document.querySelector('.lds-roller').style.display = 'inline-block'; // show spinner again
            var location = event.target.innerHTML; // location = "denver, co"
            var city = location.slice(0, -4); // "denver"
            var state = location.substr(-2); // "co"
    
            document.querySelector('#navi-toggle').click(); // close the nav radial button
            getWeather(city, state);
            pauseThenLoadWeather();
        }
    });
}
