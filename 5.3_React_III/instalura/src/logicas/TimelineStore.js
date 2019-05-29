import Pubsub from "pubsub-js";


export default class TimelineStore {
    // injecao de dependencia
    constructor(fotos) {
        this.fotos = fotos;
    }


    lista(urlPerfil) {
        fetch(urlPerfil)
            .then(response => response.json())
            .then(fotos => {
                this.fotos = fotos;
                Pubsub.publish('timeline',this.fotos);
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