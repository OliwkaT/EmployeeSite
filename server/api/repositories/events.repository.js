const eventModel = require("../models/events");

const createEvent = function (event, callback) {
    eventModel.create({
        title: event.title,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        status: event.status,
        creatorId: event.creatorId
    }, callback);
};

const deleteEvent = function (eventId, callback) {
    eventModel.findOneAndDelete({
        _id: eventId
    }, callback)
}

const getAllEvents = function (callback) {
    eventModel.find(callback)
}

const updateEventById = function (event, callback) {
    eventModel.updateOne(
        {
            _id: event.eventId
        },
        {
            $set:
            {
                title: event.title,
                description: event.description,
                startDate: event.startDate,
                endDate: event.endDate,
                status: event.status
            },

        },
        {},
        callback);
};

module.exports = {
    createEvent,
    deleteEvent,
    getAllEvents,
    updateEventById
}