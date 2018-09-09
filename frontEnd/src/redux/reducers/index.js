import { combineReducers } from 'redux';


import cartReducer from './cart-reducer';
import spinnerReducer from './spinner-reducer';
import goodsReducer from './goods-reducer';
import categoriesReducer from './categories-reducer';
import errorReducer from './error-reducer';

const reducers = combineReducers({
    cart: cartReducer,
    isLoading: spinnerReducer,
    goods: goodsReducer,
    categories: categoriesReducer,
    error: errorReducer
});



export default reducers;
