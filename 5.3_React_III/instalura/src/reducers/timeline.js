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
    return state;
}


