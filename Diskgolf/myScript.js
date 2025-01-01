//funksjon for innlogging 
function myFunction() {
    document.getElementById("logginn").innerHTML = "Logget inn"
}


//funksjon for å endre tekst til startet 
function startet(id) {
    id.innerHTML = "Startet";
    alert("Runden er startet");
}

//funksjon for å vise regler 


function visRegler() {
    document.getElementById("regler").innerHTML = "Regler for diskgolf:<br>1. Kast disken fra der du står.<br>2. Få disken i kurven på færrest mulig kast.<br>3. Kast disken fra der den lander.<br>4. Fortsett til disken er i kurven.<br>5. Gjenta for hver runde.<br>6. Vinneren er den som har færrest kast til sammen.";
}

//funksjon for å endre innholde med mouse over 
function mOver(obj) {
    obj.innerHTML = "Trykk her for å starte";
}
function mOut(obj) {
    obj.innerHTML = "Start ny runde";
}

function endreBilde(bane) {
    const bildeKilde = document.querySelector('img'); 
    console.log(bildeKilde)
    if(bane === 'myra') {
        bildeKilde.setAttribute('src', 'img/myra.jpg'); 
    }
    if(bane === 'hisøy') {
        bildeKilde.setAttribute('src', 'img/hisøy.jpg')
    }
}

