import request from 'supertest';
import apiLoader from '../src/api.js';

const api = apiLoader() ;

describe('GET /api/cars', () => {

  beforeEach(() => {
  });

  test('respond with json', () => {
    return request(api)
      .get('/api/cars')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.cars).toEqual([]);
      });
  });
});
