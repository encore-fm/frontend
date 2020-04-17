import React from 'react';
import './Header.scss';

const Header = () => {
  return (
    <header className="Header">
      <h1 className="Header_title">encore</h1>
      <nav className="Header_navigation">
        <ul>
          <li>sync</li>
          <li>add</li>
        </ul>
      </nav>
    </header>
  )
};

export default Header;
