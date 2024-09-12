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

const queryUsers = async () => {
    try {
        return await User.find();
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
        await User.findByIdAndDelete(userId);
        return {message: 'User deleted successfully'}
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