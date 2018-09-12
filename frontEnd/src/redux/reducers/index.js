import { combineReducers } from 'redux';


import cartReducer from './cart-reducer';
import spinnerReducer from './spinner-reducer';
import errorReducer from './error-reducer';
import catalogReducer from './catalog-reducer';

const reducers = combineReducers({
    cart: cartReducer,
    isLoading: spinnerReducer,
    error: errorReducer,
    catalog: catalogReducer
});



export default reducers;
