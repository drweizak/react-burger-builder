import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import PropTypes from 'prop-types';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
];

const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />)
        )}
        <button
            disabled={!props.purchasable}
            className={classes.OrderButton}
            onClick={props.ordered}>
            {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
        </button>

    </div>
);

BuildControl.propTypes = {
    price: PropTypes.number,
    ingredientAdded: PropTypes.func,
    ingredientRemoved: PropTypes.func,
    disabled: PropTypes.bool,
    purchasable: PropTypes.bool,
    ordered: PropTypes.func
};

export default BuildControls;

