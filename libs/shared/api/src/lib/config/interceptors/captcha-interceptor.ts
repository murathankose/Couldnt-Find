import { AxiosResponse } from 'axios';


export const captchaInterceptor = (res: AxiosResponse) => {


  if (res.config.url.endsWith('/signin')) {
    const data = res.data.type;
    if (res.status === 400) {
      console.log(res.status);
    }
  }

  return res;
};
