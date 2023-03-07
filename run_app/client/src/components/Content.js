import React, { useContext } from 'react';
import Landing from './pages/Landing';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function Content() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Landing />,
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