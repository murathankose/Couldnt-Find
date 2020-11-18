import {
  changePasswordAsync,
  contentAsync,
  forgotpasswordAsync,
  likeAsync,
  loginAsync,
  logoutAsync,
  registerAsync,
  resetpasswordAsync,
  topicAsync,
  updateAsync,
  updateLogout
} from './actions';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { api } from '@internship/shared/api';
import { removeAccessToken, removeRefreshToken, removeUserName } from '@internship/shared/utils';

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
function* doResetPassword({ payload }) {
  try {
    yield call(api.auth.resetPassword, payload);
    yield put(resetpasswordAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(resetpasswordAsync.failure(e));
  }
}
function* doForgotPassword({ payload }) {
  try {
    yield call(api.auth.newPassword, payload);
    yield put(forgotpasswordAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(forgotpasswordAsync.failure(e));
  }
}

function doUpdateLogout() {
  if (localStorage.getItem('access_token')) {
    localStorage.removeItem('cloud_users');
    removeAccessToken();
    removeRefreshToken();
    removeUserName();
  }
}

function* doLogout({ payload }) {
  try {
    yield call(api.auth.logout, payload);
    yield put(logoutAsync.success({}));
    if (localStorage.getItem('access_token')) {
      localStorage.removeItem('cloud_users');
      removeAccessToken();
      removeRefreshToken();
      removeUserName();
    }
  } catch (e) {
    console.error(e);
    yield put(logoutAsync.failure(e));
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

function* doLike({ payload }) {
  try {
    yield call(api.auth.addLike, payload);
    yield put(likeAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(likeAsync.failure(e));
  }
}

function* doUpdate({ payload }) {
  try {
    /* let requestData = {};
     Object.entries(payload).forEach(([key, value]) => (value !== '' ? (requestData = { ...requestData, [key]: value }) : null));*/
    yield call(api.auth.update, payload);
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

function* doAddTopic({ payload }) {
  try {
    yield call(api.auth.addTopic, payload);
    yield put(topicAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(topicAsync.failure(e));
  }
}

function* doAddContent({ payload }) {
  try {
    yield call(api.auth.addContent, payload);
    yield put(contentAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(contentAsync.failure(e));
  }
}

function* watchLogin() {
  yield takeLatest(loginAsync.request, doLogin);
}

function* watchLike() {
  yield takeLatest(likeAsync.request, doLike);
}

function* watchAddTopic() {
  yield takeLatest(topicAsync.request, doAddTopic);
}

function* watchAddContent() {
  yield takeLatest(contentAsync.request, doAddContent);
}

function* watchResetPassword() {
  yield takeLatest(resetpasswordAsync.request, doResetPassword);
}

function* watchForgotPassword() {
  yield takeLatest(forgotpasswordAsync.request, doForgotPassword);
}
function* watchLogout() {
  yield takeLatest(logoutAsync.request, doLogout);
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
function* watchUpdateLogout() {
  yield takeLatest(updateLogout, doUpdateLogout);
}

export function* authenticationSaga() {
  yield all([
    fork(watchLogin),
    fork(watchRegister),
    fork(watchLogout),
    fork(watchUpdate),
    fork(watchForgotPassword),
    fork(watchResetPassword),
    fork(watchChangePassword),
    fork(watchUpdateLogout),
    fork(watchAddTopic),
    fork(watchAddContent),
    fork(watchLike)
  ]);
}
