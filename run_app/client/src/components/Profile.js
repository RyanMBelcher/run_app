import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import {
    Card,
    CardHeader,
    Flex,
    Avatar,
    Heading,
    Button,
    CardBody,
    Text,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Textarea,
    InputRightAddon,
    Link
} from '@chakra-ui/react'
import {
    AddIcon
} from '@chakra-ui/icons';
import RunModal from './modals/RunModal';
import EditProfileModal from './modals/EditProfileModal';
import GoalModal from './modals/GoalModal';

import { ADD_FOLLOWER } from '../utils/mutations';
import { GET_ME, GET_SINGLE_USER } from '../utils/queries';

export default function Profile({ hideControls }) {

    const { username: userParam } = useParams()
    const { loading, data } = useQuery(!userParam ? GET_ME : GET_SINGLE_USER, {
        variables: { username: userParam },
    });
    const profile = data?.me || data?.getSingleUser || {};

    const [addFollower, { error: errorAddFollower }] = useMutation(ADD_FOLLOWER);

    const followUser = async () => {
        const { data } = await addFollower({
            variables: {
                followUsername: userParam
            }
        });
    };

    return (
        <>
            <Card w='250px' h='500px' ml='25px'>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar src={profile.profileImage} />
                            <Link href='/me' _hover={{ color: '#128391' }}>
                                <Heading size='md'>{profile.username} </Heading>
                                {userParam &&
                                    (
                                        <Button
                                            flex='1'
                                            variant='ghost'
                                            leftIcon={<AddIcon />}
                                            backgroundColor='#FDC500'
                                            _hover={{ bg: '#FFCE1F' }}
                                            onClick={followUser}
                                        >
                                            Follow
                                        </Button >
                                    )
                                }
                            </Link>
                        </Flex>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' flexWrap='wrap' flexDirection='column' alignContent='flex-start'>
                            <Text>Followers: {profile.followerCount} </Text>
                            <Text>Following: {profile.followingCount}</Text>
                            <Text>Goals: {profile.goalCount}</Text>
                            <Text>Location: {profile.location} </Text>
                            <Text>Bio: {profile.bio} </Text>
                        </Flex>
                    </Flex>
                </CardBody>
                {!userParam && !hideControls && <GoalModal />}
                {!userParam && !hideControls && <EditProfileModal />}
                {!userParam && !hideControls && <RunModal />}
            </Card>
        </>
    )
}