import { createAsyncAction } from 'typesafe-actions';
import { LoginRequest, RegisterRequest} from './types';
import { AxiosError } from 'axios';

export const loginAsync = createAsyncAction('@Authentication/LOGIN_REQUEST', '@Authentication/LOGIN_SUCCESS', '@Authentication/LOGIN_FAILURE')<
  LoginRequest,
  any,
  AxiosError
>();

export const registerAsync = createAsyncAction(
  '@Authentication/REGISTER_REQUEST',
  '@Authentication/REGISTER_SUCCESS',
  '@Authentication/REGISTER_FAILURE'
)<RegisterRequest, any, AxiosError>();

export const logoutAsync = createAsyncAction('@Authentication/LOGOUT_REQUEST', '@Authentication/LOGOUT_SUCCESS', '@Authentication/LOGOUT_FAILURE')<
  any,
  any,
  AxiosError
  >();
