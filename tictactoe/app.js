let cases = [...document.getElementsByClassName("case")];
let joueur = document.getElementById("player");
let score1 = document.getElementById("scorePlayerOne");
let score2 = document.getElementById("scorePlayerTwo");
let scoreNul = document.getElementById("scoreNul");
let state = {
    joueurEnCours: 1,
    scoreP1: 0,
    scoreP2: 0,
    mNul: 0,
    c1: 0,
    c2: 0,
    c3: 0,
    c4: 0,
    c5: 0,
    c6: 0,
    c7: 0,
    c8: 0,
    c9: 0,
};

//fonction permettant de reset notre objet contenant l'état de nos variables
const resetVariables = () => {
    state.joueurEnCours = 1
    state.c1 = 0;
    state.c2 = 0;
    state.c3 = 0;
    state.c4 = 0;
    state.c5 = 0;
    state.c6 = 0;
    state.c7 = 0;
    state.c8 = 0;
    state.c9 = 0;
};


//ici on vérifie que la partie est finie ou non
const verifiedVictory = () => {
    if( //On vérifie toute les win conditions
    (state.c1 === state.c2 && state.c2 === state.c3 && state.c1 > 0) || 
    (state.c4 === state.c5 && state.c5 === state.c6 && state.c4 > 0) ||
    (state.c7 === state.c8 && state.c8 === state.c9 && state.c7 > 0) ||
    (state.c1 === state.c4 && state.c4 === state.c7 && state.c1 > 0) ||
    (state.c2 === state.c5 && state.c5 === state.c8 && state.c2 > 0) ||
    (state.c3 === state.c6 && state.c6 === state.c9 && state.c3 > 0) ||
    (state.c1 === state.c5 && state.c5 === state.c9 && state.c1 > 0) ||
    (state.c3 === state.c5 && state.c5 === state.c7 && state.c3 > 0) 
    ){
        return true; 
    }
    else if ( //ici on vérifie on regarde si toutes les cases sont pleine sans victoire et si c'est le cas
        // cela veux dire que c'est une égalité 
        state.c1 != 0 &&
        state.c2 != 0 &&
        state.c3 != 0 &&
        state.c4 != 0 &&
        state.c5 != 0 &&
        state.c6 != 0 &&
        state.c7 != 0 &&
        state.c8 != 0 &&
        state.c9 != 0 
        ){
            return null;
    }
    else { // alors la partie n'est pas encore terminée 
        return false;
    }
};

const PlayCase = notreCase => {
    let idCase = notreCase.target.id;
    if (state[idCase] != 0) return;
    state[idCase] = state.joueurEnCours
    partieEnCours(notreCase);    
};

function partieEnCours(notreCase) {
    let isVictory = verifiedVictory();
    if(isVictory) {
        alert("Le gagnant est le joueur "+state.joueurEnCours);
        if(state.joueurEnCours===1) {
            state.scoreP1++;
            score1.textContent = state.scoreP1;
        }
        else {
            state.scoreP2++;
            score2.textContent = state.scoreP2;
        }
        resetVariables();
        cases.forEach(item => (item.textContent= ""));
    }
    else if (isVictory === null) {
        alert("Match nul ! Aucun gagnant ni perdant !");
        state.mNul++;
        scoreNul.textContent = state.mNul;
        joueur.textContent = '1';
        resetVariables();
        cases.forEach(item => (item.textContent= ""));
    }
    else if (isVictory === false){
        rondOuCroix(notreCase);
    }
}

cases.forEach(item => {
    item.addEventListener("click", PlayCase);
});

function rondOuCroix(notreCase){
    if(state.joueurEnCours===1){
        notreCase.target.textContent = "X";
        state.joueurEnCours = 2; 
        joueur.textContent = "2";
    }
    else {
        notreCase.target.textContent = "O";
        state.joueurEnCours = 1; 
        joueur.textContent = "1";
    }

}