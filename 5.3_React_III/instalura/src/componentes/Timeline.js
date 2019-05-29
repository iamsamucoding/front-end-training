import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import FotoItem from './Foto';

import TimelineApi from '../logicas/TimelineApi'


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


        // Se mantivermos o jeito de dispachar as callbacks para usar o store do Redux,
        // todo método executado precisará receber a Redux store como argumento.
        // TimelineApi.lista(urlPerfil, this.props.store);

        // Para resolver tal problema, foi criado o projeto Redux Thunk.
        // Ele nos permite que, em vez de recebermos a store como argumento, seja possível adicionar store.dispatch
        // na Timeline.js, mas não despacharemos uma action normal (com type e payload).
        // Nós vamos despachar uma função que pode retornar uma promise (no caso), logo o Redux Thunk vai conseguir
        // lidar com isso dentro do Redux.
        // Ele receberá a execução como argumento, fará a execução assíncrona da função, e executará o dispatcher
        // no momento oportuno.
        //
        // Agora não precisaríamos mais chamar a função lista() diretamente. Porém, se estamos chamando o método dispatch(),
        // significa que queremos executar o método lista() dentro do fluxo de trabalho do Redux.
        // Não queremos que a lista já seja executada. Então, o nosso próximo passo será adicionar um novo retorno no
        // método lista(), que receberá a função dispatch da store do Redux.
        this.props.store.dispatch(TimelineApi.lista(urlPerfil));
    }


    // this function is delegated to make a like.
    // it will be passed for the <FotoItem /> during rendering of Timeline
    like(fotoId){
        this.props.store.dispatch(TimelineApi.like(fotoId));
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
