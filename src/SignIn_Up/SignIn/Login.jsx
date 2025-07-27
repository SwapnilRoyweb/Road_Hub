import React, { Component, useContext, useEffect, useState } from 'react'
import background from '../../../public/Vibrant Geometric Logo - Road_Hub.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/Authprovider';
import Swal from 'sweetalert2';

const Login = () => {

    const {signIn} = useContext(AuthContext);
    const [users, setUsers] = useState([])

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        fetch('https://road-hub-server.vercel.app/users')
        .then(res=> res.json())
        .then(data => setUsers(data))
    }, [])

    const adminUser = users.find(u=> u.user_or_admin === 'admin');
    const onlyUser = users.filter(u=> u.user_or_admin === 'user');
    // console.log(onlyUser)

    const handleLogin = (event) => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.pass.value;
        //const user_admin = form.user_admin.value;

        signIn(email, password)
        .then(result => {
            const loggedUser = result.user;
            // console.log(loggedUser);
            if(adminUser?.email === loggedUser?.email){
                // console.log(adminUser)
                form.reset();
                navigate('/adminHome');
                Swal.fire({
                    title: "Good job!",
                    text: "Admin Signed In!",
                    icon: "success"
                  });
            }else if(onlyUser.map(u=> u?.email  === loggedUser?.email)){
                navigate('/');
                Swal.fire({
                    title: "Good job!",
                    text: "User Signed In!",
                    icon: "success"
                  });
            }else{
                navigate('/login')
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="bg-cover bg-center max-w-screen min-h-screen -ml-5 -mr-10 backdrop-opacity-90" style={{ backgroundImage: `url(${background})` }}>
            {/* Sign In Card */}
            <div className='flex flex-col items-center justify-center min-h-screen w-full'>
                <div className='backdrop-blur-md w-fit h-fit p-10 rounded-2xl'>
                    <h1 className='text-center text-3xl bg-cyan-950 p-3 rounded-md text-white font-bold w-lg border-white border-x-2'>Please, Sign In</h1>
                    {/* email & pass */}
                    <form className='flex flex-col justify-center  items-center gap-5 mt-10' onSubmit={handleLogin}>

                        <div className='flex items-center justify-center gap-3'>
                            <label htmlFor="email" className='text-xl font-bold text-black'>Your Email :</label>
                            <input type="email" name='email' className='w-xs h-10 bg-white rounded-full border-x-2 p-2' />
                        </div>

                        <div className='flex items-center justify-center gap-3'>
                            <label htmlFor="email" className='text-xl font-bold text-black '>Password :</label>
                            <input type="password" name='pass' className='w-xs h-10 bg-white rounded-full border-x-2 p-2' />
                        </div>

                        {/* <div className='flex items-center justify-center gap-3'>
                            <label htmlFor="email" className='text-xl font-bold text-black '>Sign up as :</label>
                            <select name='user_admin' className=''>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div> */}

                        <input type='submit' value='Sign In' className='w-xs h-14 hover:bg-cyan-900 border-4 border-y-0 border-cyan-950 bg-white text-cyan-950 hover:text-white hover:border-0 text-2xl font-extrabold rounded-full mt-3 flex flex-col items-center justify-center'></input>
                    </form>
                    <p className='text-center mt-5 text-lg text-white font-semibold'>New here? Please <Link to='/signUp' className='font-extrabold text-black hover:text-white'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login;
