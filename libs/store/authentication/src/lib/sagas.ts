import axios from 'axios';
import { loginAsync, registerAsync } from './actions';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// TODO remove it after axios instance implementation and api library
const login = (data) => {
  return axios.post('http://localhost:8080/auth/signin', data).then((response) => response.data);
};

// TODO remove it after axios instance implementation and api library
const register = (data) => {
  return axios.post('http://localhost:8080/auth/sign-up', data);
};

function* doLogin({ payload }) {
  try {
    const data = yield call(login, payload);
    if (data.accessToken) localStorage.setItem('cloud_users', JSON.stringify(data));

    yield put(loginAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(loginAsync.failure(e));
  }
}

function* doRegister({ payload }) {
  try {
    yield call(register, payload);

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
