import request from 'supertest';
import low from 'lowdb';
import apiLoader from '../src/api.js';
import Car from '../../models/Car.js';

const freshDB = () => {
  const fresh = low();
  fresh.defaults({ cars: [] }).write();
  return fresh;
};

describe('GET /api/cars', () => {
  let db;
  let api;
  beforeEach(() => {
    db = freshDB();
    api = apiLoader(db);
  });

  test('respond with json', () => request(api)
      .get('/api/cars')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.cars).toEqual([]);
      }));

  test('respond with cars that match criteria', () => {
    db.get('cars')
      .push(new Car('a', 'fox', 20000, 2013, 100000))
      .push(new Car('a', 'gol', 20000, 2013, 100000))
      .write();

    return request(api)
      .get('/api/cars?query=Fox')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.cars.length).toEqual(1);
        expect(response.body.cars[0].fullName).toEqual('fox');
      });
  });
});
