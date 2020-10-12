import { AxiosRequestConfig } from 'axios';

export const captchaInterceptor = (config: AxiosRequestConfig) => {
  if(config.data.captcha !== undefined){
    const data = config.data.captcha;
    config.headers['captcha-response']=`${data}`;
  }
  return config;
};
