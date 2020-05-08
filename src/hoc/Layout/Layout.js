import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';
import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState, prevProps) => {return {showSideDrawer: !prevState.showSideDrawer}})
    }

    render() {
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated} toggle={this.sideDrawerToggleHandler} />
                <SideDrawer isAuth={this.props.isAuthenticated} show={this.state.showSideDrawer}  toggle={this.sideDrawerToggleHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);