import React, { Component } from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';

const Main = () => {

  const location = useLocation();

  const noNavFoot = location.pathname.includes('login') || location.pathname.includes('signUp');

  return (
    <div className='ml-5 mr-10'>
      {noNavFoot || <Navbar></Navbar>}
      <Outlet></Outlet>
      {noNavFoot || <Footer></Footer>}
    </div>
  )

}

export default Main;



