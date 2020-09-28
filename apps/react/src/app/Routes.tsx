import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import About from './pages/About';
import Contact from './pages/Contact';
import history from './history';
import register from './pages/register';

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" />
          <Route path="/About" component={About} />
          <Route path="/Contact" component={Contact} />
        </Switch>
        <Route path="/Register" component={register} />
      </Router>
    );
  }
}
