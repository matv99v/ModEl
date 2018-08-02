import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';





const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initStore = {
    cart: [],
    isLoading: false,
    goods: []
};

const store = createStore(
    reducers,
    initStore,
    composeEnhancers(applyMiddleware(thunk))
);




export default store;
