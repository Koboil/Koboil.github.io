//Calculatrice
const zeroAbs = 0;
let equation =  new Array(); 
let equationBis = new Array();
let equationUtilisateur = document.getElementById("equationUser"); 
equationUtilisateur.innerHTML = '';
let temp = ''; 
let resultat = 0;
let affiche; 
affiche = document.getElementById("resultat");
affiche.innerHTML = resultat;
//let historique = new Array();


//TODO 
/*
function afficheEquation() {
    if (equation.length == 0) {
        document.getElementById(equation).innerHTML
    }
    else{
        document.getElementById(equation).innerHTML =     
    }
}
*/




//On stock l'entrée de l'utilisateur dans un array nommé "equation"
function ajoutEquation(x) {
    //On sauvegarde nos éléments dans l'Array
    equation.push(x);
    //TEST (A SUPPRIMER UNE FOIS FINI !)
    console.log(equation);
    equationUtilisateur.innerHTML += x;
}

function resultatFinal() {
    //Ici on va transformer notre array en une équation plus facilement interprétable
    for (const element of equation) {
        //On vérifie que l'élément qu'on parcourt n'est pas un chiffre
        if(isNaN(element)) { 
            //Si c'est le cas, on s'arrête de concatainer notre nombre car ce dernier est désormais complet
            let numb = Number(temp);
            //Une fois le nombre complet créé on le save dans notre second array
            equationBis.push(numb);
            //On save ensuite notre opérateur à la suite de notre nombre
            equationBis.push(element);
            //On reset notre variable nombre pour save le prochain
            temp= '';
        }
        else{
            //On concataine notre nombre jusqu'au prochain opérateur
            temp= temp + element
        }
    }

    let numb = Number(temp);
    equationBis.push(numb);
    console.log(equationBis)

    for (const element of equationBis) {
        /*
        *
        * On gère l'ordre des priorité comme suit 
        *  
        * Division
        * Multiplication
        * Addition
        * Soustraction
        * 
        */

        //Division
        while(equationBis.includes('/')) { //On regarde si notre équation comporte une division
            //On récupère l'emplacement de la division
            const divIndex = equationBis.indexOf('/'); 
            //On assigne les deux valeurs que l'on va traiter 
            const number1 = equationBis[divIndex-1];
            const number2 = equationBis[divIndex+1];
            //On stock le résultat dans une constante
            const result = number1/number2;
            //On remplace le premier élément par le résultat
            equationBis[divIndex-1]= result;
            //On supprime les deux autres éléments désormais inutiles puisqu'ils ont étaient traités 
            equationBis.splice(divIndex, 2);
        }

        //Multiplication
        while(equationBis.includes('*')) {
            const mulIndex = equationBis.indexOf('*'); 
            const number1 = equationBis[mulIndex-1];
            const number2 = equationBis[mulIndex+1];
            const result = number1*number2;
            equationBis[mulIndex-1]= result;
            equationBis.splice(mulIndex, 2);
        }

        //Addition
        while(equationBis.includes('+')) {
            const addIndex = equationBis.indexOf('+'); 
            const number1 = equationBis[addIndex-1];
            const number2 = equationBis[addIndex+1];
            const result = number1+number2;
            equationBis[addIndex-1]= result;
            equationBis.splice(addIndex, 2);
        }

        //Soustraction
        while(equationBis.includes('-')) {
            const subIndex = equationBis.indexOf('-'); 
            const number1 = equationBis[subIndex-1];
            const number2 = equationBis[subIndex+1];
            const result = number1-number2;
            equationBis[subIndex-1]= result;
            equationBis.splice(subIndex, 2);
        }
        resultat = equationBis[0];

    }
    //historique.push(equationUtilisateur.innerHTML);
    affiche.innerHTML = resultat;
}