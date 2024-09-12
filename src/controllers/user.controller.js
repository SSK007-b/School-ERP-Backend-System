const httpStatus = require('http-status');
const userServices = require('../services/user.service');

const createUser = async(req, res) =>{
    try {
        const userData = req.body;
        const user = await userServices.createUser(userData);
        res.status(httpStatus.CREATED).send(user);
    }
    catch(error){
        res.status(httpStatus.BAD_REQUEST).send(error);
    }
};

const getUsers = async(req, res) => {
    try {
        const { filter, options } = req.body;
        const users = await userServices.queryUsers(filter, options);
        res.status(httpStatus.OK).send(users);
    }
    catch(error){
        res.status(httpStatus.BAD_REQUEST).send(error);
    }
};

const getUser = async(req, res) => {
    try {
        const user = await userServices.getUserById(req.params.userId);
        res.status(httpStatus.OK).send(user);
    }
    catch(error){
        res.status(httpStatus.BAD_REQUEST).send(error);
    }
};

const updateUser = async(req, res) => {
    try{
        const user = await userServices.updateUserById(req.params.userId, req.body);
        res.status(httpStatus.OK).send(user);
    }
    catch(error){
        res.status(httpStatus.BAD_REQUEST).send(error);
    }
};

const deleteUser = async(req, res) => {
    try {
        const user = await userServices.deleteUserById(req.params.userId);
        res.status(httpStatus.OK).send(user);
    }
    catch(error){
        res.status(httpStatus.BAD_REQUEST).send(error);
    }
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};
