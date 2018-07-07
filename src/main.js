import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';
import { Provider } from 'react-redux';

if (process.env.NODE_ENV !== 'production') {
    console.warn('Looks like we are in development mode!');
}


import Layout from './components/Layout.jsx';

import './styles.scss';


const appEl = document.getElementById('app')

ReactDOM.render(
    <Provider store={store}>
        <Layout/>
    </Provider>,
    appEl
);
