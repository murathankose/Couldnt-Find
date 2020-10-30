import axiosStatic, { AxiosError, AxiosInstance } from 'axios';
import { getRefreshToken, setAccessToken } from '@internship/shared/utils';

const err = {
  'auth/signin': {
    '401': 'Kullanıcı adı veya şifre yanlış',
    '429': 'Kullanıcı adı veya şifre yanlış'
  },
  'auth/sign-up': {
    '400-1': 'Email is already in use',
    '400-2': 'Username is already taken'
  },
  'user/change-password': {
    '400-1': 'Old password is incorrect',
    '400-2': 'Password fields does not match'
  },
  'user/edit': {
    '400-1': 'Email is already in use!',
    '400-2': 'You did not update anything'
  },
'auth/forgot-password':{
    '400':'No such user',
},
  'user/create-new-password':{
    '400':'Something is wrong with that token!',
  },
};
export const errorInterceptor = (error: AxiosError, axios: AxiosInstance = axiosStatic) => {
  let errorMessage = err[error.config.url][error.response?.status];
  if (error.config.url === 'user/change-password' && error.response?.status === 400) {
    if (error.response?.data.error.toString() === 'Your old password is not correct') {
      errorMessage = err[error.config.url]['400-1'];
    } else {
      errorMessage = err[error.config.url]['400-2'];
    }
  }

  if (error.config.url === 'auth/sign-up' && error.response?.status === 400) {
    if (error.response?.data.error.toString() === 'Email is already in use!') {
      errorMessage = err[error.config.url]['400-1'];
    } else {
      errorMessage = err[error.config.url]['400-2'];
    }
  }
  if (error.config.url === 'user/edit' && error.response?.status === 400) {
    if (error.response?.data.error.toString() === 'Email is already in use!') {
      errorMessage = err[error.config.url]['400-1'];
    } else {
      errorMessage = err[error.config.url]['400-2'];
    }
  }
  if (error.config.url === 'user/edit' && error.response?.status === 400) {
    if (error.response?.data.error.toString() === 'Email is already in use!') {
      errorMessage = err[error.config.url]['400-1'];
    } else {
      errorMessage = err[error.config.url]['400-2'];
    }
  }
  window['UGLY_STORE'].dispatch({ type: '@temp/ERROR_REQUIRED', payload: errorMessage });
  throw error;
};
