const express = require('express')
const userController = require('../controllers/user.controller')
const auth = require('../middleware/auth')

const router = express.Router()

router
    .route('/')
    .get(auth(['read']), userController.getUsers)
    .post(userController.createUser)

router
    .route('/:userId')
    .get(auth(['read']), userController.getUser)
    .patch(auth(['update']), userController.updateUser)
    .delete(auth(['delete']), userController.deleteUser)

module.exports = router