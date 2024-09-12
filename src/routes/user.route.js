const express = require('express')
const userController = require('../controllers/user.controller')
const auth = require('../middleware/auth')

const router = express.Router()

router
    .route('/')
    .get(userController.getUsers)
    .post(userController.createUser)

router
    .route('/:userId')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router