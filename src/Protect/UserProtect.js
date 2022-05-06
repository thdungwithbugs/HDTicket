import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const UserProtect = ({children}) => {

    const {isLoggedIn} = useSelector((state)=>state.auth);
    const {pathname} = useLocation();
    if(!isLoggedIn){
        return <Navigate to={`/login?successUrl=${pathname}`} replace />
    }
    return children;
};

export default UserProtect;