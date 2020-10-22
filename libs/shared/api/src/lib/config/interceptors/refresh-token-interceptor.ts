import axiosStatic, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { getRefreshToken, removeAccessToken, setAccessToken } from '@internship/shared/utils';

export const refreshTokenInterceptor = (error: AxiosError, axios: AxiosInstance = axiosStatic) => {
  console.log(error.toJSON);
  if (error.response.status === 401 && error.response.data?.error.toString() === 'JWT Expired.') {
    removeAccessToken();
    axios.get('http://localhost:8080/api/auth/refresh-token', { params: { token : getRefreshToken() }
    })
      .then(function (response) {
        const accessToken = response.data?.accessToken;
        if(accessToken){
          setAccessToken(accessToken);
          error.config.headers['Authorization'] = `Bearer ${accessToken}`;
          axios.request(error.config);
        }
      })

  }
  else {
    throw error;
  }
};

