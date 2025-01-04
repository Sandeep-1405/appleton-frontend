import React, { useContext, useState } from 'react';
import Navbarr from './Navbar';
import axios from 'axios';
import HOC from './HOC';
import { AuthContext } from '../Context/AuthContext';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        imageUrl: '',
        price: '',
        description: '',
        warranty: '',
        manufacturer: '',
        category: '',
        stock: '',
        weight: '',
        color: '',
    });

    

    const {jwt} = useContext(AuthContext);

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

   const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/add-product`, product,{headers:{'Authorization':`Bearer ${jwt}`}});
            if (response.status === 201) {
                alert('Product added successfully!');
                setProduct({
                    name: '',
                    imageUrl: '',
                    price: '',
                    description: '',
                    warranty: '',
                    manufacturer: '',
                    category: '',
                    stock: '',
                    weight: '',
                    color: '',
                });
            }
        } catch (error) {
            setMessage('Error adding product. Please try again.');
            console.error(error);
        }
    };

    return (
        <div>
            <Navbarr />
            <div className="container mt-4">
                <h3>Add Product</h3>
                {message && (
                    <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit} >
                    <div className="row">
                        {/* Product Name */}
                        <div className="col-md-6 col-lg-4 mb-3">
                            <label htmlFor="name" className="form-label">Product Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Image URL */}
                        <div className="col-md-6 col-lg-4 mb-3">
                            <label htmlFor="imageUrl" className="form-label">Image URL</label>
                            <input
                                type="url"
                                className="form-control"
                                id="imageUrl"
                                name="imageUrl"
                                value={product.imageUrl}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Price */}
                        <div className="col-md-6 col-lg-4 mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="col-12 mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                rows="3"
                                value={product.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        {/* Warranty */}
                        <div className="col-md-6 col-lg-4 mb-3">
                            <label htmlFor="warranty" className="form-label">Warranty</label>
                            <input
                                type="text"
                                className="form-control"
                                id="warranty"
                                name="warranty"
                                value={product.warranty}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Manufacturer */}
                        <div className="col-md-6 col-lg-4 mb-3">
                            <label htmlFor="manufacturer" className="form-label">Manufacturer</label>
                            <input
                                type="text"
                                className="form-control"
                                id="manufacturer"
                                name="manufacturer"
                                value={product.manufacturer}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Category */}
                        <div className="col-md-6 col-lg-4 mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <input
                                type="text"
                                className="form-control"
                                id="category"
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Stock */}
                        <div className="col-md-6 col-lg-4 mb-3">
                            <label htmlFor="stock" className="form-label">Stock</label>
                            <input
                                type="number"
                                className="form-control"
                                id="stock"
                                name="stock"
                                value={product.stock}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Weight */}
                        <div className="col-md-6 col-lg-4 mb-3">
                            <label htmlFor="weight" className="form-label">Weight</label>
                            <input
                                type="text"
                                className="form-control"
                                id="weight"
                                name="weight"
                                value={product.weight}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Color */}
                        <div className="col-md-6 col-lg-4 mb-3">
                            <label htmlFor="color" className="form-label">Color</label>
                            <input
                                type="text"
                                className="form-control"
                                id="color"
                                name="color"
                                value={product.color}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default HOC(AddProduct);
