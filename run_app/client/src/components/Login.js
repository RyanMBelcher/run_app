import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
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
    Spacer
} from '@chakra-ui/react';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    // const [validated] = useState(false);
    // const [showAlert, setShowAlert] = useState(false);

    const [login, { error }] = useMutation(LOGIN_USER);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation();
        }

        try {
            const result = await login({ variables: { ...userFormData } });
            Auth.login(result.data.login.token);
        } catch (error) {
            console.error(error);
            // setShowAlert(true);
        }

        setUserFormData({
            email: '',
            password: '',
        });
    }

    return (
        <Flex align='center' justify='center'>
            <VStack
                justify={'center'}
                flexDir={'column'}
            >
                <Stack
                    flexDir='column'
                    justifyContent='center'
                    alignItems='center'
                >
                    <Container display='flex' justifyContent='center' alignItems='center'>
                        <Box border='2px' borderRadius='md' p='5' mt='5' display='flex'>
                            <form onSubmit={handleFormSubmit}>
                                <FormControl id='email' isRequired>
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
                                        // as={ReactLink}
                                        // to='/'
                                        p={5}
                                        m={5}
                                    >
                                        Login
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

export default LoginForm;