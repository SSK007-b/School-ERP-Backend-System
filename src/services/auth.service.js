const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const { tokenTypes } = require('../config/tokens');

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.password === password)) {
    throw new Error(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new Error(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new Error(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};


module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
};
