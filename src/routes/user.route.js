const express = require('express')
const userController = require('../controllers/user.controller')
const auth = require('../middleware/auth')

const router = express.Router()

router
    .route('/')
    .get(auth(), userController.getUsers)
    .post(auth(['teacher']), userController.createUser)

router
    .route('/:userId')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router