import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { useAuthentication } from '@internship/shared/hooks';
import {
  About,
  Contact,
  ForgotPasswordPage,
  Login,
  MailSuccesPage,
  MainPage,
  OAuth2RedirectHandler,
  Profile,
  Register,
  WrongPage
} from './pages';
import { ResetPassword } from './pages/ForgotPassword';

export const Routes = ({ children, ...props }) => {
  const { isAuthenticated } = useAuthentication();
  return (
    <Router {...props}>
      {children}
      <Route exact path="/" component={MainPage} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/forgotpassword" component={ForgotPasswordPage} />
      <Route path="/resetpassword" component={ResetPassword} />
      {isAuthenticated === true ? <Route path="/profile" component={Profile} /> : <Route path="/profile" component={WrongPage} />}
      <Route path="/auth" component={OAuth2RedirectHandler} />
      <Route exact path="/mailsuccess" component={MailSuccesPage} />
      {isAuthenticated === false ? <Route path="/login" component={Login} /> : <Route path="/login" component={WrongPage} />}
      {isAuthenticated === false ? <Route path="/register" component={Register} /> : <Route path="/register" component={WrongPage} />}
    </Router>
  );
};
