import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
// import { useParams } from 'react-router-dom';
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
// import { GET_ME, GET_SINGLE_USER } from '../../utils/queries';

export default function EditPostModal({ post }) {
    console.log('post', post)

    const { isOpen: isOpenEditPost, onOpen: onOpenEditPost, onClose: onCloseEditPost } = useDisclosure();

    // const { username: userParam } = useParams()
    // const { loading, data } = useQuery(!userParam ? GET_ME : GET_SINGLE_USER, {
    //     variables: { username: userParam },
    // });
    // const profile = data?.me || data?.getSingleUser || {};

    const [formPost, setFormPost] = useState({ title: post.title, description: post.description, distance: post.distance });

    const [editPost, _] = useMutation(EDIT_POST);

    const handlePostChange = (e) => {
        const { name, value } = e.target;

        setFormPost({
            ...formPost,
            [name]: value,
        })
    };

    const submitEditPost = async (postId) => {
        console.log({
            postId,
            title: formPost.title,
            description: formPost.description,
            distance: formPost.distance
        })
        try {
            const { data } = await editPost({
                variables: {
                    postId,
                    title: formPost.title,
                    description: formPost.description,
                    distance: formPost.distance
                }
            })
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {/* <Button onClick={onOpenEditPost} mb='15px' ml='20px' mr='20px' backgroundColor='#FDC500' _hover={{ bg: '#FFCE1F' }}>Add Run</Button> */}
            <EditIcon onClick={onOpenEditPost} _hover={{ color: '#3BBDC6' }} />
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
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            mr='3'
                            backgroundColor='#FDC500'
                            _hover={{ bg: '#FFCE1F' }}
                            type='submit'
                            onClick={() => submitEditPost(post._id)}
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