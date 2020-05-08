import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    error: false,
    purchased: false
}

const order = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, { purchased: false })
        case actionTypes.PURCHASE_BURGUER_REQUEST:
            return updateObject(state, { error: false, loading: true })
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.payload.orderData,
                id: action.payload.orderId
            }
            return updateObject(state, {
                orders: state.orders.concat(newOrder),
                error: false,
                loading: false,
                purchased: true
            })
        case actionTypes.PURCHASE_BURGUER_FAIL:
            return updateObject(state, {
                error: true,
                loading: false
            })
        case actionTypes.FETCH_ORDERS_REQUEST:
            return updateObject(state, {
                error: false,
                loading: true
            })
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {
                orders: action.payload.orders,
                error: false,
                loading: false
            })
        case actionTypes.FETCH_ORDERS_FAIL:
            return updateObject(state, {
                error: true,
                loading: false
            })
        default: return state;
    }

}

export default order;