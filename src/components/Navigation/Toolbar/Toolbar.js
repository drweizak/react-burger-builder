import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle toggle={props.toggle} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav>
            <NavigationItems isAuth={props.isAuth} />
        </nav>
    </header>
);

export default Toolbar;