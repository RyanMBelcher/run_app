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

export default function GoalModal() {

    const { isOpen: isOpenGoal, onOpen: onOpenGoal, onClose: onCloseGoal } = useDisclosure();

    return (
        <>
            <Button onClick={onOpenGoal} mb='15px' ml='20px' mr='20px' backgroundColor='#FDC500' _hover={{ bg: '#FFCE1F' }}>Add Goal</Button>
            <Modal isOpen={isOpenGoal} onClose={onCloseGoal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a Goal</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                    </ModalBody>
                    <ModalFooter>
                        <Button
                            mr='3'
                            backgroundColor='#FDC500'
                            _hover={{ bg: '#FFCE1F' }}
                            type='submit'
                        // onClick={ }
                        >
                            Save
                        </Button>
                        <Button
                            backgroundColor='#FDC500'
                            _hover={{ bg: '#FFCE1F' }}
                            onClick={onCloseGoal}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}