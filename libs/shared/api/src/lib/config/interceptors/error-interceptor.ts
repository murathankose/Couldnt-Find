import { AxiosError } from 'axios';

export const errorinterceptor = (error: AxiosError) => {
  switch (error.response && error.response.status) {
    case 401: {
      window['UGLY_STORE'].dispatch({ type: '@temp/ERROR_REQUIRED', payload: 'Kullanıcı adı veya şifre yanlış.' });
      break;
    }
  }
  throw error;
};
