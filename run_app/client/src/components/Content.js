import React, { useContext } from 'react';
import Landing from './pages/Landing';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Container } from '@chakra-ui/react'

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
        },
        {
            path: '/profiles/:username',
            element: <ProfilePage />
        }
    ]);

    return (
        <Container maxW='1160px'>
            <RouterProvider router={router} />
        </Container>
    );
}

export default Content;