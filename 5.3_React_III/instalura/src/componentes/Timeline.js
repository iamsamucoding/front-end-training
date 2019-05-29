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

        // Você quer se inscrever na store, que agora é do Redux. Porém, não receberemos mais o array de fotos,
        // inclusive porque o Redux não sabe que trabalharemos como array de fotos.
        // Nós podemos deixar qualquer objeto literal dentro do Redux.
        // Em seguida, o subscribe() não receberá parâmetros e para você recuperar o estado, acessaremos a store,
        // e depois, executaremos o método getState() que retornará o último valor retornado pela função
        // redutora (na timeline() do App.js).
        this.props.store.subscribe(() => {
            let fotos = this.props.store.getState();
            this.setState({fotos}); // lembre-se: {fotos} === {fotos: fotos}
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

        // this.props.store.lista(urlPerfil);
        let listaFixa = [{"urlPerfil":"https://s3.amazonaws.com/caelum-online-public/react-native-parte-2/images/adittional-resources/profile-photo-alberto.jpg","loginUsuario":"alots","horario":"29/05/2019 09:48","urlFoto":"https://s3.amazonaws.com/caelum-online-public/react-native-parte-2/images/adittional-resources/photo-1.jpg","id":1,"likeada":false,"likers":[],"comentarios":[],"comentario":"Legenda da foto"},{"urlPerfil":"https://s3.amazonaws.com/caelum-online-public/react-native-parte-2/images/adittional-resources/profile-photo-alberto.jpg","loginUsuario":"alots","horario":"29/05/2019 09:48","urlFoto":"https://s3.amazonaws.com/caelum-online-public/react-native-parte-2/images/adittional-resources/photo-2.jpg","id":2,"likeada":false,"likers":[],"comentarios":[],"comentario":"Legenda da foto"}];

        // A Redux store tem o método dispatch() para "despacharmos" uma nova ação. No caso, a ação "LISTAGEM".
        //
        // Se a ação que vier de LISTAGEM esperamos que seja feito algo.
        // As informações que passamos além do type (action) recebem o nome de "payload" da action.
        // A seguir, adicionaremos a nova propriedade no dispatch():
        //
        // Nosso caso, nosso payload é uma propriedade chamada fotos (que será acessível pela store) que tem os valores
        // de listaFixa
        this.props.store.dispatch({type:'LISTAGEM', fotos: listaFixa});
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
