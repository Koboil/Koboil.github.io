//Calculatrice
const zeroAbs = 0;
let equation =  new Array(); 
let equationBis = new Array();
let temp = ''; 
let resultat = 0;
let affiche = document.getElementById("resultat");
const histoResult= document.getElementById("histoResult");
const equationUtilisateur = document.getElementById("equationUtilisateur"); 
affiche.innerHTML = resultat;
const afficheEqua = document.getElementById("afficheEqua");
afficheEqua.innerHTML = 0;
let affichageResultat;





//On stock l'entrée de l'utilisateur dans un array nommé "equation"
function ajoutEquation(x) {
    affiche.innerHTML = 0;
    //On sauvegarde nos éléments dans l'Array
    equation.push(x);
    //TEST (A SUPPRIMER UNE FOIS FINI !)
    console.log(equation);

    if (afficheEqua.innerHTML == 0) {
        afficheEqua.innerHTML = x; 
    }
    else {
        afficheEqua.innerHTML += x;
    }
    
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
            //(le '' permet de ne pas additionner mais de concatainer)
            temp= temp +''+ element
        }
    }
    
    let numb = Number(temp);
    equationBis.push(numb);
    console.log(equationBis);
    //calcul de l'opération de l'utilisateur
    for (const element of equationBis) {
        
       /*
        *
        * On gère l'ordre des priorité comme suit 
        *  
        * Division
        * puis Multiplication
        * puis Addition
        * et enfin Soustraction
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

    //    

    equationUtilisateur.innerHTML = equation.join(''); 
    histoResult.innerHTML = ' = '+resultat;
    affiche.innerHTML = resultat;
   

    //reset des variable permettant à l'utilisateur de continuer ses calculs sans avoir à refresh ses opérations
    resultat = 0; 
    equation =  new Array(); 
    console.log(equationBis);
    equationBis = new Array();
    afficheEqua.innerHTML = 0;
    temp = 0;

}
