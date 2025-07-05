import React, { Component, useContext } from 'react'
import { AuthContext } from '../../Providers/Authprovider';
import Swal from 'sweetalert2';

const RunningTask = ({ runningItem }) => {

    const {user} = useContext(AuthContext);

    const handleJoined = item => {
        if (user) {
            const joinedItem = { joinedItemId: item._id, joinedItemName: item.name, userName: user.displayName, email: user.email };

            fetch('http://localhost:3000/joins', {
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
                    }
                })
        }
    }

    const handleComment = (event, item) => {
        event.preventDefault();

        const form = event.target;
        const comment = form.comment.value;
        // const index = index+1;

        const updateUser = { name: user?.displayName, email: user?.email, comment };

        fetch(`http://localhost:3000/items/${item?._id}/join`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    // console.log(data)
                    Swal.fire({
                        text: "Successfully commented!",
                        icon: "success"
                    });
                }
            })
    }

    return (
        <div className='flex flex-col items-center justify-center w-fit h-fit bg-cyan-700 text-center p-5 pb-0 rounded-xl text-white border-2 border-white border-t-0 border-b-0' key={runningItem._id}>
            <p className='font-bold text-2xl'>{runningItem.name}</p>
            <p className='bg-white text-black rounded-full my-3 font-semibold w-full'>{runningItem.status}</p>
            <p>Duration : {runningItem.duration}</p>
            <p className='bg-black rounded-lg text-white p-2 my-3'>Description: {runningItem.description}</p>
            <div className='bg-white text-black p-2 rounded-lg'>
                <h1 className='font-semibold underline'>Comments</h1>
                {runningItem.joinedData ? (runningItem.joinedData?.map(data =>
                    // console.log(data)
                    <div key={data.index} className='flex gap-1 items-center justify-center'>
                        <p className='font-semibold'>{data.name} :</p>
                        <p>{data.comment}</p>
                    </div>
                )) : (<p>No comments Yet</p>)}
            </div>
            <form onSubmit={(event) => handleComment(event, runningItem)} className='flex justify-around items-center gap-1 my-3'>
                <input type="text" name='comment' className='bg-white rounded-lg text-black' />
                <input type="submit" value='comment' className='bg-white text-cyan-950 text-xs py-1 font-semibold px-3 rounded-full hover:bg-cyan-900 hover:text-white' />
            </form>
            <button onClick={() => handleJoined(runningItem)} className='bg-white text-cyan-950 py-1 rounded-tl-2xl rounded-tr-2xl hover:bg-cyan-900 hover:text-white w-full mt-3 font-bold'>Join Now</button>
        </div>
    )
}

export default RunningTask;