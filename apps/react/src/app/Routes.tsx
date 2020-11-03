import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  About,
  Contact,
  ForgotPasswordPage,
  Login,
  MailSuccessPage,
  MainPage,
  OAuth2RedirectHandler,
  Profile,
  Register,
  ResetPassword
} from './pages';

export const Routes = ({ children, ...props }) => {
  return (
    <Router {...props}>
      {children}
      <Route exact path="/" component={MainPage} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/forgotpassword" component={ForgotPasswordPage} />
      <Route path="/resetpassword" component={ResetPassword} />
      <Route path="/profile" component={Profile} />
      <Route path="/auth" component={OAuth2RedirectHandler} />
      <Route exact path="/mailsuccess" component={MailSuccessPage} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Router>
  );
};
