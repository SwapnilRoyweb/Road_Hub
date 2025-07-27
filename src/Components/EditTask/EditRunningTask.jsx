import React, { Component, useContext } from 'react'
import { Link, useLoaderData, useRevalidator } from 'react-router-dom';
import { AuthContext } from '../../Providers/Authprovider';
import Swal from 'sweetalert2';

const EditRunningTask = () => {
    const { user } = useContext(AuthContext);

    const {revalidate} = useRevalidator();

    const runningTask = useLoaderData();
    // console.log(runningTask.joinedData.forEach(element => {
    // console.log(runningTask)
    // }));
    if (runningTask.email == user?.email) {
        const previousComment = runningTask.joinedData.map(item => item.comment);
        console.log(previousComment)
    }

    const handleJoined = item => {
        if (user) {
            const joinedItem = { joinedItemId: item._id, joinedItemName: item.name, userName: user.displayName, email: user.email };

            fetch('https://road-hub-server.vercel.app/joins', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(joinedItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        // console.log(data)
                        // setJoined(true);
                        Swal.fire({
                            title: "Good job!",
                            text: `User Joined to ${item.name}!`,
                            icon: "success"
                        });
                        revalidate();
                    }
                })
        }
    }

    const handleUpdateComment = (event, item) => {
        event.preventDefault();

        const form = event.target;
        const updateComment = form.comment.value;

        // const index = index+1;

        const updateUserComment = { name: user?.displayName, email: user?.email, previousComment: updateComment };

        fetch(`https://road-hub-server.vercel.app/items/${item?._id}/edit-comment`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateUserComment)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    // console.log(data)
                    Swal.fire({
                        text: "Successfully commented!",
                        icon: "success"
                    });
                    revalidate();
                }
            })
    }

    return (
        <div className='flex items-center justify-center gap-5 h-full w-full'>
            <div className='flex flex-col items-center justify-center w-fit h-fit bg-cyan-700 text-center p-5 pb-0 rounded-xl text-white border-2 border-white border-t-0 border-b-0' key={runningTask._id}>
                <p className='font-bold text-2xl'>{runningTask.name}</p>
                <p className='bg-white text-black rounded-full my-3 font-semibold w-full'>{runningTask.status}</p>
                <p>Duration : {runningTask.duration}</p>
                <p className='bg-black rounded-lg text-white p-2 my-3'>Description: {runningTask.description}</p>
                <div className='bg-white text-black p-2 rounded-lg'>
                    <h1 className='font-semibold underline'>Comments</h1>
                    {runningTask.joinedData ? (runningTask.joinedData?.map(data =>
                        // console.log(data)
                        <div key={data.name} className='flex gap-1 items-center justify-center my-2'>
                            <p className='font-semibold'>{data.name} :</p>
                            <p>{data.comment}</p>
                            {/* {user?.email == data.email && (<Link to={`runningUpdateComment/${runningTask._id}`}><button className='bg-white text-cyan-900 text-xs py-1 font-semibold px-2 rounded-full hover:bg-cyan-900 hover:text-white'>Update</button></Link>)}
                        {user?.email == data.email && (<button onClick={() => handleDelete(runningTask, data)} className='bg-white text-red-600 text-xs py-1 font-semibold px-2 rounded-full hover:bg-red-600 hover:text-white'>Delete</button>)} */}
                        </div>
                    )) : (<p>No comments Yet</p>)}
                </div>
                <form onSubmit={(event) => handleUpdateComment(event, runningTask)} className='flex justify-around items-center gap-1 my-3'>
                    <input type="text" name='comment' className='bg-white rounded-lg text-black' />
                    <input type="submit" value='Update' className='bg-white text-cyan-950 text-xs pb-1 font-semibold px-3 rounded-full hover:bg-cyan-900 hover:text-white' />
                </form>
                <button onClick={() => handleJoined(runningTask)} className='bg-white text-cyan-950 py-1 rounded-tl-2xl rounded-tr-2xl hover:bg-cyan-900 hover:text-white w-full mt-3 font-bold'>Join Now</button>
            </div>
        </div>
    )
}
export default EditRunningTask;