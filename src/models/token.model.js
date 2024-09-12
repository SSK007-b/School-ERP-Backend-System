const mongoose = require('mongoose');
const { User } = require('./user.model');
const { tokenTypes } = require('../config/tokens');

const tokenSchema = new mongoose.Schema({
    token: {
        type : String,
        required : true,
        index : true
    },
    user : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'User',
    },
    type: {
        type: String,
        enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
        required: true,
    },
    expires: {
        type: Date,
        required: true,
    },
      blacklisted: {
        type: Boolean,
        default: false,
    },
})

const Token  = mongoose.model('Token', tokenSchema);

module.exports = Token;