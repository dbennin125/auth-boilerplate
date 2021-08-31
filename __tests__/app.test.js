const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('auth routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('allows a user to signup via POST', async () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        userName: 'userName',
        email: 'test@test.com',
        password: 'password',
        photoURL: 'https://placekitten.com/200/200',
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          userName: 'userName',
          email: 'test@test.com',
          photoURL: 'https://placekitten.com/200/200',
        });
      });
  });
});
