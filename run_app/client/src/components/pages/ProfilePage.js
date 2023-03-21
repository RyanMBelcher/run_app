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
    Heading
} from '@chakra-ui/react';

import Auth from '../../utils/auth';
import { GET_ME, GET_SINGLE_USER } from '../../utils/queries';
import { EDIT_PROFILE } from '../../utils/mutations';

import Map from '../Map';

export default function ProfilePage() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { username: userParam } = useParams
    const { loading, data } = useQuery(!userParam ? GET_ME : GET_SINGLE_USER, {
        variables: { username: userParam },
    });
    const profile = data?.me || data?.getSingleUser || {};

    const [editProfile, { error: errorEditProfile }] = useMutation(EDIT_PROFILE);

    const [imageSelected, setImageSelected] = useState('');
    const [formProfile, setFormProfile] = useState({ bio: '', location: '', profileImage: '' });

    const [showProfileModal, setShowProfileModal] = useState('');

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
        <Flex
            justifyContent='space-between'
            w={'full'}
            h={'100vh'}
            backgroundColor='#edede4'
            pt='15px'
        >
            <Card w='250px' h='250px' ml='25px'>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar />{profile.profileImage}
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
                            <Text>Location: {profile.location} </Text>
                            <Text>Bio: {profile.bio} </Text>
                        </Flex>
                    </Flex>
                </CardBody>
                {!userParam && <Button onClick={onOpen} mb='15px' ml='20px' mr='20px' backgroundColor='#FDC500' _hover={{ bg: '#FFCE1F' }}>Edit Profile</Button>}
                {!userParam && <Button onClick={onOpen} mb='15px' ml='20px' mr='20px' backgroundColor='#FDC500' _hover={{ bg: '#FFCE1F' }}>Add Goal</Button>}
            </Card>
            <Card ml='15px' w='500px' h='500px'>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar />
                            <Heading size='md'>{Auth.getProfile().data.username}</Heading>
                        </Flex>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <p>Recent Activity</p>
                </CardBody>
                {!userParam && <Button onClick={onOpen} mb='15px' ml='20px' mr='20px' backgroundColor='#FDC500' _hover={{ bg: '#FFCE1F' }}>Add Run</Button>}
            </Card>
            <Card mr='25px' w='500px' h='500px'>
                <CardHeader>
                    <Heading>Progress Map</Heading>
                </CardHeader>
                <Map />
            </Card>

            {/* edit profile modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
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
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* add goal modal */}
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
                            onClick={submitEditProfile}
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

            {/* add post/run modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a goal</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

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