const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Message = require("../models/chat")
const chatDb = require("../repositories/chat.repository");
const decode = require("jwt-decode");

router.post("/createMessage/:receiverId", (req, res, next) => {
    return new Promise((resolve, reject) => {
        chatDb.createMessage({
            text: req.body.text,
            senderId: decode(req.headers.authorization).id,
            receiverId: req.params.receiverId,
        }, function (error, message) {
            if (error)
                return reject(error)
            resolve(message);
        })
    }).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(400).json(error)
    });
});

router.get("/getMessages/:senderId", (req, res, next) => {
    return new Promise((resolve, reject) => {
        chatDb.getMessages({
            receiverId: decode(req.headers.authorization).id,
            senderId: req.params.senderId
        }, function (error, received) {
            if (error)
                return reject(error)
            chatDb.getMessages({
                receiverId: req.params.senderId,
                senderId: decode(req.headers.authorization).id
            }, function (error, sent) {
                if (error)
                    return reject(error)
                resolve({ received: received, sent: sent });
            })
        })
    }).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(400).json(error)
    })
});

module.exports = router;