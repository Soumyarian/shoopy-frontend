import { productConstants } from './../actions/constants';

const initialState = {
    products: [],
    productsByPrice: {
        under5k: [],
        under10k: [],
        under15k: [],
        under20k: [],
    },
    page: {},
    detailedProduct: {},
    pageLoading: false,
    error: false
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case productConstants.GET_ALL_PRDUCTS_BY_SLUG_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                productsByPrice: action.payload.productsByPrice
            }
            break;
        case productConstants.GET_PRODUCT_PAGE_REQUEST:
            state = {
                ...state,
                pageLoading: true
            }
            break;
        case productConstants.GET_PRODUCT_PAGE_SUCCESS:
            state = {
                ...state,
                page: action.payload.page,
                pageLoading: false
            }
            break;
        case productConstants.GET_PRODUCT_PAGE_FAIL:
            state = {
                ...state,
                pageLoading: false,
                error: action.payload.error
            }
            break;
        case productConstants.GET_PRODUCT_BY_ID_REQUEST:
            state = {
                ...state,
                pageLoading: true
            }
            break;
        case productConstants.GET_PRODUCT_BY_ID_SUCCESS:
            state = {
                ...state,
                pageLoading: false,
                detailedProduct: action.payload.product
            }
            break;
        case productConstants.GET_PRODUCT_BY_ID_FAIL:
            state = {
                ...state,
                pageLoading: false,
                error: action.payload.error
            }
            break;
        default:
            return state
    }
    return state;
}

export default productReducer;