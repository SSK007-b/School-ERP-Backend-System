const Assignment = require('../models/assignment.model');
const httpStatus = require('http-status');

const createAssignment = async (assignmentData) => {
    try {
        return await Assignment.create(assignmentData);
    }
    catch (error) {
        throw error;
    }
};

const queryAssignments = async () => {
    try {
        return await Assignment.find();
    }
    catch (error) {
        throw error;
    }
};

const getAssignmentById = async (assignmentId) =>{
    try {
        return await Assignment.findById(assignmentId);
    }
    catch(error){
        throw error;
    }
};

const updateAssignmentById = async (assignmentId, updateBody) => {
    try {
        const assignment = await getAssignmentById(assignmentId);
        if (!assignment){
            throw new Error(httpStatus.NOT_FOUND);
        }
        Object.assign(assignment, updateBody);
        await assignment.save();
        return assignment;
    }
    catch(error){
        throw error;
    }
};

const deleteAssignmentById = async (assignmentId) => {
    try {
        await Assignment.findByIdAndDelete(assignmentId);
        return {message: 'Assignment deleted successfully'}
    }
    catch(error){
        throw error;
    }
};

module.exports = {
    createAssignment,
    queryAssignments,
    getAssignmentById,
    updateAssignmentById,
    deleteAssignmentById
};