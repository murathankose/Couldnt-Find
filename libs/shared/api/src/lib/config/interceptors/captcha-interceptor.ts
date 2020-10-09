import { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';

export const captchaInterceptor = (res: AxiosResponse) => {
  if (res.config.url.endsWith('/signin')) {
    const data = res.data.type;
    if (res.status !== 417 && data === 'captcha-request') {

    }
  }

  return res;
};
