
var pacientes = document.querySelectorAll(".paciente");

for (var i = 0; i < pacientes.length; i++) {
    var paciente = pacientes[i];

    var tdPeso = paciente.querySelector(".info-peso");
    var tdAltura = paciente.querySelector(".info-altura");
    var tdImc = paciente.querySelector(".info-imc");

    var peso = tdPeso.textContent;
    var altura = tdAltura.textContent;

    var pesoEhValido = true;
    var alturaEhValida = true;


    if (peso <= 0 || peso >= 1000) {
        console.log("Peso inválido");
        pesoEhValido = false;
        tdImc.textContent = "Peso inválido!";

        // muda o estilo desse DOM elemento especifício
        // note que properties com mais de uma palavra (background-color) são usadas como camelCase.
        /* paciente.style.backgroundColor = "lightcoral"; */

        // Adiciona a classe CSS ".paciente-invalido" ao elemento.
        // Note que o resultado é o mesmo do paciente.style.backgroundColor, no caso, mas com isso conseguimos
        // reaproveitar códigos/estilos/
        // O método `classList` retorna a lista de classes CSS do elemento.
        paciente.classList.add("paciente-invalido");
    }

    if (altura <= 0 || altura >= 3.00) {
        console.log("Altura inválida");
        alturaEhValida = false;
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