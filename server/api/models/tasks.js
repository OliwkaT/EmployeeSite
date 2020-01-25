const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    creatorId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model("Task", taskSchema);