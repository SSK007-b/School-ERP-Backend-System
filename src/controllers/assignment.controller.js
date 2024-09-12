const assignmentServices = require('../services/assignment.service');
const httpStatus = require('http-status');

const createAssignment = async (req, res) => {
    const assignment = await assignmentServices.createAssignment(req.body);
    res.status(httpStatus.CREATED).send(assignment);
};

const getAssignments = async (req, res) => {
    const result = await assignmentServices.queryAssignments(req.query);
    res.send(result);
};

const getAssignment = async (req, res) => {
    const assignment = await assignmentServices.getAssignmentById(req.params.assignmentId);
    if (!assignment) {
        throw new Error(httpStatus.NOT_FOUND);
    }
    res.send(assignment);
};

const updateAssignment = async (req, res) => {
    const assignment = await assignmentServices.updateAssignmentById(req.params.assignmentId, req.body);
    res.send(assignment);
};

const deleteAssignment = async (req, res) => {
    const assignment = await assignmentServices.deleteAssignmentById(req.params.assignmentId);
    res.send(assignment);
};

module.exports = {
    createAssignment,
    getAssignments,
    getAssignment,
    updateAssignment,
    deleteAssignment
};
