import React, { useContext, useState } from 'react';
import axios from 'axios';
import Navbarr from './Navbar';
import { CartContext } from '../Context/CartContext';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Address = () => {

    const {cart,totalPrice,setCart,setTotalPrice} = useContext(CartContext);
    const {jwt} = useContext(AuthContext);
    const navigate = useNavigate();
    const url = import.meta.env.VITE_APP_BACKEND_URL;

    const cartItems = cart.map(item => ({
        productId: item._id,
        quantity: item.quantity,
    }));

    console.log(cartItems)

  const [address, setAddress] = useState({
    name: '',
    phoneNumber: '',
    landmark: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/orders`, {cartItems,totalPrice,address}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        }
      });
      console.log(response.data);
     
      setAddress({
        name: '',
        phoneNumber: '',
        landmark: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
      }); 
      setError(null);
      setCart([]);
      setTotalPrice(0);
      alert('Order placed Successfully');
      navigate('/')
    } catch (error) {
      console.error('Error adding address:', error);
      setError('Failed to add address. Please try again.');
    }
  };

  return (
    <>
    <Navbarr/>
    <div className="container mt-3">
      <h2>Add Shipping Address</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className='card p-3 mt-3' >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={address.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={address.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="landmark" className="form-label">Landmark (Optional)</label>
          <input
            type="text"
            className="form-control"
            id="landmark"
            name="landmark"
            value={address.landmark}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="street" className="form-label">Street</label>
          <input
            type="text"
            className="form-control"
            id="street"
            name="street"
            value={address.street}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={address.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="state" className="form-label">State</label>
          <input
            type="text"
            className="form-control"
            id="state"
            name="state"
            value={address.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="postalCode" className="form-label">Postal Code</label>
          <input
            type="text"
            className="form-control"
            id="postalCode"
            name="postalCode"
            value={address.postalCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="country" className="form-label">Country</label>
          <input
            type="text"
            className="form-control"
            id="country"
            name="country"
            value={address.country}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Place Order</button>
      </form>
    </div>
    </>
  );
};

export default Address;
