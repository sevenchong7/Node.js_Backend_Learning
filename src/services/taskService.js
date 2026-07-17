const taskRepositories = require("../repositories/taskRepositories");
const AppError = require("../utils/AppError");
const redisClient = require("../config/redis");
const invalidateTaskCache = require("../utils/redisCache");

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

    await invalidateTaskCache(userId);

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

    const cacheKey =
        `tasks:${userId}` +
        `:page=${page}` +
        `:limit=${limit}` +
        `:search=${search ?? ""}` +
        `:completed=${completed ?? ""}` +
        `:sort=${sort}` +
        `:order=${order}`;

    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {

        console.log("🔥 Cache HIT");

        return JSON.parse(cachedData);

    }

    console.log("💾 Cache MISS");

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

    const response = {
        data: result.tasks,
        pagination: {
            page,
            limit,
            total: result.total,
            totalPages,
            hasNextPage,
            hasPreviousPage
        }
    };

    await redisClient.set(
        cacheKey,
        JSON.stringify(response), {
            EX: 60
        }
    );

    return response;
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