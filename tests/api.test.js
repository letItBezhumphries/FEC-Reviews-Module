const request = require('supertest');
const db = require('../server/db.js');
const app = require('../server/app.js');

afterAll(() => db.sequelize.close());

describe('Api should get data from database', () => {
  test('It should respond with an array of user objects', () => {
    return request(app).get('/api/users')
      .then(response => {
        expect(response.body).toBeTruthy();
      });
  });

  test('It should respond with an array of review objects', () => {
    return request(app).get('/api/restaurants/reviews')
      .then(response => {
        expect(response.body.length).toBeGreaterThan(0);
      });
  });

  test('It should respond with an array of review objects to a specific restaurant', () => {
    return request(app).get('/api/restaurants/UeS2aZ7ryI/reviews')
      .then(response => {
        expect(response.body.length).toBeGreaterThan(0);
      });
  });

  test('It should handle pages that do not exist', () => {
    return request(app).get('/doesntexist')
      .then(response => {
        expect(response.error.text).toBeTruthy();
      });
  });
});