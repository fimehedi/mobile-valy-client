import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { facebookLogin, googleLogin } from '../Authentication/AuthManager';
import googleIcon from './google.png';
import facebookIcon from './facebook.png';
import classes from './SocialAuth.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

const SocialAuth = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                if (res.errorCode) {
                    alert(res.errorMsg)
                }
                else {
                    setLoggedInUser(res);
                    history.replace(from);
                }
            })
    }

    const handleFbLogin = () => {
        facebookLogin()
            .then(res => {
                if (res.errorCode) {
                    alert(res.errorMsg)
                }
                else {
                    setLoggedInUser(res);
                    history.replace(from);
                }

            })
    }

    return (
        <div>
            <p className={classes.subtitle}>OR</p>
            <Button
                onClick={handleGoogleLogin}
                variant="outlined"
                className={classes.socialOption}
                style={{ marginBottom: 10 }}>
                <img src={googleIcon} alt="" />
                <p>Continue with Google</p>
            </Button>
            <br />
            <Button
                onClick={handleFbLogin}
                variant="outlined"
                className={classes.socialOption}>
                <img src={facebookIcon} alt="" />
                <p>Continue with Facebook</p>
            </Button>
        </div>
    );
};

export default SocialAuth;