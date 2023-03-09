import React, { useContext } from 'react';
import Landing from './pages/Landing';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
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
        },
        {
            path: '/home',
            element: <Home />
        },
        {
            path: '/me',
            element: <ProfilePage />
        }
    ]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default Content;