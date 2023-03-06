import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import {
    Input,
    Container,
    Button,
    FormControl,
    FormLabel,
    Stack,
    VStack,
    Flex,
    Link,
    Box,
    Spacer,
    Heading
} from '@chakra-ui/react';
import manrunning from '../images/manrunning.png'

const SignupForm = () => {
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
    // const [validated] = useState(false);
    // const [showAlert, setShowAlert] = useState(false);
    const [addUser, { error }] = useMutation(ADD_USER);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(userFormData);
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        try {
            const result = await addUser({ variables: { ...userFormData } });
            Auth.login(result.data.addUser.token);
        } catch (error) {
            console.error(error);
            // setShowAlert(true);
        }

        setUserFormData({
            username: '',
            email: '',
            password: '',
        });
    };

    return (
        <Flex
            w={'full'}
            h={'100vh'}
            align='center'
            justify='center'
            backgroundImage={manrunning}
            backgroundSize={'cover'}
            backgroundPosition={'center'}
            backgroundRepeat={'no-repeat'}
        >
            <VStack
                justify={'center'}
                flexDir={'column'}
            >
                <Stack
                    flexDir='column'
                    justifyContent='center'
                    alignItems='center'
                >
                    <Container>
                        <Box border='2px' borderRadius='md' p='5' mt='5' display='flex' flexDirection='column'>
                            <Heading mb={4} borderBottom='1px' backgroundColor='black' color='white'>Sign Up</Heading>
                            <form onSubmit={handleFormSubmit}>
                                <FormControl id='username' isRequired>
                                    <FormLabel htmlFor='username'>Username</FormLabel>
                                    <Input
                                        type='text'
                                        placeholder='Your Username'
                                        name='username'
                                        onChange={handleInputChange}
                                        value={userFormData.username}
                                        required
                                    />
                                    <Spacer h='5' />
                                    <FormLabel htmlFor='email'>Email</FormLabel>
                                    <Input
                                        type='email'
                                        placeholder='Your email address'
                                        name='email'
                                        onChange={handleInputChange}
                                        value={userFormData.email}
                                        required
                                    />
                                    <Spacer h='5' />
                                    <FormLabel htmlFor='password'>Password</FormLabel>
                                    <Input
                                        type='password'
                                        placeholder='Your password'
                                        name='password'
                                        onChange={handleInputChange}
                                        value={userFormData.password}
                                        required
                                    />
                                    <Button
                                        type='submit'
                                        p={5}
                                        m={5}
                                    >
                                        Signup
                                    </Button>
                                </FormControl>
                            </form>
                        </Box>
                    </Container>
                </Stack>
            </VStack>
        </Flex>
    );
};

export default SignupForm;