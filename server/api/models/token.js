const mongoose = require('mongoose');

const Token = mongoose.Schema({
    accessToken: {
        type: String
    },
    expires: {
        type: Date
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId
    }
});

module.exports = mongoose.model("Token", Token);