import React from 'react';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@internship/shared/types';
import { Redirect } from 'react-router-dom';
import { googleLogin } from '@internship/store/authentication';
import { useDispatch } from 'react-redux';
import { getUrlParameter } from '@internship/shared/utils';

export const OAuth2RedirectHandler = (props) => {
  const refreshToken = getUrlParameter('refreshToken', props.location.search);
  const accessToken = getUrlParameter('accessToken', props.location.search);
  const error = getUrlParameter('error', props.location.search);
  const dispatch = useDispatch();

  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    dispatch(googleLogin());
    return (
      <Redirect
        to={{
          pathname: '/',
          state: { from: props.location }
        }}
      />
    );
  } else {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: {
            from: props.location,
            error: error
          }
        }}
      />
    );
  }
};
