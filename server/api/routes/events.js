const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Event = require("../models/events")
const eventDb = require("../repositories/events.repository");
const decode = require("jwt-decode");

router.post("/createEvent", (req, res, next) => {
    return new Promise((resolve, reject) => {
        eventDb.createEvent({
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            status: req.body.status,
            creatorId: decode(req.headers.authorization).id
        }, function (error, event) {
            if (error)
                return reject(error)
            resolve(event);
        })
    }).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(400).json(error)
    });
});

router.delete("/:eventId", (req, res, next) => {
    return new Promise((resolve, reject) => {
        eventDb.deleteEvent(req.params.eventId, function (error, event) {
            if (error)
                return reject(error)
            resolve(event);
        })
    }).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(400).json(error)
    })
});

router.get("/getEvents", (req, res, next) => {
    return new Promise((resolve, reject) => {
        eventDb.getAllEvents(function (error, event) {
            if (error)
                return reject(error)
            resolve(event);
        })
    }).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(400).json(error)
    })
});

router.post("/updateEvent/:eventId", (req, res, next) => {
    return new Promise((resolve, reject) => {
        eventDb.updateEventById(
            {
                eventId: req.params.eventId,
                title: req.body.title,
                description: req.body.description,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                status: req.body.status
            },
            function (error, event) {
                if (error)
                    return reject(error)
                resolve(event);
            })
    }).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(400).json(error)
    });
});

module.exports = router;