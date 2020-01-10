const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    }, 
    startDate: { 
        type: Date,
        required: true 
    },
    endDate:{
        type: Date
    },
    status: {
        type: String,
        default: "UPCOMING"
    },
    creatorId: {
        type: mongoose.Types.ObjectId
    }
});

module.exports = mongoose.model("Event", EventSchema);