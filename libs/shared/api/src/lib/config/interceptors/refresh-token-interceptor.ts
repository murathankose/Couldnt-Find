import axiosStatic, { AxiosError, AxiosInstance } from 'axios';
import { getRefreshToken, removeAccessToken, removeRefreshToken, setAccessToken } from '@internship/shared/utils';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { updateLogout } from '@internship/store/authentication';
export const refreshTokenInterceptor = (error: AxiosError, axios: AxiosInstance = axiosStatic) => {
  if (error.response.status === 401 && error.response.data?.error.toString() === 'JWT Expired.') {
    return new Promise((resolve) => {
      axios.get('http://localhost:8080/api/auth/refresh-token', {
        params: { token: getRefreshToken() }
      })
        .then(function(response) {
          const accessToken = response.data?.accessToken;
          if (accessToken) {
            setAccessToken(accessToken);
            error.config.headers['Authorization'] = `Bearer ${accessToken}`;
            const res = axios.request(error.config);
            resolve(res);
          }
        })
        .catch(error => {
          window['UGLY_STORE'].dispatch({ type: '@temp/ERROR_REQUIRED', payload:"Your session has expired. Please login again!" });
          window['UGLY_STORE'].dispatch(updateLogout());
        });


    });
  }
  throw error;
};
