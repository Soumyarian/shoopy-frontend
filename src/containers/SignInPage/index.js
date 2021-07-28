import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Auth from '../../components/Auth';
import CustomInput from '../../components/CustomInput';
import { login } from '../../store/actions';


const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector((state) => state.auth);

    const loginSubmitHandler = (e) => {
        e.preventDefault();
        const user = {
            email,
            password,
        };
        dispatch(login(user));
    };
    useEffect(() => {
        if (auth.authenticated) {
            history.goBack();
        }
    }, [auth.authenticated, history])
    return (
        <Auth
            title="Log In"
            loading={auth.loading}
            submitHandler={loginSubmitHandler}
        >
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
        </Auth>
    )
}

export default SignInPage
