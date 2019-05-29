import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import { Routes } from './Routes'; // where we are going to specify our routes


// You are not loading an unique App anymore but a Routes component that will handle the routes and
// will trigger the mounting and rendering of the components which shall load within each route.
//
// As a matter of fact, <Router /> works as a Higher Order Component that only knows its children in the
// future and interacts with them in a more wide scope, independently of who and how many they are.
//
// Just make sure you understand that React.DOM is not anymore loading a simple App.
// It’s loading the App embraced by a Component called Router that in a higher instance or scope can interact
// with it and with the browser DOM.
ReactDOM.render(
    <Router>
        <Routes />
    </Router>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
