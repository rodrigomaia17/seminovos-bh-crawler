import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import sinon from 'sinon';

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

import reducer, * as carsActions from '../../src/ducks/cars.js';

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
        { type: carsActions.FETCH_CARS_END, payload: answer },
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
