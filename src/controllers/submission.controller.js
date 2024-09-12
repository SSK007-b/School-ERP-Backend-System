const submissionServices = require('../services/submission.service');
const authController = require('./auth.controller');
const httpStatus = require('http-status');

const createSubmission = async (req, res) => {
    const { studentId ,assignmentId,  content } = req.body;
    const submission = await submissionServices.createSubmission(assignmentId, studentId, content);
    res.status(httpStatus.CREATED).send(submission);
};

const getSubmissions = async (req, res) => {
    const result = await submissionServices.querySubmissions(req.query);
    res.send(result);
};

const gradeSubmission = async (req, res) => {
    const submission = await submissionServices.gradeSubmission(req.params.submissionId, req.body.grade);
    res.send(submission);
}

const getSubmission = async (req, res) => {
    const submission = await submissionServices.getSubmissionById(req.params.submissionId);
    if (!submission) {
        throw new Error(httpStatus.NOT_FOUND);
    }
    res.send(submission);
};

const updateSubmission = async (req, res) => {
    const submission = await submissionServices.updateSubmissionById(req.params.submissionId, req.body);
    res.send(submission);
};

const deleteSubmission = async (req, res) => {
    const submission = await submissionServices.deleteSubmissionById(req.params.submissionId);
    res.send(submission);
};

module.exports = {
    createSubmission,
    getSubmissions,
    getSubmission,
    updateSubmission,
    deleteSubmission,
    gradeSubmission,
};
