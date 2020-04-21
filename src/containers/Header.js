import React, {useState} from 'react';
import './Header.scss';
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {deleteSession, desynchronize, leaveSession, synchronize} from "../actions/user";
import IconMenu from "../components/icons/IconMenu";
import IconClose from "../components/icons/IconClose";

const Header = (props) => {
  const history = useHistory();
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

  const adminDeleteSession = () => {
    if (!window.confirm('are you sure?\nthis session will be deleted')) return;

    props.dispatch(deleteSession(user));
    localStorage.clear();
    history.push('/');
  };

  const userLeaveSession = () => {
    if (!window.confirm('are you sure? your score will be deleted')) return;

    props.dispatch(leaveSession(user));
    localStorage.clear();
    history.push('/');
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
            {user.isAdmin
              ? <li onClick={adminDeleteSession}>delete session</li>
              : <li onClick={userLeaveSession}>leave session</li>
            }
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
