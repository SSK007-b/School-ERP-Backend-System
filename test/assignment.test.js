const request = require('supertest');
const Chance = require('chance');
const httpStatus = require('http-status');
const app = require('../src/app');
const setupTestDB = require('../src/utils/setupTestdb');
const { Assignment, User } = require('../src/models');
const { userOne, userTwo, insertUsers } = require('./fixtures/user.fixture'); // Assuming userOne is a teacher and userTwo is a student
const { userOneAccessToken, userTwoAccessToken } = require('./fixtures/token.fixture');

setupTestDB();

const chance = new Chance();

describe('Assignment routes', () => {
  let newAssignment;

  beforeEach(() => {
    newAssignment = {
      title: 'Math Homework',
      description: 'Solve exercises 1-10 from chapter 5',
      dueDate: chance.date({ future: true }).toISOString(),
      status: 'active',
    };
  });

  // Test case for POST assignment by teacher
  describe('POST /ERP/assignments by teacher', () => {
    test('should return 201 and successfully create new assignment if data is correct (teacher)', async () => {
      await insertUsers([userOne]); // Assuming userOne is a teacher

      const res = await request(app)
        .post('/ERP/assignments')
        .set('Authorization', `Bearer ${userOneAccessToken}`) // Teacher's access token
        .send(newAssignment)
        .expect(httpStatus.CREATED);
      expect(res.body.title).toBe(newAssignment.title);
      expect(res.body.description).toBe(newAssignment.description);
      expect(res.body.status).toBe(newAssignment.status);
    });
  describe('POST /ERP/assignments by student', () => {
    test('should return 401 if a student tries to create an assignment', async () => {
      await insertUsers([userTwo]); // Assuming userTwo is a student

      const res = await request(app)
        .post('/ERP/assignments')
        .set('Authorization', `Bearer ${userTwoAccessToken}`) // Student's access token
        .send(newAssignment)
        .expect(httpStatus.UNAUTHORIZED)
    });
  });
});

});
