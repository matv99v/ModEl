import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';
import { Provider } from 'react-redux';

console.warn(
    `Mode: ${process.env.NODE_ENV}
Host: ${process.env.HOST}
Port: ${process.env.PORT}`
);

import Layout from './components/Layout';
import './styles.scss';



const appEl = document.getElementById('admin');

ReactDOM.render(
    <Provider store={store}>
        <Layout/>
    </Provider>,
    appEl
);
