import 'babel-polyfill';
import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {createLogger} from 'redux-logger';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style3.css';

import LayoutPage from './components/LayoutPage';
import AboutPage from './components/recipes/AboutPage';
import HomePage from './components/recipes/HomePage';
import rootReducer from './reducers/rootReducer';

const middleware = [ thunk ]

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(rootReducer, applyMiddleware(...middleware))



render(
    <Provider store = {store}>
    <BrowserRouter>
      <LayoutPage />
    </BrowserRouter>
    </Provider>,
  document.getElementById('app')
);