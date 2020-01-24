const taskModel = require("../models/tasks")

const createTask = function (task, callback) {
    taskModel.create({
        text: task.text,
        status: task.status
    }, callback);
};

const deleteTask = function (taskId, callback) {
    taskModel.findOneAndDelete({
        _id: taskId
    }, callback)
}

const getAllTasks = function (callback) {
    taskModel.find(callback)
}

module.exports = {
    createTask,
    deleteTask,
    getAllTasks
}