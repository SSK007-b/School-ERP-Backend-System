const express = require('express');
const userRouters = require('./user.route')
const authRouters = require('./auth.route')

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRouters,
  },
  {
    path: '/users',
    route: userRouters,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
