// import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';

// import { LOGIN_USER } from '../utils/mutations';
// import Auth from '../utils/auth';

// const LoginForm = () => {
//     const [userFormData, setUserFormData] = useState({ email: '', password: '' });
//     // const [validated] = useState(false);
//     // const [showAlert, setShowAlert] = useState(false);

//     const [login, { error }] = useMutation(LOGIN_USER);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUserFormData({ ...userFormData, [name]: value });
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();

//         const form = e.currentTarget;
//         if (form.checkValidity() === false) {
//             e.preventDefault()
//             e.stopPropagation();
//         }

//         try {
//             const result = await login({ variables: { ...userFormData } });
//             Auth.login(result.data.login.token);
//         } catch (error) {
//             console.error(error);
//             // setShowAlert(true);
//         }

//         setUserFormData({
//             email: '',
//             password: '',
//         });
//     }

//     return (
//         <div className='login-form'>
//             <form onSubmit={handleFormSubmit}>
//                 <div className='login-input'>
//                     <label htmlFor='email'>Email</label>
//                     <input
//                         type='email'
//                         placeholder='Your email address'
//                         name='email'
//                         onChange={handleInputChange}
//                         value={userFormData.email}
//                         required
//                     />
//                     <label htmlFor='password'>Password</label>
//                     <input
//                         type='password'
//                         placeholder='Your password'
//                         name='password'
//                         onChange={handleInputChange}
//                         value={userFormData.password}
//                         required
//                     />
//                     <button type='submit' className='signup-login-btn'>Login</button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default LoginForm;