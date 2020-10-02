import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';

interface LoginRequest {
  username: string;
  password: string;
  captcha?: string;
}
interface LoginSuccessResponse {
  username: string;
  token: string;
}

export const loginAsync = createAsyncAction(
  'LOG_IN_START',
  'LOG_IN_SUCCESS',
  'LOG_IN_FAILURE'
)<LoginRequest, LoginSuccessResponse, AxiosError>();
