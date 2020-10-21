import { createAction, createAsyncAction } from 'typesafe-actions';
import { LoginRequest, RegisterRequest, UpdateRequest } from './types';
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

export const updateAsync = createAsyncAction('@Authentication/UPDATE_REQUEST', '@Authentication/UPDATE_SUCCESS', '@Authentication/UPDATE_FAILURE')<
  UpdateRequest,
  any,
  AxiosError
>();

export const logout = createAction('@Authentication/LOGOUT')();
