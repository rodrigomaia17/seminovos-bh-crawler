import React from 'react';
import Car from '../../models/Car.js';

class CarFilter extends React.Component {
  render(){
    return (<div> <input name='filter' value={this.props.currentFilter} onChange={ (event) => this.props.onFilterChange(event.target.value) } /> </div>);
  }
}

export default class CarTableContainer extends React.Component {

  constructor(){
    super();
    this.state = {
      currentFilter: ""
    }
  }

  onFilterChange(value){
    this.setState({currentFilter: value});
  }

  render() {
    const cars = [
      new Car('link1', 'Fox', 31990, 2013, 38000),
      new Car('link2', 'Palio', 31990, 2013, 38000),
      new Car('link3', 'CrossFox', 31990, 2013, 38000),
      new Car('link4', 'Gol', 31990, 2013, 38000),
    ].filter((c) => c.fullName.toUpperCase().match(this.state.currentFilter.toUpperCase()));

    const CarLine = ({car}) => (
      <tr>
        <td>{car.link}</td>
        <td>{car.fullName}</td>
        <td>{car.price}</td>
        <td>{car.year}</td>
        <td>{car.km}</td>
      </tr>
    )

    const CarTable = ({cars}) => {
      const lines = cars.map( (c) => <CarLine key={c.link} car={c} /> );
      return (<table><tbody>{lines}</tbody></table>);
    }


    return (<div><CarFilter currentFilter={this.state.currentFilter} onFilterChange={this.onFilterChange.bind(this)} /><CarTable cars={cars} /></div>);
  }

}
