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


const App = (props) => {

  const {error} = props;

  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path="/" component={WelcomeView}/>
          <Route path="/join/:sessionID?" component={JoinSessionView}/>
          <Route path="/join" component={JoinSessionView}/>
          <Route path="/create" component={CreateSessionView}/>
          <Route path="/player" component={MainView}/>
          <Route path="/add" component={MainView}/>
          <Route path="/profile" component={UserList}/>
          <Route path="/callback/:state/:message?" component={CallbackView}/>
          <Route path="/get-started" component={GetStartedView}/>
          <Route path="/session-not-found" component={SessionNotFoundView}/>
        </Switch>
        {error.error === REQUEST_NOT_AUTHORIZED_ERROR  && <Redirect to="/session-not-found"/>}
      </div>
    </Router>
  );
};

export default connect(
  state => ({
    error: state.error,
  })
)(App);
