import React, {useEffect} from 'react';
import './Header.scss';
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {
  authenticate,
  deleteSession,
  leaveSession,
  logOut,
} from "../actions/user";
import IconMenu from "../components/icons/IconMenu";
import IconClose from "../components/icons/IconClose";
import {closeMenu, openMenu} from "../actions/menu";

const Header = (props) => {
  const history = useHistory();
  const {isLogged, menuOpen, user} = props;

  useEffect(() => {
    if (user) props.dispatch(authenticate(user));
  }, []);
  
  const handleMenuClose = () => {
    props.dispatch(closeMenu())
  };

  const handleMenuOpen = () => {
    props.dispatch(openMenu())
  };

  const handleClickAdd = () => {
    props.dispatch(closeMenu())
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
    props.dispatch(logOut()); // clears user, isLogged and error
    localStorage.clear();
    history.push('/');
  };

  const userLeaveSession = () => {
    if (!window.confirm('are you sure? your score will be deleted')) return;

    props.dispatch(leaveSession(user));
    props.dispatch(logOut()); // clears user, isLogged and error
    localStorage.clear();
    history.push('/');
  };

  return (
    <header className="Header">
      <div className="Header__content">
        <h1 className="Header_title"><Link to={user ? "/player" : "/"}>encore.</Link></h1>
        <nav className="Header_navigation">
          {isLogged && (
            <ul>
              <li><Link to="/add" onClick={handleClickAdd}>add</Link></li>
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
    menuOpen: state.menuOpen,
  })
)(Header);
