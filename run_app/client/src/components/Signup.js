import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';


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
        <div className='login-form'>
            <form onSubmit={handleFormSubmit}>
                <div className='login-input'>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        placeholder='Your Username'
                        name='username'
                        onChange={handleInputChange}
                        value={userFormData.username}
                        required
                    />
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        placeholder='Your email address'
                        name='email'
                        onChange={handleInputChange}
                        value={userFormData.email}
                        required
                    />
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        placeholder='Your password'
                        name='password'
                        onChange={handleInputChange}
                        value={userFormData.password}
                        required
                    />
                    <button
                        type='submit' className='signup-login-btn'>Signup
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;