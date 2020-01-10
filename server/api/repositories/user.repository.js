const userModel = require("../models/users");

const createUser = function (user, callback) {
    userModel.create({
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
        password: user.password
    }, callback)
};

const getUserByEmail = function (email, callback) {
    console.log(email)
    userModel.findOne({
        email: email.toLowerCase()
    }, callback)
};

const deleteUser = function (userId, callback) {
    userModel.findOneAndDelete({
        _id: userId
    }, callback)
}

const getAllUsers = function (callback) {
    userModel.find(callback)
}

const getUserById= function (userId, callback) {
    userModel.findOne({
        _id: userId
    }, callback)
};

module.exports = {
    createUser,
    getUserByEmail,
    deleteUser,
    getAllUsers,
    getUserById
}