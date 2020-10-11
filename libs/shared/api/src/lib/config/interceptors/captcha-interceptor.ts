import { AxiosError } from 'axios';

export const captchaInterceptor = (error: AxiosError) => {
  if (error.config.url.endsWith('/signin')) {
    console.log(error.config.data);
    if (error.response.status === 400) {
      //TODO find a better usage to remove this ugly implementation
      window['UGLY_STORE'].dispatch({ type: '@temp/CAPTCHA_REQUIRED', payload: true });
    }
  }

  throw error;
};
