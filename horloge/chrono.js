/*
*
*
*   Début de la
*   Partie : 
*   Chronomètre
*
*
*/

let h1 = document.getElementsByTagName('h1')[0];
let startB = document.getElementById('strt');
let stopB = document.getElementById('stp');
let resetB = document.getElementById('rst');
let sec = 0;
let min = 0;
let hrs = 0;
let t;

//ici on gère le passage de seconde à minute et de minute à heure
function tick(){
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
            min = 0;
            hrs++;
        }
    }
}

// add représente notre fonction principale.
function add() {
    tick();
    h1.textContent = (hrs > 9 ? hrs : "0" + hrs) 
        	 + ":" + (min > 9 ? min : "0" + min)
       		 + ":" + (sec > 9 ? sec : "0" + sec);
    timer();
}

//la fonction timer permet d'exécuter notre fonction principale (add) toutes les secondes
function timer() {
    t = setTimeout(add, 1000);
}



startB.addEventListener('click', (event) => {
    timer();
    disableButton(startB);
    enableButton(stopB);
    enableButton(resetB);

  });

stopB.addEventListener('click',(event) => {
    clearTimeout(t);
    enableButton(startB);
    disableButton(stopB);
  });

resetB.addEventListener('click',(event) => {
    h1.textContent = "00:00:00";
    sec = 0; min = 0; hrs = 0;
    clearTimeout(t);
    enableButton(startB);
    disableButton(resetB);
    disableButton(stopB);
  });

  function disableButton(bouttonADisable) {
    bouttonADisable.disabled = true; 
  }

  function enableButton(bouttonAEnable) {
    bouttonAEnable.disabled = false; 
  }
/*
*
*
*   Fin de la
*   Partie : 
*   Chronomètre
*
*
*/

