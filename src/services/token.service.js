const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');
const Token = require('../models/token.model')
const { tokenTypes } = require('../config/tokens');

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
//   
  return jwt.sign(payload, secret);
};

const saveToken = async (token, _id, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    user: _id,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user._id, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user._id, refreshTokenExpires, tokenTypes.REFRESH);
  await saveToken(refreshToken, user._id, refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
};
