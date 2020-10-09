import { AuthenticationActions, AuthenticationStore, CaptchaStore,CaptchaActions } from './types';
import { action, getType } from 'typesafe-actions';
import { loginAsync} from './actions';

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


export const captchaReducer=(state=initialCaptchaState,action:CaptchaActions)=>{
  if(action.type==="captcha-success"){
    return {
      ...state, captcha: true
    }
  }
return state;
}

/*export function captchaReducer(state = initialCaptchaState, action: CaptchaActions): Partial<CaptchaStore> {

  switch (action.type) {
    case 'captcha-success':
      return { ...state, captcha: false };

  }
  return state;
}*/

