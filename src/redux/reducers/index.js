import { combineReducers } from 'redux';


import cartReducer from './cart-reducer';
import spinnerReducer from './spinner-reducer';
import goodsReducer from './goods-reducer';

const reducers = combineReducers({
    cart: cartReducer,
    isLoading: spinnerReducer,
    goods: goodsReducer
});


export default reducers;
