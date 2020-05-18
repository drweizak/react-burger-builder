import { takeEvery, all } from "redux-saga/effects";
import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authRequestSaga, authCheckSateSaga } from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";
import { purchaseBurguerSaga, fetchOrdersSaga } from "./orderSaga";

export function* watchAuth() {
    // USE ALL TO RUN CONCURRENTLY
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_REQUEST, authRequestSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckSateSaga)
    ]);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurguerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}