import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import sinon from 'sinon';

import reducer, * as carsActions from '../../src/ducks/cars.js';

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);


describe('cars module test', () => {
  let store;
  let dispatch;
  beforeEach(() => {
    store = createStore(reducer, applyMiddleware(thunk));
    dispatch = sinon.spy(store, 'dispatch');
  });
  afterEach(() => {
    mock.reset();
  });

  const checkDispatchBeingCalledWith = (actions) => {
    actions.forEach((action) => {
      const wasCalled = dispatch.calledWith(action);
      if (!wasCalled) {
        const message = `we got the following calls:\n${
               dispatch.args.map(a => `${JSON.stringify(a)}\n`)
               }\n\n The Following action should be called:\n ${
               JSON.stringify(action)}`;
        throw new Error(message);
      }
    });
  };

  test('test initial state', () => {
    const state = store.getState();
    expect(carsActions.selectCars(state)).toEqual([]);
    expect(carsActions.selectCarFilter(state)).toBe('');
  });

  test('test isLoading starts with fetchCars ', () => {
    const action = carsActions.fetchCarsStart();
    store.dispatch(action);
    const state = store.getState();
    expect(carsActions.selectIsLoading(state)).toBe(true);
  });

  test('test fetchCarsFails', () => {
    store.dispatch(carsActions.fetchCarsStart());
    const action = carsActions.fetchCarsFailure();
    store.dispatch(action);
    const state = store.getState();
    expect(carsActions.selectIsLoading(state)).toBe(false);
  });

  test('test fetchCarsSuccess', () => {
    store.getState().isLoading = true;
    const cars = [{ name: 'a' }];
    const action = carsActions.fetchCarsSuccess(cars);
    store.dispatch(action);
    const state = store.getState();
    expect(carsActions.selectIsLoading(state)).toBe(false);
    expect(carsActions.selectCars(state).toJS()).toEqual(cars);
  });

  test('test current filter change', () => {
    const answer = {
      cars: [
        { id: 1, name: 'John Smith' },
      ],
    };
    mock.onGet('/api/cars?query=newFilter').reply(200, answer);

    const action = carsActions.filterCars('newFilter');

    return action(dispatch).then(() => {
      [
        { type: carsActions.CHANGE_FILTER, payload: 'newFilter' },
        { type: carsActions.FETCH_CARS_START },
        { type: carsActions.FETCH_CARS_END, payload: answer.cars },
      ].forEach(a => expect(dispatch.calledWith(a)).toBe(true));

      const state = store.getState();
      expect(carsActions.selectCarFilter(state)).toBe('newFilter');
    });
  });

  test('test error if the ajax fails ', () => {
    mock.onGet('/api/cars?query=newFilter').reply(500);

    const action = carsActions.filterCars('newFilter');

    return action(dispatch).then(() => {
      checkDispatchBeingCalledWith([
        { type: carsActions.CHANGE_FILTER, payload: 'newFilter' },
        { type: carsActions.FETCH_CARS_START },
        { type: carsActions.FETCH_CARS_FAIL, payload: 500 },
      ]);

      const state = store.getState();
      expect(carsActions.selectCarFilter(state)).toBe('newFilter');
    });
  });
});
