import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { useAuthentication } from '@internship/shared/hooks';
import { About, Contact, Login, MainPage, OAuth2RedirectHandler, Profile, Register } from './pages';

export const Routes = ({ children, ...props }) => {
  const { isAuthenticated } = useAuthentication();
  return (
    <Router {...props}>
      {children}
      <Route exact path="/" component={MainPage} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/profile" component={Profile} />
      <Route path="/auth" component={OAuth2RedirectHandler} />
      {!isAuthenticated && <Route path="/login" component={Login} />}
      {!isAuthenticated && <Route path="/register" component={Register} />}
      <Redirect to="/" />
    </Router>
  );
};
