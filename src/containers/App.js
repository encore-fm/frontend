import React, {useEffect} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch, useHistory} from 'react-router-dom';

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

const App = (props) => {
  const {error} = props;

  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path="/" component={withTracker(WelcomeView)}/>
          <Route path="/join/:sessionID?" component={withTracker(JoinSessionView)}/>
          <Route path="/join" component={withTracker(JoinSessionView)}/>
          <Route path="/create" component={withTracker(CreateSessionView)}/>
          <Route path="/player" component={withTracker(MainView)}/>
          <Route path="/add" component={withTracker(MainView)}/>
          <Route path="/profile" component={withTracker(UserList)}/>
          <Route path="/callback/:state" component={withTracker(CallbackView)}/>
          <Route path="/get-started" component={withTracker(GetStartedView)}/>
          <Route path="/session-not-found" component={withTracker(SessionNotFoundView)}/>
        </Switch>
        {error.error === REQUEST_NOT_AUTHORIZED_ERROR && <Redirect to="/session-not-found"/>}
      </div>
    </Router>
  );
};

export default connect(
  state => ({
    error: state.error,
  })
)(App);
