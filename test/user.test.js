const request = require('supertest');
const Chance = require('chance')
const httpStatus = require('http-status');
const app = require('../src/app');
const setupTestDB = require('../src/utils/setupTestdb');
const { User } = require('../src/models');
const { userOne, userTwo, superAdmin, insertUsers } = require('./fixtures/user.fixture');
const { userOneAccessToken, superAdminAccessToken } = require('./fixtures/token.fixture');

setupTestDB();

const chance = new Chance()

describe('User routes', () => {
  describe('POST /ERP/users', () => {
    let newUser;
    beforeEach(() => {
    newUser = {
      name: chance.name(),
      email: chance.email(),
      password: 'password1',
      role: 'teacher',
    };
  });

    test('should return 201 and successfully create new user if data is ok', async () => {
      await insertUsers([userOne]);

      const res = await request(app)
        .post('/ERP/users')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newUser)
        .expect(httpStatus.CREATED);

    });

    test('should be able to create an superAdmin as well', async () => {
      await insertUsers([userOne]);
      newUser.role = 'superAdmin';

      const res = await request(app)
        .post('/ERP/users')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body.role).toBe('superAdmin');

    });

  });
});