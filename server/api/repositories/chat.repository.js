const messageModel = require("../models/chat")

const createMessage = function (message, callback) {
    messageModel.create({
        text: message.text,
        senderId: message.senderId,
        receiverId: message.receiverId
    }, callback);
};

const getMessages = function (message, callback) {
    messageModel.find({
        senderId: message.senderId,
        receiverId: message.receiverId
    }, callback)
}

module.exports = {
    createMessage,
    getMessages
}