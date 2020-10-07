import { loginAsync, registerAsync } from './actions';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { api } from '@internship/shared/api';

function* doLogin({ payload }) {
  try {
    const data = yield call(api.auth.login, payload);
    if (data.accessToken) localStorage.setItem('cloud_users', JSON.stringify(data));

    yield put(loginAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(loginAsync.failure(e));
  }
}

function* doRegister({ payload }) {
  try {
    yield call(api.auth.register, payload);

    yield put(registerAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(registerAsync.failure(e));
  }
}

function* watchLogin() {
  yield takeLatest(loginAsync.request, doLogin);
}

function* watchRegister() {
  yield takeLatest(registerAsync.request, doRegister);
}

export function* authenticationSaga() {
  yield all([fork(watchLogin), fork(watchRegister)]);
}
