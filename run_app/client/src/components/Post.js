import React from 'react';

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
} from '@chakra-ui/react';
import {
    CheckIcon,
    ChatIcon
} from '@chakra-ui/icons';

export default function Post() {


    return (
        <Card maxW='md'>
            <CardHeader>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Avatar />

                    <Box>
                        <Heading size='sm'>runner_boi</Heading>
                        <Text>Philadelphia, PA</Text>
                    </Box>
                </Flex>
            </CardHeader>
            <CardBody>
                <Text>
                    I am running across the state of Pennsylvania!!!
                </Text>
            </CardBody>
            <Image
                objectFit='cover'
                src='https://gisgeography.com/pennsylvania-map/'
                alt='map of Pennsylvania'
            />

            <CardFooter
                justify='space-between'
                flexWrap='wrap'
                sx={{
                    '& > button': {
                        minW: '136px',
                    },
                }}
            >
                <Button flex='1' variant='ghost' leftIcon={<CheckIcon />}>
                    Like
                </Button>
                <Button flex='1' variant='ghost' leftIcon={<ChatIcon />}>
                    Comment
                </Button >
            </CardFooter>
        </Card>
    )
}