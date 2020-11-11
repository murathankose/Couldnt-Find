import { createAction, createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import {
  ChangePasswordRequest, ContentRequest,
  ForgotPasswordRequest,
  LoginRequest,
  LogoutRequest,
  RegisterRequest,
  ResetPasswordRequest, TopicRequest,
  UpdateRequest
} from '@internship/shared/types';

export const loginAsync = createAsyncAction('@Authentication/LOGIN_REQUEST', '@Authentication/LOGIN_SUCCESS', '@Authentication/LOGIN_FAILURE')<
  LoginRequest,
  any,
  AxiosError
>();

export const forgotpasswordAsync = createAsyncAction(
  '@Authentication/FORGOTPASSWORD_REQUEST',
  '@Authentication/FORGOTPASSWORD_SUCCESS',
  '@Authentication/FORGOTPASSWORD_FAILURE'
)<ForgotPasswordRequest, any, AxiosError>();

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
export const logoutAsync = createAsyncAction('@Authentication/LOGOUT_REQUEST', '@Authentication/LOGOUT_SUCCESS', '@Authentication/LOGOUT_FAILURE')<
  LogoutRequest,
  any,
  AxiosError
>();

export const topicAsync = createAsyncAction('@TOPIC_REQUEST', '@TOPIC_SUCCESS', '@TOPIC_FAILURE')<
  TopicRequest,
  any,
  AxiosError
  >();
export const contentAsync = createAsyncAction('@CONTENT_REQUEST', '@CONTENT_SUCCESS', '@CONTENT_FAILURE')<
  ContentRequest,
  any,
  AxiosError
  >();

export const resetpasswordAsync = createAsyncAction(
  '@Authentication/RESETPASSWORD_REQUEST',
  '@Authentication/RESETPASSWORD_SUCCESS',
  '@Authentication/RESETPASSWORD_FAILURE'
)<ResetPasswordRequest, any, AxiosError>();

export const googleLogin = createAction('@Authentication/GOOGLE_LOGIN')();
export const updateLogout = createAction('@Authentication/UPDATE_LOGOUT')();

export const changePasswordAsync = createAsyncAction(
  '@Authentication/CHANGE_PASSWORD_REQUEST',
  '@Authentication/CHANGE_PASSWORD_SUCCESS',
  '@Authentication/CHANGE_PASSWORD_FAILURE'
)<ChangePasswordRequest, any, AxiosError>();
