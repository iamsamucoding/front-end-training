import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';

import {timeline} from './reducers/timeline';
import {notificacao} from './reducers/header';


import Header from './componentes/Header';
import Timeline from './componentes/Timeline';



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

export default App;