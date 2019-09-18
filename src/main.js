import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import App from './pages/Index';
import 'regenerator-runtime/runtime';

import './assets/styles/reset.less';
// import './assets/styles/index.css'


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
