import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import OrderedProduct from '../OrderedProduct';

const Orders = () => {
    const [loggedInUser] = useContext(UserContext);
    const [stopSpinner, setStopSpinner] = useState(false);

    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch('https://mobile-valy.herokuapp.com/orders', {
            method: 'GET',
            headers: {
                'email': loggedInUser.email
            }
        })
            .then(res => res.json())
            .then(data => {
                setStopSpinner(true);
                setOrders(data);

            })
    }, [loggedInUser.email])


    const handleCancelOrder = id => {
        fetch('https://mobile-valy.herokuapp.com/orderCancel/' + id, {
            method: 'Delete',
        })
            .then(res => res.json())
            .then(data => {
                if (data.isDeleted) {
                    const restOrders = orders.filter(order => order._id !== id);
                    setOrders(restOrders);
                }
                else if (data.isError) {
                    alert(data.errorMsg)
                }
            })
    }


    return (
        <div>
            <h2>Orders</h2>

            <TableContainer component={Paper}>
                {
                    orders.length ?
                        <Table className='' aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Price <small>(+10% VAT)</small></TableCell>
                                    <TableCell align="right">Date</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map(order => <OrderedProduct key={order._id} order={order} handleCancelOrder={handleCancelOrder} />)}
                            </TableBody>
                        </Table>
                        :
                        <>
                            <div style={{ textAlign: 'center' }}>
                                {
                                    stopSpinner ?
                                        <h3>No Orders Found!</h3>
                                        :
                                        <CircularProgress style={{ margin: 50 }} size={50} thickness={5} />}
                            </div>
                        </>
                }
            </TableContainer>

        </div>
    );
};

export default Orders;