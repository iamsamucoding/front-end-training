var campoFiltro = document.querySelector("#filtrar-tabela");


// O evento input detectaa o evento de digitar (input de dados).
// Toda vez que alguém inserir dados no campo, esse evento será disparado.
campoFiltro.addEventListener("input", function(){
    console.log(this.value); // this é o dono do evento (no caso, o <input>

    var pacientes = document.querySelectorAll(".paciente");

    // Cria um objecto RegExp para testar/filtar os elementos/linhas da tabela pelo
    // nome que vai sendo digitado aos poucos no <input>.
    // O primeiro campo é a expressão regular a ser testada (no caso, qualquer nome que tenha o texto
    // digitado no <input> como parte/substring);
    // O segundo campo "i" indica "case insensitive".
    var expressao = new RegExp(this.value, "i");


    // se tem algum nome digitado, mostra apenas os nomes que começam com o que foi escrito, apagando o resto.
    // Pra isso, adicionamos e removemos a classe ".invisivel" das linhas da tabela.
    if (this.value.length > 0) {
        for (var i = 0; i < pacientes.length; i++){
            var paciente = pacientes[i];
            var tdNome = paciente.querySelector(".info-nome");
            var nome = tdNome.textContent;

            // o metodo test testa o nome da linha atual da tabela com a expressão regular criada.
            if (expressao.test(nome)) {
                paciente.classList.remove("invisivel");
            } else {
                paciente.classList.add("invisivel");
            }
        }
    }
    // Mas, ao apagar o texto inteiro do <input>, volte a mostrar todas as linhas da tabela,
    // ou seja, remova a class ".invisivel" de todos.
    else {
        for (var i = 0; i < pacientes.length; i++) {
            var paciente = pacientes[i];
            paciente.classList.remove("invisivel");
        }
    }
});