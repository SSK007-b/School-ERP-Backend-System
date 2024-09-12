const passport = require('passport');
const httpStatus = require('http-status');
const { rolesRights } = require('../config/roles');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
    if (err || info || !user) {
      return reject(new Error(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }
    req.user = user;

    if (requiredRights) {
    const userRights = rolesRights.get(user.role);
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(new Error(httpStatus.FORBIDDEN, 'Forbidden'));
      }
    }
  
    resolve();
  };

const auth = (requiredRights) => async (req, res, next) => {
  new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      verifyCallback(req, resolve, reject, requiredRights)(err, user, info);
    })(req, res, next);
  })
  .then(() => next())
  .catch((error) => res.status(401).json({ message: error.message }));
};

module.exports = auth;
