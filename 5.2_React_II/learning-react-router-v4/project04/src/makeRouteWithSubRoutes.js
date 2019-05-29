import React from 'react';
import { Route } from 'react-router-dom';

// Okay, this <MakeRouteWithSubRoutes /> Component is picking up each route you pass into it and returning a
// React Router <Route /> Component.
//
// As props, we have the path and the render method, which will invoke the route.component you want to render
// (then passing into it the spread props and the sub-routes that it needs to know).
//
// This routes are coming from the route config array 

export const MakeRouteWithSubRoutes = route => {
  return (
    <Route
      path={route.path}
      render={props => (
        <route.component { ...props} routes={route.routes} />
      )}
    />
  );
}