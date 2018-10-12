import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import spinnerReducer from './spinner-reducer';
import sysDialogsReducer from './sysdialogs-reducer';


const reducers = combineReducers({
    isLoading: spinnerReducer,
    form: formReducer,
    sysDialogs: sysDialogsReducer
});



export default reducers;
