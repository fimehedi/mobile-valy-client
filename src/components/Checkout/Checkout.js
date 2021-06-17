import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, Button, CircularProgress } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import classes from './Checkout.module.css'

const Checkout = () => {
    const { id } = useParams();
    const [loggedInUser] = useContext(UserContext);
    const history = useHistory();

    const [product, setProduct] = useState({});
    useEffect(() => {
        fetch('https://mobile-valy.herokuapp.com/product/' + id)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id])

    const { _id, name, price } = product;
    const total = parseInt(price) + parseInt(price) * .10;

    const handleCheckout = () => {
        const newOrder = {
            ...loggedInUser,
            productID: _id,
            productName: name,
            totalPrice: total,
            date: new Date()
        }

        fetch('https://mobile-valy.herokuapp.com/newOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newOrder)
        })
            .then(res => res.json())
            .then(data => {
                if (data.isAdded) {
                    history.push('/orders')
                }
            })
    }

    return (
        <div className={classes.checkoutContainer}>
            <h2 className={classes.title}>Checkout</h2>
            {product.name ?
                <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell align="">Description</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="right">Price</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody className={classes.tableBody}>

                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {name}
                                </TableCell>
                                <TableCell align="center">1</TableCell>
                                <TableCell align="right">${price}</TableCell>
                            </TableRow>

                        </TableBody>

                        <TableFooter className={classes.tableFooter}>
                            <TableRow>
                                <TableCell colSpan={2}>Total <small style={{ color: '#666' }}>( +10% VAT )</small></TableCell>
                                <TableCell align="right">${total.toFixed(2)}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                    <Button variant="contained" color="primary" onClick={handleCheckout}>Checkout</Button>
                </TableContainer>
                :
                <div style={{ textAlign: 'center' }}>
                    <CircularProgress style={{ marginTop: 50 }} size={50} thickness={5} />
                </div>
            }
        </div >
    );
};

export default Checkout;