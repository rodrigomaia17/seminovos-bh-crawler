import React from 'react';
import DebounceInput from 'react-debounce-input';
import { connect } from 'react-redux';

import * as carsActions from '../ducks/cars.js';

const CarFilter = ({ currentFilter, onFilterChange }) => {
  const changeFilter = (value) => {
    if (value.length > 2) {
      onFilterChange(value);
    }
  };

  return (
    <div>
      <DebounceInput
        debounceTimeout={300} name="filter" value={currentFilter}
        onChange={event => changeFilter(event.target.value)}
      />
    </div>
  );
};

const CarLine = ({ car }) => (
  <tr>
    <td><a href={car.link} rel="noopener noreferrer" target="_blank" >link</a></td>
    <td>{car.fullName}</td>
    <td>{car.price}</td>
    <td>{car.year}</td>
    <td>{car.km}</td>
  </tr>
);

const CarTable = ({ cars, isLoading }) => {
  if (isLoading) {
    return (<p> Loading... </p>);
  } else if (cars.length > 0) {
    const lines = cars.map(c => <CarLine key={c.link} car={c} />);
    return (<table><tbody>
    <tr><th>Link</th><th>Name</th><th>Price</th><th>Year</th><th>Km</th></tr>
    {lines}
    </tbody></table>);
  }
  return <h1> Bem vindo ao Crawler do Seminovos BH, digite o que quiser acima </h1>;
};

const CarTableContainer = ({ cars, isLoading, currentFilter, onFilterChange }) => (
  <div>
    <CarFilter currentFilter={currentFilter} onFilterChange={onFilterChange} />
    <CarTable cars={cars} isLoading={isLoading} />
  </div>
  );

const mapStateToProps = state => ({
  cars: carsActions.selectCars(state),
  isLoading: false,
  currentFilter: carsActions.selectCarFilter(state),
});

const mapDispatchToProps = dispatch => ({
  onFilterChange: (filterValue) => {
    dispatch(carsActions.filterCars(filterValue));
  },
});

const VisibleCarTableContainer = connect(mapStateToProps, mapDispatchToProps)(CarTableContainer);

export default VisibleCarTableContainer;
