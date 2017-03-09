import React from 'react';
import Immutable from 'immutable';
import ReactDOM from 'react-dom';
import Car from '../models/Car.js';
import CarTableContainer from './containers/CarTableContainer.jsx';


ReactDOM.render(
  <CarTableContainer />,
  document.getElementById('root')
)
