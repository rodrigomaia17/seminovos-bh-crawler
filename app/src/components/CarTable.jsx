import React from 'react';

export default class CarTable extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.tableRef) {
      sorttable.makeSortable(this.tableRef); //eslint-disable-line no-undef
    }
  }

  render() {
    const isLoading = this.props.isLoading;
    const cars = this.props.cars;

    if (isLoading) {
      return (<p> Loading... </p>);
    } else if (cars.length > 0) {
      const lines = cars.map(c => <CarLine key={c.link} car={c} />);
      return (<table ref={(table) => { this.tableRef = table; }} className="table sortable"><thead>
        <tr><th>Name</th><th>Price</th><th>Year</th><th>Km</th></tr>
      </thead>
        <tbody>
          {lines}
        </tbody></table>);
    }
    return <div />;
  }
}


const CarLine = ({ car }) => (
  <tr>
    <td><a href={car.link} rel="noopener noreferrer" target="_blank" >{car.fullName}</a></td>
    <td>{car.price}</td>
    <td>{car.year}</td>
    <td>{car.km}</td>
  </tr>
);
