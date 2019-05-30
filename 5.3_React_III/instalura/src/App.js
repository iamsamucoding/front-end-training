import React, { Component } from 'react';

import Header from './componentes/Header';
import Timeline from './componentes/Timeline';

import { createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';

import {timeline} from './reducers/timeline';
import {notificacao} from './reducers/header';


// o jeito do React de combinar reducer é usando essa função
const reducers = combineReducers({timeline, notificacao});


// O Redux trabalha apenas com uma Store.
// Esse é um conceito diferente do propagado pelo Flux, que traz a ideia de múltiplas Stores.
// O Redux trouxe a ideia de Store única, fato que não é proposto pelo Flux.
// Eles sugerem, inclusive, várias Stores e tudo mais.
//
// Quando criamos uma store, passamos a função que será chamada pela Dispatcher do Redux sempre que a
// action for disparada.
const store = createStore(reducers, applyMiddleware(thunkMiddleware));


class App extends Component {
    render() {
        console.log(this.props);

        return (
            <div id="root">
                <div className="main">
                    <Header store={store}/>
                    <Timeline login={this.props.match.params.login} store={store}/>
                </div>
            </div>
        );
    }
}



// NÃO FUNCIONA
// React disponibiliza maneiras de validar coisas nos componentes.
// Em App.js, declararemos a propriedade contextTypes, que é citada na documentação do React.
// Se declararmos a propriedade contextTypes, podemos dizer tudo o que esperamos existir no contexto global do
// React para a criação do objeto.
// Uma das propriedades esperadas é a store, também especificaremos o tipo: PropTypes.object.isRequired - esperamos
// que ele seja obrigatório.
// App.contextTypes = {
//     store : React.PropTypes.object.isRequired
// };

export default App;