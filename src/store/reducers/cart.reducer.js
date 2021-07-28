import { cartConstants } from './../actions/constants';
const initialState = {
    cartItems: {},
    loading: false,
    error: null
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case cartConstants.GET_CART_ITEM_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case cartConstants.GET_CART_ITEM_SUCCESS:
            state = {
                ...state,
                loading: false,
                cartItems: action.payload.cartItems
            }
            break;
        case cartConstants.GET_CART_ITEM_FAIL:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case cartConstants.ADD_TO_CART_SUCCESS:
            state = {
                ...state,
                cartItems: action.payload.cartItems
            }
            break;
        default:
            return state;
    }
    return state
}

export default cartReducer