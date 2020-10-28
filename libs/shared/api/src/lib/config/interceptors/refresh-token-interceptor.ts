import axiosStatic,{ AxiosError, AxiosInstance } from 'axios';
import { getRefreshToken, removeAccessToken, setAccessToken } from '@internship/shared/utils';

export const refreshTokenInterceptor = (error: AxiosError, axios: AxiosInstance = axiosStatic) => {
  return new Promise((resolve, reject) => {
    if (error.response.status === 401 && error.response.data?.error.toString() === 'JWT Expired.') {
      axios.get('http://localhost:8080/api/auth/refresh-token', { params: { token : getRefreshToken() }
      })
        .then(function (response) {
          const accessToken = response.data?.accessToken;
          if(accessToken){
            setAccessToken(accessToken);
            error.config.headers['Authorization'] = `Bearer ${accessToken}`;
            const res=axios.request(error.config);
            resolve(res);
          }
        })
    }
    return Promise.reject(error);
  });

  throw error;
};
