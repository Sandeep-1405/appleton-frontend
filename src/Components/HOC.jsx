import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export default function HOC(WrappedComponent) {
    return function AuthenticatedComponent() {
        const [isToken, setIsToken] = useState(null); 
        const { jwt } = useContext(AuthContext);

        useEffect(() => {
            if (jwt) {
                setIsToken(true);
            } else {
                setIsToken(false);
            }
        }, [jwt]);

        if (isToken === null) {
            return <div>Loading...</div>; 
        }
        return isToken ? <WrappedComponent /> : <Navigate to="/login" />;
    };
}
