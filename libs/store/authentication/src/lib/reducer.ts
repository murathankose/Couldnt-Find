import { AuthenticationActions, AuthenticationStore } from './types';
import { getType } from 'typesafe-actions';
import { googleLogin, loginAsync, logoutAsync, updateLogout } from './actions';

const initialState: Partial<AuthenticationStore> = { authenticated: false };

export function authenticationReducer(state = initialState, action: AuthenticationActions): Partial<AuthenticationStore> {
  switch (action.type) {
    case getType(loginAsync.success): {
      return { ...state, authenticated: true };
    }
    case getType(loginAsync.failure):
      return { ...state, authenticated: false };
    case getType(logoutAsync.success):
      return initialState;
    case getType(googleLogin):
      return { ...state, authenticated: true };
    case getType(updateLogout):
      return { ...state, authenticated: false };
  }

  return state;
}
