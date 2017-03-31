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

  const styles = {
    input: {
      fontSize: '1.5rem',
      border: '1px solid #dbdbdb',
    },
    help: {
      fontSize: '0.75rem',
      marginTop: '0.25rem',
    },
  };

  return (
    <div>
      <DebounceInput
        style={styles.input} type="text"
        debounceTimeout={300} name="filter" value={currentFilter}
        onChange={event => changeFilter(event.target.value)}
      />
      { currentFilter.length < 3 ?
        <p style={styles.help}>Insira qualquer texto de busca aqui.
          Mínimo de 3 caracteres.  Ex: &quot;Fox Prime 1.6&quot; </p> :
        <div /> }
    </div>
  );
};

const CarLine = ({ car }) => (
  <tr>
    <td><a href={car.link} rel="noopener noreferrer" target="_blank" >{car.fullName}</a></td>
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
    return (<table className="table"><thead>
      <tr><th>Name</th><th>Price</th><th>Year</th><th>Km</th></tr>
    </thead>
      <tbody>
        {lines}
      </tbody></table>);
  }
  return <div />;
};

const CarTableContainer = ({ cars, isLoading, currentFilter, onFilterChange }) => (
  <div>
    <section className="hero is-dark">
      <div className="hero-body" style={{marginLeft: '1em' }}>
        <p className="title">Simplificando o Seminovos BH</p>
        <CarFilter currentFilter={currentFilter} onFilterChange={onFilterChange} />
      </div>
    </section>
    <CarTable cars={cars} isLoading={isLoading} />
  </div>
  );

const mapStateToProps = state => ({
  cars: carsActions.selectCars(state),
  isLoading: carsActions.selectIsLoading(state),
  currentFilter: carsActions.selectCarFilter(state),
});

const mapDispatchToProps = dispatch => ({
  onFilterChange: (filterValue) => {
    dispatch(carsActions.filterCars(filterValue));
  },
});

const VisibleCarTableContainer = connect(mapStateToProps, mapDispatchToProps)(CarTableContainer);

export default VisibleCarTableContainer;
