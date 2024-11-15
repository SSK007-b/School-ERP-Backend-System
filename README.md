# School ERP Backend System

## Overview
The School ERP Backend System allows teachers to manage student data and assignments, while students can view and submit assignments. The system implements JWT-based authentication and authorization with two user roles: Teacher and Student.

## Features
- JWT-based authentication with two roles: **Teacher** and **Student**.
- Teachers can manage student records, post assignments, and grade submissions.
- Students can view assignments and submit their work.

## Prerequisites
- **Node.js** EHS8.14.0+
- **MongoDB** (for student and assignment data)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repo/school-erp-backend.git
   cd school-erp-backend

Install the dependencies:

```bash
npm install
```

## Features

- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Authentication and authorization**: using [passport](http://www.passportjs.org)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Testing**: unit and integration tests using [Jest](https://jestjs.io)
## Commands

Running locally:

```bash
npm start
```

Running in production:

```bash
npm run dev
```

Testing:

```bash
# run all tests
npm test
```


## Project Structure
```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```
### API Endpoints

List of available routes:

**Auth routes**:\
`POST /EHS/auth/register` - register\
`POST /EHS/auth/login` - login\
`POST /EHS/auth/refresh-tokens` - refresh auth tokens\
`POST /EHS/auth/forgot-password` - send reset password email\
`POST /EHS/auth/reset-password` - reset password\
`POST /EHS/auth/send-verification-email` - send verification email\
`POST /EHS/auth/verify-email` - verify email

**User routes**:\
`POST /EHS/users` - create a user\
`GET /EHS/users` - get all users\
`GET /EHS/users/:userId` - get user\
`PATCH /EHS/users/:userId` - update user\
`DELETE /EHS/users/:userId` - delete user\

**Student routes**:\
`POST /EHS/students` - create a student\
`GET /EHS/students` - get all student\
`GET /EHS/students/:studentId` - get student\
`PATCH /EHS/students/:studentId` - update student\
`DELETE /EHS/srudents/:studentId` - delete student\

**Assignemt routes**:\
`POST /EHS/assignments` - create a assignment\
`GET /EHS/assignments` - get all assignment\
`GET /EHS/assignments/:assignmentId` - get assignment\
`PATCH /EHS/assignemnts/:assignmentId` - update assinment\
`DELETE /EHS/assignemnts/:assignmentId` - delete assignment\

**Submission routes**:\
`POST /EHS/submissions` - create a submission\
`GET /EHS/submissions` - get all submission\
`GET /EHS/submissions/:submissionId` - get submission\
`PATCH /EHS/submissions/:submissionId` - update submission\
`DELETE /EHS/submissions/:userId` - delete submission\

## Authentication

To require authentication for certain routes, you can use the `auth` middleware.

```javascript
const express = require('express');
const auth = require('../../middlewares/auth');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/users', auth(), userController.createUser);
```

These routes require a valid JWT access token in the Authorization request header using the Bearer schema. If the request does not contain a valid access token, an Unauthorized (401) error is thrown.

**Generating Access Tokens**:

An access token can be generated by making a successful call to the register (`POST /EHS/auth/register`) or login (`POST /EHS/auth/login`) endpoints. The response of these endpoints also contains refresh tokens (explained below).

An access token is valid for 30 minutes. You can modify this expiration time by changing the `JWT_ACCESS_EXPIRATION_MINUTES` environment variable in the .env file.

## Authorization

The `auth` middleware can also be used to require certain rights/permissions to access a route.

```javascript
const express = require('express');
const auth = require('../../middlewares/auth');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/users', auth('create'), userController.createUser);
```

In the example above, an authenticated user can access this route only if that user has the `create` permission.

The permissions are role-based. You can view the permissions/rights of each role in the `src/config/roles.js` file.

## Test Case Sample
```javascript
 describe('POST /ERP/students', () => {
    test('should return 201 and successfully create new student if data is ok', async () => {
      await insertUsers([userOne])

      const res = await request(app)
        .post('/ERP/students')
        .set('Authorization', `Bearer ${userOneAccessToken}`) // Assuming userOne is a teacher or admin
        .send(newStudent)
        .expect(httpStatus.CREATED);
    });
 });
```
