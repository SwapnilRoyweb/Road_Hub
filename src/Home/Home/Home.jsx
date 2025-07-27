import React, { Component, useContext, useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { AuthContext } from '../../Providers/Authprovider';
import Swal from 'sweetalert2';
import RunningTask from '../../Components/Task/RunningTask';
import CompletedTask from '../../Components/Task/CompletedTask';
import { useRevalidator } from 'react-router-dom';

const Home = () => {

    const [items, setItems] = useState([]);
    // const [joined, setJoined] = useState(false);

    const { user } = useContext(AuthContext);

    const {revalidate} = useRevalidator();

    useEffect(() => {
        fetch('https://road-hub-server.vercel.app/items')
            .then(res => res.json())
            .then(data => setItems(data))
    }, [])

    const runningItems = items.filter(item => item.status == 'running');
    const completedItems = items.filter(item => item.status == 'completed');

    // console.log(runningItems)
    // console.log(completedItems)

    

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
                            {runningItems.map((runningItem) => <RunningTask runningItem={runningItem} key={runningItem._id}></RunningTask>)}
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
                            {completedItems.map(completedItem => <CompletedTask completedItem={completedItem} key={completedItem._id}></CompletedTask>)}
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}

export default Home;

