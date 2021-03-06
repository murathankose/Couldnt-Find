import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  Contents,
  ForgotPasswordPage,
  Login,
  MailErrorPage,
  MailSuccessPage,
  MainPage,
  OAuth2RedirectHandler,
  Profile,
  Register,
  ResetPassword,
  UserInfo
} from './pages';

export const Routes = ({ children, ...props }) => {
  return (
    <Router {...props}>
      {children}
      <Route exact path="/" component={MainPage} />
      <Route path="/forgotpassword" component={ForgotPasswordPage} />
      <Route path="/resetpassword" component={ResetPassword} />
      <Route path="/profile" component={Profile} />
      <Route path="/auth" component={OAuth2RedirectHandler} />
      <Route exact path="/mailsuccess" component={MailSuccessPage} />
      <Route exact path="/mailerror" component={MailErrorPage} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/topics/:topicId" component={Contents} />
      <Route path="/user/:userName" component={UserInfo} />
    </Router>
  );
};
