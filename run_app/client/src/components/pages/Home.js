import React, { useState } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { } from '../../utils/queries';
import {
    Card,
    CardHeader,
    CardBody,
    Box,
    Text,
    Flex,
    Heading,
    Avatar
} from '@chakra-ui/react';
import Auth from '../../utils/auth';

export default function Home() {

    return (
        <Card maxW='md' maxH='md'>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar />
                        <Heading size='md'>{Auth.getProfile().data.username}</Heading>
                    </Flex>
                </Flex>
            </CardHeader>
        </Card>
    )

};