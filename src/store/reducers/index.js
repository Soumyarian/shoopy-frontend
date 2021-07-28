import { combineReducers } from 'redux';
import categoryReducer from './category.reducer';
import productsReducer from './product.reducer';
import authReducer from './auth.reducer';
import cartReducer from './cart.reducer';
import userReducer from './user.reducer';

const rootReducer = combineReducers({
    products: productsReducer,
    categories: categoryReducer,
    auth: authReducer,
    cart: cartReducer,
    user: userReducer
})

export default rootReducer