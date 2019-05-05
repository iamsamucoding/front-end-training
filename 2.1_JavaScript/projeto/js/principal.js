

var titulo = document.querySelector(".titulo"); // gets the first element with the class ".titulo"
titulo.textContent = "Aparecida: A mulher da Nutrição"; // it changes the text of the first tag with with class "titulo"



var primeiroPaciente = document.querySelector("#primeiro-paciente");

var tdPeso = primeiroPaciente.querySelector(".info-peso");
var tdAltura = primeiroPaciente.querySelector(".info-altura");
var tdImc = primeiroPaciente.querySelector(".info-imc");

var peso = tdPeso.textContent;
var altura = tdAltura.textContent;

var pesoEhValido = true;
var alturaEhValida = true;


if (peso <= 0 || peso >= 1000) {
    console.log("Peso inválido");
    pesoEhValido = false;
    tdImc.textContent = "Peso inválido!";
}

if (altura <= 0 || altura >= 3.00) {
    console.log("Altura inválida");
    alturaEhValida = false;
    tdImc.textContent = "Altura inválida!";
}


if (alturaEhValida && pesoEhValido) {
    var imc = peso / (altura * altura);
    tdImc.textContent = imc; // muda o conteúdo da célula do IMC com o valor calculado
}





// console.log(primeiroPaciente); // tr
// console.log(tdPeso); // td com o peso
// console.log(peso); // returns 100
//
// console.log(tdAltura); // td com a altura
// console.log(altura); // returns 2.0

