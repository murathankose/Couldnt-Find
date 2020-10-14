import React from 'react';
import { BrowserRouter as Router, Route,Redirect } from 'react-router-dom';
import { useAuthentication } from '@internship/shared/hooks';

import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import MainPage from './pages/MainPage';


export const Routes = ({ children, ...props }) => {
  const { isAuthenticated } = useAuthentication();
  return (
    <Router {...props}>
      {children}
      <Route exact path="/" component={MainPage} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      {!isAuthenticated&&(<Route path="/login" component={Login} />)}
      {!isAuthenticated&&(<Route path="/register" component={Register} />)}

      <Redirect to="/"/>
    </Router>
  );
};
