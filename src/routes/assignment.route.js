const express = require('express');
const { assignmentController } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .get(assignmentController.getAssignments)
    .post(assignmentController.createAssignment);

router
    .route('/:assignmentId')
    .get(assignmentController.getAssignment)
    .patch(assignmentController.updateAssignment)
    .delete(assignmentController.deleteAssignment);

module.exports = router;