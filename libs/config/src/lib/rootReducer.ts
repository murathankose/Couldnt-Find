import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { authenticationReducer, authenticationSaga, captchaReducer } from '@internship/store/authentication';
import { all, fork } from 'redux-saga/effects';

export const rootReducer = combineReducers({
  authentication: authenticationReducer,
  captcha:captchaReducer,
});

export type RootState = StateType<typeof rootReducer>;

export function* rootSaga(): Generator {
  yield all([fork(authenticationSaga)]);
}
