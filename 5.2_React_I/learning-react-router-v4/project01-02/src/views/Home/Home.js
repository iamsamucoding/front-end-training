import React from 'react';

// Every view, component, or whatever that’s wrapped by Router has these objects.
// <Router /> does its job as an Higher Order Component and wraps your components or views and injects
// these three objects (history, location, match) as props inside them.


// Match
// The match object contains information about how a <Route path> matched the URL.
//
// params: (object), key/value pairs parsed from the URL corresponding to the dynamic segments of the path
// isExact: (boolean), true if the entire URL was matched (no trailing characters)
// path: (string), the path pattern used to match. Useful for building nested routes. We’ll take a look at this later in one of the next articles.
// url: (string), the matched portion of the URL. Useful for building nested links.
//
// What happens is that the Router doesn’t know the full path?
// e.g: /About/Whatever
// So it routes you up until where it knows the way. Note that this full link does not exist, but /About exist
// isExact is then false telling you precisely that the “entire URL was not matched”.
//
// match.params is one of the most common usages for match.
// We’ve used the match.params.topicId to print in the screen our topic name in ./components/TopicDetail/TopicDetail.js


// Location
// The location object represents where the app is now, where you want it to go, or even where it was.
// It’s also found on history.location but you shouldn’t use that because it’s mutable.
// A location object is never mutated so you can use it in the lifecycle hooks to determine when navigation happens.
// This is really useful for data fetching or DOM side effects.


// History
// It allows you to manage and handle the browser history inside your views or components.
//
// length: (number), the number of entries in the history stack
// action: (string), the current action (PUSH, REPLACE or POP)
// location: (object), the current location
// push(path, [state]): (function), pushes a new entry onto the history stack
// replace(path, [state]): (function), replaces the current entry on the history stack
// go(n): (function), moves the pointer in the history stack by n entries
// goBack(): (function), equivalent to go(-1)
// goForward(): (function,) equivalent to go(1)
// block(prompt): (function), prevents navigation
//
// Again, the history object is mutable. Therefore it is recommended to access the location from the render props of Route,
// not from history.location.


const Home = props => {
  return (
    <div>
      <h3>Home View</h3>
    </div>
  );
};

export default Home;
