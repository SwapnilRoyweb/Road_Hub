import React, { Component, useContext } from 'react'
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/Authprovider';
import { Link } from 'react-router-dom';

const CompletedTask = ({ completedItem }) => {

    const { user } = useContext(AuthContext);

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

    const handleDelete = (item, comment) => {
        // console.log(item.joinedData.email);
        fetch(`http://localhost:3000/items/${item?._id}/remove-comment`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    // console.log(data)
                    Swal.fire({
                        text: "Comment Deleted Successfully!",
                        icon: "success"
                    });
                }
            })

    }

    return (
        <div className='flex flex-col items-center justify-center w-fit h-fit bg-cyan-700 text-center p-5 rounded-xl text-white border-2 border-white border-t-0 border-b-0' key={completedItem._id}>
            <p className='font-bold text-2xl'>{completedItem.name}</p>
            <p className='bg-white text-black rounded-full my-3 font-semibold w-full'>{completedItem.status}</p>
            <p>Duration : {completedItem.duration}</p>
            <p className='bg-black rounded-lg text-white p-2 my-3'>Description: {completedItem.description}</p>
            <div className='bg-white text-black p-2 rounded-lg'>
                <h1 className='font-semibold underline'>Comments</h1>
                {completedItem.joinedData ? (completedItem.joinedData?.map(data =>
                    // console.log(data)
                    <div key={data} className='flex gap-1 items-center justify-center'>
                        <p className='font-semibold'>{data.name} :</p>
                        <p>{data.comment}</p>
                        {user?.email == data.email && (<Link to={`completedUpdateComment/${completedItem._id}`}><button className='bg-white text-cyan-900 text-xs py-1 font-semibold px-2 rounded-full hover:bg-cyan-900 hover:text-white'>Edit</button></Link>)}
                        {user?.email == data.email && (<button onClick={() => handleDelete(completedItem, data)} className='bg-white text-red-600 text-xs py-1 font-semibold px-2 rounded-full hover:bg-red-600 hover:text-white'>Delete</button>)}
                    </div>
                )) : (<p>No comments Yet</p>)}
            </div>
            <form onSubmit={(event) => handleComment(event, completedItem)} className='flex justify-around items-center gap-1 my-3'>
                <input type="text" name='comment' className='bg-white rounded-lg text-black' />
                <input type="submit" value='comment' className='bg-white text-cyan-950 text-xs pb-1 font-semibold px-3 rounded-full hover:bg-cyan-900 hover:text-white' />
            </form>
            {/* <button className='bg-white text-cyan-950 py-1 rounded-tl-2xl rounded-tr-2xl hover:bg-cyan-900 hover:text-white w-full mt-3 font-bold disabled:'>Join</button> */}
        </div>
    )
}

export default CompletedTask;