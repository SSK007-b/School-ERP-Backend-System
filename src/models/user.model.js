const mongoose = require('mongoose');
const validator = require('validator');
const { roles } = require('../config/roles');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error('Invalid email');
          }
        },
      },
      password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
          if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            throw new Error('Password must contain at least one letter and one number');
          }
        },
        private: true, // used by the toJSON plugin
      },
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',  // Reference to the student model (only for students)
        required: function() {
          return this.role === 'Student';
        }
      },
      role: {
        type: String,
        enum: roles,
        default: 'teacher',
      },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
