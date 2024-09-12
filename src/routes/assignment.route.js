const express = require('express');
const { assignmentController } = require('../controllers');
const auth = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(auth(), assignmentController.getAssignments)
    .post(auth(['create']), assignmentController.createAssignment);

router
    .route('/:assignmentId')
    .get(auth(), assignmentController.getAssignment)
    .patch(auth(['create']), assignmentController.updateAssignment)
    .delete(auth(['create']), assignmentController.deleteAssignment);

module.exports = router;