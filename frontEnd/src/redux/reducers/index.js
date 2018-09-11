import { combineReducers } from 'redux';


import cartReducer from './cart-reducer';
import spinnerReducer from './spinner-reducer';
import goodsReducer from './goods-reducer';
import categoriesReducer from './categories-reducer';
import errorReducer from './error-reducer';
import catalogReducer from './catalog-reducer';

const reducers = combineReducers({
    cart: cartReducer,
    isLoading: spinnerReducer,
    goods: goodsReducer,
    categories: categoriesReducer,
    error: errorReducer,
    catalog: catalogReducer
});



export default reducers;
