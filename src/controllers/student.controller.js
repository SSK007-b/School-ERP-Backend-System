const studentServices = require('../services/student.service');
const httpStatus = require('http-status');

const createStudent = async (req, res) => {
    const student = await studentServices.createStudent(req.body);
    res.status(httpStatus.CREATED).send(student);
};

const getStudents = async (req, res) => {
    const result = await studentServices.queryStudents(req.query);
    res.send(result);
};

const getStudent = async (req, res) => {
    const student = await studentServices.getStudentById(req.params.studentId);
    if (!student) {
        throw new Error(httpStatus.NOT_FOUND);
    }
    res.send(student);
};

const updateStudent = async (req, res) => {
    const student = await studentServices.updateStudentById(req.params.studentId, req.body);
    res.send(student);
};

const deleteStudent = async (req, res) => {
    const student = await studentServices.deleteStudentById(req.params.studentId);
    res.send(student);
};

module.exports = {
    createStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent
};
