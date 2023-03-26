import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { GET_ALL_POSTS, GET_GOAL_BY_USER, GET_SINGLE_GOAL } from '../../utils/queries';
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
import Posts from '../Posts';
import Auth from '../../utils/auth';
import Profile from '../Profile';
import Map from '../Map';

export default function Home() {
    const { loading: loadingPosts, data: postsData } = useQuery(GET_ALL_POSTS);
    const posts = postsData?.getAllPosts || [];

    const { loading: loadingGoal, data: goalData } = useQuery(GET_GOAL_BY_USER);
    const goal = goalData?.getGoalByUser?.[0] || {};
    console.log('goalData', goalData);
    console.log('goal', goal);

    return (
        <Flex
            justifyContent='space-around'
            w={'full'}
            h={'100vh'}
            backgroundColor='#edede1'
            pt='15px'
        >
            <Stack>
                <VStack>
                    <Profile hideControls={true} />
                    <Spacer />
                    <Card size='md' alignItems='center'>
                        <CardHeader>
                            <Flex spacing='4'>
                                <Heading size='md'>Current Goal</Heading>
                            </Flex>
                        </CardHeader>
                        <CardBody>
                            <Flex spacing='4'>
                                <Flex flex='1' gap='4' flexWrap='wrap' flexDirection='column' alignItems='flex-start'>
                                    <Text>Title: {goal.goalDefinition?.title}</Text>
                                    <Text>Start Date: {goal.startDate}</Text>
                                    <Text>End Date:</Text>
                                    <Text>Status: {goal.status}</Text>
                                    <Text>Current Distance: {goal.currentDistance} miles</Text>
                                    <Text>Total Distance: {goal.goalDefinition?.distance} miles</Text>
                                    <Box p="2" h="300px" w="100%">
                                        {goal.goalDefinition && <Map goal={goal} />}
                                    </Box>
                                </Flex>
                            </Flex>

                        </CardBody>
                    </Card>
                </VStack>
            </Stack>
            {loadingPosts ? (
                <div>Loading...</div>
            ) : (
                <Posts posts={posts} />
            )
            }
        </Flex>
    )

};