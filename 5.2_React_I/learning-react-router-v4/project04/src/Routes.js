import React from 'react';
import { Home } from './views/Home';
import { About } from './views/About';
import { NoMatch } from './views/NoMatch';
import { TopicList } from './views/TopicList';
import { TopicDetail } from './components/TopicDetail';
import { NavBar } from './components/NavBar';
import { MakeRouteWithSubRoutes } from './makeRouteWithSubRoutes';
import { Switch } from 'react-router-dom';



const fetchXYZApiRoutes = () => {
    return [
        {
            path: "/HelloWorld",
            component: "AAA",
        }
    ]
}


// I’ve taken a look at our routes and created this array that defines each route and sub-route we had in our application.
//
// The <MakeRoutesWithSubRoutes /> is a quite easy to use stateless component or function which doesn’t care
// about the routing content. It just routes whatever you feed to it.
//
// What if we wanted to do more sub-routing?
// See? The routes of the /Topics/:topicId could simply be an array like its parent routes.
// But I’ve decided to do better and invoke a function that calls an API and returns a new array of routes
// (just imagine it fetches the API 😃).
const routes = [
    {
        path: "/Home",
        component: Home
    },
    {
        path: "/About",
        component: About
    },
    {
        path: "/Topics",
        component: TopicList,
        routes: [
            {
                path: "/Topics/:topicId",
                component: TopicDetail,
                routes: fetchXYZApiRoutes,
            },
        ]
    },
    {
        path: "/:WhereTheHeckIsThat",
        component: NoMatch,
    }
];


// we’re mapping over the map array using an ES6 (fat arrow) callback to return an abstract component
// called <MakeRouteWithSubRoutes />.
// We are passing into it a key (just for React indexing purposes) and we are spreading the route info also into it.
export const Routes = () => {
    return (
        <div>
            <NavBar />
            <Switch>
                {
                    routes.map(
                        (route, index) => <MakeRouteWithSubRoutes key={index} {...route} />
                    )
                }
            </Switch>
        </div>
    );
};
