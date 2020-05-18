import { put, delay, call } from 'redux-saga/effects';
import Axios from 'axios';

import * as actions from '../actions/index';

export function* logoutSaga(action) {
    // USE CALL IN ORDER TO TEST GENERATORS
    yield call([localStorage, "removeItem"], "token");
    yield call([localStorage, "removeItem"], "expirationDate");
    yield call([localStorage, "removeItem"], "userId");

    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authRequestSaga(action) {
    yield put(actions.authStart());
    const data = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDhzcMiDBTeGEOqbylcyEEjHO8eB-n6OQc';
    if (!action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDhzcMiDBTeGEOqbylcyEEjHO8eB-n6OQc';
    }

    try {
        const response = yield Axios.post(url, data);
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actions.authSuccess(response.data));
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
    } catch (error) {
        yield put(actions.authFail(error.response.data.error));
    }
}

export function* authCheckSateSaga() {
    const token = yield localStorage.getItem('token');
    if (!token) {
        put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            put(actions.logout());
        } else {
            const userId = yield localStorage.getItem('userId')
            put(actions.authSuccess({ idToken: token, localId: userId }));
            put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}