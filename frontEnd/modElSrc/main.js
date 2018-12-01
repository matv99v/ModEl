import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import Layout from './components/Layout';
import './styles.scss';

console.warn(
    `Mode: ${process.env.NODE_ENV}
Host: ${process.env.HOST}
Port: ${process.env.PORT}`
);

const appEl = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <Layout/>
    </Provider>,
    appEl
);
