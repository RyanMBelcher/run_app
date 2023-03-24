import React, { useState } from 'react';
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
    InputRightAddon
} from '@chakra-ui/react'

import { ADD_POST } from '../../utils/mutations';

export default function RunModal() {

    const { isOpen: isOpenPost, onOpen: onOpenPost, onClose: onClosePost } = useDisclosure();

    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [postDistance, setPostDistance] = useState('');
    const [currentGoal, setCurrentGoal] = useState('');
    const [postImageSelected, setPostImageSelected] = useState('');

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
            const { data } = await handleAddPost({
                variables: {
                    postInfo: {
                        title: postTitle,
                        description: postDescription,
                        distance: postDistance,
                        image: response.data.url,
                        goalId: currentGoal
                    }
                }
            });
            onClosePost();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Button onClick={onOpenPost} mb='15px' ml='20px' mr='20px' backgroundColor='#FDC500' _hover={{ bg: '#FFCE1F' }}>Add Run</Button>

            <Modal isOpen={isOpenPost} onClose={onClosePost} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a run</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Title:</FormLabel>
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
                                // onChange={(event) => { setImageSelected(event.target.files[0]) }}
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