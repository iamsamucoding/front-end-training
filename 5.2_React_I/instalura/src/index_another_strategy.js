import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect, matchPath } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import App from './App';
import Login from './componentes/Login';
import Logout from './componentes/Logout';

import './css/login.css';
import "./css/reset.css";
import "./css/timeline.css";


// code from a student extracted from: https://cursos.alura.com.br/forum/topico-liberando-o-acesso-para-timeline-publica-com-route-v4-53798
function verificaAutenticacao(nextState, replace) {
    const match = matchPath('/timeline', {
        path: nextState.match.url,
        exact: true
    });

    let valida = false;
    if (match !== null) {
        valida = match.isExact;
    }

    if (valida && localStorage.getItem('auth-token') === null) {
        return <Redirect to={{
            pathname: '/',
            state:  {msg: 'Faça login para acessar esta página'}
        }}/>
    }
    return <App />
}


ReactDOM.render(
    (<Router>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/timeline/:login?" render={verificaAutenticacao}/>
            <Route exact path="/logout" component={Logout}/>
        </Switch>
    </Router>),

    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
