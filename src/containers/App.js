import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Create from './Create'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/*todo: Header component*/}
          <Switch>
            <Route exact path="/" component={null} />
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
