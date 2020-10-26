import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {
  switch (error.response?.status) {
    case 401: {
      if (error.response.data?.error.toString() === 'Invalid Login details') {
        window['UGLY_STORE'].dispatch({ type: '@temp/ERROR_REQUIRED', payload: 'Kullanıcı adı veya şifre yanlış.' });
        break;
      }
      break;
    }
    case 400: {
      window['UGLY_STORE'].dispatch({ type: '@temp/ERROR_REQUIRED', payload: 'Bu maille kayıtlı bir kullanıcı yok.' });
      break;
    }
  }
  throw error;
};
