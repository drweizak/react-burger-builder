import React from 'react';

import burguerLogo from '../../assets/images/burguer-logo.png';
import classes from './Logo.module.css';

const Logo = (props) => (<div className={classes.Logo}><img src={burguerLogo} alt="Burguer"/></div>);

export default Logo;