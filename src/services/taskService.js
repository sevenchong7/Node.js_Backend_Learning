const AppError = require("../utils/AppError");
const taskRepositories = require("../repositories/taskRepositories");

const createTask = async ({
    title,
    description,
    userId
}) => {

    const createdTask = await taskRepositories.createTask({
        title,
        description,
        userId
    });

    if (!createdTask) {
        throw new AppError("Failed to create task", 500);
    }

    return {
        message: "Task created successfully",
        task: createdTask
    };
};


const getTasksByUserId = async (userId) => {
    const result = await taskRepositories.getTasksByUserId(userId);

    return result;
}

const getTaskById = async (taskId, userId) => {

    const result = await taskRepositories.getTaskById(taskId, userId);

    if (!result) {
        throw new AppError("Invalid Task Id", 400);
    }

    return result;
}

const updateTask = async ({
    id,
    title,
    description,
    userId
}) => {
    const result = taskRepositories.updateTask({
        id,
        title,
        description,
        userId
    });


    if (!result) {
        throw new AppError("Invalid Task ID", 400)
    }

    return result;
}

const updateTaskStatus = async (taskId, userId) => {
    const result = taskRepositories.updateTaskStatus(taskId, userId);

    if (!result) {
        throw new AppError("Invalid Task ID", 400)
    }

    return result;
}

const deleteTask = async (taskId, userId) => {
    const result = taskRepositories.deleteTask(taskId, userId);

    if (!result) {
        throw new AppError("Invalid Task ID", 400)
    }

    return result;
}

module.exports = {
    createTask,
    getTasksByUserId,
    getTaskById,
    updateTask,
    updateTaskStatus,
    deleteTask
};