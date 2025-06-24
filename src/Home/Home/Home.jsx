import React, { Component, useContext, useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { AuthContext } from '../../Providers/Authprovider';
import Swal from 'sweetalert2';

const Home = () => {

    const [items, setItems] = useState([]);
    // const [joined, setJoined] = useState(false);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:3000/items')
            .then(res => res.json())
            .then(data => setItems(data))
    }, [])

    const runningItems = items.filter(item => item.status == 'running');
    const completedItems = items.filter(item => item.status == 'completed');

    // console.log(runningItems)
    // console.log(completedItems)

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
        <div>
            <div>
                <Tabs className='m-10 bg-linear-to-b from-cyan-600 to-cyan-950 p-10 pt-0 rounded-full'>
                    <TabList className='flex justify-center bg-black text-white rounded-lg w-full'>
                        <Tab>In progress</Tab>
                        <Tab>Completed</Tab>
                    </TabList>


                    <TabPanel className='mt-10'>
                        <div className='flex flex-col lg:flex-row mt-5 gap-5 items-center justify-center' data-aos="fade-down"
                            data-aos-offset="200"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="false"
                            data-aos-anchor-placement="top-center">
                            {runningItems.map(runningItem => <div className='flex flex-col items-center justify-center w-fit h-fit bg-cyan-700 text-center p-5 pb-0 rounded-xl text-white border-2 border-white border-t-0 border-b-0' key={runningItem._id}>
                                <p className='font-bold text-2xl'>{runningItem.name}</p>
                                <p className='bg-white text-black rounded-full my-3 font-semibold w-full'>{runningItem.status}</p>
                                <p>Duration : {runningItem.duration}</p>
                                <form onSubmit={(event) => handleComment(event, runningItem)} className='flex justify-around items-center gap-1 my-3'>
                                    <input type="text" name='comment' className='bg-white rounded-lg text-black' />
                                    <input type="submit" value='comment' className='bg-white text-cyan-950 text-xs py-1 font-semibold px-3 rounded-full hover:bg-cyan-900 hover:text-white' />
                                </form>
                                <button onClick={() => handleJoined(runningItem)} className='bg-white text-cyan-950 py-1 rounded-tl-2xl rounded-tr-2xl hover:bg-cyan-900 hover:text-white w-full mt-3 font-bold'>Join Now</button>
                            </div>)}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='flex flex-col md:flex-row flex-wrap mt-5 gap-5 items-center justify-center' data-aos="fade-down"
                            data-aos-offset="200"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="false"
                            data-aos-anchor-placement="top-center">
                            {completedItems.map(completedItem => <div className='flex flex-col items-center justify-center w-fit h-fit bg-cyan-700 text-center p-5 rounded-xl text-white border-2 border-white border-t-0 border-b-0' key={completedItem._id}>
                                <p className='font-bold text-2xl'>{completedItem.name}</p>
                                <p className='bg-white text-black rounded-full my-3 font-semibold w-full'>{completedItem.status}</p>
                                <p>Duration : {completedItem.duration}</p>
                                <form className='flex justify-around items-center gap-1 my-3'>
                                    <input type="text" className='bg-white rounded-lg text-black' />
                                    <input type="submit" value='comment' className='bg-white text-cyan-950 text-xs py-1 font-semibold px-3 rounded-full hover:bg-cyan-900 hover:text-white' />
                                </form>
                                {/* <button className='bg-white text-cyan-950 py-1 rounded-tl-2xl rounded-tr-2xl hover:bg-cyan-900 hover:text-white w-full mt-3 font-bold disabled:'>Join</button> */}
                            </div>)}
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}

export default Home;

