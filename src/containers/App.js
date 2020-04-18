import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from '../components/Header';

import WelcomeView from '../views/WelcomeView';
import CreateSessionView from '../views/CreateSessionView';

import './App.scss'
import 'normalize.css'
import MainView from "../views/MainView";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header/>

          <Switch>
            <Route exact path="/" component={WelcomeView}/>
            <Route path="/join/:sessionID?" component={null}/>
            <Route path="/create" component={CreateSessionView}/>
            <Route path="/player" component={MainView}/>
            <Route path="/profile" component={null}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
