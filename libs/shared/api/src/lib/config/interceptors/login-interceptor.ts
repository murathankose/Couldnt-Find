import { AxiosResponse } from 'axios';
import { setAccessToken } from '@internship/shared/utils';

export const loginInterceptor = (res: AxiosResponse) => {
  if (res.config.url.endsWith('/signin')) {
    const accessToken = res.data?.accessToken;
    if (res.status === 200 && accessToken) {
      setAccessToken(accessToken);
    }
  }

  return res;
};
