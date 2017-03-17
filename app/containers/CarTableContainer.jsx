import React from 'react';
import axios from 'axios';
import Car from '../../models/Car.js';
import _ from 'lodash';

class CarFilter extends React.Component {
  render() {
    return (<div> <input name="filter" value={this.props.currentFilter} onChange={event => this.props.onFilterChange(event.target.value)} /> </div>);
  }
}

export default class CarTableContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      currentFilter: '',
      cars: [],
    };
  }

  onFilterChange(value) {
    this.setState({ currentFilter: value });
  }

  componentWillUpdate(nextProps, nextState){
    const nextFilter = nextState.currentFilter.trim();
    if( this.state.currentFilter !== nextFilter) {
      if(nextState.currentFilter.length > 2 ){
        axios.get(`/api/cars?query=${nextFilter}`)
             .then((response) => {
               this.setState({cars: _.uniqBy(response.data.cars, 'link')});
             });
      } else {
        this.setState({cars: []})
      }
    }
   }

  render() {

    const CarLine = ({ car }) => (
      <tr>
        <td>{car.link}</td>
        <td>{car.fullName}</td>
        <td>{car.price}</td>
        <td>{car.year}</td>
        <td>{car.km}</td>
      </tr>
    );

    const CarTable = ({ cars }) => {
      if(cars.length > 0) {
        const lines = cars.map(c => <CarLine key={c.link} car={c} />);
        return (<table><tbody>{lines}</tbody></table>)
      };
      return <h1> Bem vindo ao Crawler do Seminovos BH, digite o que quiser acima </h1>
    };


    return (<div><CarFilter currentFilter={this.state.currentFilter} onFilterChange={this.onFilterChange.bind(this)} /><CarTable cars={this.state.cars} /></div>);
  }

}
