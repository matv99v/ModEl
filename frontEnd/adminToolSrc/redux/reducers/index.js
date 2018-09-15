import { combineReducers } from 'redux';


import spinnerReducer from './spinner-reducer';
import stockReducer from './stock-reducer';
import { reducer as formReducer } from 'redux-form';


const reducers = combineReducers({
    isLoading: spinnerReducer,
    stock: stockReducer,
    form: formReducer
});



export default reducers;
