import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './Header';

import WelcomeView from '../views/WelcomeView';
import CreateSessionView from '../views/CreateSessionView';
import MainView from "../views/MainView";
import JoinSessionView from "../views/JoinSessionView";

import './App.scss'
import 'normalize.css'
import UserList from "./UserList";
import GetStartedView from "../views/GetStartedView";
import {desynchronize} from "../actions/user";
import {connect} from "react-redux";


class App extends Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    if (this.props.user) this.props.dispatch(desynchronize(this.props.user)); // desynchronize user when unmounting
  }

  render() {
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
            <Route path="/get-started" component={GetStartedView}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(
  state => ({
    user: state.user,
  })
)(App);
