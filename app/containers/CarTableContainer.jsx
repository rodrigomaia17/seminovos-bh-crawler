import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import DebounceInput from 'react-debounce-input';

class CarFilter extends React.Component {
  render() {
    return (
      <div>
        <DebounceInput debounceTimeout={300} name="filter" value={this.props.currentFilter}
          onChange={event => this.props.onFilterChange(event.target.value)} />
      </div>
    );
  }
}

export default class CarTableContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      currentFilter: '',
      cars: [],
      isLoading: false,
    };

    this.cancelTokenSource = axios.CancelToken.source();
    this.requestsPending = [];
  }

  onFilterChange(value) {
    const nextFilter = value.trim();
    this.setState({ currentFilter: value });
    if (value.length > 2) {
      this.setState({ isLoading: true });
      axios.get(`/api/cars?query=${nextFilter}`)
             .then((response) => {
               this.setState({ cars: _.uniqBy(response.data.cars, 'link'), isLoading: false });
             })
             .catch((error) => {
               this.setState({ isLoading: false });
               if (error.message !== 'triggering another request') {
                 throw error;
               }
             });
    } else {
      this.setState({ cars: [] });
    }
  }

  render() {
    const CarLine = ({ car }) => (
      <tr>
        <td><a href={car.link} target="_blank" >link</a></td>
        <td>{car.fullName}</td>
        <td>{car.price}</td>
        <td>{car.year}</td>
        <td>{car.km}</td>
      </tr>
    );

    const CarTable = ({ cars }) => {
      if (cars.length > 0) {
        const lines = cars.map(c => <CarLine key={c.link} car={c} />);
        return (<table><tbody>{lines}</tbody></table>);
      } else if (this.state.isLoading) {
        return (<p> Loading... </p>);
      }
      return <h1> Bem vindo ao Crawler do Seminovos BH, digite o que quiser acima </h1>;
    };


    return (<div><CarFilter currentFilter={this.state.currentFilter} onFilterChange={this.onFilterChange.bind(this)} /><CarTable cars={this.state.cars} /></div>);
  }

}
