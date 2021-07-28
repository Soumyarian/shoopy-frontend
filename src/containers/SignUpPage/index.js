import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Auth from '../../components/Auth';
import CustomInput from '../../components/CustomInput';
import { signup } from '../../store/actions';


const SignUpPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [contactNumber, setContactNumber] = useState('');

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const signUpSubmitHandler = (e) => {
        e.preventDefault();
        const userObject = {
            firstName,
            lastName,
            userName,
            email,
            password,
            contactNumber
        }
        dispatch(signup(userObject));
    }

    if (auth.userCreated) {
        return <Redirect to="/login" />
    }

    return (
        <Auth
            title="Sign Up"
            loading={auth.loading}
            submitHandler={signUpSubmitHandler}
        >
            <CustomInput
                label="First Name"
                type="text"
                placeholder="First Name"
                value={firstName}
                errorMessage={auth.error && auth.error}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <CustomInput
                label="Last Name"
                type="text"
                placeholder="Last Name"
                value={lastName}
                errorMessage={auth.error && auth.error}
                onChange={(e) => setLastName(e.target.value)}
            />
            <CustomInput
                label="User Name"
                type="text"
                placeholder="User Name Must be Unique"
                value={userName}
                errorMessage={auth.error && auth.error}
                onChange={(e) => setUserName(e.target.value)}
            />
            <CustomInput
                label="Email"
                type="email"
                placeholder="User Email"
                value={email}
                errorMessage={auth.error && auth.error}
                onChange={(e) => setEmail(e.target.value)}
            />
            <CustomInput
                label="Password"
                type="password"
                placeholder="User Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <CustomInput
                label="Contact Number"
                type="number"
                placeholder="Contact Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
            />
        </Auth>
    )
}

export default SignUpPage;
