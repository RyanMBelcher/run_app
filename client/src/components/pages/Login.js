import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
    Input,
    InputGroup,
    InputRightElement,
    Button,
    FormControl,
    FormLabel,
    Flex,
    Box,
    Spacer,
    Heading,
    FormHelperText,
    FormErrorMessage
} from '@chakra-ui/react';
import personrunning from '../../images/personrunning.png'
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [input, setInput] = useState('')

    const [show, setShow] = React.useState(false)
    const [login, { error }] = useMutation(LOGIN_USER);

    const isError = input === ''

    const handleClick = () => setShow(!show)

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
        }

        setUserFormData({
            email: '',
            password: '',
        });
    }

    return (
        <Flex
            w='full'
            h='100vh'
            align='center'
            justify='center'
            backgroundImage={personrunning}
            backgroundSize='cover'
            backgroundPosition='center'
        >
            <Box
                bgGradient={'linear(to-br, blackAlpha.800, transparent)'}
                border='2px' borderRadius='md' borderColor='#3BBDC6' p='5' mt='5'
                w='35%'
                h='35%'
            >
                <Heading mb={4} borderBottom='1px' backgroundColor='#FDC500' color='black'>Log In</Heading>
                <FormControl >
                    <FormLabel color='#FFCE1F'>Email</FormLabel>
                    <Input type='email'
                        borderColor='#FDC500'
                        focusBorderColor='#3BBDC6'
                        name='email'
                        placeholder='Enter your email address'
                        onChange={handleInputChange}
                        value={userFormData.email}
                        color='#FFF'
                        _placeholder={{ color: 'inherit' }}
                    />
                    {!isError ? (
                        <FormHelperText>
                            Enter the email connected to your account.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Email is required.</FormErrorMessage>
                    )}
                </FormControl>
                <Spacer h='5' />
                <FormControl>
                    <FormLabel color='#FFCE1F'>Password</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            type={show ? 'text' : 'password'}
                            borderColor='#FDC500'
                            focusBorderColor='#3BBDC6'
                            name='password'
                            pr='4.5rem'
                            placeholder='Enter password'
                            onChange={handleInputChange}
                            value={userFormData.password}
                            color='#FFF'
                            _placeholder={{ color: 'inherit' }}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' backgroundColor='#FDC500'
                                _hover={{ bg: '#FFCE1F' }} onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button
                    type='submit'
                    onClick={handleFormSubmit}
                    backgroundColor='#FDC500'
                    _hover={{ bg: '#FFCE1F' }}
                    p={5}
                    m={5}
                >
                    Login
                </Button>
            </Box>
        </Flex>
    );
};

export default LoginForm;