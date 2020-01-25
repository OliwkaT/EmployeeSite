const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userDb = require("../repositories/user.repository");
const tokenDb = require("../repositories/token.repository");
const moment = require("moment");
const decode = require("jwt-decode");

router.post("/createUser", (req, res, next) => {
    let password = bcrypt.hashSync(req.body.password, 10);
    return new Promise((resolve, reject) => {
        userDb.createUser({
            password: password, 
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: req.body.role,
            email: req.body.email,
            city: req.body.city,
            department: req.body.department,
            position: req.body.position,
            status: req.body.status
        }, function (error, user) {
            if (error)
                return reject(error)
            resolve(user);
        })
    }).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.post("/login", (req, res, next) => {
    let user = req.body
    return new Promise((resolve, reject) => {
        userDb.getUserByEmail(user.email, function (error, dbUser) {
            const isPasswordValid = bcrypt.compareSync(user.password, dbUser.password)
            if (!isPasswordValid)
                return reject("Not a valid password")
            const yearInSecs = 31556926
            const token = jwt.sign({ id: dbUser._id }, "token", { expiresIn: yearInSecs })
            tokenDb.saveToken(token, moment().add(yearInSecs, "s"), dbUser, function (error, dbToken) {
                const noPwUser = { ...dbUser._doc, password: null }
                resolve({ user: noPwUser, token: token })
            })
        })
    }).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(400).json(error)
    })
});

router.delete("/:userId", (req, res, next) => {
    return new Promise((resolve, reject) => {
        userDb.deleteUser(req.params.userId, function (error, user) {
            if (error)
                return reject(error)
            resolve(user);
        })
    }).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(400).json(error)
    })
});

router.get("/getUsers", (req, res, next) => {
    return new Promise((resolve, reject) => {
        userDb.getAllUsers(function (error, user) {
            if (error)
                return reject(error)
            resolve(user);
        })
    }).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(400).json(error)
    })
});

router.get("/:userId/data", (req, res, next) => {
    return new Promise((resolve, reject) => {
        userDb.getUserById(req.params.userId, function (error, user) {
            if (error)
                return reject(error)
            resolve(user);
        })
    }).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(400).json(error)
    })
});

router.get("/userData", (req, res, next) => {
    return new Promise((resolve, reject) => {
        userDb.getUserById(decode(req.headers.authorization).id, function (error, user) {
            if (error)
                return reject(error)
            resolve(user);
        })
    }).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(400).json(error)
    })
});

module.exports = router;