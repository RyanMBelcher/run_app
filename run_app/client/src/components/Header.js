import React, { useState } from 'react';
// import Home from './pages/Home';
// import Login from './Login';
// import Signup from './Signup';

export default function Header() {
    return (
        <div>
            <nav>
                <span>
                    <p>Run App</p>
                </span>
                <ul>
                    <li>
                        <a href='/login'>Login</a>
                    </li>
                    <li>
                        <a href='/signup'>Signup</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
