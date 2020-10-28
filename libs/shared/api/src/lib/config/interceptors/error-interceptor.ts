import { AxiosError } from 'axios';
const err ={
  'auth/signin': {
    '401': 'Kullanıcı adı veya şifre yanlış',
    '429': 'Kullanıcı adı veya şifre yanlış',
  },
  'auth/sign-up': {
    '400-1': 'Email is already in use',
    '400-2': 'Username is already taken',
  },
  'user/change-password': {
    '400-1': 'Old password is incorrect',
    '400-2': 'Password fields does not match',
  }

}
export const errorInterceptor = (error: AxiosError) => {
  let errorMessage = err[error.config.url][error.response?.status];
  if(error.config.url === 'user/change-password' && error.response?.status === 400){
    if(error.response?.data.error.toString() === 'Your old password is not correct'){
      errorMessage = err[error.config.url]['400-1'];
    }
    else{
      errorMessage = err[error.config.url]['400-2'];
    }
  }

  if(error.config.url === 'auth/sign-up' && error.response?.status === 400){
    if(error.response?.data.error.toString() === 'Email is already in use!'){
      errorMessage = err[error.config.url]['400-1'];
    }
    else{
      errorMessage = err[error.config.url]['400-2'];
    }
  }

  /*console.log(error.config.url);
  console.log(errorMessage);*/
  window['UGLY_STORE'].dispatch({ type: '@temp/ERROR_REQUIRED', payload: errorMessage });
throw error;
  };
