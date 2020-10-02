import axios from 'axios';
import { all, fork, put, takeLatest } from 'redux-saga/effects';

import { loginAsync } from '../DTO/LoginDTO';
import { registerAsync } from '../DTO/RegisterDTO';
import { environment } from '../../../../../apps/react/src/environments/environment';


const logIn = async (password, username) => {

  const response = await axios.post(environment.apiGateway + 'auth/signin', {
    username,
    password,
  });
  return { token: response.data.accessToken };
};

const register = async (email, password, username) => {
  await axios.post(environment.apiGateway +'auth/sign-up', {
    email,
    username,
    password,
  });
};

export function* logInWithCredentials({ payload: { username, password } }) {
  try {
    const user = yield logIn(username, password);
    yield put(loginAsync.success(user))
  } catch (error) {
    yield put(loginAsync.failure(error));
  }
}

export function* registerWithCredentials({
  payload: { email, username, password },
}) {
  try {
    yield register(email, username, password);
    yield put(registerAsync.success( username ));
  } catch (error) {
    yield put(registerAsync.failure(error));
  }
}

export function* logInAfterRegister({ payload: { username, password } }) {
  yield logInWithCredentials({ payload: { username, password } });
}

export function* onLogInStart() {
  yield takeLatest(loginAsync.request, logInWithCredentials);
}

export function* onRegisterStart() {
  yield takeLatest(registerAsync.request, registerWithCredentials);
}


export function* authSagas() {
  yield all([
    fork(onLogInStart),
    fork(onRegisterStart),
  ]);
}
