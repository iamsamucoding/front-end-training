
var pacientes = document.querySelectorAll(".paciente");

for (var i = 0; i < pacientes.length; i++) {
    var paciente = pacientes[i];

    var tdPeso = paciente.querySelector(".info-peso");
    var tdAltura = paciente.querySelector(".info-altura");
    var tdImc = paciente.querySelector(".info-imc");

    var peso = tdPeso.textContent;
    var altura = tdAltura.textContent;

    var pesoEhValido = validaPeso(peso);
    var alturaEhValida = validaAltura(altura);


    if (!pesoEhValido) {
        console.log("Peso inválido");
        tdImc.textContent = "Peso inválido!";
        paciente.classList.add("paciente-invalido");
    }

    if (!alturaEhValida) {
        console.log("Altura inválida");
        tdImc.textContent = "Altura inválida!";
        paciente.classList.add("paciente-invalido");
    }


    if (alturaEhValida && pesoEhValido) {
        var imc = calculaImc(peso, altura);
        // muda o conteúdo da célula do IMC com o valor calculado, com 2 casas decimais
        tdImc.textContent = imc;
    }
}


function calculaImc(peso, altura) {
    var imc = 0;

    imc = peso / (altura * altura);

    return imc.toFixed(2);
}