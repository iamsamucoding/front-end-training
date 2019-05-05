var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", function(){
    event.preventDefault(); // previna/ignore o comportamento padrão do evento
                            // no caso, o comportamento do evento de click em um botão

    var form = document.querySelector("#form-adiciona");

    // Extraindo informacoes do paciente do form
    var paciente = obtemPacienteDoFormulario(form); // JS object
    // Cria a tr e a td do paciente
    var pacienteTr = montaTr(paciente);

    var erros = validaPacientes(paciente); // [] ou uma lista/array de erros

    if (erros.length > 0) { // se tem ao menos uma mensagem de erro
        exibeMensagensDeErro(erros);
        return;
    }

    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);

    // limpa o formulario após a submissão
    form.reset();

    // Com a propriedade innerHTML, podemos editar obter o conteúdo HTML (HTML interno) de um elemento.
    ul.innerHTML = ""; // limpa as mensagens de erro
});


function exibeMensagensDeErro(erros){
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = ""; // limpa as mensagens de erro

    // Uma opcão de for
    // for(var i = 0; i < erros.length ; i++){
    //     var erro = erros[i];
    // ...
    // }

    // pra cada elemento do array, execute uma função pra ele
    // o item da iteração é passado por parâmetro na função
    erros.forEach(function(erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}



function obtemPacienteDoFormulario(form) {
    // criando um objecto em JavaScript
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value) // isso poderia ser substituído pelo código abaixo
    }

    // Cria o atributo imc e armazena o valor resultante da função
    // paciente.imc = calculaImc(paciente.peso, paciente.altura);

    return paciente;
}


function montaTr(paciente) {
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente"); // adicionando a classe do elemento

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaTd(dado, classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}


function validaPeso(peso){
    return (peso >= 0 && peso <= 1000);
}

function validaAltura(altura) {
    return (altura >= 0 && altura <= 3.0);
}

// retorna uma lista com mensagens de erros
function validaPacientes(paciente){
    var erros = [];

    if (paciente.nome.length == 0){
        erros.push("O nome não pode ser em branco");
    }

    if (paciente.gordura.length == 0){
        erros.push("A gordura não pode ser em branco");
    }

    if (paciente.peso.length == 0){
        erros.push("O peso não pode ser em branco");
    }

    if (paciente.altura.length == 0){
        erros.push("A altura não pode ser em branco");
    }

    if (!validaPeso(paciente.peso)){
        erros.push("Peso é inválido");
    }

    if (!validaAltura(paciente.altura)){
        erros.push("Altura é inválida");
    }

    return erros;
}


