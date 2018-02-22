import 'babel-polyfill';
import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { createLogger } from 'redux-logger';
import ReduxToastr from 'react-redux-toastr';
import ReduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import setToken from './helpers/setToken';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/react-redux-toastr/src/styles/index.scss';
import './assets/css/style3.css';

import LayoutPage from './components/LayoutPage.jsx';
import rootReducer from './reducers/rootReducer';

const middleware = [thunk, ReduxImmutableStateInvariant()];

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
  <Provider store={store}>
    <div className="boy">
      <BrowserRouter>
        <LayoutPage />
      </BrowserRouter>
      <ReduxToastr
        timeOut={5000}
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
