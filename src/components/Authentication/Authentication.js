import { Grid } from '@material-ui/core';
import React from 'react';
import './Authentication.css'
import AuthForm from '../AuthForm/AuthForm';
import SocialAuth from '../SocialAuth/SocialAuth';
import { initializeAuthApp } from './AuthManager';

initializeAuthApp();

const Authentication = ({ isSignUp }) => {
    return (
        <Grid container direction="column" spacing={3} alignItems="center">
            <Grid item>
                <AuthForm isSignUp={isSignUp} />
            </Grid>
            <Grid item className="social-auth-container">
                <SocialAuth />
            </Grid>
        </Grid>
    );
};

export default Authentication;