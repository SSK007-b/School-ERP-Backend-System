const mongoose = require('mongoose');
const chance = require('chance').Chance()
const { User, Student} = require('../../src/models');
const id = new mongoose.Types.ObjectId();

const password = 'password1';
const userOne = {
    _id: id,
  name: chance.name(),
  email: chance.email(),
  password,
  role: 'teacher'
};

const userTwo = {
  name: chance.name(),
  rollNo: chance.integer(),
  class: chance.string(),
  section: chance.string(),
  email: chance.email(),
  password,
  role: 'student',
};

const superAdmin = {
  name: chance.name(),
  email: chance.email(),
  password,
  role: 'superAdmin',
};

const insertUsers = async (users) => {
  await User.insertMany(users.map((user) => ({ ...user, password: password })));
};

const insertStudent = async(users) => {
    await Student.insertMany(users.map((user) =>({...user , password})))
}

module.exports = {
  userOne,
  userTwo,
  superAdmin,
  insertUsers,
  insertStudent
};
