const Submission = require('../models/submission.model');
const Assignment = require('../models/assignment.model');
const User = require('../models/user.model');
const httpStatus = require('http-status');

const createSubmission = async (assignmentId, studentId, submissionContent) => {
    try {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) throw new Error('Assignment not found');

    const student = await User.findById(studentId);
    if (!student || student.role !== 'student') throw new Error('Student not found or invalid role');

    // Create new submission
    const newSubmission = new Submission({
      assignmentId,
      studentId,
      content: submissionContent,
      status: 'submitted',
    });

    return await newSubmission.save();
    }
    catch (error) {
        throw error;
    }
};

const querySubmissions = async () => {
    try {
        return await Submission.find();
    }
    catch (error) {
        throw error;
    }
};

const getSubmissionByAssignmentId = async (assignmentId) => {
    try {  
        return await Submission.find({ assignmentId });
    }
    catch(error){
        throw error;
    }
};

const gradeSubmission = async (submissionId, grade) => {
    // Find the submission by ID and update the grade and feedback
    const submission = await Submission.findById(submissionId);
    if (!submission) throw new Error('Submission not found');

    submission.grade = grade;

    return await submission.save();
}

const getSubmissionById = async (submissionId) =>{
    try {
        return await Submission.findById(submissionId);
    }
    catch(error){
        throw error;
    }
};

const updateSubmissionById = async (submissionId, updateBody) => {
    const submission = await getSubmissionById(submissionId);
    if (!submission) throw new Error('Submission not found');
    submission.content = updateBody.content;
    return await submission.save();
};

const deleteSubmissionById = async (submissionId) => {
    try {
        await Submission.findByIdAndDelete(submissionId);
        return {message: 'Submission deleted successfully'}
    }
    catch(error){
        throw error;
    }
};

module.exports = {
    getSubmissionByAssignmentId,
    createSubmission,
    gradeSubmission,
    querySubmissions,
    getSubmissionById,
    updateSubmissionById,
    deleteSubmissionById,
};