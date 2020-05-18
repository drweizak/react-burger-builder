import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions/index';

export function* purchaseBurguerSaga(action) {
    yield put(actions.purchaseBurguerRequest());
    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData)
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch (error) {
        yield put(actions.purchaseBurgerFailed(error));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersRequest());
    try {
        const params = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
        const response = yield axios.get('/orders.json' + params)
        const fetchedOrders = []
        for (const key in response.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key
            })
        }

        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
        yield put(actions.fetchOrdersFail(error));
    }
}