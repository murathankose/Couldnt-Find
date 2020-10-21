import { AxiosError, AxiosResponse } from 'axios';
import { getRefreshToken, removeAccessToken, setAccessToken, setRefreshToken } from '@internship/shared/utils';
import axios from '../axios';

export const refreshTokenInterceptor = (error: AxiosError) => {
  if (error.response.data === 'Username or password is incorrect.') {
    removeAccessToken();
    axios.get('/auth/refresh-token', {
      params: {
        token : getRefreshToken()
      }
    })
      .then(function (response) {
        const accessToken = response.data?.accessToken;
        if(accessToken){
          setAccessToken(accessToken);
        }
      })
  }
  else {
    throw error;
  }
};

