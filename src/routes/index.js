const express = require('express');
const userRouters = require('./user.route')
const authRouters = require('./auth.route')
const assignmentRouters = require('./assignment.route')

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
  {
    path: '/assignments',
    route: assignmentRouters,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
