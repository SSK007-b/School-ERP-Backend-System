const User = require('../models/user.model');
const httpStatus = require('http-status');

const createUser = async (userData) => {
    try {
        return await User.create(userData);
    }
    catch (error) {
        throw error;
    }
};

const queryUsers = async (filter, options) => {
    try {
        return await User.paginate(filter, options);
    }
    catch (error) {
        throw error;
    }
};

const getUserById = async (userid) =>{
    try {
        return await User.findById(userid);
    }
    catch(error){
        throw error;
    }
};

const updateUserById = async (userid, updateBody) => {
    try {
        const user = await getUserById(userid);
        if (!user){
            throw new Error(httpStatus.NOT_FOUND);
        }
        Object.assign(user, updateBody);
        await user.save();
        return user;
    }
    catch(error){
        throw error;
    }
};

const deleteUserById = async (userid) => {
    try {
        const user = await getUserById(userid);
        if (!user){
            throw new Error(httpStatus.NOT_FOUND);
        }
        await user.remove();
        return user;
    }
    catch(error){
        throw error;
    }
};

module.exports = {
    createUser,
    queryUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};