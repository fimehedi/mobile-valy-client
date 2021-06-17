import { TableCell, TableRow } from '@material-ui/core';
import React from 'react';

const OrderedProduct = ({ order, handleCancelOrder }) => {

    const { _id, productName, date, email, totalPrice } = order;


    return (
        <TableRow>
            <TableCell component="th" scope="row">
                {productName}
            </TableCell>
            <TableCell align="right">{email}</TableCell>
            <TableCell align="right">{totalPrice}</TableCell>
            <TableCell align="right">{new Date(date).toDateString('dd/MM/yyyy')}</TableCell>
            <TableCell align="right">
                <button
                    onClick={() => handleCancelOrder(_id)}
                    style={{ padding: 10 }}
                    className="deleteIcon"
                >Cancel</button></TableCell>
        </TableRow>
    );
};

export default OrderedProduct;