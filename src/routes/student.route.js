const express = require('express');
const studentController = require('../controllers/student.controller');

const router = express.Router();

router
    .route('/')
    .get(studentController.getStudents)
    .post(studentController.createStudent);

router
    .route('/:studentId')
    .get(studentController.getStudent)
    .patch(studentController.updateStudent)
    .delete(studentController.deleteStudent);

module.exports = router;