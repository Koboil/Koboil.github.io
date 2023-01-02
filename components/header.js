let affichageDate = document.getElementById('date');
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

affichageDate.innerHTML= day+'/'+month+'/'+year;


let timerRunning = false;
function runClock() 
{
  let today   = new Date();
  let hours   = today.getHours();
  let minutes = today.getMinutes();
  let timeValue = hours;
  timeValue += ((minutes < 10) ? "h0" : "h") + minutes;
  document.getElementById("time").innerHTML = timeValue;
  timerRunning = true;
}


 
let timerID = setInterval(runClock,1000);

let battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;

// A few useful battery properties
console.warn("Battery charging: ", battery.charging); // true
console.warn("Battery level: ", battery.level); // 0.58
console.warn("Battery discharging time: ", battery.dischargingTime);

// Add a few event listeners
battery.addEventListener("chargingchange", function(e) {
	console.warn("Battery charge change: ", battery.charging);
}, false);
battery.addEventListener("chargingtimechange", function(e) {
	console.warn("Battery charge time change: ", battery.chargingTime);
}, false);
battery.addEventListener("dischargingtimechange", function(e) {
	console.warn("Battery discharging time change: ", battery.dischargingTime);
}, false);
battery.addEventListener("levelchange", function(e) {
	console.warn("Battery level change: ", battery.level);
}, false);