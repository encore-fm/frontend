import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import Header from './Header';

import WelcomeView from '../views/WelcomeView';
import CreateSessionView from '../views/CreateSessionView';
import MainView from "../views/MainView";
import JoinSessionView from "../views/JoinSessionView";

import './App.scss'
import 'normalize.css'
import UserList from "./UserList";
import CallbackView from "../views/CallbackView";
import GetStartedView from "../views/GetStartedView";
import {connect} from "react-redux";
import {REQUEST_NOT_AUTHORIZED_ERROR} from "../services/backend/constants";
import SessionNotFoundView from "../views/SessionNotFoundView";
import {withTracker} from "./withTracker";
import SpotifyPlayer from "./SpotifyPlayer";
import {logOut} from "../actions/user";

const App = (props) => {
  const {error} = props;

  // redirects the user to the SessionNotFound page if authentication fails
  // ignores the authentication failure if the user is attempting to join a new session, fixes join bug
  const shouldRedirect = () => {
    const firstPathComponent = window.location.pathname.split('/')[1];
    const notAuthorized = error.error === REQUEST_NOT_AUTHORIZED_ERROR;

    // if old session is not found and user wants to join a new session, clear data and continue to join page
    if (notAuthorized && firstPathComponent === 'join') {
      props.dispatch(logOut());
    } else if (notAuthorized) { // old session not found -> redirect
      return true
    }

    // do not redirect
    return false;
  };

  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path="/" component={withTracker(WelcomeView)}/>
          <Route path="/join/:sessionID?" component={withTracker(JoinSessionView)}/>
          <Route path="/join" component={withTracker(JoinSessionView)}/>
          <Route path="/create" component={withTracker(CreateSessionView)}/>
          <Route path="/(player|add)" component={withTracker(MainView)}/>
          <Route path="/profile" component={withTracker(UserList)}/>
          <Route path="/callback/:state/:message?" component={withTracker(CallbackView)}/>
          <Route path="/get-started" component={withTracker(GetStartedView)}/>
          <Route path="/session-not-found" component={withTracker(SessionNotFoundView)}/>
        </Switch>
        <SpotifyPlayer/>
        {shouldRedirect() && <Redirect to="/session-not-found"/>}
      </div>
    </Router>
  );
};

export default connect(
  state => ({
    error: state.error,
  })
)(App);
