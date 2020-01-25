const tokenModel = require("../models/token");

const saveToken = function (accessToken, expireDate, user, callback) {
    tokenModel.create({
        accessToken: accessToken,
        expires: expireDate,
        userId: user._id
    }, callback)
}

module.exports = {
    saveToken,
}