const pool = require("../config/db");

const createTask = async ({
    title,
    description,
    userId
}) => {
    const result = await pool.query("INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *", [title, description, userId]);

    return result.rows[0];
};

const getTasksByUserId = async (userId) => {
    const result = await pool.query("SELECT * FROM TASKS WHERE user_id = $1 ORDER BY created_at DESC", [userId]);

    return result.rows;
}

const getTaskById = async (taskId, userId) => {

    const result = await pool.query("SELECT * FROM tasks WHERE id = $1 AND user_id = $2", [taskId, userId]);

    return result.rows[0];
}

const updateTask = async ({
    id,
    title,
    description,
    userId
}) => {
    const result = await pool.query(
        `
            UPDATE tasks
            SET title = $1,
                description = $2
            WHERE id = $3 AND user_id = $4
            RETURNING *
        `,
        [title, description, id, userId]
    );

    return result.rows[0];

}

const updateTaskStatus = async (taskId, userId) => {

    const taskStatus = await pool.query("SELECT completed FROM tasks WHERE id = $1 AND user_id = $2 ", [taskId, userId]);

    const status = taskStatus.rows[0];

    const result = await pool.query(
        ` 
            UPDATE tasks
            set completed = $1
            WHERE id = $2 AND user_id = $3
            RETURNING * ;
        `,
        [!status.completed, taskId, userId]
    )

    return result.rows[0];
}

const deleteTask = async (taskId, userId) => {
    const result = await pool.query("DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *", [taskId, userId]);

    return result.rows[0];
}

module.exports = {
    createTask,
    getTasksByUserId,
    getTaskById,
    updateTask,
    updateTaskStatus,
    deleteTask
}