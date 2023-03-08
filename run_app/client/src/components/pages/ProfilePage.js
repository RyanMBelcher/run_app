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
    Textarea
} from '@chakra-ui/react';


export default function ProfilePage() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen}>Edit Profile</Button>
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
                        <Button>
                            Save
                        </Button>
                        <Button>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}