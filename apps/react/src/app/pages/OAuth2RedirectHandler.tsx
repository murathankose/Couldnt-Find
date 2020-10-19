import React from 'react';
import { ACCESS_TOKEN } from '@internship/shared/types';
import { Redirect } from 'react-router-dom'

export const OAuth2RedirectHandler = (props) => {

  const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(props.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };
  const token = getUrlParameter("token");
  const error = getUrlParameter('error');
  console.log("Token"+token);
  console.log("errror"+error);
  console.log(props.location.search);
  if(token) {
    localStorage.setItem(ACCESS_TOKEN, token);
    return <Redirect to={{
      pathname: "/",
      state: { from: props.location }
    }}/>;
  }
  else {
    return <Redirect to={{
      pathname: "/login",
      state: {
        from: props.location,
        error: error
      }
    }}/>;
  }

}

export default OAuth2RedirectHandler;
