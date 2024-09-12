const express = require('express');
const { submissionController } = require('../controllers');
const auth = require('../middleware/auth')

const router = express.Router();

router
    .route('/')
    .get(auth(), submissionController.getSubmissions)
    .post(auth(), submissionController.createSubmission);

router
    .route('/:submissionId')
    .get(auth(), submissionController.getSubmission)
    .patch(auth(), submissionController.updateSubmission)
    .put(auth(['create']), submissionController.gradeSubmission)
    .delete(auth(), submissionController.deleteSubmission);

module.exports = router;