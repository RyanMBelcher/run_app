import React, { useState } from 'react';
import Home from './pages/Home';
import Navbar from './pages/Navbar'

export default function Header() {
    return (
        <div>
            <nav>
                <span>
                    <p>Run App</p>
                </span>
                <ul>
                    <li>
                        Login
                    </li>
                    <li>
                        Signup
                    </li>
                </ul>
            </nav>
        </div>
    );
};
