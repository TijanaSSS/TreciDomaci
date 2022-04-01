import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  /*Call it the GAG Reel. All things Guns, Airplanes, and Guitars */
  return (
    <nav className="main-nav">
      <ul> 
        <li><NavLink to='/nature'>Nature</NavLink></li>
        <li><NavLink to='/animals'>Animals</NavLink></li>
        <li><NavLink to='/guitars'>Guitars</NavLink></li>
      </ul>
    </nav>
  );
}

export default Nav;