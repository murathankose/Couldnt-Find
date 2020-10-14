import { AuthenticationActions, AuthenticationStore } from './types';
import { getType } from 'typesafe-actions';
import { loginAsync ,logoutAsync} from './actions';


const initialState: Partial<AuthenticationStore> = { authenticated: false };

export function authenticationReducer(state = initialState, action: AuthenticationActions): Partial<AuthenticationStore> {
  switch (action.type) {
    case getType(loginAsync.success):{
      return { ...state, authenticated: true};
      window.location.href="/";} //sagadan push
    case getType(loginAsync.failure):
      return { ...state, authenticated: false };
    case getType(logoutAsync.success):
      return { ...state, authenticated: false};


  }

  return state;
}


