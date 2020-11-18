import { AxiosResponse } from 'axios';
import { setAccessToken, setRefreshToken, setUserName } from '@internship/shared/utils';

export const loginInterceptor = (res: AxiosResponse) => {
  if (res.config.url.endsWith('/signin') || res.config.url.endsWith('/refresh-token')) {
    const accessToken = res.data?.accessToken;
    const refreshToken = res.data?.refreshToken;
    const username = res.data?.username;
    if (res.status === 200) {
      if (accessToken) setAccessToken(accessToken);
      if (refreshToken) setRefreshToken(refreshToken);
      if (username) setUserName(username);
      window['UGLY_STORE'].dispatch({ type: '@temp/CAPTCHA_REQUIRED', payload: false });
    }
  }

  return res;
};
