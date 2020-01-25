const postModel = require("../models/posts")

const createPost = function (post, callback) {
    postModel.create({
        title: post.title,
        content: post.content,
        date: post.date,
        creatorId: post.creatorId
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

const updatePostById = function (post, callback) {
    postModel.updateOne(
        {
            _id: post.postId
        },
        {
            $set:
            {
                title: post.title,
                content: post.content
            },

        },
        {},
        callback);
};

module.exports = {
    createPost,
    deletePost,
    getAllPosts,
    updatePostById
}