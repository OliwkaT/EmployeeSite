const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/posts")
const postDb = require("../repositories/posts.repository");
const decode = require("jwt-decode");

router.post("/createPost", (req, res, next) => {
    return new Promise((resolve, reject) => {
        postDb.createPost({
            title: req.body.title,
            content: req.body.content,
            date: req.body.date,
            creatorId: decode(req.headers.authorization).id
        }, function (error, post) {
            if (error)
                return reject(error)
            resolve(post);
        })
    }).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(400).json(error)
    });
});

router.delete("/delete/:postId", (req, res, next) => {
    return new Promise((resolve, reject) => {
        postDb.deletePost(req.params.postId, function (error, post) {
            if (error)
                return reject(error)
            resolve(post);
        })
    }).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(400).json(error)
    })
});

router.get("/getPosts", (req, res, next) => {
    return new Promise((resolve, reject) => {
        postDb.getAllPosts(function (error, post) {
            if (error)
                return reject(error)
            resolve(post);
        })
    }).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(400).json(error)
    })
});

router.post("/updatePost/:postId", (req, res, next) => {
    return new Promise((resolve, reject) => {
        postDb.updatePostById(
            {
                postId: req.params.postId,
                title: req.body.title,
                content: req.body.content
            },
            function (error, post) {
                if (error)
                    return reject(error)
                resolve(post);
            })
    }).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(400).json(error)
    });
});

module.exports = router;