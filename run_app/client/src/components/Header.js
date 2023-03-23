import React, { useState } from 'react';
import {
    Box,
    Flex,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    Stack,
    HStack,
    Spacer,
    Heading,
    Button,
    ButtonGroup,
    Link
} from '@chakra-ui/react'
import Auth from '../utils/auth';
// import Home from './pages/Home';
// import Login from './Login';
// import Signup from './Signup';

export default function Header() {
    return (
        <Flex minWidth='max-content' alignItems='center' gap='2' backgroundColor='#FDC500'>
            <Box p='2'>
                <Heading size='md'><Link href='/' _hover={{ color: '#128391' }}>Run App</Link></Heading>
            </Box>
            <Spacer />
            <ButtonGroup gap='2' mr='3'>
                {Auth.loggedIn() ? (
                    <>
                        <Link href='/home' _hover={{ color: '#128391' }}>
                            Home
                        </Link>
                        <Link href='/me' _hover={{ color: '#128391' }}>
                            My Profile
                        </Link>
                        <Link href='/' onClick={Auth.logout} _hover={{ color: '#128391' }}>
                            Log Out
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href='/signup' _hover={{ color: '#128391' }}>Sign Up</Link>
                        <Link href='/login' _hover={{ color: '#128391' }}>Log in</Link>
                    </>
                )}
            </ButtonGroup>
        </Flex>
    );
};

