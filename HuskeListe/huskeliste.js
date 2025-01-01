"use strict";

function initPage(event) {
  console.log("DOM is loaded!");
}

window.addEventListener("load", initPage);

function leggTilListe() {
  //legger tekst inn i en variabel 
  var input = document.getElementById("oppgave").value;
  if(input.trim() === '') {
    alert("Du må skrive noe i tekstboksen!");
  } else {
    var li = document.createElement("li");
    li.textContent = input;

    li.onmouseover = function() {
      mOver(this);
    }
    li.onmouseout = function() {
      mOut(this);
    }
    leggTilKryss(li);
    //legger til elementet i listen
    document.getElementById("huskeliste").appendChild(li);
    //tømmer tekstboksen
    document.getElementById("oppgave").value = "";
  }
}


function slettOppgave(event) {
  this.parentElement.remove(); //fjerner elementet 
}

function leggTilKryss(elem) {
  let span = document.createElement("span"); 
  let txt = document.createTextNode("\u00D7");
  span.className = "lukk";
  span.appendChild(txt); 
  span.addEventListener("click", slettOppgave);
  elem.appendChild(span);
}

// Legger til kryss på alle eksisterende listeelementer
function leggTilLukkeKryssPåAlle() {
  let liste = document.getElementsByTagName("li");
  for (let i = 0; i < liste.length; i++) {
    leggTilKryss(liste[i]);
  }
}

function initPage(event) {
  // console.log("DOM is loaded!");
  // debugger;

  leggTilLukkeKryssPåAlle();

  let ny = document.querySelector("#nyKnapp");
  ny.addEventListener("click", nyttElement);
}



