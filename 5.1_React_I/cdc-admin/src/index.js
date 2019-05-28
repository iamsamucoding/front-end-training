import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './index.css';

import App from './App';
import Home from './Home';
import AutorBox from "./Autor";
import LivroBox from "./Livro";


// With React Router v4, one of the big changes is that there are a number of different router components.
// Each one will create a history object for you.
// The <BrowserRouter> creates a browser history, the <HashRouter> creates a hash history, and the <MemoryRouter>
// creates a memory history.
// In v4, there is no centralized route configuration. Anywhere that you need to render content based on a route,
// you will just render a <Route> component.
//
// One thing to note is that the router component must only be given one child element.
ReactDOM.render(
    // O react-router v4 mudou a forma de fazermos as rotas aninhadas(nested routes).
    // O Router recebe apenas um componente, que pode ser qualquer coisa.
    // O fato primordial é que dentro desse componente exista alguma declaração de rotas, para que os endereços
    // continuem funcionando.
    // Note que que foi justamente isso que fizemos quando passamos o componente App como filho de Router.
    // o Switch (que já vai ser explicado) como argumento da App.
    //
    // Um segundo ponto importante é a utilização do componente Switch.
    // Poderíamos simplesmente deixar várias tag Route como parâmetro da nossa App, dessa forma as rotas
    // seriam registradas e tudo funcionaria.
    // O problema é que nesse caso queremos deixar claro que apenas uma das rotas vai ser acionada,
    // o Switch serve justamente para garantir isso.
    <Router>
        {/*
            We can build a component by compounding other "child" components. To do that, we can use nested routes.
            The App component will have two child routes, each one associated with a given component.
            Then, when passing the route '/autor', e.g., the component App.js can access the corresponding
            child component (AutorBox) by using `this.props.children`.
        */}
        <App>
            <Switch>
                {/* exact = will only match if the path matches the location.pathname exactly.
                e.g: <Route exact path="/one"
                path: /one ==> true, /one/two ==> false

                e.g: <Route exact path="/one" ...
                path: /one ==> true, /one/two ==> true
                */}
                <Route exact path="/" component={Home} />
                <Route path="/autor" component={AutorBox} />
                <Route path="/livro" component={LivroBox} />
            </Switch>
        </App>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
