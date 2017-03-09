import React from 'react';
import Car from '../../models/Car.js';

export default class CarTableContainer extends React.Component {

  constructor(){
    super();
    this.state = {
      currentFilter: ""
    }
  }

  render() {
    const cars = [
      new Car('link1', 'Fox', 31990, 2013, 38000),
      new Car('link2', 'Palio', 31990, 2013, 38000),
      new Car('link3', 'CrossFox', 31990, 2013, 38000),
      new Car('link4', 'Gol', 31990, 2013, 38000),
    ];

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

    const CarFilter = ({onFilterChange}) => {
      return (<div> <input name='filter' /> </div>);
    }

    return (<div><CarFilter /><CarTable cars={cars} /></div>);
  }

}
