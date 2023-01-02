let seconde; 
let nombreInstance; 
let minuterie = document.getElementById('minuterie');
let boutonMinuterie = document.getElementById('boutonMinuterie');


//Dès que le bouton est appuyé on lance le timer en charge de retirer des secondes toutes les secondes.
boutonMinuterie.addEventListener('click',(event) => {
    seconde = 60;
    clearTimeout(nombreInstance);
    LancementMinuterie();
  });



//ici on gère le retrait de seconde de notre timer
function suppressionSeconde(){
    seconde -= 1; 
}

// LancementMinuterie représente notre fonction principale.
function LancementMinuterie() {
    if (seconde>0)  {
        suppressionSeconde();      
        minuterie.innerHTML =  (seconde > 9 ? seconde + " seconde(s) restante(s)<br>" : "0" + seconde + " seconde(s) restante(s)<br>");
        timerSeconde();
    }
    else {
        seconde=60;
    }
}

//la fonction timerSeconde permet d'exécuter notre fonction principale 
//(LancementMinuterie) toutes les secondes
function timerSeconde() {
    if(seconde!=60) nombreInstance = setTimeout(LancementMinuterie, 1000);
}


/*
*
*On switch d'appel entre timerSeconde et LancementMinuterie pour effectuer une boucle. 
*On sortira de ce cercle une fois que notre if ne sera plus bon.
*
*/