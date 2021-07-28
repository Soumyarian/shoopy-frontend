import { categoryConstants } from './constants';
import axios from './../../helpers/axios';

export const getAllCategory = () => {
    return async (dispatch) => {
        dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST })
        const res = await axios.get('/category')
        if (res.status === 200) {
            const { categoryList } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                payload: { categories: categoryList }
            })
        } else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_FAIL,
                payload: { error: res.data.error }
            })
        }
    }
}

