import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import About from './pages/About';
import Contact from './pages/Contact';
import history from './history';
import Register from './pages/register';
import Login from './pages/Login';
import MainPage from "./pages/MainPage";

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
          <Route path="/" />
          <Route path="/About" component={About} />
          <Route path="/Contact" component={Contact} />
          <Route path="/Sign_in" component={Login} />
        <Route path="/Register" component={Register} />
      </Router>
    );
  }
}
