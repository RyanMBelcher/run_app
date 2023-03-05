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
    Box
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
        <Flex>
            <VStack>
                justify={'center'}
                <Stack
                    flexDir='column'
                    justifyContent='center'
                    alignItems='center'
                >
                    <Container>
                        <Box display='flex'>
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
                                    <FormLabel htmlFor='password'>Password</FormLabel>
                                    <Input
                                        type='password'
                                        placeholder='Your password'
                                        name='password'
                                        onChange={handleInputChange}
                                        value={userFormData.password}
                                        required
                                    />
                                    <Button type='submit'
                                        // as={ReactLink}
                                        // to='/'
                                        size='md'
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