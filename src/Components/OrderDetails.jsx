import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import Navbarr from './Navbar';

const OrderDetails = () => {
    const { id } = useParams();
    const { jwt } = useContext(AuthContext);

    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const url = import.meta.env.VITE_APP_BACKEND_URL;

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const res = await axios.get(`${url}/orders/${id}`, {
                    headers: { 'Authorization': `Bearer ${jwt}` },
                });
                setOrder(res.data.order);
                setLoading(false);
            } catch (err) {
                setError('Error fetching order details');
                setLoading(false);
            }
        };
        fetchOrderDetails();
    }, [id, jwt]);

    const formatDateTime = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <Navbarr />
            <div className="container-fluid p-4" style={{ minHeight: '100vh', paddingTop: '70px' }}>
                <div className="order-details-card shadow-lg bg-white rounded p-4">
                    <h1 className="text-center mb-4">Order Details</h1>

                    <div className="mb-3">
                        <h3>Order ID: <span className="text-muted">{order._id}</span></h3>
                    </div>

                    <div className="mb-3">
                        <h5>Ordered Date & Time:</h5>
                        <p>{formatDateTime(order.createdAt)}</p>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-6">
                            <h5>Order Status:</h5>
                            <p>{order.orderStatus}</p>
                        </div>
                        <div className="col-md-6">
                            <h5>Payment Status:</h5>
                            <p>{order.paymentStatus}</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h5>Total Price:</h5>
                        <p className="text-success">₹{order.totalPrice}</p>
                    </div>

                    <div className="address mb-4">
                        <h5>Delivery Address:</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <p><strong>{order.address.name}</strong></p>
                                <p>{order.address.street}, {order.address.landmark}</p>
                            </div>
                            <div className="col-md-6">
                                <p>{order.address.city}</p>
                                <p>{order.address.phoneNumber}</p>
                            </div>
                        </div>
                    </div>

                    <div className="items">
                        <h5>Items:</h5>
                        <ul className="list-unstyled">
                            {order.cartItems && order.cartItems.map((item, index) => (
                                <li key={index} className="mb-4">
                                    <div className="item-card p-3 border rounded d-flex align-items-start">
                                        {/* Product Image */}
                                        <div className="product-image">
                                            <img
                                                src={item.productId.imageUrl}
                                                alt={item.productId.name}
                                                style={{
                                                    width: '150px',
                                                    height: '150px',
                                                    objectFit: 'cover',
                                                    marginRight: '20px',
                                                }}
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="product-details flex-grow-1">
                                            <h6><strong>{item.productId.name}</strong></h6>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <p><strong>Price:</strong> ₹{item.productId.price}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p><strong>Quantity:</strong> {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p><strong>Description:</strong> {item.productId.description}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderDetails;
