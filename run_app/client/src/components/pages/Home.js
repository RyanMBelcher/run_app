import React from 'react';
import '../../index.css'
// import Auth from '../../utils/auth';
import man_running_on_bridge from '../../images/man_running_on_bridge.png';

export default function Home() {
    return (
        <div>
            <h1 className='text-3xl font-bold underline'>Welcome to the App!</h1>
            <img src={man_running_on_bridge}>
            </img>
        </div>
    )
}