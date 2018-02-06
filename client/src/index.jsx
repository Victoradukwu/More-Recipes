import 'babel-polyfill';
import { render } from 'react-dom';
import React from 'react';
import setToken from './helpers/setToken';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { createLogger } from 'redux-logger';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style3.css';

import LayoutPage from './components/LayoutPage';
import rootReducer from './reducers/rootReducer';

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}
// on page refresh, set axios x-access-token header.

setToken(localStorage.getItem('token'));

const store = createStore(
  // on page refresh, or on init store/app set token into redux store.
  rootReducer, { authToken: localStorage.getItem('token') },
  compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

render(
  <Provider store = {store}>
    <BrowserRouter>
      <LayoutPage />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
