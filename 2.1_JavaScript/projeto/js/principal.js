
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
        var imc = peso / (altura * altura);
        // muda o conteúdo da célula do IMC com o valor calculado, com 2 casas decimais
        tdImc.textContent = imc.toFixed(2);
    }
}


/******************* EVENTOS *******************/

var titulo = document.querySelector(".titulo"); // gets the first element with the class ".titulo"
titulo.textContent = "Aparecida: A mulher da Nutrição"; // it changes the text of the first tag with with class "titulo"

// Adiciona um escutador de eventos para o elemento titulo.
// Se o escutador "ouvir" um click neste elemente (ou seja, se clicarmos no texto de elemeneto aí),
// a função mostrarMensagem será chamada
titulo.addEventListener("click", mostrarMensagem);

// equivalentemente, podemos atribuir diretamente a função ao respectivo atributo da ação de click do listener
// do elemento em questão. Isso chama-se "event shortcut"
titulo.onclick = mostrarMensagem;

function mostrarMensagem() {
    console.log("Titulo foi clicado");
}




// Podemos usar funções anônimas no lugar de funções normais.
// Elas são geralmente úteis quando as mesmas são simples, com poucas linhas.
var h2MeusPacientes = document.querySelector("h2");

// Neste caso, ao clicar no subtitulo: "Meus Pacientes", ele fica vermelho.
h2MeusPacientes.addEventListener("click", function () {
    h2MeusPacientes.style.color = "red";
});





/********** ADICIONANDO LISTENETER A UM BOTÃO **********/

// O trecho de código abaixo não funciona (explico pq logo abaixo)
/*
var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(){
    console.log("Oi, cliquei no botão.");
});
*/


// Por padrão, sempre que clicamos em um botão contido em uma tag <form> do HTML, os seus dados serão enviados
// para outra página. Como não especificamos uma página para ser o alvo da tag <form>,
// a única ação realizada é a limpeza dos dados, e a página sendo recarregada em seguida.
// Ao fazermos isto, além do formulário, o console fica limpo também - por isso, não veremos a mensagem.

// O evento de clique está sendo escutado corretamente, porém, como a página é recarregada rapidamente, não
// conseguiremos ver a mensagem impressa no console.
// Desta forma, não conseguiremos salvar os dados do paciente na tabela, nem exibir a mensagem.


// SOLUCAO
var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", function(){
    event.preventDefault(); // previna/ignore o comportamento padrão do evento
                            // no caso, o comportamento do evento de click em um botão

    var form = document.querySelector("#form-adiciona");

    // Each <input> of the form becomes a data member of the object form.
    // Their values of property name="" become attributes of the object form.
    // Eg: <input name="nome"> ... we can access this input by: form.nome
    var nome = form.nome.value; // .value retorna o valor do <input>
    var peso = form.peso.value;
    var altura = form.altura.value;
    var gordura = form.gordura.value;

    // .createElement = cria um elemento HTML
    var pacienteTr = document.createElement("tr");

    var nomeTd = document.createElement("td");
    var pesoTd = document.createElement("td");
    var alturaTd = document.createElement("td");
    var gorduraTd = document.createElement("td");
    var imcTd = document.createElement("td");

    nomeTd.textContent = nome;
    pesoTd.textContent = peso;
    alturaTd.textContent = altura;
    gorduraTd.textContent = gordura;

    // appendChild = adiciona como filho o elemento passado a ela como parâmetro.
    // Este filho será o último da ordem dos filhos (pois a ação é de append).
    pacienteTr.appendChild(nomeTd);
    pacienteTr.appendChild(pesoTd);
    pacienteTr.appendChild(alturaTd);
    pacienteTr.appendChild(gorduraTd);

    // até aqui, teremos para pacienteTr:
    /*
    <tr>
        <td>Nome</td>
        <td>Peso</td>
        <td>Altura</td>
        <td>Gordura</td>
    </tr>
    */

    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
});

