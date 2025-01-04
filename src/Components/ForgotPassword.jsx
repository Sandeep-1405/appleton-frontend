import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/forgot-password', {
                email,
                password,
            });
            console.log('Response:', response.data);
            alert('Password reset request sent successfully!');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send password reset request. Please try again.');
        }
    };

    return (
        
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={handleSubmit} className="w-25 p-4 border rounded">
                <h2 className="text-center mb-4">Forgot Password</h2>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Submit
                </button>

                <Link to= '/login'>Back to Login</Link>
            </form>
        </div>
    );
};

export default ForgotPassword;
