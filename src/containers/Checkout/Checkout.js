import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import * as actions from '../../store/actions/';

const Checkout = props => {
    const { onPurchaseInit } = props;
    useEffect(() => {
        onPurchaseInit();
    }, [onPurchaseInit]);

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to="/" />
    if (props.ingredients) {
        const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}
                    ingredients={props.ingredients} />
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>);
    }
    return summary
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseInit: () => { dispatch(actions.purchaseInit()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
