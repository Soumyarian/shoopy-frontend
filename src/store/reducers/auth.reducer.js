import { authConstants } from '../actions/constants';

const initState = {
    token: '',
    user: {
        firstName: '',
        lastName: '',
        email: '',
        picture: '',
    },
    authenticated: false,
    userCreated: false,
    loading: false,
    error: null,
    message: ''
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case authConstants.SIGNUP_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.SIGNUP_SUCCESS:
            state = {
                ...state,
                loading: false,
                userCreated: true,
                message: action.payload.message
            }
            break;
        case authConstants.SIGNUP_FAIL:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticated: true,
                loading: false
            }
            break;
        case authConstants.LOGIN_FAIL:
            state = {
                ...state,
                user: null,
                token: null,
                authenticated: false,
                loading: false
            }
            break;
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initState,
                loading: false
            }
            break;
        case authConstants.LOGOUT_FAIL:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        default:
            return state;
    }
    return state
}

export default authReducer;