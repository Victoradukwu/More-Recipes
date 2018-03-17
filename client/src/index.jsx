import 'babel-polyfill';
import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import { BrowserRouter, browserHistory } from 'react-router-dom';
import ReduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import setAuthorizationToken from './helpers/setAuthorizationToken';
import './assets/css/index.scss';
import LayoutPage from './components/LayoutPage.jsx';
import rootReducer from './reducers/rootReducer';


setAuthorizationToken(localStorage.getItem('token'));
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));
let userAuthentication = {
  authId: 0,
  isAuthenticating: false,
  isAuthenticated: false,
  signupError: {},
  signinError: ''
};

if (token !== null) {
  const { id } = jwt.decode(token);
  userAuthentication = {
    authId: id,
    isAuthenticating: false,
    isAuthenticated: true,
    signupError: {},
    signinError: '',
    user,
  };
}


const store = createStore(
  rootReducer,
  { userAuthentication },
  compose(
    applyMiddleware(thunk, ReduxImmutableStateInvariant()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

render(
  <Provider store={store}>
    <div className="boy">
      <BrowserRouter history={browserHistory}>
        <LayoutPage />
      </BrowserRouter>
    </div>
  </Provider>,
  document.getElementById('app')
);
