import React, { Component } from 'react';
import {createStore} from 'redux';

import {timeline} from "./reducers/timeline";


import Header from './componentes/Header';
import Timeline from './componentes/Timeline';




// O Redux trabalha apenas com uma Store.
// Esse é um conceito diferente do propagado pelo Flux, que traz a ideia de múltiplas Stores.
// O Redux trouxe a ideia de Store única, fato que não é proposto pelo Flux.
// Eles sugerem, inclusive, várias Stores e tudo mais.
//
// Quando criamos uma store, passamos a função que será chamada pela Dispatcher do Redux sempre que a
// action for disparada.
const store = createStore(timeline);


class App extends Component {
    render() {
        console.log(this.props);

        return (
            <div id="root">
                <div className="main">
                    <Header/>
                    <Timeline login={this.props.match.params.login} store={store}/>
                </div>
            </div>
        );
    }
}

export default App;