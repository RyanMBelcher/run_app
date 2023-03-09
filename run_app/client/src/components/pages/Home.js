import React, { useState } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { } from '../../utils/queries';
import {
    Card,
    CardHeader,
    CardBody,
    Box,
    Flex,
    Heading,
    Avatar,
    Text,
    Stack,
    VStack,
    Spacer
} from '@chakra-ui/react';
import Post from '../Post';
import Auth from '../../utils/auth';

export default function Home() {

    return (
        <Flex
            justifyContent='space-evenly'
            w={'full'}
            h={'100vh'}
            backgroundColor='#edede4'
            pt='15px'
        >
            <Stack>
                <VStack>
                    <Card w='250px' h='250px'>
                        <CardHeader>
                            <Flex spacing='4'>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Avatar />
                                    <a href='/me'>
                                        <Heading size='md'>{Auth.getProfile().data.username}</Heading>
                                    </a>
                                </Flex>
                            </Flex>
                        </CardHeader>
                        <CardBody>
                            <Flex spacing='4'>
                                <Flex flex='1' gap='4' flexWrap='wrap' flexDirection='column' alignContent='flex-start'>
                                    <Text>Followers: </Text>
                                    <Text>Following: </Text>
                                </Flex>
                            </Flex>
                        </CardBody>
                    </Card>
                    <Spacer />
                    <Card w='250px' h='500px' alignItems='center'>
                        <CardHeader>
                            <Flex spacing='4'>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Heading size='md'>Current Goal</Heading>
                                </Flex>
                            </Flex>
                        </CardHeader>
                    </Card>
                </VStack>
            </Stack>
            <Post />
            <Card w='250px' h='750px' alignItems='center'>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Heading size='md'>Recent Activity</Heading>
                        </Flex>
                    </Flex>
                </CardHeader>
            </Card>
        </Flex>
    )

};