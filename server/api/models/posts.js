const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }, 
    date: { 
        type: Date,
        default: Date.now 
    },
    creatorId: {
        type: mongoose.Types.ObjectId
    }
});

module.exports = mongoose.model("Post", postSchema);