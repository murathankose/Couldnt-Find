import { AuthenticationActions, AuthenticationStore } from './types';
import { getType } from 'typesafe-actions';
import { loginAsync } from './actions';
import { getAccessToken } from '@internship/shared/utils';

const initialState: Partial<AuthenticationStore> = { authenticated: false };

export function authenticationReducer(state = initialState, action: AuthenticationActions): Partial<AuthenticationStore> {
  switch (action.type) {
    case getType(loginAsync.success):
      return { ...state, authenticated: true };
    case getType(loginAsync.failure):
      return { ...state, authenticated: false };
  }
  if(getAccessToken() !== null) {
    return { ...state, authenticated: true };
  }
  return state;
}
