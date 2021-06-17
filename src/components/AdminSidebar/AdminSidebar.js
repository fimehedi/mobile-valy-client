import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import classes from './AdminSidebar.module.css';
import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';

const AdminSidebar = () => {

    const history = useHistory();

    return (
        <div className={classes.sidebarContainer}>

            <h1 className={classes.AdminLogo} onClick={() => history.push('/')}>
                <span className="primary">MOBILE </span>
                <span className="secondary">VALY</span>
            </h1>

            <nav>
                <ul>
                    <li><Link to="/admin/manage"><DashboardIcon /> <span>Manage Products</span></Link></li>
                    <li><Link to="/admin/add-product"><AddIcon /> <span>Add Product</span></Link></li>
                </ul>
            </nav>

        </div>
    );
};

export default AdminSidebar;