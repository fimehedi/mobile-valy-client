import { Button, TextField, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import classes from './AddProduct.module.css'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from 'axios';

const AddProduct = () => {

    const [newProduct, setNewProduct] = useState({
        name: '',
        brand: '',
        price: 0,
        imgUrl: ''
    })
    const [addingStatus, setAddingStatus] = useState('');
    const allowedToAdd = newProduct.name && newProduct.brand && newProduct.price && newProduct.imgUrl;
    const [imgUploadStatus, setImgUploadStatus] = useState('')

    const handleChange = e => {
        const updatedProduct = { ...newProduct }
        updatedProduct[e.target.name] = e.target.value;
        setNewProduct(updatedProduct);
        if (addingStatus) {
            setAddingStatus('');
        }
    }

    const handleImgUpload = event => {
        const ImgData = new FormData();
        ImgData.set('key', '28b4e2b5c4640e2f955812ecdc64c65a');
        ImgData.append('image', event.target.files[0]);
        setImgUploadStatus('Uploading...');

        axios.post('https://api.imgbb.com/1/upload', ImgData)
            .then(function (res) {

                const updatedProduct = { ...newProduct };
                updatedProduct.imgUrl = res.data.data.display_url
                setNewProduct(updatedProduct)
                setImgUploadStatus('Uploaded');
                console.log(newProduct)

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleSubmit = e => {
        if (allowedToAdd) {
            setAddingStatus('Adding...');
            fetch('https://mobile-valy.herokuapp.com/addProduct', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.isAdded) {
                        e.target.reset();
                        setNewProduct({
                            name: '',
                            brand: '',
                            price: 0,
                            imgUrl: ''
                        })
                        setAddingStatus('Added');

                    }
                    else if (data.isError) {
                        alert(data.errorMsg)
                    }
                })
                .catch(err => {
                    alert(err)
                })
        }
        else {
            alert('Submit All Data and wait for uploading image!')
        }
        e.preventDefault();
    }


    return (
        <div>
            <div className="adminHeader">
                <h3>Add Product</h3>
            </div>

            <div className="adminBodyContent">
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Paper className={classes.addFrom}>
                        <div className={classes.formGroup}>
                            <TextField
                                onChange={handleChange}
                                label="Product Name"
                                placeholder="Name"
                                variant="outlined"
                                name="name"
                                style={{ width: '45%' }}
                            />
                            <TextField
                                onChange={handleChange}
                                label="Product Brand"
                                placeholder="Brand"
                                variant="outlined"
                                name="brand"
                                style={{ width: '45%' }}
                            />
                        </div>

                        <div className={classes.formGroup}>
                            <TextField
                                onChange={handleChange}
                                label="Product Price"
                                placeholder="Price"
                                variant="outlined"
                                name="price"
                                style={{ width: '45%' }}
                                type="number"
                            />
                            <Button
                                variant="contained"
                                component="label"
                                color={newProduct.imgUrl ? 'primary' : 'default'}
                                style={{ width: '45%' }}
                                className={classes.uploadBtn}
                            >
                                <CloudUploadIcon />
                                <span style={{ paddingLeft: 10 }}>
                                    {
                                        imgUploadStatus ? imgUploadStatus : 'Upload Cover'
                                    }
                                </span>
                                <input
                                    type="file"
                                    name="cover"
                                    hidden
                                    onChange={handleImgUpload}
                                />
                            </Button>

                        </div>
                    </Paper>
                    <Button
                        type="submit"
                        variant="contained"
                        color={allowedToAdd ? 'primary' : 'default'}
                        size="large"
                        className={classes.submit}>
                        {addingStatus ? addingStatus : 'Add New'}
                    </Button>
                </form>
            </div>

        </div>
    );
};

export default AddProduct;