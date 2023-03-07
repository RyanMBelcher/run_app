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
    Spacer,
    Heading
} from '@chakra-ui/react';
import personrunning from '../images/personrunning.png'
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
        <Flex
            w={'full'}
            h={'100vh'}
            align='center'
            justify='center'
            backgroundImage={personrunning}
            backgroundSize={'cover'}
            backgroundPosition={'center'}
        >
            <VStack
                justify={'center'}
                flexDir={'column'}
            >
                <Stack
                    flexDir='column'
                    justifyContent='center'
                    alignItems='center'
                    bgGradient={'linear(to-br, blackAlpha.800, transparent)'}
                >
                    <Container display='flex' justifyContent='center' alignItems='center'>
                        <Box border='2px' borderRadius='md' borderColor='#0B515B' p='5' mt='5' display='flex' flexDirection='column'>
                            <Heading mb={4} borderBottom='1px' backgroundColor='#FDC500' color='black'>Log In</Heading>
                            <form onSubmit={handleFormSubmit}>
                                <FormControl id='email' isRequired>
                                    <FormLabel htmlFor='email' color='#FFCE1F'>Email</FormLabel>
                                    <Input
                                        type='email'
                                        placeholder='Your email address'
                                        name='email'
                                        onChange={handleInputChange}
                                        value={userFormData.email}
                                        required
                                        color='#FFF'
                                    />
                                    <Spacer h='5' />
                                    <FormLabel htmlFor='password' color='#FFCE1F'>Password</FormLabel>
                                    <Input
                                        type='password'
                                        placeholder='Your password'
                                        name='password'
                                        onChange={handleInputChange}
                                        value={userFormData.password}
                                        required
                                        color='#FFF'
                                    />
                                    <Button
                                        type='submit'
                                        backgroundColor='#FDC500'
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