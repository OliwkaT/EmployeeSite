const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    senderId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    receiverId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Chat", messageSchema);