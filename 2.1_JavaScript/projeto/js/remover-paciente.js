

// O trecho abaixo é ruim, pois apesar de funcionar, estamos adicionando muitos eventos, um pra cada linha <tr>
// da tabela de pacientes. Além de poder não desempenhar bem, ele só funciona para linhas/pacientes já presentes
// na tabela no momento da execução desse trecho de código.
// Ou seja, novos elementos adicionados posteriormente, não terão um listener associado a eles.
// Mas, podemos resolver isso com "Event Bubbling"

/*
var pacientes = document.querySelectorAll(".paciente");

pacientes.forEach(function(paciente) {
    paciente.addEventListener("dblclick", function() {

        // O this é o "dono" do evento, a quem o evento está atrelado.
        // Como o evento está atrelado ao paciente, o this fará referência a ele.
        this.remove();
    });
});
 */



//////////// EVENT BUBBLING
// Quando escutamos um evento no JavaScript, ele na verdade não acontece só no dono do evento (no nosso caso,
// na linha do paciente), ele acontece também no elemento pai do paciente, no pai do pai do paciente, e assim vai subindo.
//
// Em nossa estrutura, ao darmos um duplo clique na <tr> do paciente, o pai (<tbody>) também escuta o evento,
// assim com a tag <table>, até chegar no <body>.
//
// Podemos fazer uma analogia com um copo de refrigerante, já que quando colocamos o refrigerante em um copo,
// suas bolhas vão do fundo até estourar na boca do copo.
// O evento seria semelhante a essa bolha.
//
//
// Podemos então delegar a responsabilidade de escutar os eventos para o elemento pai de todos, no caso, a tag <table>.
// Dentro da função, perguntamos ao pai qual filho recebeu o clique, pois é ele que será removido.
// Desta vez não podemos utilizar o this, já que o dono do evento é a tabela, logo, ela acabará sendo removida.
// Para descobrirmos qual filho foi clicado, utilizaremos o event como parâmetro na função.
//
// Enquanto o "this" se refere ao "dono" do evento, o "event.target" será quem sofreu propriamente o evento.
//
// O código abaixo quase funciona perfeitamente:

/*
var tabela = document.querySelector("table");

tabela.addEventListener("dblclick", function(event) {
    event.target.remove();
});
*/


// Ao clicarmos em algum campo da tabela, apenas o <td> clicado será removido.
// No entanto, queremos remover a linha completa, ou seja, a tag <tr>, pai do <td>.
// Para selecionarmos o pai de um elemento, trabalharemos com a propriedade parentNode.

/*
var tabela = document.querySelector("table");

tabela.addEventListener("dblclick", function(event) {
    var alvoEvento = event.target;
    var paiDoAlvo = alvoEvento.parentNode; // TR = paciente = remover
    paiDoAlvo.remove();

    // ou remova as 3 linhas e simplesmente faça
    // event.target.parentNode.remove();
});
 */


// Assim, mesmo que adicionarmos novos pacientes, no momento em que ele receber um duplo clique,
// o evento irá subir até chegar à tabela.
// Esta por sua vez, estará escutando.
// Desta forma, o paciente será removido.
//
// Quando clicamos em qualquer filho, o evento consegue chegar até o pai (table).
// Essa estratégia é muito boa por economizarmos código, deixando-o mais sucinto e mais eficiente.


// Como queremos adicionar um efeito de FadeOut na remoção da linha, após o duplo click no elemento,
// adicionamos um CSS class com o efeito de Fade Out.
//
// Como o computador é muito rápido, a remoção é feita instantaneamente, e o efeito não é visível.
// Vamos então usar a função JS `setTimeout` em que vc define: execute a função XXX depois de esperar por YYY tempo.
var tabela = document.querySelector("#tabela-pacientes");

tabela.addEventListener("dblclick", function(event) {
    // faz o fade out
    event.target.parentNode.classList.add("fadeOut");

    // espera 500 ms e então executa a função anônima que por sua vez remove a linha da tabela
    setTimeout(function() {
        event.target.parentNode.remove();
    }, 500);

});