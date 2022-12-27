let timerRunning = false;
function runClock() 
{
  let today   = new Date();
  let hours   = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  let timeValue = hours;
 
  // Les deux prochaines conditions ne servent que pour l'affichage.
  // Si le nombre de minutes est inférieur à 10, alors on ajoute un 0 devant...
 
  timeValue += ((minutes < 10) ? "h0" : "h") + minutes;
  timeValue += ((seconds < 10) ? "m0" : "m") + seconds;
  timeValue += "s"
  document.getElementById("time").innerHTML = timeValue;
  timerRunning = true;
}


 
let timerID = setInterval(runClock,1000);