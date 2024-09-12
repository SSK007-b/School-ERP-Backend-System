const express = require('express');
const userRouters = require('./user.route')
const authRouters = require('./auth.route')
const assignmentRouters = require('./assignment.route')
const studentRouters = require('./student.route')
const submissionRouters = require('./submission.route')

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
    path: '/students',
    route: studentRouters,
  },
  {
    path: '/assignments',
    route: assignmentRouters,
  },
  {
    path: '/submissions',
    route: submissionRouters,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
