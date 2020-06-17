import React, { useState, useEffect, useCallback } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burguer from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';

const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.burgerBuilder.ingredients );
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice );
    const error = useSelector(state => state.burgerBuilder.error );
    const authenticated = useSelector(state => state.auth.token !== null);

    const addIngredientHandler = (ingredientType) => dispatch(actions.addIngredient({ type: ingredientType }));
    const removeIngredientHandler = (ingredientType) => dispatch(actions.removeIngredient({ type: ingredientType }));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchaseState = () => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0
    }

    const purchaseHandler = () => {
        if (authenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.history.push('/checkout');
    }

    let orderSummary = null;
    let burger = <Spinner />;
    if (error) {
        burger = <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p>
    }

    if (ingredients) {
        const disabledInfo = {
            ...ingredients
        }
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        burger = (
            <Aux>
                <Burguer ingredients={ingredients}></Burguer>
                <BuildControls
                    ingredientAdded={addIngredientHandler}
                    ingredientRemoved={removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState()}
                    price={totalPrice}
                    ordered={purchaseHandler}
                    isAuth={authenticated} />
            </Aux>
        )

        orderSummary = <OrderSummary ingredients={ingredients} price={totalPrice} purchaseCanceled={purchaseCancelHandler} purchaseContinued={purchaseContinueHandler} />;
    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    )
}

export default WithErrorHandler(BurgerBuilder, axios);