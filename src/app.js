const express = require('express');
const httpStatus = require('http-status');
const routes = require('./routes');
const passport = require('passport');
const { jwtStrategy } = require('./config/passport');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/ERP', routes);

// Testing if it is working or Not
// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

app.use(passport.initialize()); 
passport.use('jwt', jwtStrategy);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = httpStatus.NOT_FOUND;
    next(err);
});

module.exports = app;