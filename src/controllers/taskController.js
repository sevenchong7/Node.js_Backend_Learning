const asyncHandler = require("../utils/asyncHandler");
const taskService = require("../services/taskService");
const {
    taskSchema,
    getTaskByIdSchema,
    taskPaginationSchema
} = require("../validations/taskValidation");

const createTask = asyncHandler(async (req, res) => {

    taskSchema.parse(req.body);

    const {
        title,
        description
    } = req.body;

    const userId = req.user.userId;

    const result = await taskService.createTask({
        title,
        description,
        userId
    })

    return res.status(201).json(result);

});

const getTasksByUserId = asyncHandler(async (req, res) => {

    taskPaginationSchema.parse(req.query);

    const {
        page,
        limit,
        search
    } = req.query

    const userId = req.user.userId;

    const result = await taskService.getTasksByUserId(userId, page, limit, search);

    return res.status(200).json(result);
})

const getTaskById = asyncHandler(async (req, res) => {

    const id = Number(req.params.id);

    const userId = req.user.userId;

    const result = await taskService.getTaskById(id, userId);

    return res.status(200).json(result);
});

const updateTask = asyncHandler(async (req, res) => {

    const id = Number(req.params.id);

    const {
        title,
        description
    } = req.body;

    const userId = req.user.userId;

    const result = await taskService.updateTask({
        id,
        title,
        description,
        userId
    });

    return res.status(200).json({
        message: "Task Updated",
        task: result
    })

})

const updateTaskStatus = asyncHandler(async (req, res) => {

    const id = Number(req.params.id);

    const userId = req.user.userId;

    const result = await taskService.updateTaskStatus(id, userId);

    return res.status(200).json({
        message: "Task status updated",
        task: result
    })

});

const deleteTask = asyncHandler(async (req, res) => {

    const id = Number(req.params.id);

    const userId = req.user.userId;

    const result = await taskService.deleteTask(id, userId);

    return res.status(200).json({
        message: "Task Deleted",
    })
})

module.exports = {
    createTask,
    getTasksByUserId,
    getTaskById,
    updateTask,
    updateTaskStatus,
    deleteTask
};