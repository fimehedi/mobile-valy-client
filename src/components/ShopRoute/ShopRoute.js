import { Container } from '@material-ui/core';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Authentication from '../Authentication/Authentication';
import Checkout from '../Checkout/Checkout';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Orders from '../Orders/Orders';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import './ShopRoute.css'

const ShopRoute = () => {
    return (
        <Container className="main-container">
            <Header />
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>

                <PrivateRoute exact path='/checkout/:id'>
                    <Checkout />
                </PrivateRoute>

                <PrivateRoute exact path='/orders'>
                    <Orders />
                </PrivateRoute>

                <Route exact path='/login'>
                    <Authentication isSignUp={false} />
                </Route>

                <Route exact path='/register'>
                    <Authentication isSignUp={true} />
                </Route>

                <Route path="*">
                    <h1>Page not found</h1>
                </Route>
            </Switch>
        </Container>
    );
};

export default ShopRoute;