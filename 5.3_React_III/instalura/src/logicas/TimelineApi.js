import Pubsub from "pubsub-js";


export default class TimelineApi {
    // injecao de dependencia
    constructor(fotos) {
        this.fotos = fotos;
    }


    // Como o método não lida com mais nenhum dado da classe, não é necessário que seja de instância,
    // podendo ser estático (static).
    static lista(urlPerfil, store) {
        fetch(urlPerfil)
            .then(response => response.json())
            .then(fotos => {
                // A Redux store tem o método dispatch() para "despacharmos" uma nova ação. No caso, a ação "LISTAGEM".
                //
                // Se a ação que vier de LISTAGEM esperamos que seja feito algo.
                // As informações que passamos além do type (action) recebem o nome de "payload" da action.
                // A seguir, adicionaremos a nova propriedade no dispatch():
                //
                // Nosso caso, nosso payload é uma propriedade chamada fotos (que será acessível pela store) que tem os valores
                // de listaFixa
                store.dispatch({type:'LISTAGEM', fotos}); // lembre-se que estamos usando shorthand operator, logo
                                                          // fotos === fotos: fotos
            });
    }


    like(fotoId) {
        fetch(`https://instalura-api.herokuapp.com/api/fotos/${fotoId}/like`)
            .then(response => {
                console.log(response);
                if(response.ok) {
                    return response.json();
                } else {
                    if ((response.status === 403) || (response.status === 405)) {
                        // since we cannot change the CORS problem of the provided heroku api, let's pretend that
                        // the liked worked.
                        // we won't throw an error because we don't want to break the flow.
                        // Thus, the next .then will be called
                        console.log("não foi possível realizar o like da foto: erro de CORS");
                    }
                    else {
                        throw new Error("erro do like da foto");
                    }
                }
            })
            .then(liker => {
                const fotoAchada = this.fotos.find(foto => foto.id === fotoId);
                fotoAchada.likeada = !fotoAchada.likeada;

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
                Pubsub.publish('timeline',this.fotos);
            })
            .catch(error => {
                console.log(error);
            });
    }


    subscribe(callback){
        Pubsub.subscribe('timeline',(topico,fotos) => {
            callback(fotos);
        })
    }
}