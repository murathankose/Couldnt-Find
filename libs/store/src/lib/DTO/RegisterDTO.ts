import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';

interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}
interface RegisterSuccessResponse {
  message?: string;
}

export const registerAsync = createAsyncAction(
  'REGISTER_START',
  'REGISTER_SUCCESS',
  'REGISTER_FAILURE'
)<RegisterRequest, RegisterSuccessResponse, AxiosError>();
