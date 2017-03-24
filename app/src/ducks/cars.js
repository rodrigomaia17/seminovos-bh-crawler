import axios from 'axios';
import { createAction, handleActions } from 'redux-actions';

// Actions types
export const CHANGE_FILTER = 'cars/CHANGE_FILTER';
export const FETCH_CARS_START = 'cars/FETCH_CARS_START';
export const FETCH_CARS_END = 'cars/FETCH_CARS_END';
export const FETCH_CARS_FAIL = 'cars/FETCH_CARS_FAIL';

// actions
export const fetchCarsStart = createAction(FETCH_CARS_START);
export const fetchCarsSuccess = createAction(FETCH_CARS_END, cars => cars);
export const fetchCarsFailure = createAction(FETCH_CARS_FAIL, error => error);
const changeFilter = createAction(CHANGE_FILTER, filter => filter);
export const filterCars = filter => (dispatch) => {
  dispatch(changeFilter(filter));
  dispatch(fetchCarsStart());
  return axios.get(`/api/cars?query=${filter}`)
      .then(res => res.data)
      .then(data => dispatch(fetchCarsSuccess(data)))
      .catch(ex => dispatch(fetchCarsFailure(ex.response.status)));
};

//reducers
export default handleActions({
  [CHANGE_FILTER]: (state, action) => ({
    filter: action.payload,
  }),
}, { filter: '' });


//selectors
export const selectCarFilter = state => state.filter;
