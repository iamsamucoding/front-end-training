import React, { Component } from 'react';
import {createStore} from 'redux';

import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import TimelineStore from './logicas/TimelineStore';

const timelineStore = new TimelineStore([]);


// Toda função passada para store do redux receberá dois argumentos: state and action
// O redux sugere fortemente que trabalhemos com o conceito de dados imutáveis, então, não teremos uma classe
// com um atributo que modificará o estado. Em vez disso, sempre receberemos um estado prévio que receberá
// uma ação enviada para o Dispatcher.
//
// A função timeline costuma ser chamada de função redutora: Entrou o estado de uma forma e será devolvido de outra.
//
// REDUCER
function timeline(state=[], action){
    if (action.type === 'LISTAGEM'){
        return action.fotos;
    }
    return state;
}

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