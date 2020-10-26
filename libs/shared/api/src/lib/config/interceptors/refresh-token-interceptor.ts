import { AxiosError } from 'axios';
import { getRefreshToken, removeAccessToken } from '@internship/shared/utils';
import axios from '../axios';

export const refreshTokenInterceptor = (error: AxiosError) => {
  console.log(error.toJSON);
  if (error.response.status === 401 && error.response.data?.error.toString() === 'JWT Expired.') {
    removeAccessToken();
    axios.get('auth/refresh-token', { params: { token: getRefreshToken() } }).then(() => axios.request(error.config));
  } else {
    throw error;
  }
};
