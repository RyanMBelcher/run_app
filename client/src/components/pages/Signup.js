import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';
import {
    Input,
    Button,
    FormControl,
    FormLabel,
    Flex,
    Box,
    Spacer,
    Heading,
    InputGroup,
    InputRightElement
} from '@chakra-ui/react';
import manrunning from '../../images/manrunning.png'

const SignupForm = () => {
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);

    const [show, setShow] = React.useState(false)

    const handleClick = () => setShow(!show)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

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
            w='full'
            h='100vh'
            align='center'
            justify='center'
            backgroundImage={manrunning}
            backgroundSize='cover'
            backgroundPosition={'center'}
            backgroundRepeat={'no-repeat'}
        >
            <Box
                bgGradient={'linear(to-br, blackAlpha.900, transparent)'}
                border='2px' borderRadius='md' borderColor='#3BBDC6' p='5' mt='5'
                w='35%'
                h='40%'
            >
                <Heading mb={4} borderBottom='1px' backgroundColor='#FDC500' color='Black'>Sign Up</Heading>
                <FormControl isRequired >
                    <FormLabel htmlFor='username' color='#FFCE1F'>Username</FormLabel>
                    <Input
                        type='text'
                        color='#fff'
                        borderColor='#FDC500'
                        focusBorderColor='#3BBDC6'
                        placeholder='Username'
                        _placeholder={{ color: 'inherit' }}
                        name='username'
                        onChange={handleInputChange}
                        value={userFormData.username}
                    />
                </FormControl>
                <Spacer h='5' />
                <FormControl isRequired>
                    <FormLabel htmlFor='email' color='#FDC500'>Email</FormLabel>
                    <Input
                        type='email'
                        color='#fff'
                        borderColor='#FDC500'
                        focusBorderColor='#3BBDC6'
                        placeholder='Email Address'
                        _placeholder={{ color: 'inherit' }}
                        name='email'
                        onChange={handleInputChange}
                        value={userFormData.email}
                    />
                </FormControl>
                <FormControl isRequired>
                    <Spacer h='5' />
                    <FormLabel htmlFor='password' color='#FFCE1F'>Password</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            type={show ? 'text' : 'password'}
                            color='#fff'
                            borderColor='#FDC500'
                            focusBorderColor='#3BBDC6'
                            name='password'
                            pr='4.5rem'
                            placeholder='Password'
                            _placeholder={{ color: 'inherit' }}
                            onChange={handleInputChange}
                            value={userFormData.password}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' backgroundColor='#FDC500'
                                _hover={{ bg: '#FFCE1F' }} onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Button
                        type='submit'
                        onClick={handleFormSubmit}
                        backgroundColor='#FDC500'
                        _hover={{ bg: '#FFCE1F' }}
                        p={5}
                        m={5}
                    >
                        Signup
                    </Button>
                </FormControl>
            </Box>
        </Flex>
    );
};

export default SignupForm;