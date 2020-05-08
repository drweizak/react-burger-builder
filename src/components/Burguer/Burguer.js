import React from 'react';
import classes from './Burguer.module.css';
import BurguerIngredient from './BurguerIngredient/BurguerIngredient';
import PropTypes from 'prop-types';

const Burguer = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurguerIngredient key={igKey + i} type={igKey} />
        });
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    return(
        <div className={classes.Burguer}>
            <BurguerIngredient type='bread-top' />
            {transformedIngredients}
            <BurguerIngredient type='bread-bottom' />
        </div>
    );
}

Burguer.propTypes = {
    ingredients: PropTypes.object,
};

export default Burguer;