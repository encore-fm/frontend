import React from 'react';
import './Header.scss';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {desynchronize, synchronize} from "../actions/user";

const Header = (props) => {

  const {isLogged, user} = props;

  const handleSync = () => {
    user.spotifySynchronized
      ? props.dispatch(desynchronize(user))
      : props.dispatch(synchronize(user))
  };

  return (
    <header className="Header">
      <h1 className="Header_title">encore</h1>
      <nav className="Header_navigation">
        {isLogged && (
          <ul>
            <li
              onClick={handleSync}
              className={`Header__syncButton${!user.spotifySynchronized ? ' disabled' : ''}`}
            >sync</li>
            <li><Link to="/add">add</Link></li>
          </ul>
        )}
      </nav>
    </header>
  )
};

export default connect(
  state => ({
    isLogged: state.isLogged,
    user: state.user,
  })
)(Header);
