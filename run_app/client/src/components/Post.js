import React, { useState } from 'react';
import Map from './Map';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { ADD_COMMENT, DELETE_COMMENT, TOGGLE_LIKE_POST } from '../utils/mutations';
import Auth from '../utils/auth';

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Box,
    Flex,
    Heading,
    Avatar,
    Text,
    Image,
    Button,
    Link,
    VStack,
    Stack
} from '@chakra-ui/react';
import {
    CheckIcon,
    ChatIcon
} from '@chakra-ui/icons';
// import Pennsylvania from '../images/Pennsylvania.png';

export default function Post({ posts }) {
    const [commentText, setCommentText] = useState('');
    const [addComment, { error: errorAddComment }] = useMutation(ADD_COMMENT);
    const [deleteComment, { error: errorDelComment }] = useMutation(DELETE_COMMENT);
    const [toggleLikePost, _] = useMutation(TOGGLE_LIKE_POST);

    const handleSubmitComment = async (postId, e) => {
        e.preventDefault();

        try {
            const { data } = await addComment({
                variables: {
                    text: commentText,
                    postId
                }
            });
            setCommentText('');
        } catch (err) {
            console.log(err);
        }
    };

    const handleCommentDelete = async (commentId, postId) => {

        try {
            const { data } = await deleteComment({
                variables: {
                    commentId,
                    postId
                }
            });
            setCommentText('');
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const handleLikePost = async (postId, e) => {
        e.preventDefault();

        try {
            const { data } = await toggleLikePost({
                variables: {
                    postId
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    if (!posts.length) {
        return <h3>No Posts Yet</h3>;
    }

    return (
        <VStack>
            {posts.map((post) => (
                <Card w='500px' h='550px' alignItems='center' p='20px' flexDirection='column' key={post._id}>
                    <CardHeader>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar />

                            <Box>
                                <Heading size='sm'>
                                    {Auth.getProfile().data.username === post.username &&
                                        (<Link href='/me'>{post.username}</Link>)
                                    }

                                    {Auth.getProfile().data.username !== post.username &&
                                        (<Link href={`/profiles/${post.username}`}>{post.username}</Link>)
                                    }

                                    <p>{post.createdAt}</p>
                                </Heading>
                                <Text>
                                    {post.title}
                                </Text>
                            </Box>
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Text>
                            {post.description}
                            <br />
                            Distance: {post.distance}
                        </Text>
                    </CardBody>

                    <CardFooter
                        justify='space-between'
                        flexWrap='wrap'
                        sx={{
                            '& > button': {
                                minW: '136px',
                            },
                        }}
                    >
                        {post.likes.find(user => user._id === Auth.getProfile().data._id) ?
                            (<Button flex='1' color='#3BBDC6' variant='ghost' leftIcon={<CheckIcon />} onClick={(event) => handleLikePost(post._id, event)}>
                                Likes {post.likesCount}
                            </Button>) :
                            (<Button flex='1' variant='ghost' leftIcon={<CheckIcon />} onClick={(event) => handleLikePost(post._id, event)}>
                                Likes {post.likesCount}
                            </Button>)
                        }
                        <Button flex='1' variant='ghost' leftIcon={<ChatIcon />}>
                            Comments
                        </Button >
                    </CardFooter>
                </Card>
            ))}
        </VStack>
    )
}