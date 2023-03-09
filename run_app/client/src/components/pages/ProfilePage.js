import React from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    Textarea,
    useDisclosure,
    Card,
    CardHeader,
    Avatar,
    Flex,
    Heading
} from '@chakra-ui/react';
import Auth from '../../utils/auth';

export default function ProfilePage() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex
            justifyContent='space-between'
            w={'full'}
            h={'100vh'}
            backgroundColor='#edede4'
            pt='15px'
        >
            <Card ml='15px' h='150px'>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar />
                            <Heading size='md'>{Auth.getProfile().data.username}</Heading>
                        </Flex>
                    </Flex>
                </CardHeader>
                <Button onClick={onOpen} ml='25px' mr='25px' backgroundColor='#FDC500'>Edit Profile</Button>
            </Card>
            <Card mr='15px'>
                <CardHeader>Progress Map</CardHeader>
            </Card>


            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update your profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Update Location:</FormLabel>
                            <Input />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Update Bio:</FormLabel>
                            <Textarea />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Add a profile image:</FormLabel>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            mr='3'
                            backgroundColor='#FDC500'
                            _hover={{ bg: '#FFCE1F' }}
                        >
                            Save
                        </Button>
                        <Button
                            backgroundColor='#FDC500'
                            _hover={{ bg: '#FFCE1F' }}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}