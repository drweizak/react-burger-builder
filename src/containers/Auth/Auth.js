import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as classes from './Auth.module.css';
import * as actions from '../../store/actions/';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        authForm: {
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
        },
        formIsValid: false,
        isSignup: true
    }

    componentDidMount() {
        if (!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuthSubmit(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignup)
    }

    inputChangedHandler = (event, inputID) => {
        const updatedAuthForm = updateObject(this.state.authForm, {
            [inputID]: updateObject(this.state.authForm[inputID], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.authForm[inputID].validation),
                touched: true
            })
        })


        let formIsValid = true;
        for (const inputIDs in updatedAuthForm) {
            if (updatedAuthForm[inputIDs].validation) {
                formIsValid = updatedAuthForm[inputIDs].valid && formIsValid
            }
        }

        this.setState({ authForm: updatedAuthForm, formIsValid: formIsValid });
    }

    onSwitchHandler = () => {
        this.setState((prevState) => {
            return { isSignup: !prevState.isSignup }
        })
    }

    render() {
        const formElementsArray = [];
        for (const key in this.state.authForm) {
            formElementsArray.push({
                id: key,
                config: this.state.authForm[key]
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
                changed={(event) => this.inputChangedHandler(event, el.id)}
            />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if (this.props.authenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.onSwitchHandler}>Switch to {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        );
    }
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