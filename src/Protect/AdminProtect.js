import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const AdminProtect = ({children}) => {
    const {pathname} = useLocation();
    const {user, isLoggedIn} = useSelector((state)=>state.auth);

    //Trường hợp user chưa login
    if(!isLoggedIn){
       return <Navigate to={`/login?successUrl=${pathname}`} replace />
    }
    //Trường hợp đã login nhưng ko phải là chức năng admin => redirect về not found page
    if(user?.maLoaiNguoiDung !== 'QuanTri'){
        return <Navigate to='/not-found' replace />
    }
    return children;
};

export default AdminProtect;