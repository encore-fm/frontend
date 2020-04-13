import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/*todo: Header component*/}
          <Switch>
            <Route exact path="/" component={/*todo...*/} />
            <Route path="/join/:sessionID?" component={/*todo...*/} />
            <Route path="/create" component={/*todo...*/} />
            <Route path="/suggest" component={/*todo...*/} />
            <Route path="/profile" component={/*todo...*/} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
