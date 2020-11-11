import { AxiosError } from 'axios';
const err = {
  'auth/signin': {
    '401': 'Kullanıcı adı veya şifre yanlış',
    '401-2': 'Account not activated. Please activate your account!',
  },
  'auth/sign-up': {
    '102': 'Email is already in use',
    '101': 'Username is already taken',
  },
  'user/change-password': {
    '108': 'Old password is incorrect',
    '109': 'Password fields does not match',
  },
  'user/edit': {
    '400': 'Email is already in use!',
    '500': 'Phone Number Error',
  },
  'auth/forgot-password': {
    '105': 'There is no registered user on this email.',
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
  if (error.response?.data.message.toString() === '108') {
    errorMessage = err[error.config.url]['108'];
  } else if (error.response?.data.message.toString() === '109') {
    errorMessage = err[error.config.url]['109'];
  } else if (error.response?.data.message.toString() === '101') {
    errorMessage = err[error.config.url]['101'];
  } else if (error.response?.data.message.toString() === '102') {
    errorMessage = err[error.config.url]['102'];
  } else if (error.response?.data.message.toString() === '105') {
    errorMessage = err[error.config.url]['105'];
  } else if (error.response?.data.message.toString() === '108') {
    errorMessage = err[error.config.url]['108'];
  } else if (error.response?.data.message.toString() === 'User with given email could not found') {
    errorMessage = err['auth/send-email']['400'];
  } else if (error.config.url === 'auth/signin' && error.response?.status === 401) {
    if (error.response?.data.error.toString() === 'Account not activated. Please activate your account!') {
      errorMessage = err[error.config.url]['401-2'];
    } else {
      errorMessage = err[error.config.url]['401'];
    }
  } else if (error.response?.data.error.toString() === 'Invalid Login details' && error.response?.status === 401) {
    window['UGLY_STORE'].dispatch({ type: '@Authentication/UPDATE_LOGOUT' });
    errorMessage = null;
  } else {
    errorMessage = err[error.config.url][error.response?.status];
  }

  window['UGLY_STORE'].dispatch({ type: '@temp/ERROR_REQUIRED', payload: errorMessage });
  throw error;
};
