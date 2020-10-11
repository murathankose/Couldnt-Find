import { AxiosResponse } from 'axios';

export const captchaInterceptor = (res: AxiosResponse) => {
  if (res.config.url.endsWith('/signin')) {
    //TODO res.status return undefined
    if (res.status === 400) {
      //TODO find a better usage to remove this ugly implementation
      window['UGLY_STORE'].dispatch({ type: '@temp/CAPTCHA_REQUIRED', payload: true });
    }
  }

  throw res;
};
