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
            console.log(result);
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
                    bgGradient={'linear(to-br, blackAlpha.800, transparent)'}
                >
                    <Container>
                        <Box border='2px' borderRadius='md' borderColor='#0B515B' p='5' mt='5' display='flex' flexDirection='column'>
                            <Heading mb={4} borderBottom='1px' backgroundColor='#FDC500' color='Black'>Sign Up</Heading>
                            <form onSubmit={handleFormSubmit}>
                                <FormControl id='username' isRequired>
                                    <FormLabel htmlFor='username' color='#FFCE1F'>Username</FormLabel>
                                    <Input
                                        type='text'
                                        placeholder='Your Username'
                                        name='username'
                                        onChange={handleInputChange}
                                        value={userFormData.username}
                                        required
                                    />
                                    <Spacer h='5' />
                                    <FormLabel htmlFor='email' color='#FDC500'>Email</FormLabel>
                                    <Input
                                        type='email'
                                        placeholder='Your email address'
                                        name='email'
                                        onChange={handleInputChange}
                                        value={userFormData.email}
                                        required
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
                                    />
                                    <Button
                                        type='submit'
                                        backgroundColor='#FDC500'
                                        _hover={{ bg: '#FFCE1F' }}
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