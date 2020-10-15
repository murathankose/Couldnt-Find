import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class AuthResource {
  constructor(private axios: AxiosInstance = axiosStatic, private axiosRequestConfig: AxiosRequestConfig = {}) {}

  // TODO change any types according to request/response model
  login = (data: any): Promise<any> => this.axios.post('auth/signin', data, this.axiosRequestConfig).then((r) => r.data);
  loginGoogle = (data: any): Promise<any> => this.axios.post('/oauth2/authorize/google?redirect_uri=http://localhost:4200/signin', data, this.axiosRequestConfig).then((r) => r.data);
  register = (data: any): Promise<any> => this.axios.post('auth/sign-up', data, this.axiosRequestConfig).then((r) => r.data);
}
