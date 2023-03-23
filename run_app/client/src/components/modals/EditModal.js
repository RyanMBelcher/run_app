import React, { useState } from 'react';
import Axios from 'axios';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    ModalFooter,
    Button,
    useDisclosure,
} from '@chakra-ui/react'
import { EDIT_PROFILE } from '../../utils/mutations';
import { GET_ME, GET_SINGLE_USER } from '../../utils/queries';

export default function EditModal() {

    const { isOpen: isOpenProfile, onOpen: onOpenProfile, onClose: onCloseProfile } = useDisclosure();

    const { username: userParam } = useParams()
    const { loading, data } = useQuery(!userParam ? GET_ME : GET_SINGLE_USER, {
        variables: { username: userParam },
    });
    const profile = data?.me || data?.getSingleUser || {};

    const [imageSelected, setImageSelected] = useState('');
    const [formProfile, setFormProfile] = useState({ bio: '', location: '', profileImage: '' });

    const [editProfile, { error: errorEditProfile }] = useMutation(EDIT_PROFILE);

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
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Button onClick={onOpenProfile} mb='15px' ml='20px' mr='20px' backgroundColor='#FDC500' _hover={{ bg: '#FFCE1F' }}>Edit Profile</Button>
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
        </>
    )
}