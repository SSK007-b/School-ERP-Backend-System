const Chance = require('chance');
const { User } = require('../src/models');

const chance = new Chance();

describe('User model', () => {
  describe('User validation', () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        name: chance.name(),
        email: chance.email(),
        password: 'password1',
        role: 'student',
      };
    });

    test('should correctly validate a valid user', async () => {
        await expect(new User(newUser).validate()).resolves.toBeUndefined();
      });
  
      test('should throw a validation error if email is invalid', async () => {
        newUser.email = 'invalidEmail';
        await expect(new User(newUser).validate()).rejects.toThrow();
      });
  
      test('should throw a validation error if password length is less than 8 characters', async () => {
        newUser.password = 'passwo1';
        await expect(new User(newUser).validate()).rejects.toThrow();
      });
  
      test('should throw a validation error if password does not contain numbers', async () => {
        newUser.password = 'password';
        await expect(new User(newUser).validate()).rejects.toThrow();
      });
  
      test('should throw a validation error if password does not contain letters', async () => {
        newUser.password = '11111111';
        await expect(new User(newUser).validate()).rejects.toThrow();
      });
  
      test('should throw a validation error if role is unknown', async () => {
        newUser.role = 'invalid';
        await expect(new User(newUser).validate()).rejects.toThrow();
      });
      test('should throw an error if required fields are missing', async () => {
        delete newUser.name;  // Remove name to trigger validation error
        await expect(new User(newUser).validate()).rejects.toThrow();
        });
    });
});