const Student = require('../models/student.model');
const httpStatus = require('http-status');

const createStudent = async (studentData) => {
    try {
        return await Student.create(studentData);
    }
    catch (error) {
        throw error;
    }
};

const queryStudents = async () => {
    try {
        return await Student.find();
    }
    catch (error) {
        throw error;
    }
};

const getStudentById = async (studentId) =>{
    try {
        return await Student.findById(studentId);
    }
    catch(error){
        throw error;
    }
};

const updateStudentById = async (studentId, updateBody) => {
    try {
        const student = await getStudentById(studentId);
        if (!student){
            throw new Error(httpStatus.NOT_FOUND);
        }
        Object.assign(student, updateBody);
        await student.save();
        return student;
    }
    catch(error){
        throw error;
    }
};

const deleteStudentById = async (studentId) => {
    try {
        await Student.findByIdAndDelete(studentId);
        return {message: 'Student deleted successfully'}
    }
    catch(error){
        throw error;
    }
};

module.exports = {
    createStudent,
    queryStudents,
    getStudentById,
    updateStudentById,
    deleteStudentById,
};