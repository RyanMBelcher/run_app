import React from 'react';
import '../../index.css'
import {
    Image,
    Box,
    Flex,
    Heading,
    Container
} from '@chakra-ui/react'
import man_running_on_bridge from '../../images/man_running_on_bridge.png';

export default function Landing() {
    return (
        <Flex
            w='full'
            h='100vh'
            flexDir='column'
        >
            <Heading m='15px'>Welcome to the App!</Heading>
            <Container display='flex' flexDir='row'>
                <Box>
                    Run App is cool. You can do fun things with it.
                </Box>
                <Box>
                    <Image
                        src={man_running_on_bridge}
                        alt='man running across a bridge'
                        boxSize='lg'
                        borderRadius='md'
                    >
                    </Image>
                </Box>
            </Container>
        </Flex>
    )
}