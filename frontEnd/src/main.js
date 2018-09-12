import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';
import { Provider } from 'react-redux';



import Layout from './components/Layout.jsx';

import './styles.scss';


const appEl = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <Layout/>
    </Provider>,
    appEl
);
