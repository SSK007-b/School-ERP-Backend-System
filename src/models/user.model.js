const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    rollNo : {
        type: Number,
    },
    class : {  
        type: String,
    },
    section : {
        type: String,
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
      role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
      },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
