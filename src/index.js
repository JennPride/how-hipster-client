import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import './index.css';
import history from './history';

import App from './App'

const rootElement = document.getElementById('root');

ReactDOM.render(
<Provider store={store}>
    {
        <Router history={history}>
            <App />
        </Router>
    }
</Provider>,
rootElement
);
