import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_GOAL_DEFINITIONS } from '../../utils/queries';
import { ADD_GOAL } from '../../utils/mutations';
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
    InputRightAddon,
    Text
} from '@chakra-ui/react'

export default function GoalModal() {
    const { loading: loadingGoalDefinition, data: goalDefinitionData } = useQuery(GET_ALL_GOAL_DEFINITIONS);
    const goalDefinitions = goalDefinitionData?.getAllGoalDefinitions || [];
    console.log(goalDefinitions);

    const { isOpen: isOpenGoal, onOpen: onOpenGoal, onClose: onCloseGoal } = useDisclosure();

    const [addGoal, { error: errorAddGoal }] = useMutation(ADD_GOAL);

    const handleAddGoal = async (e, goalDefinitionId) => {
        e.preventDefault();

        try {
            const { data } = await addGoal({
                variables: {
                    goalDefinitionId
                }
            })
            onCloseGoal();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <Button onClick={onOpenGoal} mb='15px' ml='20px' mr='20px' backgroundColor='#FDC500' _hover={{ bg: '#FFCE1F' }}>Add Goal</Button>
            <Modal isOpen={isOpenGoal} onClose={onCloseGoal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a Goal</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            goalDefinitions.map((goalDefinition) => (
                                <div key={goalDefinition._id}>
                                    <Text>Goal: {goalDefinition.title}</Text>
                                    <Text>Total Distance: {goalDefinition.distance}</Text>
                                    <Button
                                        mr='3'
                                        backgroundColor='#FDC500'
                                        _hover={{ bg: '#FFCE1F' }}
                                        type='submit'
                                        onClick={(e) => handleAddGoal(e, goalDefinition._id)}
                                    >
                                        Save
                                    </Button>
                                </div>
                            ))

                        }
                    </ModalBody>
                    <ModalFooter>
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