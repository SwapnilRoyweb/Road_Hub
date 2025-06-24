import React, { Component, useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const AdminHome = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])
    // console.log(users)

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const description = form.description.value;
        const duration = form.duration.value;
        const status = form.status.value;

        const item = { name, description, duration, status };

        fetch('http://localhost:3000/items', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.insertedId) {
                    form.reset();
                    Swal.fire({
                        title: "Good job!",
                        text: "Item added!",
                        icon: "success"
                    });
                }
            })
    }

    return (
        <div className='w-full flex flex-col-reverse items-center justify-center gap-10 my-10'>

            {/* create roadHub items */}
            <form onSubmit={handleSubmit} className='flex flex-col w-2/3 justify-center items-center gap-5 bg-linear-to-b from-cyan-900 to-cyan-600 py-8 rounded-2xl'>

                <h1 className='text-center text-2xl font-extrabold mb-3 bg-white px-10 py-2 rounded-xl w-11/12'>Create Road_Hub Items</h1>

                <div className='flex items-center justify-center gap-3'>
                    <label htmlFor="email" className='text-xl font-bold text-white'>RoadHub Item:</label>
                    <input type="text" name='name' className='w-xs h-10 bg-white rounded-xl border-x-2 p-2' />
                </div>

                <div className='flex items-center justify-center gap-3'>
                    <label htmlFor="email" className='text-xl font-bold text-white'>Description:</label>
                    <input type="text" name='description' className='w-xs h-10 bg-white rounded-xl border-x-2 p-2' />
                </div>

                <div className='flex items-center justify-center gap-3'>
                    <label htmlFor="email" className='text-xl font-bold text-white'>Duration :</label>
                    <input type="text" name='duration' className='w-xs h-10 bg-white rounded-xl border-x-2 p-2' />
                </div>

                <div className='flex items-center justify-center gap-3'>
                    <label htmlFor="email" className='text-xl font-bold text-white '>Status :</label>
                    <input type="text" name='status' className='w-xs h-10 bg-white rounded-xl border-x-2 p-2' />
                </div>

                <input type='submit' className='w-xs h-10 hover:bg-cyan-900 border-4 border-y-0 border-cyan-950 bg-white text-cyan-950 hover:text-white hover:border-0 text-xl font-bold rounded-xl mt-3 flex flex-col items-center justify-center' value="Create"></input>

            </form>

            {/* manage users */}
            <div>
                <h1 className='text-center font-extrabold text-white text-2xl my-5 bg-linear-to-t from-cyan-900 to-cyan-600 py-1 rounded-full border-2 border-black border-t-0 border-b-0'>All Users</h1>
                <table className='w-2xl border'>
                    <thead className='border'>
                        <tr>
                            <th>Serial</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin/User</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            users.map((user, index) => <tr key={user._id} className='border'>
                                <th>{index + 1}</th>
                                <th>{user.name}</th>
                                <th>{user.email}</th>
                                <th>{user.user_or_admin}</th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminHome;
