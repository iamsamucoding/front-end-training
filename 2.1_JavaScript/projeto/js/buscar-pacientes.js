// Vamos acessar o outro servidor, trazer os pacientes de lá e disponibilizá-los na tabela, mantendo tudo funcionando.
// A técnica utilizada é conhecida como AJAX, essa maneira de fazer uma requisição de forma assíncrona com JavaScript.
// É uma requisição assíncrona porque não está parando o fluxo do código, ou seja, no momento em que a
// requisição é feita, a execução continua normalmente.
// Durante esse processo de busca de pacientes no servidor externo, é possível excluir e adicionar pacientes.


var botaoAdicionar = document.querySelector("#buscar-pacientes");

botaoAdicionar.addEventListener("click", function(){
    console.log("Buscando pacientes...");

    // O XMLHttpRequest é um objeto do JS responsável por fazer requisições HTTP.
    // O trecho XML do nome indica que ele era utilizado anteriormente para realizar o transporte de dados
    // do tipo XML, no entanto, atualmente ele consegue trafegar outros tipos de dados, como textos.
    var xhr = new XMLHttpRequest();

    // especifica o tipo de requisição a ser feita
    // Essa ação será equivalente a chegarmos no navegador no momento em que ainda não enviamos a requisição,
    // apenas verificando se o endereço está correto, se existe e está fazendo as configurações da requisição.
    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");


    // Para os dados serem exibidos, após o envio da requisição, devemos escutar um evento específico
    // que é acionado quando a requisição termina e a sua resposta é carregada.
    // Ao escutarmos o evento, carregaremos a resposta da requisição - que no caso, serão nossos dados.
    // Esse evento é o "load", característico do XMLHttpRequest.
    //
    // Após a resposta da requisição (loading) com os dados, a função anônima é chamada

    xhr.addEventListener("load", function(){

        var erroAjax = document.querySelector("#erro-ajax");

        // se sucesso
        if (xhr.status == 200) {
            // E para acessarmos os dados da resposta, usaremos a propriedade responseText do XMLHttpRequest
            var resposta = xhr.responseText;
            console.log(typeof resposta); // string

            // Transforma (faz o parser) o json (que é uma string) retornada para um objeto JSON do javascript
            var pacientes = JSON.parse(resposta);
            console.log(pacientes);
            console.log(typeof pacientes); // object


            pacientes.forEach(function (paciente) {
                adicionaPacienteNaTabela(paciente);
            });
        }
        // se ocorrer algum erro durante a requisição, mostra uma mensagem de erro na tela
        else {
            console.log("erroooo!!!");
            erroAjax.classList.remove("invisivel");
        }
    });


    // envia a requisição
    xhr.send();
});

