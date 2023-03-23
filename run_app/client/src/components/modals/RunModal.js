import React, { useState } from 'react';
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

export default function RunModal() {

    const { isOpen: isOpenPost, onOpen: onOpenPost, onClose: onClosePost } = useDisclosure();

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
                                value=''
                            // onChange={ }
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description:</FormLabel>
                            <Textarea

                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Distance: </FormLabel>
                            <InputGroup>
                                <Input
                                    name='distance'
                                    value=''
                                // onChange={}
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
                        // onClick={submitEditProfile}
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