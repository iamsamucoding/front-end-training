import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';

// The NavBar component has a special role here because it’s omnipresent.
//
// Its function is to allow the user to navigate the website and to show the sections (routes) available.
//
// As you’ve seen in the beginning, it’s inside <Router /> but outside <Switch /> so any view will always be
// composed with NavBar on top.
//
// As you can see, its role is basic. It only supplies <Link /> and tells <Router /> to ask <Switch />
// to trigger the chosen <Route /> and render it on screen.

const NavBar = () => {
  return (
    <div>
      <h5>NAVBAR</h5>
      <ul>
        <li><Link to="/Home">Home</Link></li>
        <li><Link to="/About">About</Link></li>
        <li><Link to="/Topics">Topics</Link></li>
      </ul>
      <hr />
    </div>
  );
};

export default NavBar;
