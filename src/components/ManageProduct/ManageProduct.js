import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './ManageProduct.css'
import DeleteIcon from '@material-ui/icons/Delete';

const ManageProduct = () => {
    const [stopSpinner, setStopSpinner] = useState(false);

    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://mobile-valy.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setStopSpinner(true)
            })
    }, [])

    const handleDelete = id => {
        fetch('https://mobile-valy.herokuapp.com/delete/' + id, {
            method: 'Delete',
        })
            .then(res => res.json())
            .then(data => {
                if (data.isDeleted) {
                    const restProducts = products.filter(pd => pd._id !== id);
                    setProducts(restProducts);
                }
                else if (data.isError) {
                    alert(data.errorMsg)
                }
            })
    }

    return (
        <div>
            <div className="adminHeader">
                <h3>Manage Product</h3>
            </div>

            <div className="adminBodyContent">
                <TableContainer component={Paper}>
                    {products.length ?
                        <Table className='' aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell align="left">Brand</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    products.map(product => (
                                        <TableRow key={product._id}>
                                            <TableCell component="th" scope="row">
                                                {product.name}
                                            </TableCell>
                                            <TableCell align="left">{product.brand}</TableCell>
                                            <TableCell align="right">${product.price}</TableCell>
                                            <TableCell align="right">
                                                <button className="deleteIcon" onClick={() => handleDelete(product._id)}><DeleteIcon /></button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                        :
                        (<>
                            {
                                stopSpinner ?
                                    <h3 style={{ textAlign: 'center' }}>No Data Found!</h3>
                                    :
                                    <div style={{width: '100%', textAlign: 'center'}}>
                                        <CircularProgress style={{ textAlign: 'center', margin: 100 }} size={50} thickness={5} />
                                    </div>
                            }
                        </>)

                    }
                </TableContainer>
            </div>

        </div>
    );
};

export default ManageProduct;