const postModel = require("../models/posts")

const createPost = function (post, callback) {
    postModel.create({
        title: post.title,
        content: post.content,
        date: post.date
    }, callback);
};

const deletePost = function (postId, callback) {
    postModel.findOneAndDelete({
        _id: postId
    }, callback)
}

const getAllPosts = function (callback) {
    postModel.find(callback)
}

module.exports = {
    createPost,
    deletePost,
    getAllPosts
}