import React, { useContext } from 'react';
import Home from '../components/pages/Home';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function Content() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/signup',
            element: <Signup />
        }
    ]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default Content;