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
    ButtonGroup
} from '@chakra-ui/react'
// import Home from './pages/Home';
// import Login from './Login';
// import Signup from './Signup';

export default function Header() {
    return (
        <Flex minWidth='max-content' alignItems='center' gap='2' backgroundColor='#FDC500'>
            <Box p='2'>
                <Heading size='md'><a href='/'>Run App</a></Heading>
            </Box>
            <Spacer />
            <ButtonGroup gap='2' mr='3'>
                <a href='/signup'>Sign Up</a>
                <a href='/login'>Log in</a>
            </ButtonGroup>
        </Flex>
    );
};

