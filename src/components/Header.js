import React from 'react';
import './Header.scss';
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <header className="Header">
      <h1 className="Header_title">encore</h1>
      <nav className="Header_navigation">
        <ul>
          <li>sync</li>
          <li><Link to="/add">add</Link></li>
        </ul>
      </nav>
    </header>
  )
};

export default Header;
