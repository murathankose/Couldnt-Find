import axiosStatic, { AxiosRequestConfig } from 'axios';

const baseUrl = 'http://localhost:8080';

const defaultConfig: AxiosRequestConfig = {
  baseURL: `${baseUrl}/api/`,
};

export function createAxios(baseConfig: AxiosRequestConfig) {
  const instance = axiosStatic.create(baseConfig);

  // TODO interface calls
  return instance;
}

export default createAxios(defaultConfig);
