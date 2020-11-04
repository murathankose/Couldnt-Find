import { AxiosError } from 'axios';
import { updateLogout } from '@internship/store/authentication';

const err = {
  'auth/signin': {
    '401': 'Kullanıcı adı veya şifre yanlış',
    '401-2': 'Account not activated. Please activate your account!',
    '429': 'Kullanıcı adı veya şifre yanlış',
  },
  'auth/sign-up': {
    '400-1': 'Email is already in use',
    '400-2': 'Username is already taken',
  },
  'user/change-password': {
    '400-1': 'Old password is incorrect',
    '400-2': 'Password fields does not match',
  },
  'user/edit': {
    '400': 'Email is already in use!',
    '500': 'Phone Number Error',
  },
  'auth/forgot-password': {
    '400': 'No such user',
  },
  'user/create-new-password': {
    '400': 'Something is wrong with that token!',
  },
  'auth/send-email': {
    '400': 'Bu mail ile uygun bir kullanıcı bulamadık. Lütfen kayıt olunuz.',
  },
};
export const errorInterceptor = (error: AxiosError) => {
  let errorMessage = null;
  if (error.config.url === 'user/change-password' && error.response?.status === 400) {
    if (error.response?.data.error.toString() === 'Your old password is not correct') {
      errorMessage = err[error.config.url]['400-1'];
    } else {
      errorMessage = err[error.config.url]['400-2'];
    }
  } else if (error.config.url === 'auth/sign-up' && error.response?.status === 400) {
    if (error.response?.data.error.toString() === 'Email is already in use!') {
      errorMessage = err[error.config.url]['400-1'];
    } else {
      errorMessage = err[error.config.url]['400-2'];
    }
  } else if (error.config.url === 'auth/signin' && error.response?.status === 401) {
    if (error.response?.data.error.toString() === 'Account not activated. Please activate your account!') {
      errorMessage = err[error.config.url]['401-2'];
    } else {
      errorMessage = err[error.config.url]['401'];
    }
  } else if (error.config.url.startsWith('auth/send-email') && error.response?.status === 400) {
    errorMessage = err['auth/send-email']['400'];
  } else if (error.response?.data.error.toString() === 'Invalid Login details' && error.response?.status === 401) {
    window['UGLY_STORE'].dispatch({type:'@Authentication/UPDATE_LOGOUT'});
    errorMessage = null;
  } else {
    errorMessage = err[error.config.url][error.response?.status];
  }

  window['UGLY_STORE'].dispatch({ type: '@temp/ERROR_REQUIRED', payload: errorMessage });
  throw error;
};
