import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from '../components/Header';

import WelcomeView from '../views/WelcomeView';
import CreateSessionView from '../views/CreateSessionView';
import MainView from "../views/MainView";
import JoinSessionView from "../views/JoinSessionView";

import './App.scss'
import 'normalize.css'


class App extends Component {
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
            <Route path="/profile" component={null}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
