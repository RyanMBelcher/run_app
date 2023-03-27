import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import {
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    Textarea,
    useDisclosure,
    Card,
    CardHeader,
    CardBody,
    Text,
    Avatar,
    Flex,
    Heading,
    Stack,
    VStack
} from '@chakra-ui/react';
import {
    AddIcon
} from '@chakra-ui/icons';
import Auth from '../../utils/auth';
import Profile from '../Profile';
import Posts from '../Posts';
import { GET_ME, GET_SINGLE_USER, GET_GOAL_BY_USER, GET_SINGLE_GOAL, GET_ALL_POSTS, GET_POST_BY_USER } from '../../utils/queries';
import { ADD_GOAL, ADD_POST, DELETE_GOAL, DELETE_POST, EDIT_POST, EDIT_PROFILE, ADD_FOLLOWER, REMOVE_FOLLOWER } from '../../utils/mutations';
import Map from '../Map';

export default function ProfilePage() {

    const { username: userParam } = useParams();
    const authUsername = Auth.getProfile()?.data.username;
    const username = userParam || authUsername;

    const { loading: loadingPosts, data: postsData } = useQuery(GET_POST_BY_USER, {
        variables: { username }
    });
    const { loading, data } = useQuery(GET_SINGLE_USER, {
        variables: { username }
    });
    const { loading: loadingGoal, data: goalData } = useQuery(GET_GOAL_BY_USER, {
        variables: { username }
    })

    const posts = postsData?.getPostByUser || [];
    const profile = data?.me || data?.getSingleUser || {};
    const goal = goalData?.getGoalByUser[0] || {};

    return (
        <Flex
            pt='15px'
        >
            <Stack w='30%' p='5px'>
                <VStack w='100%'>
                    <Profile profile={profile} />
                </VStack>
            </Stack>
            <Stack w='40%' p='5px'>
                <VStack w='100%'>
                    <Posts posts={posts} />
                </VStack>
            </Stack>
            <Stack w='30%' p='5px'>
                <VStack w='100%'>
                    <Card>
                        <CardHeader>
                            <Heading>Progress Map</Heading>
                        </CardHeader>
                        <Box p="2" h="300px" w="100%">
                            {goal.goalDefinition && <Map goal={goal} />}
                        </Box>
                    </Card>
                </VStack>
            </Stack>
        </Flex >
    )
}