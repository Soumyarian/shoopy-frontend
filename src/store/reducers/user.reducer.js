import { userConstants } from "../actions/constants"

const initState = {
    address: [],
    orders: [],
    orderDetails: {},
    loading: false,
    error: null,
    placedOrderId: null,
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case userConstants.GET_USER_ADDRESS_REQUEST:
        case userConstants.ADD_USER_ADDRESS_REQUEST:
        case userConstants.ADD_USER_ORDER_REQUEST:
        case userConstants.GET_USER_ORDER_REQUEST:
        case userConstants.GET_USER_ORDER_DETAILS_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case userConstants.GET_USER_ADDRESS_SUCCESS:
            state = {
                ...state,
                address: action.payload.address,
                loading: false,
            };
            break;
        case userConstants.ADD_USER_ADDRESS_SUCCESS:
            state = {
                ...state,
                address: action.payload.address,
                loading: false,
            };
            break;
        case userConstants.ADD_USER_ORDER_SUCCESS:
            state = {
                ...state,
                placedOrderId: action.payload.order._id,
                loading: false
            };
            break;
        case userConstants.GET_USER_ORDER_SUCCESS:
            state = {
                ...state,
                orders: action.payload.orders,
                loading: false,
            };
            break;
        case userConstants.GET_USER_ORDER_DETAILS_SUCCESS:
            state = {
                ...state,
                orderDetails: action.payload.order,
            };
            break;
        case userConstants.GET_USER_ADDRESS_FAILURE:
        case userConstants.ADD_USER_ADDRESS_FAILURE:
        case userConstants.ADD_USER_ORDER_FAILURE:
        case userConstants.GET_USER_ORDER_FAILURE:
        case userConstants.GET_USER_ORDER_DETAILS_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false,
            };
            break;
        default:
            return state;
    }
    return state
}

export default reducer;