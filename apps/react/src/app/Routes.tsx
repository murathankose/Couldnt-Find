import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useAuthentication } from '@internship/shared/hooks';
import { About, ForgotPasswordPage, ResetPassword, Contact, Login, MailSuccessPage, MainPage, OAuth2RedirectHandler, Profile, Register, WrongPage } from './pages';

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
      <Route exact path="/mailsuccess" component={MailSuccessPage} />
      {isAuthenticated === false ? <Route path="/login" component={Login} /> : <Route path="/login" component={WrongPage} />}
      {isAuthenticated === false ? <Route path="/register" component={Register} /> : <Route path="/register" component={WrongPage} />}
    </Router>
  );
};
