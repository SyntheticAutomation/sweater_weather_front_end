/**** To change time from UNIX to normal ***/
// var time = new Date(timestamp*1000);

function ShowCurrentTime() {
    var time = moment().format('h:mm a');
    document.getElementById('current-time').innerHTML = time;

    setInterval(() => {
        document.getElementById('current-time').innerHTML = time;
      }, 1000)
} 

ShowCurrentTime();