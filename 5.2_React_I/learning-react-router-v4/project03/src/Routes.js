import React from 'react';
import { Home } from './views/Home';
import { About } from './views/About';
import { TopicList } from './views/TopicList';
import { NoMatch } from './views/NoMatch';
// import { TopicDetail } from './components/TopicDetail'; project01-02
import { NavBar } from './components/NavBar';
import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
    return (
        <div>
            {/* Home, About, TopicList and NoMatch are views. They have their own proper routes that trigger them.
                NavBar is an omnipresent component that’s always invoked. It doesn’t have a route.
            */}
            <NavBar />
            {/* This component basically renders the first child <Route> or <Redirect> that matches the browser location.
            It starts to test stuff like this: “is the browser URL in this <Route /> path? No? Okay.” Next Route.
            “Is the browser URL in this other route path? No.” Next Route.
            “Oh, I got it! It’s in this one, let’s trigger the Component render and finish the checking by now
            (I don’t care with the other routes below…)”
            */}
            <Switch>
                {/* Each <Route /> tells this to the browser:
                “Hey browser DOM! If <Switch /> chooses me because your location is (exactly) this one,
                please render the following Component”. */}
                <Route exact path="/Home" component={Home} />


                {/* because usually the user would start the Application by typing it’s general URL,
                without the <Redirect /> the first rendered component would be <NoMatch />.
                We don’t want that, we want the user to be redirected to the <Home /> component.
                */}
                <Route exact path="/">
                    <Redirect to="/Home" />
                </Route>

                <Route exact path="/About" component={About} />
                <Route exact path="/Topics" component={TopicList} />

                {/* Changed from project01-02 */}
                <Route path="/Topics/:topicId" component={TopicList} />

                {/* This last Route simply renders a default page stating that no route was matched,
                kind of an HTTP 404 error. */}
                <Route component={NoMatch} />
            </Switch>
        </div>
    );
};
