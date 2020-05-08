import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const addIngredient = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, { [action.payload.type]: state.ingredients[action.payload.type] + 1 })
    const updatedSate = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.type],
        building: true
    }
    return updateObject(state, updatedSate);
}

const removeIngredient = (state, action) => {
    if (state.ingredients[action.payload.type] <= 0) {
        return state;
    }
    const updatedIngredients = updateObject(state.ingredients, { [action.payload.type]: state.ingredients[action.payload.type] - 1 })
    const updatedSate = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.type],
        building: true
    }
    return updateObject(state, updatedSate);
}

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            const ingredients = action.payload.ingredients;
            return updateObject(state, {
                ingredients: {
                    salad: ingredients.salad,
                    bacon: ingredients.bacon,
                    cheese: ingredients.cheese,
                    meat: ingredients.meat
                },
                totalPrice: initialState.totalPrice,
                error: false,
                building: false
            })
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, { error: true })
        default: return state;
    }
}

export default burgerBuilder;