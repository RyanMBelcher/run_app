import React from 'react';
import { VStack } from '@chakra-ui/react';
import Post from './Post';

export default function Posts({ posts }) {
    if (!posts.length) {
        return <h3>No Posts Yet</h3>;
    }

    return (
        <VStack>
            {posts.map((post) => (
                <Post post={post} key={post._id} />
            ))}
        </VStack >
    )
}