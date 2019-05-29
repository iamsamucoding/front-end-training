// Observe que deixaremos o nome do arquivo com letra minúscula porque não representa uma classe.
// É um arquivo com várias funções.

import {List} from 'immutable';


// Toda função passada para store do redux receberá dois argumentos: state and action
// O redux sugere fortemente que trabalhemos com o conceito de dados imutáveis, então, não teremos uma classe
// com um atributo que modificará o estado. Em vez disso, sempre receberemos um estado prévio que receberá
// uma ação enviada para o Dispatcher.
//
// A função timeline costuma ser chamada de função redutora: Entrou o estado de uma forma e será devolvido de outra.
//
// REDUCER
export function timeline(state=new List(), action){
    if (action.type === 'LISTAGEM'){
        return new List(action.fotos);
    }

    else if (action.type === 'LIKE') {
        console.log("action: ", action);
        const fotoEstadoAntigo = state.find(foto => foto.id === action.fotoId);
        fotoEstadoAntigo.likeada = !fotoEstadoAntigo.likeada;

        const liker = action.liker;

        // gambiara: por algum motivo, uma lista [] está entrando no find, de modo que o liker dentro é undefined
        const possivelLiker = [];
        if (fotoEstadoAntigo.likers !== undefined) {
            fotoEstadoAntigo.likers.find(likerAtual => likerAtual.login === liker.login);
        }

        let novosLikers;
        if(possivelLiker === undefined){
            novosLikers = fotoEstadoAntigo.likers.concat(liker);
        } else {
            novosLikers = fotoEstadoAntigo.likers.filter(likerAtual => likerAtual.login !== liker.login);
        }


        // Para isto, versão 2015 do JavaScript, dentro da classe Object, teremos o método assign.
        // Dentro dele, passaremos alguns argumentos, sendo o primeiro um objeto literal vazio,
        // que será preenchido com o segundo parâmetro fotoEstadoAntigo.
        // Ou seja, queremos que ele seja preenchido com quase todas as propriedades iguais da fotoEstadoAntigo.
        // Além disso, vamos sobrepor a propriedade `likers` com os novosLikers.
        // Podemos escolher o número que quisermos de argumentos, justamente porque podemos trocar as propriedades
        // de vários objetos literais.
        const fotoEstadoNovo = Object.assign({},fotoEstadoAntigo,{likers: novosLikers});

        const indiceDaLista = state.findIndex(foto => foto.id === action.fotoId);
        const novaLista = state.set(indiceDaLista,fotoEstadoNovo);

        return novaLista;
    }

    return state;
}


