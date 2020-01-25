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
        type: mongoose.Types.ObjectId,
        required: true
    },
    creatorId: {
        type: mongoose.Types.ObjectId
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Post", postSchema);
