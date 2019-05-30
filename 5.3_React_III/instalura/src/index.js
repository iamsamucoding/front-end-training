import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';

import App from './App';
import Login from './componentes/Login';
import Logout from './componentes/Logout';

import './css/login.css';
import "./css/reset.css";
import "./css/timeline.css";



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





// https://cursos.alura.com.br/forum/topico-liberando-o-acesso-para-timeline-publica-com-route-v4-53798
// https://tylermcginnis.com/react-router-protected-routes-authentication/
// https://www.freecodecamp.org/news/hitchhikers-guide-to-react-router-v4-21c99a878bf8/


// A simple SecretRoute component adapted from https://auth0.com/blog/react-router-4-practical-tutorial/ to our project,
// to use `localStorage`.
// This code simply illustrates that if the authentication status of the user is true,
// then a component would be rendered else the user would be redirected to the "/" route.s
const SecretRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        (localStorage.getItem('auth-token') === null)
            ? <Redirect to={{
                pathname: '/',
                state: {msg:'usuário não autenticado'}
            }}/>
            : <Component {...props} />
    )} />
);


ReactDOM.render(
    // <BrowserRouter> is a <Router> that uses the HTML5 history API (pushState, replaceState and the popstate event)
    // to keep your UI in sync with the URL.
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Login}/>
                <SecretRoute exact path="/timeline" component={App}/>
                <Route path="/timeline/:login" component={App}/>
                <Route path="/logout" component={Logout}/>
            </Switch>
        </div>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
