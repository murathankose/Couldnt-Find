import { changePasswordAsync, loginAsync, logout, registerAsync, updateAsync } from './actions';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { api } from '@internship/shared/api';
import { removeAccessToken, removeRefreshToken } from '@internship/shared/utils';

function* doLogin({ payload }) {
  try {
    const data = yield call(api.auth.login, payload);
    if (data?.accessToken) localStorage.setItem('cloud_users', JSON.stringify(data));
    yield put(loginAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(loginAsync.failure(e));
  }
}

function doLogout() {
  if (localStorage.getItem('access_token')) {
    localStorage.removeItem('cloud_users');
    removeAccessToken();
    removeRefreshToken();
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

function* doUpdate({ payload }) {
  try {
    let requestData = {};
    Object.entries(payload).forEach(([key, value]) => (value !== '' ? (requestData = { ...requestData, [key]: value }) : null));

    yield call(api.auth.update, requestData);
    yield put(updateAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(updateAsync.failure(e));
  }
}

function* doChangePassword({ payload }) {
  try {
    yield call(api.auth.changePassword, payload);
    yield put(changePasswordAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(changePasswordAsync.failure(e));
  }
}

function* watchLogin() {
  yield takeLatest(loginAsync.request, doLogin);
}
function* watchLogout() {
  yield takeLatest(logout, doLogout);
}
function* watchRegister() {
  yield takeLatest(registerAsync.request, doRegister);
}
function* watchUpdate() {
  yield takeLatest(updateAsync.request, doUpdate);
}
function* watchChangePassword() {
  yield takeLatest(changePasswordAsync.request, doChangePassword);
}

export function* authenticationSaga() {
  yield all([fork(watchLogin), fork(watchRegister), fork(watchLogout), fork(watchUpdate), fork(watchChangePassword)]);
}
