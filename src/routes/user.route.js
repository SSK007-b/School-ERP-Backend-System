const express = require('express')
const userController = require('../controllers/user.controller')
const auth = require('../middleware/auth')

const router = express.Router()

router
    .route('/')
    .get(auth(['create']), userController.getUsers)
    .post(auth(['create']), userController.createUser)

router
    .route('/:userId')
    .get(auth(), userController.getUser)
    .patch(auth(['update']), userController.updateUser)
    .delete(auth(['delete']), userController.deleteUser)

module.exports = router