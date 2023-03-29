import React, { useState } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import Axios from 'axios';
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
    InputGroup,
    InputRightAddon,
    Spinner
} from '@chakra-ui/react'

import { ADD_POST } from '../../utils/mutations';
import { GET_GOAL_BY_USER, GET_POST_BY_USER } from '../../utils/queries';
import Auth from '../../utils/auth';

export default function RunModal() {
    const { isOpen: isOpenPost, onOpen: onOpenPost, onClose: onClosePost } = useDisclosure();

    const { loading: loadingGoal, data: goalData } = useQuery(GET_GOAL_BY_USER, {
        variables: {
            username: Auth.getProfile().data.username
        }
    });
    const goal = goalData?.getGoalByUser?.[0] || {};

    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [postDistance, setPostDistance] = useState('');
    const [postImageSelected, setPostImageSelected] = useState('');

    const [addPost, { error: errorAddPost }] = useMutation(ADD_POST);

    const handleAddPost = async (e) => {
        e.preventDefault();

        let response;

        if (postImageSelected) {
            const formData = new FormData();
            formData.append('file', postImageSelected)
            formData.append('upload_preset', 'f3hwhsoq')

            response = await Axios.post('https://api.cloudinary.com/v1_1/di32zxbej/image/upload', formData);
        }

        try {
            const { data } = await addPost({
                variables: {
                    postInfo: {
                        title: postTitle,
                        description: postDescription,
                        distance: parseInt(postDistance),
                        image: response?.data?.url,
                        goalId: goal._id
                    }
                }
            });
            onClosePost();
        } catch (err) {
            console.log(err);
        }
    }

    return loadingGoal ? <Spinner /> : (
        <>
            <Button onClick={onOpenPost} mb='15px' ml='20px' mr='20px' backgroundColor='#FDC500' _hover={{ bg: '#FFCE1F' }}>Add Run</Button>

            <Modal isOpen={isOpenPost} onClose={onClosePost} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a run</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Title: </FormLabel>
                            <Input
                                name='title'
                                onChange={(e) => setPostTitle(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description:</FormLabel>
                            <Textarea
                                name='description'
                                onChange={(e) => setPostDescription(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Distance: </FormLabel>
                            <InputGroup>
                                <Input
                                    name='distance'
                                    onChange={(e) => setPostDistance(e.target.value)}
                                />
                                <InputRightAddon children='miles' />
                            </InputGroup>
                            <FormControl>
                                <FormLabel>Add an image:</FormLabel>
                                <Input
                                    type="file"
                                    name="img"
                                    onChange={(e) => { setPostImageSelected(e.target.files[0]) }}
                                />
                            </FormControl>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            mr='3'
                            backgroundColor='#FDC500'
                            _hover={{ bg: '#FFCE1F' }}
                            type='submit'
                            onClick={handleAddPost}
                        >
                            Save
                        </Button>
                        <Button
                            backgroundColor='#FDC500'
                            _hover={{ bg: '#FFCE1F' }}
                            onClick={onClosePost}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}