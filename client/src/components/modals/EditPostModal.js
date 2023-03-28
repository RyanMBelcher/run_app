import React, { useState } from 'react';
import Axios from 'axios';
import { useMutation } from '@apollo/client';
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
import {
    EditIcon
} from '@chakra-ui/icons'
import { EDIT_POST } from '../../utils/mutations';

export default function EditPostModal({ post, showButton }) {
    const [imageSelected, setImageSelected] = useState('');
    const [formProfile, setFormProfile] = useState({ bio: '', profileImage: '' });

    const { isOpen: isOpenEditPost, onOpen: onOpenEditPost, onClose: onCloseEditPost } = useDisclosure();

    const [formPost, setFormPost] = useState({ title: post.title, description: post.description, distance: post.distance, postImage: post.image });

    const [editPost, _] = useMutation(EDIT_POST);

    const handlePostChange = (e) => {
        const { name, value } = e.target;

        setFormPost({
            ...formPost,
            [name]: value,
        })
    };

    const submitEditPost = async (postId, postImage, e) => {
        e.preventDefault();

        let response;

        if (imageSelected) {
            const formData = new FormData();
            formData.append('file', imageSelected)
            formData.append('upload_preset', 'f3hwhsoq')

            response = await Axios.post('https://api.cloudinary.com/v1_1/di32zxbej/image/upload', formData);

            setImageSelected('');
        }
        try {
            const { data } = await editPost({
                variables: {
                    postId,
                    title: formPost.title,
                    description: formPost.description,
                    distance: formPost.distance,
                    postImage: response?.data.url || postImage
                }
            });
            onCloseEditPost();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {showButton && <Button
                variant='link'
                onClick={onOpenEditPost}
                _hover={{ color: '#3BBDC6' }}
            >
                <EditIcon />
            </Button>}
            <Modal isOpen={isOpenEditPost} onClose={onCloseEditPost} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit a run</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Title:</FormLabel>
                            <Input
                                name='title'
                                value={formPost.title}
                                onChange={handlePostChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description:</FormLabel>
                            <Textarea
                                name='description'
                                value={formPost.description}
                                onChange={handlePostChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Distance:</FormLabel>
                            <InputGroup>
                                <Input
                                    name='distance'
                                    value={formPost.distance}
                                    onChange={handlePostChange}
                                />
                                <InputRightAddon children='miles' />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Add an image:</FormLabel>
                            <Input
                                type="file"
                                name="img"
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
                            onClick={(event) => submitEditPost(post._id, post.image, event)}
                        >
                            Update Post
                        </Button>
                        <Button
                            backgroundColor='#FDC500'
                            _hover={{ bg: '#FFCE1F' }}
                            onClick={onCloseEditPost}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}