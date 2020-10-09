import { AuthenticationActions, AuthenticationStore, CaptchaStore } from './types';
import { getType } from 'typesafe-actions';
import { loginAsync } from './actions';

const initialState: Partial<AuthenticationStore> = { authenticated: false };
const initialCaptchaState: Partial<CaptchaStore> = { captcha: false };
export function authenticationReducer(state = initialState, action: AuthenticationActions): Partial<AuthenticationStore> {
  switch (action.type) {
    case getType(loginAsync.success):
      return { ...state, authenticated: true };
   case getType(loginAsync.failure):
      return { ...state, authenticated: false };
  }
  return state;
}

export function captchaReducer(state = initialCaptchaState, action: AuthenticationActions): Partial<CaptchaStore> {
  switch (action.type) {
    case getType(loginAsync.success):
      return { ...state, captcha: false };
    case getType(loginAsync.failure):
      return { ...state, captcha: true };
  }
  return state;
}

