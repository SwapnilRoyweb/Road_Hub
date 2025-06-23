import React, { Component, useEffect, useState } from 'react'


const Home = () => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/items')
            .then(res => res.json())
            .then(data => setItems(data))
    }, [])

    const runningItems = items.filter(item => item.status == 'running');
    const completedItem = items.filter(item => item.status == 'completed');

    console.log(runningItems)
    console.log(completedItem)

    return (
        <div>
            <div>
                buttons
            </div>
            <div>
                {

                }
            </div>
        </div>
    )
}

export default Home;

