import axiosStatic, { AxiosRequestConfig } from 'axios';
import { loginInterceptor, tokenInterceptor, captchaInterceptor } from './interceptors';

const baseUrl = 'http://localhost:8080';

const defaultConfig: AxiosRequestConfig = {
  baseURL: `${baseUrl}/api/`,
};

export function createAxios(baseConfig: AxiosRequestConfig) {
  const instance = axiosStatic.create(baseConfig);

  // Request Interceptors
  instance.interceptors.request.use(tokenInterceptor);

  // Response Interceptors
  instance.interceptors.response.use(loginInterceptor);
  instance.interceptors.response.use(captchaInterceptor);
  return instance;
}

export default createAxios(defaultConfig);
