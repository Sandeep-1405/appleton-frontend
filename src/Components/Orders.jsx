import React, { useContext, useEffect, useState } from 'react';
import Navbarr from './Navbar';
import axios from 'axios';
import HOC from './HOC';
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router-dom';

const Orders = () => {
    const [ordersList, setOrdersList] = useState([]); 
    const { jwt } = useContext(AuthContext);
    const url = import.meta.env.VITE_APP_BACKEND_URL;

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${url}/orders`, {
                headers: { Authorization: `Bearer ${jwt}` },
            });

            console.log(res);
            setOrdersList(res.data.ordersList);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <div className="container mt-5">
            <Navbarr />
            <h1 className="text-center m-3">Your Orders</h1>

            {ordersList.length === 0 ? (
                <div className="text-center">
                    <h3>No Orders Found</h3>
                </div>
            ) : (
                <div className="row">
                    {ordersList
                        .slice()  
                        .reverse()
                        .map((order) => (
                            <div key={order._id} className="col-md-12 mb-4">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        {/* Order ID as heading */}
                                        <h3 className="card-title mb-4">Order ID: {order._id}</h3>

                                        <div className="row">
                                            {/* Order Status and Payment Status side by side */}
                                            <div className="col-md-6 mb-3">
                                                <p>
                                                    <strong>Order Status:</strong> {order.orderStatus}
                                                </p>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <p>
                                                    <strong>Payment Status:</strong> {order.paymentStatus}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Total Price */}
                                        <p>
                                            <strong>Total Price:</strong> ₹{order.totalPrice}
                                        </p>

                                        {/* Address Section */}
                                        <h6>Address:</h6>
                                        <div className="row">
                                            {/* First Line: Name */}
                                            <div className="col-md-12">
                                                <p>
                                                    <strong>{order.address.name}</strong>
                                                </p>
                                            </div>
                                            {/* Second Line: Other Address Details */}
                                            <div className="col-md-4">
                                                <p>
                                                    {order.address.street}, {order.address.landmark}
                                                </p>
                                            </div>
                                            <div className="col-md-4">
                                                <p>
                                                    {order.address.city}
                                                </p>
                                            </div>
                                            <div className="col-md-4">
                                                <p> 
                                                    {order.address.phoneNumber}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Button */}
                                        <Link
                                            to={`/order-details/${order._id}`}
                                            className="btn btn-outline-primary btn-sm"
                                        >
                                            Show More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default HOC(Orders);
