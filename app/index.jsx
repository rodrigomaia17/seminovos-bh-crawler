import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import Immutable from 'immutable';
import ReactDOM from 'react-dom';
import CarTableContainer2 from './src/containers/CarTableContainer.jsx';
import { Provider } from 'react-redux'
import carsReducer from './src/ducks/cars.js';

let store = createStore(carsReducer, applyMiddleware(thunk,logger));

ReactDOM.render(
    <Provider store={store}>
        <CarTableContainer2 />
    </Provider>,
    document.getElementById('root'),
);
