import React, { Component, useContext } from 'react'
import { AuthContext } from '../Providers/Authprovider';
import { Navigate, useLocation } from 'react-router-dom';

const Privateroute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);

    const location = useLocation();

    if (loading) {
        return <div className='flex flex-col items-center justify-center h-full w-full'>
            <div className='size-5 animate-spin bg-black text-white  min-h-screen'></div>
        </div>
    }

    if (user) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
}
export default Privateroute;

