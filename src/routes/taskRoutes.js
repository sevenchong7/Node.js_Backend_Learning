const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createTask,
    getTasksByUserId,
    getTaskById,
    updateTask,
    updateTaskStatus,
    deleteTask
} = require("../controllers/taskController");

// CREATE task  
router.post("/", authMiddleware, createTask);

// GET all task by user id 
router.get("/", authMiddleware, getTasksByUserId);

// GET task by id 
router.get("/:id", authMiddleware, getTaskById);

// UPDATE task
router.put("/:id", authMiddleware, updateTask);

//UPATE task status
router.patch("/:id", authMiddleware, updateTaskStatus)

// DELETE task
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;