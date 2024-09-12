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

const getUserById = async (userId) =>{
    try {
        return await User.findById(userId);
    }
    catch(error){
        throw error;
    }
};

const getUserByEmail = async (email) => {
    try {
        return await User.findOne({email})
    }
    catch(error){
        throw error;
    }
}

const updateUserById = async (userId, updateBody) => {
    try {
        const user = await getUserById(userId);
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

const deleteUserById = async (userId) => {
    try {
        const user = await getUserById(userId);
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
    getUserByEmail,
    updateUserById,
    deleteUserById,
};