import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import FotoItem from './Foto';


// export default class Timeline extends PureComponent {
export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state =  {fotos: []};
        this.login = props.login;
    }

    componentWillMount(){
        this.props.store.subscribe(fotos => {
            this.setState({fotos});
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

        this.props.store.lista(urlPerfil);
    }


    // this function is delegated to make a like.
    // it will be passed for the <FotoItem /> during rendering of Timeline
    like(fotoId){
        this.props.store.like(fotoId);
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
                        this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} like={this.like.bind(this)} />)
                    }
                </CSSTransitionGroup>
            </div>
        );
    }
}
