import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import {
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
} from '@chakra-ui/react';
import {
    AddIcon
} from '@chakra-ui/icons';

import Auth from '../../utils/auth';
import Profile from '../Profile';
import Posts from '../Posts';
import { GET_ME, GET_SINGLE_USER, GET_GOALS_BY_USER, GET_SINGLE_GOAL, GET_ALL_POSTS, GET_POST_BY_USER } from '../../utils/queries';
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
        variables: { username },
    });
    console.log('getMeData', data);
    console.log('getPostsData', postsData);
    const posts = postsData?.getPostByUser || [];

    const [seeGoals, setSeeGoals] = useState(true);

    const [currentGoal, setCurrentGoal] = useState(true);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const profile = data?.me || data?.getSingleUser || {};

    console.log('profile', profile);
    console.log('data', data);
    console.log(' Auth.getProfile()?.data.username', Auth.getProfile())


    const [showProfileModal, setShowProfileModal] = useState('');

    // const [addGoal, { error: errorAddTrip }] = useMutation(ADD_GOAL);
    const [addPost, { error: errorAddPost }] = useMutation(ADD_POST);
    // const [deleteGoal, { error: errorDeleteGoal }] = useMutation(DELETE_GOAL);
    const [deletePost, { error: errorDeletePost }] = useMutation(DELETE_POST);


    const [removeFollower, { error: errorRemoveFollower }] = useMutation(REMOVE_FOLLOWER);
    const [editPost, _] = useMutation(EDIT_POST);





    return (
        <Flex
            justifyContent='space-between'
            w={'full'}
            h={'full'}
            backgroundColor='#dee2e6'
            pt='15px'
        >

            <Profile profile={profile} />
            <Posts posts={posts} />

            {/* <Card mr='25px' w='500px' h='500px'>
                <CardHeader>
                    <Heading>Progress Map</Heading>
                </CardHeader>
                <Map />
            </Card> */}







        </Flex >
    )
}