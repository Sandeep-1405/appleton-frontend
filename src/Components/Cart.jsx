import React, { useContext } from 'react';
import Navbarr from './Navbar';
import { CartContext } from '../Context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity,setTotalPrice } = useContext(CartContext);

    // Calculate Total Price
    const calculateTotal = () => {
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
        //console.log(total); 
        setTotalPrice(total)
        return total;
    };
    
    const totalPrice = calculateTotal();
    //console.log(totalPrice)

    return (
        <div>
            {/* Navbar */}
            <Navbarr />

            {/* Main Container */}
            <div className="container mt-4">
                <h1 className="text-start">Cart</h1>
                
                {/* Cart Content */}
                <div className="row">
                    {/* Product List Section */}
                    <div className="col-md-8" >
                        {cart.length > 0 ? (
                            cart.map((item) => (
                                <div key={item.id} className="card mb-3 shadow-sm">
                                    <div className="row no-gutters">
                                        {/* Product Image */}
                                        <div className="col-md-4">
                                            <img 
                                                src={item.imageUrl} 
                                                alt={item.name} 
                                                className="img-fluid rounded-start" 
                                                style={{ maxHeight: '150px', objectFit: 'cover',margin:'10px' }}
                                            />
                                        </div>
                                        
                                        {/* Product Details */}
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                <p className="card-text">
                                                    Price: ₹{item.price.toFixed(2)}
                                                </p>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <span className="me-2">Quantity:</span>
                                                    <button
                                                        className="btn btn-outline-secondary btn-sm me-2"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        -
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button
                                                        className="btn btn-outline-secondary btn-sm ms-2"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button
                                                    className="btn btn-danger btn-sm mt-3"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className='text-start'>Your cart is empty. Add some products to see them here!</p>
                        )}
                    </div>

                    {/* Summary Section */}
                    {cart.length !==0 && <div className="col-md-4">
                        <div className="card shadow-sm p-3">
                            <h5 className="text-center">Order Summary</h5>
                            <hr />
                            <p>Total Items: {cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
                            <p>Total Price: ₹{calculateTotal()}</p>
                            <Link to={{
                                    pathname: '/add-address',
                                    
                                }}  className="btn btn-primary w-100 mt-3">
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Cart;
