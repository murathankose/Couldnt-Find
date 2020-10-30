import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export interface AuthenticationStore {
  authenticated: boolean;
}

export type AuthenticationActions = ActionType<typeof actions>;
