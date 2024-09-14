const jwt = require('jsonwebtoken');
const config = require('../config/config'); // Adjust the path according to your setup

const generateToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

const generateAccessToken = (payload) => {
    return jwt.sign({ ...payload, type: 'ACCESS' }, config.jwt.secret, { expiresIn: '15m' });
  };
  
  const generateRefreshToken = (payload) => {
    return jwt.sign({ ...payload, type: 'REFRESH' }, config.jwt.secret, { expiresIn: '7d' });
  };
  
module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
