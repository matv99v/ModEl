import { combineReducers } from 'redux';


import cartReducer from './cart-reducer';
import spinnerReducer from './spinner-reducer';
import goodsReducer from './goods-reducer';
import categoriesReducer from './categories-reducer';
import activeCategoryIdReducer from './active-category-id-reducer.js';

const reducers = combineReducers({
    cart: cartReducer,
    isLoading: spinnerReducer,
    goods: goodsReducer,
    categories: categoriesReducer,
    activeCategoryId: activeCategoryIdReducer
});


export default reducers;
