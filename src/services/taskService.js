const taskRepositories = require("../repositories/taskRepositories");
const AppError = require("../utils/AppError");


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


const getTasksByUserId = async ({
    userId,
    page,
    limit,
    search,
    completed,
    sort,
    order
}) => {

    const result = await taskRepositories.getTasksByUserId({
        userId,
        page,
        limit,
        search,
        completed,
        sort,
        order
    });

    const totalPages = Math.ceil(result.total / limit);

    const hasNextPage = page < totalPages;

    const hasPreviousPage = page > 1;

    return {
        data: result.tasks,
        pagination: {
            page: page,
            limit: limit,
            total: result.total,
            totalPages: totalPages,
            hasNextPage: hasNextPage,
            hasPreviousPage: hasPreviousPage
        }
    };
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
    const result = await taskRepositories.updateTask({
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
    const result = await taskRepositories.updateTaskStatus(taskId, userId);

    if (!result) {
        throw new AppError("Invalid Task ID", 400)
    }

    return result;
}

const deleteTask = async (taskId, userId) => {
    const result = await taskRepositories.deleteTask(taskId, userId);

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