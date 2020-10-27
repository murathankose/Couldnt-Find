import axiosStatic,{ AxiosError, AxiosInstance } from 'axios';
import { getRefreshToken, removeAccessToken } from '@internship/shared/utils';

export const refreshTokenInterceptor = (error: AxiosError, axios: AxiosInstance = axiosStatic) => {
  if (error.response.status === 401 && error.response.data?.error.toString() === 'JWT Expired.') {
    removeAccessToken();
    axios.get('auth/refresh-token', { params: { token: getRefreshToken() } }).then(() => axios.request(error.config));
  } else {
    throw error;
  }
};
