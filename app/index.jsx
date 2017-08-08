import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'bulma';

import CarTableContainer2 from './src/containers/CarTableContainer.jsx';
import carsReducer from './src/ducks/cars.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(carsReducer, composeEnhancers(applyMiddleware(thunk, logger)));

ReactDOM.render(
  <Provider store={store}>
    <CarTableContainer2 />
  </Provider>,
    document.getElementById('root'),
);
