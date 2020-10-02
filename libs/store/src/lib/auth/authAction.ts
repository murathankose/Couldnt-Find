import { loginAsync, registerAsync } from '../DTO';


export const logInStart = (credentials) => ({
  type: loginAsync.request,
  payload: credentials,
});

export const logInSuccess = (user) => ({
  type: loginAsync.success,
  payload: user,
});

export const logInFailure = (error) => ({
  type: loginAsync.failure,
  payload: error,
});

export const registerStart = (credentials) => ({
  type: registerAsync.request,
  payload: credentials,
});

export const registerSuccess = (user) => ({
  type: registerAsync.success,
  payload: user,
});

export const registerFailure = (error) => ({
  type: registerAsync.failure,
  payload: error,
});

/*export const logOut = () => ({
  type: types.LOG_OUT,
});*/
