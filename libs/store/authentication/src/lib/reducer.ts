import { AuthenticationActions, AuthenticationStore } from './types';
import { getType } from 'typesafe-actions';
import { loginAsync } from './actions';

const initialState: Partial<AuthenticationStore> = { authenticated: false };

export function authenticationReducer(state = initialState, action: AuthenticationActions): Partial<AuthenticationStore> {
  switch (action.type) {
    case getType(loginAsync.success):
      console.log("aut:"+localStorage.getItem('persist:root'));
      return { ...state, authenticated: true};
    case getType(loginAsync.failure):
      return { ...state, authenticated: false };

  }

  return state;
}


