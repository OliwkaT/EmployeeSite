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

module.exports = {
    createUser,
    getUserByEmail,
    deleteUser,
    getAllUsers
}