import 'babel-polyfill';
import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter, browserHistory } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import ReduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import setAuthorizationToken from './helpers/setAuthorizationToken';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/react-redux-toastr/src/styles/index.scss';
import './assets/css/style3.css';

import LayoutPage from './components/LayoutPage.jsx';
import rootReducer from './reducers/rootReducer';


setAuthorizationToken(localStorage.getItem('token'));

const store = createStore(
  rootReducer,
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
      <ReduxToastr
        timeOut={2000}
        newestOnTop
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
      />
    </div>
  </Provider>,
  document.getElementById('app')
);
