import { cartConstants } from './constants';
import axios from './../../helpers/axios';
import store from './../index';

const getCartItems = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: cartConstants.GET_CART_ITEM_REQUEST });
            const res = await axios.get('/user/getCartItems');
            if (res.status === 200) {
                res.data.cartItems && dispatch({
                    type: cartConstants.GET_CART_ITEM_SUCCESS, payload: {
                        cartItems: res.data.cartItems
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: cartConstants.GET_CART_ITEM_FAIL, payload: {
                    error
                }
            });
        }
    }
}

export const addToCart = (product) => {
    return async (dispatch) => {
        const { cart: { cartItems }, auth } = store.getState();
        const payload = product.payload ? product.payload : 1
        let quantity;
        if (cartItems[product._id]) {
            if (cartItems[product._id].quantity === 0) {
                quantity = 0
            } else {
                quantity = cartItems[product._id].quantity + payload
            }
        } else {
            quantity = 1
        };
        const newProduct = {
            _id: product._id,
            name: product.name,
            price: product.price,
            img: product.img,
            quantity
        }
        cartItems[product._id] = newProduct;

        if (auth.authenticated) {
            dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
            const item = [{
                product: product._id,
                quantity: quantity
            }]
            const res = await axios.post('/user/cart/addtocart', { cartItems: item })
            if (res.status === 201) {
                dispatch(getCartItems())
            }
        } else {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
        dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS, payload: { cartItems }
        });
    }
}


export const updateCart = () => {
    return async dispatch => {
        const { auth } = store.getState();
        const cartItems = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : null;
        if (auth.authenticated) {
            localStorage.removeItem("cart");
            if (cartItems) {
                const itemArray = []
                for (let item in cartItems) {
                    itemArray.push({
                        product: cartItems[item]._id,
                        quantity: cartItems[item].quantity
                    })
                }
                if (Object.keys(cartItems).length > 0) {
                    const res = await axios.post('/user/cart/addtocart', { cartItems: itemArray });
                    if (res.status === 201) {
                        dispatch(getCartItems())
                    }
                }
            } else {
                dispatch(getCartItems())
            }
        } else {
            if (cartItems) {
                dispatch({
                    type: cartConstants.ADD_TO_CART_SUCCESS,
                    payload: { cartItems },
                });
            }
        }
    }
}


export const removeCartItem = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
            const res = await axios.post(`/user/cart/removeItem`, { ...payload });
            if (res.status === 202) {
                dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
                dispatch(getCartItems());
            } else {
                const { error } = res.data;
                dispatch({
                    type: cartConstants.REMOVE_CART_ITEM_FAILURE,
                    payload: { error },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export { getCartItems }