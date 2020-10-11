import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { authenticationReducer, authenticationSaga } from '@internship/store/authentication';
import { all, fork } from 'redux-saga/effects';
import { tempReducer } from '@internship/store/temp';

export const rootReducer = combineReducers({
  authentication: authenticationReducer,
  temp: tempReducer,
});

export type RootState = StateType<typeof rootReducer>;

export function* rootSaga(): Generator {
  yield all([fork(authenticationSaga)]);
}
