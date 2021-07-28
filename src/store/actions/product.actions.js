import axios from './../../helpers/axios';
import { productConstants } from './constants'

export const getAllProductsBySlug = (slug) => {
    return async (dispatch) => {
        dispatch({ type: productConstants.GET_ALL_PRDUCTS_BY_SLUG_REQUEST })
        const res = await axios.get(`/products/${slug}`);
        if (res.status === 200) {
            dispatch({
                type: productConstants.GET_ALL_PRDUCTS_BY_SLUG_SUCCESS,
                payload: { products: res.data.products, productsByPrice: res.data.productsByPrice }
            })
        } else {
            dispatch({
                type: productConstants.GET_ALL_PRDUCTS_BY_SLUG_FAIL,
                payload: { error: res.data.error }
            })
        }
    }
}
export const getProductPage = (cid, type) => {
    return async (dispatch) => {
        try {
            dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST })
            const res = await axios.get(`/page/${cid}/${type}`);
            if (res.status === 200) {
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
                    payload: { page: res.data.page }
                })
            }
        } catch (error) {
            dispatch({
                type: productConstants.GET_PRODUCT_PAGE_FAIL,
                payload: { error: error }
            })
        }
    }
}

export const getProductById = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: productConstants.GET_PRODUCT_BY_ID_REQUEST })
            const res = await axios.get(`/product/${id}`);
            if (res.status === 200) {
                dispatch({
                    type: productConstants.GET_PRODUCT_BY_ID_SUCCESS,
                    payload: { product: res.data.product }
                })
            }
        } catch (error) {
            dispatch({
                type: productConstants.GET_PRODUCT_BY_ID_FAIL,
                payload: { error: error }
            })
        }
    }
}