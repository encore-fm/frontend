import React, {useState} from 'react';
import './Header.scss';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {desynchronize, synchronize} from "../actions/user";
import IconMenu from "../components/icons/IconMenu";
import IconClose from "../components/icons/IconClose";

const Header = (props) => {

  const [menuOpen, setMenuOpen] = useState(false);
  const {isLogged, user} = props;

  const handleSync = () => {
    user.spotifySynchronized
      ? props.dispatch(desynchronize(user))
      : props.dispatch(synchronize(user))
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const copyInviteLink = () => {
    if (user && user.sessionID) {
      const inviteLink = `${window.location.host}/join/${user.sessionID}`;
      window.prompt("copy to clipboard: Ctrl+C", inviteLink);
    }
  };

  const leaveSession = () => {
    if (window.confirm('sure?')) localStorage.clear();
  };

  return (
    <header className="Header">
      <div className="Header__content">
        <h1 className="Header_title"><Link to="/">encore.</Link></h1>
        <nav className="Header_navigation">
          {isLogged && (
            <ul>
              <li
                onClick={handleSync}
                className={`Header__syncButton${!user.spotifySynchronized ? ' disabled' : ''}`}
              >sync
              </li>
              <li><Link to="/add">add</Link></li>
              <li>
                {!menuOpen
                  ? <IconMenu onClick={handleMenuOpen}/>
                  : <IconClose onClick={handleMenuClose}/>
                }
              </li>
            </ul>
          )}
        </nav>
      </div>
      {isLogged && (
        <menu className={`Header__extraMenu ${!menuOpen ? 'closed' : ''}`}>
          <ul>
            <li onClick={copyInviteLink}>copy invite link</li>
            <li onClick={leaveSession}>leave session</li>
            <li className="not-implemented">help</li>
          </ul>
        </menu>
      )}
    </header>
  )
};

export default connect(
  state => ({
    isLogged: state.isLogged,
    user: state.user,
  })
)(Header);
