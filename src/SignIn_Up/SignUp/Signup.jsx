import React, { Component, useContext } from 'react'
import background from '../../../public/Vibrant Geometric Logo - Road_Hub.png'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/Authprovider';
import Swal from 'sweetalert2';

const Signup = () => {

    const { createUser, updateUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const user_or_admin = form.user_admin.value;
        const password = form.pass.value;
        // console.log(name, email, password);

        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                updateUser(name)
                    .then(() => {
                        console.log('update user')

                        const signedUser = { name: loggedUser.displayName, email: loggedUser.email, user_or_admin };
                        fetch('http://localhost:3000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(signedUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data);
                                if (data.insertedId) {
                                    form.reset();
                                    console.log(signedUser);
                                    if(signedUser.user_or_admin === 'admin'){
                                        navigate('/adminHome')
                                        Swal.fire({
                                            title: "Good job!",
                                            text: "User Sign up done!",
                                            icon: "success"
                                          });
                                    }else{
                                        navigate('/');
                                    }
                                    
                                }
                            })

                    })

            })
            .catch(() => {
                // console.log(error);
            })
    }

    return (
        <div className="bg-cover bg-center bg-repeat min-h-screen -ml-5 -mr-10 backdrop-opacity-90" style={{ backgroundImage: `url(${background})` }}>
            {/* Sign Up Card */}
            <div className='flex flex-col items-center justify-center min-h-screen w-full'>
                <div className='backdrop-blur-md w-fit h-fit p-10 rounded-2xl'>
                    <h1 className='text-center text-3xl bg-cyan-950 p-3 rounded-md text-white font-bold w-lg border-white border-x-2'>Please, Sign Up</h1>
                    {/* email & pass */}
                    <form onSubmit={handleSubmit} className='flex flex-col justify-center  items-center gap-5 mt-10'>

                        <div className='flex items-center justify-center gap-3'>
                            <label htmlFor="email" className='text-xl font-bold text-black'>Your Name :</label>
                            <input type="text" name='name' className='w-xs h-10 bg-white rounded-full border-x-2 p-2' />
                        </div>

                        <div className='flex items-center justify-center gap-3'>
                            <label htmlFor="email" className='text-xl font-bold text-black'>Your Email :</label>
                            <input type="email" name='email' className='w-xs h-10 bg-white rounded-full border-x-2 p-2' />
                        </div>

                        <div className='flex items-center justify-center gap-3'>
                            <label htmlFor="email" className='text-xl font-bold text-black '>Sign Up as :</label>
                            {/* <input type="text" name='user_admin' value='user' className='w-xs h-10 bg-white rounded-full border-x-2 p-2' /> */}
                            <select name='user_admin' className='w-xs h-10 bg-white rounded-full border-x-2 p-2'>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className='flex items-center justify-center gap-3'>
                            <label htmlFor="email" className='text-xl font-bold text-black '>Password :</label>
                            <input type="password" name='pass' className='w-xs h-10 bg-white rounded-full border-x-2 p-2' />
                        </div>

                        <input type='submit' className='w-xs h-14 hover:bg-cyan-900 border-4 border-y-0 border-cyan-950 bg-white text-cyan-950 hover:text-white hover:border-0 text-2xl font-extrabold rounded-full mt-3 flex flex-col items-center justify-center' value="Sign Up"></input>
                    </form>
                    <p className='text-center mt-5 text-lg text-white font-semibold'>Already have an account? Please <Link to='/login' className='font-extrabold text-black hover:text-white'>Sign In</Link></p>
                </div>
            </div>
        </div>
    )
}
export default Signup;
