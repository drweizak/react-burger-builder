import * as actionTypes from '../actions/actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        payload: {
            orderId: id,
            orderData: orderData
        }
    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_FAIL,
        payload: {
            error: error
        }
    }
}

export const purchaseBurguerRequest = () => {
    return {
        type: actionTypes.PURCHASE_BURGUER_REQUEST
    }
}

export const purchaseBurguer = (orderData, token) => {
    return {
        type: actionTypes.PURCHASE_BURGER,
        orderData: orderData,
        token: token
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        payload: {
            orders: orders,
        }
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        payload: {
            error: error
        }
    }
}

export const fetchOrdersRequest = () => {
    return {
        type: actionTypes.FETCH_ORDERS_REQUEST,
    }
}

export const fetchOrders = (token, userId) => {
    return {
        type: actionTypes.FETCH_ORDERS,
        token: token,
        userId: userId
    }
}
