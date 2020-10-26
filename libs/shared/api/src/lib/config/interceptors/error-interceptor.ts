import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {
  switch (error.response?.status) {
    case 401: {
      if (error.response.data?.error.toString() === 'JWT cannot be empty') {
        window['UGLY_STORE'].dispatch({ type: '@temp/ERROR_REQUIRED', payload: 'Kullanıcı adı veya şifre yanlış.' });
        break;
      }
    }
  }
  throw error;
};
