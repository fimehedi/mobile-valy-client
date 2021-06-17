import { Button, Checkbox, FormControlLabel, Grid, Paper, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { createUserWithEmailPass, signInWithEmailPass } from '../Authentication/AuthManager';
import './AuthForm.css'

const AuthForm = ({ isSignUp }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [userInput, setUserInput] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [status, setStatus] = useState({})

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };


    const handleOnChange = (e) => {
        let FieldValid = true;
        if (e.target.name === 'email') {
            const email = e.target.value;
            const isEmailValid = /^[^\s@]+@[^\s@]+$/.test(email);
            FieldValid = isEmailValid;
        }
        else if (e.target.name === 'password') {
            const password = e.target.value;
            const isPasswordHasNumber = /^(?=.*\d)(?=.*[a-zA-Z]).{6,16}$/.test(password);
            const isPasswordValid = password.length >= 6 && isPasswordHasNumber;
            FieldValid = isPasswordValid;
        }

        const userInfo = { ...userInput };
        if (FieldValid) {
            userInfo[e.target.name] = e.target.value;
        }
        else {
            userInfo[e.target.name] = '';
        }
        setUserInput(userInfo)
    }

    const onSubmit = (e) => {
        const { name, email, password, confirmPassword } = userInput;
        setStatus({});

        if (isSignUp && (!name || !email || !confirmPassword)) {
            setStatus({ isError: true, errorMsg: 'All fields are required!' })
        }

        else if (!isSignUp && (!password || !email)) {
            setStatus({ isError: true, errorMsg: 'Enter valid Email and password!' })
        }

        else if (isSignUp && !password) {
            setStatus({ isError: true, errorMsg: 'Password required at least one Numeric and one Character!' })
        }

        else if (isSignUp && password !== confirmPassword) {
            setStatus({ isError: true, errorMsg: 'Password and confirm password does not match!' })
        }

        else if (isSignUp && name && email && password && confirmPassword) {
            createUserWithEmailPass(name, email, password)
                .then(res => {
                    if (res.errorMsg) {
                        setStatus({ isError: true, errorMsg: res.errorMsg })
                    }
                    else if (res.isCreated) {
                        setStatus({ isSuccess: true, successMsg: 'User Created Successfully!' });
                        const userInfo = { ...userInput };
                        userInfo.password = '';
                        setUserInput(userInfo);
                        e.target.reset();
                        history.push('/login');
                    }
                })
                .catch(err => {
                    setStatus({ isError: true, errorMsg: 'Something went wrong!' })
                })
        }

        else if (!isSignUp && email && password) {
            signInWithEmailPass(email, password)
                .then(res => {
                    if (res.errorMsg) {
                        setStatus({ isError: true, errorMsg: res.errorMsg })
                    }
                    else if (res.name) {
                        setLoggedInUser(res);
                        history.replace(from);
                        e.target.reset();
                    }
                })
                .catch(err => {
                    setStatus({ isError: true, errorMsg: 'Something went wrong!' })
                })
        }

        e.preventDefault();
    }

    return (
        <Paper elevation={3} className="loginForm">
            <h3 className="form-title">{isSignUp ? 'Create an account' : 'Login'}</h3>
            <form action="" noValidate autoComplete="off" onSubmit={onSubmit}>
                {
                    isSignUp &&
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        onChange={handleOnChange}
                    />
                }

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    onChange={handleOnChange}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleOnChange}
                />

                {
                    isSignUp
                        ?
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm password"
                            type="password"
                            id="confirm-password"
                            onChange={handleOnChange}
                        />
                        :
                        <Grid container alignItems="center" style={{ marginTop: '10px' }}>
                            <Grid item xs>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                            </Grid>
                            <Grid item>
                                <Link to="#" variant="body2">Forgot password?</Link>
                            </Grid>
                        </Grid>
                }

                {status.isError && <small className="error">{status.errorMsg}</small>}
                {status.isSuccess && <small className="success">{status.successMsg}</small>}

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ margin: '15px 0' }}
                >{isSignUp ? 'Register' : 'Sign In'}</Button>

            </form>

            <div style={{ textAlign: 'center', color: '#666' }}>
                <span>{isSignUp ? "Already" : "Don't"} have an account? </span>
                {
                    isSignUp
                        ?
                        <Link to="/login" >Login</Link>
                        :
                        <Link to="/register" >Signup</Link>
                }
            </div>

        </Paper>
    );
};

export default AuthForm;