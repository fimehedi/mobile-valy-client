import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import classes from './Product.module.css';

const Product = ({ product }) => {

    const { _id, name, brand, price, imgUrl } = product;

    const history = useHistory();
    const handleAddToCart = () => {
        history.push('/checkout/' + _id)
    }

    return (
        <Grid item>
            <Card elevation={4} className={classes.product}>

                <div className={classes.productCover}>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="200"
                        image={imgUrl}
                        title="Contemplative Reptile"
                    />
                </div>
                <CardContent className={classes.productBody}>
                    <Typography gutterBottom variant="h6" component="h2" style={{ margin: 0 }}>{name}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">{brand}</Typography>
                </CardContent>

                <CardActions className={classes.productFooter}>
                    <Typography variant="h5" component="h1" color="primary" style={{ fontWeight: 'bold' }}>${price}</Typography>
                    <Button onClick={handleAddToCart} variant="contained" color="primary">Buy Now</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Product;