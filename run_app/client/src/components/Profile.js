import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
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
    Textarea
} from '@chakra-ui/react'
import {
    AddIcon
} from '@chakra-ui/icons';

import { ADD_FOLLOWER, EDIT_PROFILE } from '../utils/mutations';
import { GET_ME, GET_SINGLE_USER } from '../utils/queries';


export default function Profile({ profile }) {

    const { username: userParam } = useParams()
    const { loading, data } = useQuery(!userParam ? GET_ME : GET_SINGLE_USER, {
        variables: { username: userParam },
    });

    const { isOpen: isOpenProfile, onOpen: onOpenProfile, onClose: onCloseProfile } = useDisclosure();
    const { isOpen: isOpenGoal, onOpen: onOpenGoal, onClose: onCloseGoal } = useDisclosure();

    const [imageSelected, setImageSelected] = useState('');
    const [formProfile, setFormProfile] = useState({ bio: '', location: '', profileImage: '' });
    const [showProfileModal, setShowProfileModal] = useState('');

    const [addFollower, { error: errorAddFollower }] = useMutation(ADD_FOLLOWER);
    const [editProfile, { error: errorEditProfile }] = useMutation(EDIT_PROFILE);

    const followUser = async () => {
        const { data } = await addFollower({
            variables: {
                followUsername: userParam
            }
        });
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;

        setFormProfile({
            ...formProfile,
            [name]: value,
        });
    };

    const submitEditProfile = async (e) => {
        e.preventDefault();

        let response;
        if (imageSelected) {
            const formData = new FormData();
            formData.append('file', imageSelected);
            formData.append('upload_preset', 'di32zxbej');

            response = await Axios.post('https://api.cloudinary.com/v1_1/di32zxbej/image/upload', formData);
            console.log(response);
            setFormProfile({
                ...formProfile,
                profileImage: response.data.url,
            });
        }

        try {
            const { data } = await editProfile({
                variables: {
                    bio: formProfile.bio || profile.bio,
                    location: formProfile.location || profile.location,
                    profileImage: response?.data.url || profile.profileImage
                }
            });
            console.log(data);
            setShowProfileModal(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Card w='250px' h='500px' ml='25px'>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar />{profile.profileImage}
                            <a href='/me'>
                                <Heading size='md'>{profile.username}</Heading>
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
                            </a>
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
                {!userParam && <Button onClick={onOpenProfile} mb='15px' ml='20px' mr='20px' backgroundColor='#FDC500' _hover={{ bg: '#FFCE1F' }}>Edit Profile</Button>}
                {!userParam && <Button onClick={onOpenGoal} mb='15px' ml='20px' mr='20px' backgroundColor='#FDC500' _hover={{ bg: '#FFCE1F' }}>Add Goal</Button>}
            </Card>

            {/* Edit profile modal */}
            <Modal isOpen={isOpenProfile} onClose={onCloseProfile}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update your profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Update Location:</FormLabel>
                            <Input
                                name='location'
                                value={formProfile.location}
                                onChange={handleProfileChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Update Bio:</FormLabel>
                            <Textarea
                                name='bio'
                                value={formProfile.bio}
                                onChange={handleProfileChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Add a profile image:</FormLabel>
                            <Input
                                type="file"
                                name="profileImg"
                                onChange={(event) => { setImageSelected(event.target.files[0]) }}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            mr='3'
                            backgroundColor='#FDC500'
                            _hover={{ bg: '#FFCE1F' }}
                            type='submit'
                            onClick={submitEditProfile}
                        >
                            Save
                        </Button>
                        <Button
                            backgroundColor='#FDC500'
                            _hover={{ bg: '#FFCE1F' }}
                            onClick={onCloseProfile}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* add goal modal */}
            <Modal isOpen={isOpenGoal} onClose={onCloseGoal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a Goal</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                    </ModalBody>
                    <ModalFooter>
                        <Button
                            mr='3'
                            backgroundColor='#FDC500'
                            _hover={{ bg: '#FFCE1F' }}
                            type='submit'
                        // onClick={ }
                        >
                            Save
                        </Button>
                        <Button
                            backgroundColor='#FDC500'
                            _hover={{ bg: '#FFCE1F' }}
                            onClick={onCloseGoal}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}