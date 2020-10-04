import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';

import About from './pages/About';
import Contact from './pages/Contact';
import history from './history';
import Register from './pages/Register';
import Login from './pages/Login';
import MainPage from './pages/MainPage';

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Route exact path="/" component={MainPage} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Router>
    );
  }
}
