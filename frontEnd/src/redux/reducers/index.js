import { combineReducers } from 'redux';


import cartReducer from './cart-reducer';
import spinnerReducer from './spinner-reducer';
import goodsReducer from './goods-reducer';
import categoriesReducer from './categories-reducer';
import activeCategoryIdReducer from './active-category-id-reducer.js';
import activeGoodIdReducer from './active-good-id-reducer.js';
import errorReducer from './error-reducer';

const reducers = combineReducers({
    cart: cartReducer,
    isLoading: spinnerReducer,
    goods: goodsReducer,
    categories: categoriesReducer,
    activeCategoryId: activeCategoryIdReducer,
    activeGoodId: activeGoodIdReducer,
    error: errorReducer
});


export default reducers;
