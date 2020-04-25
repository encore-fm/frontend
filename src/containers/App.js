import React, {useEffect} from 'react';
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
import ReactGA from "react-ga";
import {createBrowserHistory} from "history";
import {desynchronize} from "../actions/user";

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);

const history = createBrowserHistory();


const App = (props) => {
  const {user, isLogged, error} = props;

  useEffect(() => {
    const desynchronizeFn = () => {
      if (isLogged && user && user.spotifyAuthorized) props.dispatch(desynchronize(user));
    };

    window.addEventListener('beforeunload', desynchronizeFn);
    return () => {
      window.removeEventListener('beforeunload', desynchronizeFn);
    }
  }, [user]);

  useEffect(() => {
    logPageView(history);
  }, [history]);

  const logPageView = (history) => {
    history.listen((location) => {
      const page = location.pathname || window.location.pathname;
      ReactGA.set({page: page});
      ReactGA.pageview(page);
      console.log(`Page View logged for: ${page}`);
    });
  };

  return (
    <Router history={history}>
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
          <Route path="/callback/:state" component={CallbackView}/>
          <Route path="/get-started" component={GetStartedView}/>
          <Route path="/session-not-found" component={SessionNotFoundView}/>
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
