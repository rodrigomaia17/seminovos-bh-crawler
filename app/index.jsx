import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import CarTableContainer2 from './src/containers/CarTableContainer.jsx';
import carsReducer from './src/ducks/cars.js';

const store = createStore(carsReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <CarTableContainer2 />
  </Provider>,
    document.getElementById('root'),
);
