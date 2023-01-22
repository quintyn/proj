import React, { useEffect } from 'react';
import { handleAuthentication } from '@auth0/auth0-spa-js';
import { useAuth } from 'react-auth-hook';

const Callback = () => {
    const { login } = useAuth();
    useEffect(() => {
        handleAuthentication()
            .then(() => login())
            .catch((error) => console.error(error));
    }, [login]);
    return <div>Loading...</div>;
};

export default Callback;
