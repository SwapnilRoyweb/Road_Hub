import React, { Component, useContext } from 'react'
import logo from '../../../public/Vibrant_Geometric_Logo_-_Road_Hub-removebg-preview.png'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/Authprovider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHouse } from '@awesome.me/kit-KIT_CODE/icons/classic/solid'

const Navbar = () => {

    const {user, logout} = useContext(AuthContext);

    const handlelogout = () => {
        logout()
        .then(() => {})
        .catch((error) => {console.log(error)})
    }

    return (
        <div className='flex flex-row justify-between items-center'>
            {/* logo and name */}
            <div className='flex flex-row items-center'>
                <img src={logo} alt="" className='h-32 w-32' />
                <h1 className='text-3xl font-extrabold'>Road_Hub</h1>
            </div>

            {/* login button or profile*/}
            <div>
                {
                    user ? <div className='flex items-center justify-center gap-3'><span className='text-2xl font-bold text-black'>{user.displayName}</span> <button className='bg-red-600 text-white rounded-full px-3 py-2 font-semibold text-center' onClick={handlelogout}>Sign-Out</button></div> : <Link to='/login'><button className='w-28 h-14 bg-cyan-800 text-xl font-bold text-white flex justify-center items-center rounded-3xl hover:bg-cyan-950'>Login</button>
                </Link>
                }
            </div>
        </div>
    )
}

export default Navbar;

