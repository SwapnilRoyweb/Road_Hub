import React, { Component } from 'react'
import logo from '../../../public/Vibrant_Geometric_Logo_-_Road_Hub-removebg-preview.png'

const Footer = () => {
    return (

        <div className='my-3 flex flex-col md:flex-row-reverse justify-center items-center bg-cyan-950 text-white rounded-2xl'>
            <img src={logo} alt="" className='w-28 rounded-2xl' />
            <p className='text-xl text-center'>Copyright © 2025 - All right reserved by</p>
        </div>

    )
}

export default Footer;
