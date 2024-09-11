const express = require('express')
const userController = require('../controllers/user.controller')

const router = express.Router()

// console.log('userController', userController.getUsers)

router
    .route('/')
    .get(userController.getUsers)
    .post(userController.createUser)

router
    .route('/:userid')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router