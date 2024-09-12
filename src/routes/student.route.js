const express = require('express');
const studentController = require('../controllers/student.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(auth(['create']),studentController.getStudents)
    .post(auth(['create']),studentController.createStudent);

router
    .route('/:studentId')
    .get(auth(),studentController.getStudent)
    .patch(auth(),studentController.updateStudent)
    .delete(auth(['delete']),studentController.deleteStudent);
    
module.exports = router;