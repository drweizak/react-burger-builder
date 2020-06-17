import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import WithErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/';
import { updateObject, checkValidity } from '../../../shared/utility';

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: 'Please enter a valid Name'
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: 'Please enter a valid Email'
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: 'Please enter a valid Street'
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Zip Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 10
            },
            valid: false,
            touched: false,
            validationMessage: 'Please enter a valid Zip Code'
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: 'Please enter a valid Country'
        },
        DeliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ],
            },
            value: 'fastest',
            validation: {},
            valid: true,
            touched: false,
        },
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = (e) => {
        e.preventDefault();
        const formData = {};
        for (const elID in orderForm) {
            formData[elID] = orderForm[elID].value
        }
        const data = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: formData,
            userId: props.userId
        };

        props.onOrderBurguer(data, props.token);
    }

    const inputChangedHandler = (event, inputID) => {
        const updatedFormElement = updateObject(orderForm[inputID], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputID].validation),
            touched: true
        });

        const updatedOrderForm = updateObject(orderForm, {
            [inputID]: updatedFormElement
        })

        let formIsValid = true;
        for (const inputIDs in updatedOrderForm) {
            if (updatedOrderForm[inputIDs].validation) {
                formIsValid = updatedOrderForm[inputIDs].valid && formIsValid
            }
        }
        setFormIsValid(formIsValid);
        setOrderForm(updatedOrderForm);
    }

    const formElementsArray = [];
    for (const key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        })
    }

    let form = (
        <form onSubmit={orderHandler}>
            {
                formElementsArray.map(el => (
                    <Input
                        key={el.id}
                        elementType={el.config.elementType}
                        elementConfig={el.config.elementConfig}
                        elementValue={el.config.value}
                        invalid={!el.config.valid}
                        shouldValidate={el.config.validation}
                        touched={el.config.touched}
                        errorMessage={el.config.validationMessage}
                        changed={(event) => inputChangedHandler(event, el.id)}
                    />
                ))
            }
            <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
        </form>
    );
    if (props.loading) {
        form = (<Spinner />)
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your contact data</h4>
            {form}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurguer: (data, token) => dispatch(actions.purchaseBurguer(data, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios));