const request = require('supertest');
const Chance = require('chance');
const httpStatus = require('http-status');
const app = require('../src/app');
const setupTestDB = require('../src/utils/setupTestdb');
const { User, Student } = require('../src/models'); // Assuming `Student` model exists
const { userOne, userTwo, insertStudent, insertUsers} = require('./fixtures/user.fixture');
const { userOneAccessToken, userTwoAccessToken } = require('./fixtures/token.fixture');

setupTestDB();

const chance = new Chance();

describe('Student routes', () => {
  let newStudent;

  beforeEach(() => {
    newStudent = {
      name: chance.name(),
      rollNumber: chance.integer({ min: 1, max: 1000 }).toString(),
      class: chance.integer({ min: 1, max: 12 }).toString(),
      section: chance.character({ alpha: true }).toUpperCase(),
      email: chance.email(),
      password: "password1"
    };
  });

  describe('POST /ERP/students', () => {
    test('should return 201 and successfully create new student if data is ok', async () => {
      await insertUsers([userOne])

      const res = await request(app)
        .post('/ERP/students')
        .set('Authorization', `Bearer ${userOneAccessToken}`) // Assuming userOne is a teacher or admin
        .send(newStudent)
        .expect(httpStatus.CREATED);
    });

    describe('POST /ERP/students', () => {
        test('should return 401', async () => {
          await insertStudent([userTwo])
    
          const res = await request(app)
            .post('/ERP/students')
            .set('Authorization', `Bearer ${userTwoAccessToken}`) // Assuming userOne is a teacher or admin
            .send(newStudent)
            .expect(httpStatus.UNAUTHORIZED);
        });
    });
  })
})
