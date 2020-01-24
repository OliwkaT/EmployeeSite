const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Task", taskSchema);