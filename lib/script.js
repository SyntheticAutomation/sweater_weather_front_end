/**** To change time from UNIX to normal ***/
// var time = new Date(timestamp*1000);

$(document).ready(function() {
    ShowCurrentTime();
    currentTemperature("denver", "co")
})


function ShowCurrentTime() {
    var time = moment().format('h:mm a');
    document.getElementById('current-weather__time').innerHTML = time;

    setInterval(() => {
        document.getElementById('current-weather__time').innerHTML = time;
      }, 1000)
} 


function currentTemperature(city, state) {
    var obj;
    fetch(`https://rocky-cliffs-95700.herokuapp.com/api/v1/forecast?location=${city,state}`)
        .then(res => res.json())
        .then(data => obj = data)
        .then(() => document.getElementById("current-weather__temperature").innerHTML = Math.ceil(obj.data.attributes.right_now.apparentTemperature) + `&deg;` + "F")
    
}