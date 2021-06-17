import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddProduct from '../AddProduct/AddProduct';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import ManageProduct from '../ManageProduct/ManageProduct';
import classes from './AdminRoute.module.css'

const AdminRoute = () => {
    return (
        <div className={classes.adminContainer}>
            <AdminSidebar />
            <div className={classes.adminBody}>
                <Switch>
                    <Route exact path="/admin">
                        <ManageProduct />
                    </Route>

                    <Route exact path="/admin/manage">
                        <ManageProduct />
                    </Route>

                    <Route exact path="/admin/add-product">
                        <AddProduct />
                    </Route>

                </Switch>
            </div>
        </div>
    );
};

export default AdminRoute;