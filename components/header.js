let affichageDate = document.getElementById('date');
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

affichageDate.innerHTML= day+'/'+month+'/'+year;