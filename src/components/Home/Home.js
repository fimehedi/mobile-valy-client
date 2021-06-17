import { Button, CircularProgress, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import classes from './Home.module.css'

const Home = () => {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://mobile-valy.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
    }, [])

    return (
        <Grid container direction="column" spacing={4} alignItems="center" className={classes.productsContainer}>
            <Grid item className={classes.search}>
                <input type="text" placeholder="Search" />
                <Button variant="contained" color="secondary">Search</Button>
            </Grid>
            <Grid item className={classes.productsContainer}>
                <Grid container spacing={5} justify="center">
                    {products.length
                        ?
                        products.map(product => <Product key={product._key} product={product} />)
                        :
                        <CircularProgress style={{ marginTop: 100 }} size={50} thickness={5} />
                    }
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Home;