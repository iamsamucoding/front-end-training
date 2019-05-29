import React, { Component, PureComponent } from 'react';
// import { Transition } from 'react-transition-group';
import { CSSTransitionGroup } from 'react-transition-group';

import Pubsub from "pubsub-js";


import FotoItem from './Foto';


// export default class Timeline extends PureComponent {
export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state =  {fotos: []};
        this.login = props.login;
    }

    componentWillMount(){
        Pubsub.subscribe('timeline',(topico, fotos) => {
            console.log("fotos pesquisadas: ", fotos);
            this.setState({fotos: fotos}); // it's the same of {fotos: fotos}
        });

        Pubsub.subscribe('atualiza-liker',(topico,infoLiker) => {
            const fotoAchada = this.state.fotos.find(foto => foto.id === infoLiker.fotoId);
            fotoAchada.likeada = !fotoAchada.likeada;

            // gambiara: por algum motivo, uma lista [] está entrando no find, de modo que o liker dentro é undefined
            const possivelLiker = [];
            if (this.state.likers != undefined) {
                this.state.likers.find(liker => liker.login === infoLiker.liker.login);
            }



            if(possivelLiker === undefined){
                fotoAchada.likers.push(infoLiker.liker);
            } else {
                const novosLikers = fotoAchada.likers.filter(liker => liker.login !== infoLiker.logo);
                fotoAchada.likers = novosLikers;
            }
            this.setState({fotos:this.state.fotos});
        })
    }

    componentDidMount(){
        // the server provide an API whose url accepts a token for a valid user.
        // The token comes after X-AUTH-TOKEN=
        // When a user logs into the page (being authenticate in the server by another API), the
        // server provides a valid token with all information that it needs.
        // Then, we can use this API to get the photos for the logged user.
        //
        // Using token is a way to communicate two different systems (or, similarly, an app/web that consumes a service).
        let urlPerfil;

        if (this.login === undefined) {
            urlPerfil = `https://instalura-api.herokuapp.com/api/fotos/?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        } else {
            urlPerfil = `https://instalura-api.herokuapp.com/api/public/fotos/${this.login}`;
        }

        fetch(urlPerfil)
            .then(response => response.json())
            .then(fotos => {
                this.setState({fotos: fotos});
            });
    }


    // this function is delegated to make a like.
    // it will be passed for the <FotoItem /> during rendering of Timeline
    like(fotoId){
        fetch(`https://instalura-api.herokuapp.com/api/fotos/${fotoId}/like`)
            .then(response => {
                console.log(response);
                if(response.ok) {
                    return response.json();
                } else {
                    if ((response.status == 403) || (response.status == 405)) {
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
                // when passing only an object to a dict, it creates a key with the name of the object.
                // i.e.: {liker} == {liker: liker}
                // this calls shorthand property
                Pubsub.publish('atualiza-liker', {fotoId, liker});
            })
            .catch(error => {
                console.log(error);
            });
    }


    // Sempre que vamos dar um setState nas fotos da timeline, o método render() será chamado novamente.
    // Você pode questionar a necessidade de chamar toda a árvore de componentes de novo, deixando a
    // aplicação menos performática.
    //
    // A preocupação é justa, no entanto, lembre-se que não será retornado os elementos que serão aplicados
    // diretamente na árvore do DOM Real do seu navegador.
    // O retorno será um monte de React Elements que passarão pelo processo de conciliação, no qual será
    // identificado o que precisa ser alterado.
    // Esta é uma das vantagens de utilizarmos o DOM Virtual, como acontece com o React e outras bibliotecas que
    // focam na parte de visualização.
    render(){
        return (
            <div className="fotos container">
                <CSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} like={this.like} />)
                    }
                </CSSTransitionGroup>
            </div>
        );
    }
}
