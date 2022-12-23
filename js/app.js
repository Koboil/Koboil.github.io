//Calculatrice
const histoResult = document.getElementById("histoResult");
const afficheEqua = document.getElementById("afficheEqua");
const affiche = document.getElementById("resultat");
affiche.innerHTML = 0;
afficheEqua.innerHTML = 0;
let eqString = "";
isCalculDone = false;
let history = [];

//On stocke l'entrée de l'utilisateur dans une string nommé "equation"
function ajoutEquation(input) {
  // Petit truc stylé ici : Si on rappuie sur les touches, on reset automatiquement les inputs qui nous servent plus :D
  if (eqString.length > 0 && isCalculDone) {
    resetVariables();
  }
  eqString = retireDoublonSigne(eqString + input.toString());
  afficheEqua.innerHTML = eqString;
}

// on convertit ensuite notre string toute fraîche, en tableau d'instructions pour les opérations de la calculette
function conversionStringToArray(inputString) {
  let temp = "";
  const regex = /[-+*\/]/;
  const result = [];

  // ... : opérateur de déstructuration
  // note ici : On a transformé notre string en tableau, en gros ça resemble à  :
  // "12+13" qui va devenir => ["1", "2", "+", "1", "3"].
  [...inputString].forEach((character) => {
    // Si on a un signe, alors ...
    if (regex.test(character)) {
      // ça veut dire que notre nombre est complet, donc on le pousse dans notre tableau
      result.push(Number(temp));
      // on vide la valeur temporaire, et on pousse par la suite, le fameux signe !
      temp = "";
      result.push(character);
    } else {
      // Sinon... On ajoute notre "chiffre" à notre nombre en construction dans la variable temporaire !
      temp = temp + character;
    }
  });

  result.push(Number(temp));
  return result;
}

// on check si il n'y a pas de doublon de signe, genre +- collés :)
function retireDoublonSigne(input) {
  const regex = /[-+*\/]{2}/; // 
  // ce cas sert à éviter que l'on puisse mettre des signes avant les chiffres
  if (regex.test(input) && eqString.length === 1) {
    return "";
  }
  if (regex.test(input)) {
    return (input = input.substring(0, input.length - 1));
  }
  return input;
}

// On recherche en premier lieu, les priorités opératoire hautes, mais si il y en a pas, on cherche les plus basses :)
function searchPrioritySign(instructions) {
  const highPrioSign = instructions.findIndex((x) => x === "/" || x === "*");
  // Si on trouve rien (d'ou le -1)
  if (highPrioSign === -1) {
    return instructions.findIndex((x) => x === "+" || x === "-");
  }
  return highPrioSign;
}

// l'objectif ici, c'est de pouvoir calculer les valeurs qui sont de part et d'autre d'un signe
// et ce pour toutes les valeurs du tableau
function reduceValue(instructions) {
  while (instructions.length !== 1) {
    let result = 0;
    // on recherche le signe avec la plus haute priorité opératoire :).
    const signIndex = searchPrioritySign(instructions);
    // Si ya un signe dans le tableau d'instructions... (sinon on ne fait rien :3)
    if (signIndex !== -1) {
      // ... on sélectionne le bon opérateur, puis on fait l'opération en elle même.
      switch (instructions[signIndex]) {
        case "/": // 12/6+2
          result = instructions[signIndex - 1] / instructions[signIndex + 1];
          break;
        case "*":
          result = instructions[signIndex - 1] * instructions[signIndex + 1];
          break;
        case "+":
          result = instructions[signIndex - 1] + instructions[signIndex + 1];
          break;
        case "-":
          result = instructions[signIndex - 1] - instructions[signIndex + 1];
          break;
      }
      // Une fois ceci fait, on retire les valeurs devenues inutiles, et on les remplace par le résultat
      instructions.splice(signIndex - 1, 3, result);
    }
  }
  // Puis on retourne notre valeur, une fois le traitement terminé :)
  return instructions[0];
}

// l'assemblage des fonctions de traitement se fait ici, car c'est le déclencheur du traitement du résultat.
function resultatFinal() {
  // On transforme notre string, représentant la valeur fournie par l'utilisateur, en tableau d'instructions
  const instructions = conversionStringToArray(eqString);
  // on fait une à une les diverses opérations décrites dans le tableau.
  const result = reduceValue(instructions);
  const historiques = addHistory(eqString, result);
  histoResult.innerHTML = affichageHisto(historiques);
  affiche.innerHTML = result;
  isCalculDone = true;
}

// on récupère les données précédentes, puis on les ajoute dans les nouvelles,
// NOTE, bien sûr quand le front sera plus développé, il faudra pas hésiter à mettre l'historique dans un tableau :D
function addHistory(entry, result) {
    const identifier = history.length;
    historyobject = { 
        id : identifier, //95
        text : `${entry} = ${result} <button class="boutton" onclick="deleteItem(${identifier})"> Supprimer </button><br>`
    };
    history.push(historyobject);
    return history; 
}

function deleteItem(id){
    const historyIndex = history.findIndex(item => {
        return id === item.id;
    }); 
    history.splice(historyIndex, 1);    
    histoResult.innerHTML = affichageHisto(history);
}
function affichageHisto(tableau){
    return tableau.map(item => {
        return item.text;
    });

}
// Permet de reset les variable à 0
function resetVariables() {
  eqString = "";
  affiche.innerHTML = 0;
  afficheEqua.innerHTML = 0;
  isCalculDone = false;
}
