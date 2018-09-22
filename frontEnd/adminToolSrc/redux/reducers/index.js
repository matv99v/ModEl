import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import spinnerReducer from './spinner-reducer';
import barnReducer from './barn-reducer';
import catalogReducer from './catalog-reducer';


const reducers = combineReducers({
    isLoading: spinnerReducer,
    barn: barnReducer,
    form: formReducer,
    catalog: catalogReducer
});



export default reducers;
