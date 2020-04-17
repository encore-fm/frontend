import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Create from './Create'
import Header from '../components/Header';

import WelcomeView from "../views/welcome";

import './App.scss'
import 'normalize.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header/>

          <Switch>
            <Route exact path="/" component={WelcomeView} />
            <Route path="/join/:sessionID?" component={null} />
            <Route path="/create" component={Create} />
            <Route path="/suggest" component={null} />
            <Route path="/profile" component={null} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
