import { authConstants, cartConstants } from './constants'
import axios from '../../helpers/axios';


export const signup = (user) => {
    return async (dispatch) => {
        dispatch({ type: authConstants.SIGNUP_REQUEST });
        const res = await axios.post('/signup', { ...user })
        if (res.status === 201) {
            const { message } = res.data;
            dispatch({
                type: authConstants.SIGNUP_SUCCESS,
                payload: { message }
            });
        } else if (res.status === 400) {
            dispatch({
                type: authConstants.SIGNUP_FAIL,
                payload: { error: res.data.error }
            })
        }
    }
}

export const login = (user) => {
    return async (dispatch) => {
        dispatch({ type: authConstants.LOGIN_REQUEST });
        const res = await axios.post('/signin', { ...user })
        if (res.status === 200) {
            const { token, user } = res.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: { token, user }
            });
        } else if (res.status === 400) {
            dispatch({
                type: authConstants.LOGIN_FAIL,
                payload: { error: res.data.error }
            })
        }
    }
}

export const isUserLogedIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'))
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: { token, user }
            })
        } else {
            dispatch({
                type: authConstants.LOGIN_FAIL,
                payload: { error: 'Failed to login' }
            })
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        dispatch({ type: authConstants.LOGOUT_REQUEST })
        // localStorage.removeItem('user');
        // localStorage.removeItem('token');
        localStorage.clear()
        dispatch({ type: authConstants.LOGOUT_SUCCESS });
        dispatch({ type: cartConstants.RESET_CART })
        // const res = await axios.post('/signout');
        // if (res.status === 200) {
        //     localStorage.clear()
        //     dispatch({ type: authConstants.LOGOUT_SUCCESS, })
        // } else {
        //     dispatch({
        //         type: authConstants.LOGOUT_FAIL, payload: {
        //             error: res.data.error
        //         }
        //     })
        // }

    }
}