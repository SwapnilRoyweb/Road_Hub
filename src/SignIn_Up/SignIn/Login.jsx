import React, { Component } from 'react'
import background from '../../../public/Vibrant Geometric Logo - Road_Hub.png'
import { Link } from 'react-router-dom';

const Login = () => {

    return (
        <div className="bg-cover bg-center bg-repeat min-h-screen -ml-5 -mr-10 backdrop-opacity-90" style={{ backgroundImage: `url(${background})` }}>
            {/* Sign In Card */}
            <div className='flex flex-col items-center justify-center min-h-screen w-full'>
                <div className='backdrop-blur-md w-fit h-fit p-10 rounded-2xl'>
                    <h1 className='text-center text-3xl bg-cyan-950 p-3 rounded-md text-white font-bold w-lg border-white border-x-2'>Please, Sign In</h1>
                    {/* email & pass */}
                    <div className='flex flex-col justify-center  items-center gap-5 mt-10'>

                        <div className='flex items-center justify-center gap-3'>
                            <label for="email" className='text-xl font-bold text-black'>Your Email :</label>
                            <input type="email" className='w-xs h-10 bg-white rounded-full border-x-2 p-2' />
                        </div>

                        <div className='flex items-center justify-center gap-3'>
                            <label for="email" className='text-xl font-bold text-black '>Password :</label>
                            <input type="password" className='w-xs h-10 bg-white rounded-full border-x-2 p-2' />
                        </div>

                        <button className='w-xs h-14 hover:bg-cyan-900 border-4 border-y-0 border-cyan-950 bg-white text-cyan-950 hover:text-white hover:border-0 text-2xl font-extrabold rounded-full mt-3 flex flex-col items-center justify-center'>Sign In</button>
                    </div>
                    <p className='text-center mt-5 text-lg text-white font-semibold'>New here? Please <Link to='/signUp' className='font-extrabold text-black hover:text-white'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login;
