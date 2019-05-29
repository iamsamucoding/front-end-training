// Observe que deixaremos o nome do arquivo com letra minúscula porque não representa uma classe.
// É um arquivo com várias funções.




// Toda função passada para store do redux receberá dois argumentos: state and action
// O redux sugere fortemente que trabalhemos com o conceito de dados imutáveis, então, não teremos uma classe
// com um atributo que modificará o estado. Em vez disso, sempre receberemos um estado prévio que receberá
// uma ação enviada para o Dispatcher.
//
// A função timeline costuma ser chamada de função redutora: Entrou o estado de uma forma e será devolvido de outra.
//
// REDUCER
export function timeline(state=[], action){
    if (action.type === 'LISTAGEM'){
        return action.fotos;
    }

    else if (action.type === 'LIKE') {
        console.log("action: ", action);
        const fotoAchada = this.fotos.find(foto => foto.id === action.fotoId);
        fotoAchada.likeada = !fotoAchada.likeada;

        const liker = action.liker;

        // gambiara: por algum motivo, uma lista [] está entrando no find, de modo que o liker dentro é undefined
        const possivelLiker = [];
        if (fotoAchada.likers !== undefined) {
            fotoAchada.likers.find(likerAtual => likerAtual.login === liker.login);
        }

        if(possivelLiker === undefined){
            fotoAchada.likers.push(liker);
        } else {
            const novosLikers = fotoAchada.likers.filter(likerAtual => likerAtual.login !== liker.logo);
            fotoAchada.likers = novosLikers;
        }
    }

    return state;
}


