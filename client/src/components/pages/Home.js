import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS, GET_GOAL_BY_USER } from '../../utils/queries';
import {
    Card,
    CardHeader,
    CardBody,
    Box,
    Flex,
    Heading,
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

    const { loading: loadingGoal, data: goalData } = useQuery(GET_GOAL_BY_USER, {
        variables: {
            username: Auth.getProfile().data.username
        }
    });
    const goal = goalData?.getGoalByUser?.[0] || {};

    return (
        <Flex
            p='15px'
        >
            <Stack w="30%" p="5px" m='5px'>
                <VStack w={'100%'}>
                    <Profile hideControls={true} />
                    <Spacer />
                    <Box w='100%'>
                        <Card maxW='100%' alignItems='center'>
                            <CardHeader>
                                <Flex spacing='4'>
                                    <Heading size='md'>Current Goal</Heading>
                                </Flex>
                            </CardHeader>
                            <CardBody>
                                <VStack>
                                    <Text>Title: {goal.goalDefinition?.title}</Text>
                                    <Text>Start Date: {goal.startDate}</Text>
                                    <Text>End Date:</Text>
                                    <Text>Status: {goal.status}</Text>
                                    <Text>Current Distance: {goal.currentDistance} miles</Text>
                                    <Text>Total Distance: {goal.goalDefinition?.distance} miles</Text>
                                    <Box p="2" h="300px" w="100%">
                                        {goal.goalDefinition && <Map goal={goal} />}
                                    </Box>
                                </VStack>
                            </CardBody>
                        </Card>
                    </Box>
                </VStack>
            </Stack>
            {loadingPosts ? (
                <div>Loading...</div>
            ) : (
                <VStack w="60%" p="5px" m='5px'>
                    <Posts posts={posts} />
                </VStack>
            )
            }
        </Flex>
    )

};