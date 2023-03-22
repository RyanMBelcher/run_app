import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
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
import Post from '../Post';
import { GET_ME, GET_SINGLE_USER, GET_GOALS_BY_USER, GET_SINGLE_GOAL, GET_ALL_POSTS } from '../../utils/queries';
import { ADD_GOAL, ADD_POST, DELETE_GOAL, DELETE_POST, EDIT_POST, EDIT_PROFILE, ADD_FOLLOWER, REMOVE_FOLLOWER } from '../../utils/mutations';

import Map from '../Map';

export default function ProfilePage() {


    const { loading: loadingPosts, data: postsData } = useQuery(GET_ALL_POSTS);
    const posts = postsData?.getAllPosts || [];
    console.log('posts', postsData);

    const [seeGoals, setSeeGoals] = useState(true);

    const [currentGoal, setCurrentGoal] = useState(true);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { username: userParam } = useParams()
    console.log(userParam);

    const { loading, data } = useQuery(!userParam ? GET_ME : GET_SINGLE_USER, {
        variables: { username: userParam },
    });

    const profile = data?.me || data?.getSingleUser || {};

    console.log('profile', profile);
    console.log('data', data);



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
            h={'100vh'}
            backgroundColor='#edede4'
            pt='15px'
        >

            <Profile profile={profile} />
            <Post posts={posts} />

            {/* <Card ml='15px' w='500px' h='500px'>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar />
                            <Heading size='md'>{profile.username}</Heading>
                        </Flex>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <p>Recent Activity</p>
                </CardBody>
                {!userParam && <Button onClick={onOpen} mb='15px' ml='20px' mr='20px' backgroundColor='#FDC500' _hover={{ bg: '#FFCE1F' }}>Add Run</Button>}
            </Card> */}

            <Card mr='25px' w='500px' h='500px'>
                <CardHeader>
                    <Heading>Progress Map</Heading>
                </CardHeader>
                <Map />
            </Card>





            {/* add post/run modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a run</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                    </ModalBody>
                    <ModalFooter>
                        <Button
                            mr='3'
                            backgroundColor='#FDC500'
                            _hover={{ bg: '#FFCE1F' }}
                            type='submit'
                        // onClick={submitEditProfile}
                        >
                            Save
                        </Button>
                        <Button
                            backgroundColor='#FDC500'
                            _hover={{ bg: '#FFCE1F' }}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Flex >
    )
}