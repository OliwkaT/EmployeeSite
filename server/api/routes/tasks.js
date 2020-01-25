const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Task = require("../models/tasks");
const taskDb = require("../repositories/tasks.repository");
const decode = require("jwt-decode");

router.post("/createTask", (req, res, next) => {
    return new Promise((resolve, reject) => {
        taskDb.createTask({
            text: req.body.text,
            status: req.body.status,
            creatorId: decode(req.headers.authorization).id,
        }, function (error, task) {
            if (error)
                return reject(error)
            resolve(task);
        })
    }).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(400).json(error)
    });
});

router.delete("/delete/:taskId", (req, res, next) => {
    return new Promise((resolve, reject) => {
        taskDb.deleteTask(req.params.taskId, function (error, task) {
            if (error)
                return reject(error)
            resolve(task);
        })
    }).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(400).json(error)
    })
});

router.get("/getTasks", (req, res, next) => {
    return new Promise((resolve, reject) => {
        taskDb.getAllTasks(function (error, task) {
            if (error)
                return reject(error)
            resolve(task);
        })
    }).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(400).json(error)
    })
});


router.post("/updateTask/:taskId", (req, res, next) => {
    return new Promise((resolve, reject) => {
        taskDb.updateTaskById(
            {
                taskId: req.params.taskId,
                text: req.body.text,
                status: req.body.status
            },
            function (error, task) {
                if (error)
                    return reject(error)
                resolve(task);
            })
    }).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(400).json(error)
    });
});

module.exports = router;
