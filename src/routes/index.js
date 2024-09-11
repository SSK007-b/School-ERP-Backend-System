const express = require('express');
const userRouters = require('./user.route')

const router = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: userRouters,
  },
];

// console.log('defaultRoutes', defaultRoutes[0].route);

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
