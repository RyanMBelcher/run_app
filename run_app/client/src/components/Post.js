import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
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
    Textarea,
    Divider
} from '@chakra-ui/react';
import {
    CheckIcon,
    ChatIcon,
    DeleteIcon,
} from '@chakra-ui/icons';
import EditPostModal from './modals/EditPostModal';

export default function Post({ post }) {
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
        }
        catch (err) {
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
            console.warn('data', data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Card maxW='sm' p='25px' flexDirection='column' key={post._id} >
            <CardHeader>
                <Flex spacing='4'>
                    <Avatar src={post._id.profileImage} />
                    <EditPostModal post={post} showButton={Auth.getProfile().data.username === post.username} />
                    <Box>
                        <Heading size='sm' >
                            {Auth.getProfile().data.username === post.username &&
                                (<Link href='/me' _hover={{ color: '#128391' }}>{post.username}</Link>)
                            }

                            {Auth.getProfile().data.username !== post.username &&
                                (<Link href={`/profiles/${post.username}`} _hover={{ color: '#128391' }}>{post.username}</Link>)
                            }
                            <Text>
                                {post.title}
                            </Text>
                        </Heading>
                        <Text>
                            {post.createdAt}
                        </Text>
                    </Box>
                </Flex>
            </CardHeader>
            <CardBody>
                <Text>
                    {post.description}
                    <br />
                    Distance: {post.distance} miles
                </Text>
                <Image
                    src={post.image}
                    objectFit='cover'
                />
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
                    Comments {post.commentCount}
                </Button >
            </CardFooter>
            <Textarea
                placeholder='Comment'
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                mt='1'
            />
            <Button
                backgroundColor='#FDC500'
                _hover={{ bg: '#FFCE1F' }}
                size='sm'
                mt='2'
                mb='2'
                type='submit'
                onClick={(e) => handleSubmitComment(post._id, e)}
            >Submit</Button>

            {
                post.comments.map((comment) => (
                    <Card key={comment._id} mt='5' p='2'>
                        <Text>{comment.username}</Text>
                        <Text>{comment.createdAt}</Text>
                        <Text>{comment.text}</Text>
                        <Button
                            variant='link'
                            _hover={{ color: '#3BBDC6' }}
                        >
                            {Auth.getProfile().data.username === comment.username && <DeleteIcon onClick={() => { handleCommentDelete(comment._id, post._id) }} />}
                        </Button>
                    </Card>
                ))
            }
        </Card>
    )
}