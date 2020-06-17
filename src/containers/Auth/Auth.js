import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as classes from './Auth.module.css';
import * as actions from '../../store/actions/';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = props => {
    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false,
            validationMessage: 'Please enter a valid Email'
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false,
            validationMessage: 'Please enter a valid Password'
        },
    });

    const [formIsValid, setFormIsValid] = useState(false);
    const [isSignup, setisSignup] = useState(true);
    const { building, authRedirectPath, onSetAuthRedirectPath } = props;

    useEffect(() => {
        if (!building && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [building, authRedirectPath, onSetAuthRedirectPath]);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        props.onAuthSubmit(authForm.email.value, authForm.password.value, isSignup)
    }

    const inputChangedHandler = (event, inputID) => {
        const updatedAuthForm = updateObject(authForm, {
            [inputID]: updateObject(authForm[inputID], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[inputID].validation),
                touched: true
            })
        })


        let valid = true;
        for (const inputIDs in updatedAuthForm) {
            if (updatedAuthForm[inputIDs].validation) {
                valid = updatedAuthForm[inputIDs].valid && valid
            }
        }

        setFormIsValid(valid);
        setAuthForm(updatedAuthForm);
    }

    const onSwitchHandler = () => {
        setisSignup(!isSignup);
    }

    const formElementsArray = [];
    for (const key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key]
        })
    }
    let form = formElementsArray.map(el => (
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
    ));

    if (props.loading) {
        form = <Spinner />
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        )
    }

    let authRedirect = null;
    if (props.authenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={onSubmitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button btnType="Danger" clicked={onSwitchHandler}>Switch to {isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
        </div>
    );
}

const mapDistpatchToProps = dispatch => {
    return {
        onAuthSubmit: (email, password, isSignup) => dispatch(actions.authRequest(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        authenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        building: state.burgerBuilder.building
    }
}

export default connect(mapStateToProps, mapDistpatchToProps)(Auth);