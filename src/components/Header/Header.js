import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import MenuIcon from '@material-ui/icons/Menu';
import classes from './Header.module.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [showMobileMenu, setMobileMenu] = useState(false);

    const history = useHistory();

    return (
        <header className={classes.header}>
            <h2 className={classes.logo} onClick={() => history.push('/')}>
                <span className="primary">MOBILE </span>
                <span className="secondary">VALY</span>
            </h2>
            <nav className={`${classes.navbar} ${showMobileMenu && classes.show}`}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/orders">Orders</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                    {
                        loggedInUser.name
                            ?
                            <>
                                <li className={classes.userName}>{loggedInUser.name}</li>
                                <li><button onClick={() => setLoggedInUser({})} className={classes.logoutBrn}>Logout</button></li>
                            </>
                            :
                            <li><Link to="/login" className={classes.loginBtn}>Login</Link></li>
                    }
                </ul>
            </nav>
            <div className={classes.menuIcon} onClick={() => setMobileMenu(!showMobileMenu)}>
                <MenuIcon />
            </div>
        </header>
    );
};

export default Header;